
# There is the interface for the jobs execution

from typing import Any


class ReportJob:
    
    def execute(self, *args, **kwags) -> Any:
        ...