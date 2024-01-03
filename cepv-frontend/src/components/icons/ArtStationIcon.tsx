import React from 'react';

interface Props {
    className?: string;
}

const ArtStationIcon = (props: Props) => {
    return (
        <svg
            {...props}
            height="1.3em" width="1.3em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
                strokeLinejoin="round"
                d="M15.153,16.996l2.288,3.963c0,0 -4.952,0 -8.808,0c-2.758,0 -5.299,-1.499 -6.633,-3.913c0,-0.001 0,-0.001 0,-0.001l0.029,-0.049l13.124,0Zm-4.798,-13.955c0,0 0,0 0,0c2.781,0 5.357,1.463 6.782,3.852c1.172,1.965 2.593,4.349 3.764,6.312c1.418,2.378 1.467,5.33 0.128,7.753c0,0.001 0,0.001 0,0.001l-0.33,0l-10.344,-17.918Zm3.168,11.133l-9.811,0l4.985,-8.359l4.826,8.359Z"
                fill="currentcolor"
            />
        </svg>
    );
};

export default ArtStationIcon;
