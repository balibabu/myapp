import React, { useState } from 'react'

export default function TodoItem(props) {
	const [isChecked, setIsChecked] = useState(props.item.completed);
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		props.item.completed=isChecked;
		console.log(props.item);
	};
	return (
		<div
			className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
			<div
				className='my-1 py-2 px-3 bg-info justify-between'
				style={containerStyle}
			>
				<input
					className="form-check-input me-2"
					onChange={handleCheckboxChange}
					checked={isChecked}
					type="checkbox"
					value="" id="flexCheckDefault" />
				{props.item.title}
			</div>
		</div>
	)
}

const containerStyle = {
	borderRadius: "10px",
}