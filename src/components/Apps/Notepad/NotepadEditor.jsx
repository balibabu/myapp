import React from 'react'

export default function NotepadEditor() {
    return (
        <div className='d-flex justify-content-center'>
            {accordion}
            <div>Hello</div>
        </div>
    )
}


const accordion = (<div className="accordion-item">
    <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Create A Note
        </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div className="accordion-body">
            bali
        </div>
    </div>
</div>);