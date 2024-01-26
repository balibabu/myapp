import React, { useState } from 'react'
import { EDetailModal } from './EDetailModal';

export default function ExpenseRender(props) {
    const [selected, setSelected] = useState({ date: '', note: '' });
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div>
            <div className='ps-2 fs-3' onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer" }}>{collapsed?'+':'-'} Expenses</div>
            {!collapsed && <div className='px-5' style={{ maxHeight: "75vh", overflowY: "auto" }}>
                {props.expenses.map((expense) => <ExpenseItem key={expense.id} setSelected={setSelected} expense={expense} />)}
            </div>}
            <EDetailModal selected={selected} />
        </div>
    )
}

function ExpenseItem({ setSelected, expense }) {
    return (
        <div>
            <div className='d-flex justify-content-between position-relative'>
                <div className='mt-2 ' style={{ cursor: "pointer" }}
                    data-bs-toggle="modal" data-bs-target="#expenseDetail"
                    onClick={() => setSelected(expense)}
                >{expense.title}</div>
                <div className='mt-2'>
                    <div className='position-absolute bottom-0' style={{ fontSize: '11px', color: '#666',right:'3rem'  }}>{expense.date.substr(5)}</div>
                    <div>{expense.amount}</div>
                </div>
            </div>
            <hr className='m-0' />
        </div>
    );
}