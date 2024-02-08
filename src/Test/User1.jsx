import React, { useContext } from 'react'
import GlobalContext1 from './GlobalContext1'
import GlobalContext2 from './GlobalContext2';

export default function User1() {
    const { value1 } = useContext(GlobalContext1);
    const { value2 } = useContext(GlobalContext2);
    return (
        <div>
            <div>value 1 {value1}</div>
            <div>value 2 {value2}</div>
        </div>
    )
}
