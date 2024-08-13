import React, { useState } from "react";
import { FaTrashAlt, FaUpload, FaImage } from 'react-icons/fa'

// Define a functional component named UploadAndDisplayImage
const ImageUpload = (id) => {
  // Define a state variable to store the selected image
  const [image, setImage] = useState();

  return (
    <div className="image-container">
      <label className="image-label" htmlFor={"image" + id}>
        {image ? 
          <div>
            <img src={URL.createObjectURL(image)} />
            <button onClick={() => setImage(null)}><FaTrashAlt /></button>
          </div>
        :
          <div className="upload">
            <FaImage /><FaUpload />
          </div>
        } 
      </label>

      <input
        type="file"
        id={"image" + id}
        name={"image" + id}
        // Event handler to capture file selection and update the state
        onChange={(e) => {
          setImage(e.target.files[0]); // Update the state with the selected file
        }}
      />
    </div>
  );
};

// Export the UploadAndDisplayImage component as default
export default ImageUpload;