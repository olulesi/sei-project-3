import React from 'react'
import axios from 'axios'



console.log(process.env.REACT_APP_CLOUDINARY_URL)

function ImageUploadField({ onChange, labelText, name, value }) {

  const handleUpload = async event => {

    const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    console.log(data)
    const res = await axios.post(uploadUrl, data)
    onChange({ target: { name, value: res.data.url } })
  }


  return (
    
    <div className="image-upload-field">
      {value ?
        <div className="image-field">
          <img className="image-upload" src={value} alt="selected" style={{ width: '150px', height: '150px' }} />
        </div>
        :
        <>
          <label>{labelText || 'Upload Image'} </label>
          <input
            type="file"
            onChange={handleUpload}
            name={name}
          />
        </>
      }
      {value ?
        <>
          <label>{labelText || 'Upload Image'} </label>
          <input
            type="file"
            onChange={handleUpload}
            name={name}
          />
        </>
        :
        ''
      }
    </div>
    
  //Add button
  //When user uploaded show reupload image button
  //Show in a terniary
  )
}

export default ImageUploadField