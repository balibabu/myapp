import React from 'react'

export default function ExpenseRender(props) {
  return (
    <div>
      <h3 className='ps-2'>Expenses</h3>
      <div className='px-5'>
        {props.expenses.map((expense) => {
          return (
            <div key={expense.id}>
              <div className='d-flex justify-content-between'>
                <p className='mb-0 mt-2'>{expense.title}</p>
                <p className='mb-0 mt-2'>{expense.amount}</p>
              </div>
              <hr className='m-0' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
