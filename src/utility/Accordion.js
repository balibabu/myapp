import React from 'react'

export default function Accordion({ name, titles, childrens }) {
    let AccordionItems = <></>;
    for (let x = 0; x < titles.lenght; x++) {
        let Item = <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {titles[x]}
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent={"#"+name}>
                <div className="accordion-body">
                    {childrens[0]}
                </div>
            </div>
        </div>

        AccordionItems=<>{AccordionItems}{Item}</>;
    }
    return (
        <div className='accordion' id={name}>
            {AccordionItems}
        </div>
    )
}
