import React from 'react'

export default function ExpenseRender(props) {
  return (
    <div>
        {props.expenses.map((expense)=>{
            return <p key={expense.id}>{expense.title}</p>
        })}
    </div>
  )
}
