from django.test import TestCase
from django.db import connections
import sys


class SnapshotDatabaseStateTestCase(TestCase):
    '''
        This class needs for override default behavior when --keepdb flag is in arguments.
        This convenient for make snapshots after single test, but keep in mind, that the
        database state management (old data stuff) is delegating to you.
    '''

    @classmethod
    def _make_snapshot_intention(cls):
        return '--keepdb' in sys.argv

    @classmethod
    def _commit_atomics(cls, atomics):
        """Rollback atomic blocks opened by the previous method."""
        for db_name in reversed(cls._databases_names()):
            for _ in range(0, len(connections[db_name].atomic_blocks)):
                atomics[db_name].__exit__(None, None, None)

    @classmethod
    def tearDownClass(cls):
        if cls._make_snapshot_intention() and cls._databases_support_transactions():
            cls._commit_atomics(cls.cls_atomics)
            for conn in connections.all(initialized_only=True):
                conn.commit()
                conn.close()
            return

        super().tearDownClass()

    def _fixture_teardown(self):
        if self._make_snapshot_intention() and self._databases_support_transactions():
            return

        super()._fixture_teardown()
