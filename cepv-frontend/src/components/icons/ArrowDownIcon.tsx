import React from 'react';

interface Props {
    className?: string;
}

const ArrowDownIcon = (props: Props) => {
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
                d="M7 10l5 5 5-5z"
                fill="currentcolor"
            />
        </svg>
    );
};

export default ArrowDownIcon;
