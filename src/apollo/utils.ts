

/**
 * Adaptation for strawberry-django-plus
 * @param pageIndex (zero based)
 * @returns base64 encoded cursor string
 */
export const _cursorForPageNumber = (pageIndex: number, pageSize: number) => {
    return btoa(unescape(encodeURIComponent(`arrayconnection:${pageIndex * pageSize}`)))
}