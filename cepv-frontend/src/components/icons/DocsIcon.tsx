import React from 'react';

interface Props {
    className?: string;
}

const DocsIcon = (props: Props) => {
    return (
        <svg
            {...props}
            height="1.3em" width="1.3em"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M277-279h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Z"
                fill="currentcolor"
            />
        </svg>
    );
};

export default DocsIcon;
