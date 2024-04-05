import { useState } from "react";
import "./App.css";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64String, setBase64String] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setBase64String(reader.result.split(",")[1]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64String);
    alert("Base64 string copied to clipboard!");
  };

  const copyByteArray = () => {
    navigator.clipboard.writeText(JSON.stringify(base64String.split('').map(c => c.charCodeAt(0))) );

    alert("Base64 string copied to clipboard!");
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="image-uploader">
        <h1>Image to Base64 Converter</h1>
        <div className="upload-container">
          <label htmlFor="fileInput" className="upload-label">
            Select Image
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-input"
          />
        </div>
        {selectedImage && (
          <div className="preview-container">
            <img src={selectedImage} alt="Selected" className="preview-image" />
            <button onClick={copyToClipboard} className="copy-button">
              Copy Base64
            </button>
          </div>
        )}
        {base64String && (
          <div className="output-container">
            <textarea
              rows="10"
              cols="50"
              readOnly
              value={base64String}
              className="output-textarea"
            />
          </div>
        )}
        {selectedImage && (
          <div className="preview-container">
            <button onClick={copyByteArray} className="copy-button">
              Copy Byte Array
            </button>
          </div>
        )}
        {base64String && (
          <div className="output-container">
            <textarea
              rows="10"
              cols="50"
              readOnly
              value={JSON.stringify(
                base64String.split("").map((c) => c.charCodeAt(0))
              )}
              className="output-textarea"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
