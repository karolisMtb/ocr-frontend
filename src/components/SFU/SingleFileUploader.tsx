import * as React from "react";
import { useState } from "react";



  
  const SingleFileUploader = () => {
 
        const [file, setFile] = useState("");
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        
        const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if(file != "") {
                setFile("");
            }
        setError("");
        setLoading(true);

        const fileData = e.target.files[0];

        if (fileData) { // null
            const formData = new FormData();
            formData.append("file", fileData);

            const reader = new FileReader();
            reader.onload = () => {
              setFile(reader.result as string);
              setLoading(false);
            };

            reader.readAsDataURL(fileData);
            
            const apiUrl = "https://localhost:7071/documents/image";
            const data = fetch(apiUrl, {
                method: "post",
                headers: {},
                body: formData
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error during file upload:", error);
                setError("Error during file upload. Please check your server.");
            });

            console.log(data);
        }
        else {
            setLoading(false)
            setError("File could not be loaded");
        };
    }

    return (
          <div className="App">
            <h1>Image Uploader</h1>
            <input
              type="file"
              className="inputForm"
              accept=".pdf, .jpg, .jpeg" 
              onChange={handleImageUpload}
            />
            {loading && <div className="loader">Loading...</div>}
            {error && <p className="error">{error}</p>}
            {file && (
              <div className="wrapper">
                {<img className="imagePreview" src={file} alt="Uploaded" />}
              </div>
            )}
          </div>
      );
    };

export default SingleFileUploader;