

/**
 * Adaptation for strawberry-django-plus
 * @param pageNumber 
 * @returns base64 encoded cursor string
 */
export const _cursorForPageNumber = (pageNumber: number) => {
    return btoa(unescape(encodeURIComponent(`arrayconnection:${pageNumber - 1}`)))
}