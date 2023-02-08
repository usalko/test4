import React, { useState } from 'react'
import cn from 'classnames'


export interface DownloadButtonProps {
    className?: string,
    title?: string,
    url: string | CallableFunction,
    requestHeaders?: any,
    downloadAsFileName?: string | CallableFunction,
}

export declare enum DownloadButtonStateStatus {
    Ready = 0,
    Downloading = 1,
    Error = 2
}

export interface DownloadButtonState {
    downloadButtonStatus: DownloadButtonStateStatus,
    progress?: number,
    error?: string,
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
    className = '',
    title = 'Download',
    url,
    requestHeaders = {
        'Content-Type': 'application/binary',
    },
    downloadAsFileName }) => {

    const [state, setState] = useState<DownloadButtonState>({
        downloadButtonStatus: 0,
    })

    const downloadLink = async (downloadableLink: string) => {
        await fetch(downloadableLink, {
            method: 'GET',
            headers: requestHeaders,
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                )
                const link = document.createElement('a')
                link.href = url

                const fileName = downloadAsFileName ?
                    (String(downloadAsFileName) === downloadAsFileName ?
                        downloadAsFileName :
                        (downloadAsFileName as any)()
                    ) :
                    downloadableLink.split('/').at(-1)

                link.setAttribute(
                    'download',
                    fileName,
                );

                // Append to html link element page
                document.body.appendChild(link)

                // Start download
                link.click()

                // Clean up and remove the link
                link.parentNode?.removeChild(link)

                setState((state) => { return { ...state, downloadButtonStatus: 0 } })
            }).catch((reason) => {
                setState((state) => { return { ...state, downloadButtonStatus: 2, error: reason } })
            })
    }

    return (
        <button tabIndex={0} className={`${className || 'btn'} ${cn({
            'btn-disabled': state.downloadButtonStatus === 1,
        })}`}
            onClick={async () => {
                const downloadableLink = String(url) === url ? url : await (url as any)()
                setState((state) => { return { ...state, downloadButtonStatus: 1 } })
                await downloadLink(downloadableLink)
            }}>
            {title}
        </button>
    )
}