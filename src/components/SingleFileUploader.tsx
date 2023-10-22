import * as React from "react";
import { useState } from "react";


const SingleFileUploader = () => {

    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setLoading(true);
        
        const file = e.target.files[0];
        if (file) {
        if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setLoading(false);
            };
            reader.readAsDataURL(file);
        } else {
            setError("Only image files are accepted.");
            setLoading(false);
        }
        }
    };

    return (
        <div className="App">
        <h1>Image Uploader</h1>
        <input type="file" className="inputForm" accept="image/*" onChange={handleImageUpload} />
        {loading && <div className="loader">Loading...</div>}
        {error && <p className="error">{error}</p>}        
        {image && <div className="wrapper"><img className="imagePreview" src={image} alt="Uploaded" /></div>}
        
    </div>
    );
}

export default SingleFileUploader;