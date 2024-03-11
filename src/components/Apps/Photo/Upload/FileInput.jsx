import React, { useEffect, useRef, useState } from 'react'

export default function FileInput({ setSelectedImages }) {

    return (
        <div>
            <input className='form-control my-2' type="file" accept="image/*" multiple
                onChange={(e) => setSelectedImages([...e.target.files])}
            />
        </div>
    )
}
