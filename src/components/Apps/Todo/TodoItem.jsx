import React, { useState } from 'react'
import deleteImg from '../../../images/delete.png';

export default function TodoItem(props) {
	const [isChecked, setIsChecked] = useState(props.item.completed);
	const handleCheckboxChange = () => {
		setIsChecked((prevState) => {
			const item = { ...props.item, completed: !prevState }
			props.onUpdate(item)
			return !prevState;
		});
	};

	const deleteHandler = () => {
		props.onDelete(props.item.id);
	}

	return (
		<div
			className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
			<div
				className='my-1 py-2 px-3'
				style={{ ...containerStyle, backgroundColor: isChecked ? '#5bff6b' : '#5fb1ff' }}
			>
				<div style={{display:"flex"}}>
					<input
						className="form-check-input me-2"
						onChange={handleCheckboxChange}
						checked={isChecked}
						type="checkbox"
						value="" id="flexCheckDefault" />
						<p className='m-0'>{props.item.title}</p>
				</div>
				<img src={deleteImg} style={deleteImgStyle} alt='delete' onClick={deleteHandler} />
			</div>
		</div>
	)
}

const containerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderRadius: '10px',
};

const deleteImgStyle = {
	width: "24px",
}