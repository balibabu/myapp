import React from 'react'

export default function LoadingUI({width=50}) {
    return (
        <svg
            width={width}
            height={width}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="lds-ring"
            style={{ background: 'none' }}
        >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#007bff"
                strokeWidth="10"
                r="40"
                strokeDasharray="188.49555921538757 64.83185307179586"
                transform="rotate(143.169 50 50)"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    calcMode="linear"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                    dur="1s"
                    begin="0s"
                    repeatCount="indefinite"
                ></animateTransform>
            </circle>
        </svg>
    )
}
