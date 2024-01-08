import React, { useState } from 'react'

export default function ExpenseRender(props) {
  const [selected, setSelected] = useState({});
  return (
    <div>
      <h3 className='ps-2'>Expenses</h3>
      <div className='px-5' style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {props.expenses.map((expense) => {
          return (
            <div key={expense.id}>
              <div className='d-flex justify-content-between'>
                <p className='mb-0 mt-2 ' style={{ cursor: "pointer" }}
                  data-bs-toggle="modal" data-bs-target="#expenseDetail"
                  onClick={() => setSelected(expense)}
                >{expense.title}</p>
                <p className='mb-0 mt-2'>{expense.amount}</p>
              </div>
              <hr className='m-0' />
            </div>
          )
        })}
      </div>
      <Modal selected={selected} />
    </div>
  )
}




function Modal({ selected }) {
  return (
    <div className="modal fade text-secondary" id="expenseDetail" tabIndex="-1" aria-labelledby="expenseDetail" aria-hidden="true">
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header py-2">
            <div className="modal-title fs-5" id="staticBackdropLabel">Expense Detail</div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body py-1">
            <div>Title: {selected.title}</div>
            <div>Price: {selected.amount}</div>
            <div>Note: {selected.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
