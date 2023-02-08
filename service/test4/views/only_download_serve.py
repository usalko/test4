# Download file one time only (temporarily links)

from django.views.static import serve
from os import unlink
import posixpath
from pathlib import Path
from django.utils._os import safe_join


def only_download_serve(request, path, document_root=None, show_indexes=False):
    try:
        return serve(request, path, document_root, show_indexes)
    finally:
        path = posixpath.normpath(path).lstrip("/")
        fullpath = Path(safe_join(document_root, path))
        if not fullpath.is_dir() and fullpath.exists():
            unlink(fullpath)
