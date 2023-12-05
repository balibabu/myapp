import React from 'react'

export default function FloatButton({ onPress, modalTarget }) {
    return (
        <button
            onClick={onPress}
            style={floatingButtonStyle}
            type="button"
            className="btn btn-outline-success btn-lg"
            data-bs-toggle={modalTarget && "modal"} data-bs-target={`#${modalTarget}`}
        >+</button>
    )
}


const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '10px',
    fontWeight: "bolder",
    borderRadius: "10px",
}