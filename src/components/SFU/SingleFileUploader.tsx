import * as React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";


  
  const SingleFileUploader = () => {
 
        const [file, setFile] = useState("");
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        const [certificate, setCertificate] = useState(null);
        
        const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if(file != "") {
                setFile("");
            }
        setError("");
        setLoading(true);

        const fileData = e.target.files[0];

        if (fileData) { 
            const formData = new FormData();
            formData.append("file", fileData);

            const reader = new FileReader();
            reader.onload = () => {
              setFile(reader.result as string);
              setLoading(false);
            };

            reader.readAsDataURL(fileData);
          
            const apiUrl = "https://localhost:7071/documents/certificate";
            const response = await fetch(apiUrl, {
                method: "POST",
                // headers: {},
                body: formData
            });
          
            if(response.ok) {
              const certificateData = await response.json();
              setCertificate(certificateData);
            } else {
              console.log("Error uploading file");
            }

        }
        else {
            setLoading(false)
            setError("File could not be loaded");
        };
    }

    return (
        <>
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
            {certificate && (
              <div>
              <h1>{certificate.title}</h1>
              <table className="table table-striped data-table">
                <thead></thead>
                <tbody>
                    {certificate.valuation.map((item) => (
                    <tr key={item.id}>
                      <td>{item.course}</td>
                      <td>{item.note}</td> 
                    </tr>
                    ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </>
      );
    };

export default SingleFileUploader;