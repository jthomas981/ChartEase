import React, { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa'

// Define a functional component named UploadAndDisplayImage
const ImageUpload = () => {
  // Define a state variable to store the selected image
  const [image, setImage] = useState();

  // Return the JSX for rendering
  return (
    <div className="imageContainer">
      <label className="image-label" htmlFor="image">
        {image ? <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(image)}
          /> : 
        <img src='../../public/logo192.png'/>}
      </label>

      <button onClick={() => setImage(null)}><FaTrashAlt /></button>

      <input
        type="file"
        id="image"
        name="image"
        // Event handler to capture file selection and update the state
        onChange={(e) => {
          console.log(e.target.files[0]); // Log the selected file
          setImage(e.target.files[0]); // Update the state with the selected file
        }}
      />
    </div>
  );
};

// Export the UploadAndDisplayImage component as default
export default ImageUpload;