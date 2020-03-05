import React from 'react'




const TrailForm = ({ data, handleChange, handleSubmit }) => {

  
  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter">
        <h2 className="title">Create a new GeoCache</h2>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              className="input"
              name="name"
              required
              placeholder="Name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
        </div> 
        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input 
              className="input"
              name="directions"
              required
              placeholder="Postcode"
              onChange={handleChange}
              value={data.directions}
            />
          </div>
        </div> 
        <div className="field">
          <label className="label">Clues</label>
          <div className="control">
            <input 
              className="input"
              name="clueOne"
              required
              placeholder="Clue One"
              onChange={handleChange}
              value={data.clueOne}
            />
           
            <input 
              className="input"
              name="clueTwo"
              placeholder="Clue Two"
              onChange={handleChange}
              value={data.clueTwo}
            />
            
            <input 
              className="input"
              name="clueThree"
              placeholder="Clue Three"
              onChange={handleChange}
              value={data.clueThree}
            />
          </div>
        </div> 
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input 
              className="input"
              name="image"
              required
              placeholder="Image"
              onChange={handleChange}
              value={data.image}
            />
          </div>
        </div> 
        <div className="field">
          <label className="checkbox label">Please check if weather is a factor</label>
          <input 
            type="checkbox"
            name="weatherFactor"
            onChange={handleChange}
            checked={data.weatherFactor}
                
          />
            
        </div> 
        <button type="submit" className="button is-fullwidth is-info">Make Geocache</button>
      </form>

    </div>
  )
  

}

export default TrailForm