import React from 'react'

function SpaceForm({ formdata, handleChange, handleSubmit, buttonText = 'Submit' }) {

  const handleTags = event => {
    const { checked, value, name } = event.target
    const tags = checked ? // * using a ternary to set the tags value
      [...formdata.tags, value]  // * if it was checked, add it
      :
      formdata.tags.filter(tag => tag !== value) // * if it was unchecked remove it
    handleChange({ target: { name, value: tags } }) // * setting them in to the formstate
  }


  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={formdata.name}
          />
        </div>

      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={formdata.description}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Image URL</label>
        <div className="control">
          <input
            placeholder="Image URL"
            name="image"
            onChange={handleChange}
            value={formdata.image}
          />
        </div>

      </div>
      <div className="field">
        <label className="label">Postcode</label>
        <div className="control">
          <input
            placeholder="Postcode"
            name="location"
            onChange={handleChange}
            value={formdata.location}
          />
        </div>
      </div>
      <div className="tags-wrapper">
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Peace & Quiet"
            onChange={handleTags}
            control='input' />
          <label>Peace & Quiet</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Lively"
            onChange={handleTags}
            control='input' />
          <label>Lively</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Art & Design"
            onChange={handleTags}
            control='input' />
          <label>Art & Design</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Sports & Leisure"
            onChange={handleTags}
            control='input' />
          <label>Sports & Leisure</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Mother Nature"
            onChange={handleTags}
            control='input' />
          <label>Mother Nature</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Architecture"
            onChange={handleTags}
            control='input' />
          <label>Architecture</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Food & Drink"
            onChange={handleTags}
            control='input' />
          <label>Food & Drink</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" name="tags"
            value="Riverside Spot"
            onChange={handleTags}
            control='input' />
          <label>Riverside Spot</label>
        </div>

      </div>

      <div className="field">
        <button type="submit" className="ui button">{buttonText}</button>
      </div>
    </form>
  )
}

export default SpaceForm
