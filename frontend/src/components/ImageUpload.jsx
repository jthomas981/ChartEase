import React, { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa'

// Define a functional component named UploadAndDisplayImage
const ImageUpload = (id) => {
  // Define a state variable to store the selected image
  const [image, setImage] = useState();

  // Return the JSX for rendering
  return (
    <div className="image-container">
      <label className="image-label" htmlFor={"image" + id}>
        {image ? <img
            src={URL.createObjectURL(image)}
          /> : 
        <img src='../../public/logo192.png'/>}
      </label>

      <button onClick={() => setImage(null)}><FaTrashAlt /></button>

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