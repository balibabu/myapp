import React, { useState } from 'react'
import { onCreate } from './ExpenseCRUD';

const dummyDetails = { title: '', amount: 0,note:'' };
export default function AddExpenseUI(props) {
    const [formDetails, setFormDetails] = useState(dummyDetails);
    const [isNote, setIsNote] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setIsNote((prevNote) => {
            if(prevNote){
                setFormDetails((prevDetails)=>({ ...prevDetails, note: '' }));
            }
            return !prevNote
        });

    };

    const handleAddExpense = () => {
        console.log(formDetails);
        onCreate(formDetails,props.token,props.setExpenses);
        setFormDetails(dummyDetails);
        setIsNote(false);
    };

    return (
        <div className='fixed-bottom'>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="accordion" id="addExpenseAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExpenseEditor" aria-expanded="true" aria-controls="collapseExpenseEditor">
                                    Add an expense
                                </button>
                            </h2>
                            <div id="collapseExpenseEditor" className="accordion-collapse collapse" data-bs-parent="#addExpenseAccordion">
                                <div className="accordion-body">

                                    <div className="input-group mb-3">
                                        <input style={{ flex: '2' }} type="text" className="form-control" placeholder="item name" aria-label="Recipient's username" aria-describedby="button-addon2"
                                            name="title"
                                            value={formDetails.title}
                                            onChange={handleInputChange}
                                        />
                                        <input type="number" className="form-control" placeholder='amount'
                                            name="amount"
                                            value={formDetails.amount}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-text">
                                            <input className="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input" onChange={handleCheckboxChange} checked={isNote}/>
                                        </div>
                                        <input disabled={!isNote} type="text" className="form-control" aria-label="Text input with checkbox" placeholder='small note'
                                            name="note"
                                            value={formDetails.note}
                                            onChange={handleInputChange}
                                        />
                                        <button className="btn btn-outline-success px-4" type="button" id="button-addon2" onClick={handleAddExpense}>Add</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}