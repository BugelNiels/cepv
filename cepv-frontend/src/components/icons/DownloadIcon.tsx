import React from 'react';

interface Props {
    className?: string;
}

const DownloadIcon = (props: Props) => {
    return (
        <svg
            {...props}
            height="1.5em" width="1.5em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 0h24v24H0z"
                fill="none"
            />
            <path
                d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                fill="currentcolor"
            />
        </svg>
    );
};

export default DownloadIcon;
