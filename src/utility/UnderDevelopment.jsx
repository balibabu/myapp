import { useState, useRef, useContext } from "react";
import AuthContext from "../global/AuthContext";
import { UploadFile } from "../http/Storage";

export default function UnderDevelopment() {
    const { token, loggedIn } = useContext(AuthContext);
	const [file, setFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleImageInputChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
	};

	const onUploadClick = async() => {
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			const status=await UploadFile(token, formData);
			if(status){
				alert('file uploaded successfully');
			}
		}
		fileInputRef.current=null;
	};

	return (
		<>
			<h1 className="text-primary">Under Development</h1>
			<input
				className="form-control"
				type="file"
				onChange={handleImageInputChange}
				ref={fileInputRef}
			/>
			<button onClick={onUploadClick}>Upload</button>
		</>
	);
}
