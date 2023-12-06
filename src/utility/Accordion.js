import React from 'react'

export default function Accordion({ name, titles, childrens }) {
    let AccordionItems = <></>;
    for (let x = 0; x < titles.lenght; x++) {
        let Item = <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {titles[x]}
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent={"#"+name}>
                <div class="accordion-body">
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
