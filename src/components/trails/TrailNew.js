import React from 'react'
import axios from 'axios'
import auth from './../../lib/auth'
import Map from '../common/Map'

class TrailNew extends React.Component {

    state = {
      data: {
        name: '',
        directions: '',
        longitude: '',
        latitude: '',
        clueOne: '',
        clueTwo: '',
        clueThree: '',  
        image: null,
        clickedLocation: [],
        weatherFactor: false//"is weather a factor? true or false - this is a tick box
      }     
    }

    handleMap = (e) => {
      // console.log(e.lngLat)
      const data = { ...this.state.data, latitude: e.lngLat[1], longitude: e.lngLat[0], clickedLocation: e.lngLat }
      this.setState({ data })
    }

    handleChange = ({ target: { name, value, checked, type } }) => {
      const newValue = type === 'checkbox' ? checked : value //update state with calculated new value, if the type is check box then use checked value, if not then use it's own value
      const data = ({ ...this.state.data, [name]: newValue })
      this.setState({ data })
    }

    handleSubmit = async e => {
      e.preventDefault() 
      try {
        const res = await axios.post('/api/trails', this.state.data, {
          headers: { Authorization: `Bearer ${auth.getToken()}` }
        })
        console.log(res)
        this.props.history.push(`/trails/${res.data._id}`)
      } catch (err) {
        console.log(err)
      }
    }

    handleUpload = async ({ target: { files } }) => {
      const data = new FormData
      data.append('file', files[0])
      data.append('upload_preset', 'rksde5wr')
      const res = await axios.post(' https://api.cloudinary.com/v1_1/dbpx50jcj/image/upload', data)
      console.log(res)
      this.setState({ image: res.data.url }, () => {
        this.handleChange({ target: { name: 'image', value: res.data.url } })
      })
    }
  


    render() {
      console.log(this.state)
      const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
      const { image } = this.state
      return (
        <div className="box" id="trailNewBox">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter">
              <h2 className="title">Create a new GeoCache</h2>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input 
                    className="input"
                    name="name"
                  
                    placeholder="Name"
                    onChange={this.handleChange}
                    value={this.state.data.name}
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
                    onChange={this.handleChange}
                    value={this.state.data.directions}
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
                    onChange={this.handleChange}
                    value={this.state.data.clueOne}
                  />
                 <div>&nbsp;</div>         
                  <input 
                    className="input"
                    name="clueTwo"
                    required
                    placeholder="Clue Two"
                    onChange={this.handleChange}
                    value={this.state.data.clueTwo}
                  />
                  <div>&nbsp;</div> 
                  <input 
                    className="input"
                    name="clueThree"
                    required
                    placeholder="Clue Three"
                    onChange={this.handleChange}
                    value={this.state.data.clueThree}
                  />
                </div>
              </div> 
              {image ? 
                <div>
                  <img src={image} />
                </div>
                :
          <>
            <label className='label'>Please upload a photo</label>
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              className={this.props.inputClassName}
              type="file"
              onChange={this.handleUpload}
            />
          </>
              }
              <br />
              <div className="field">
                <br />
                <label className="checkbox label">Please check if weather is a factor</label>
                <input 
                  type="checkbox"
                  name="weatherFactor"
                  onChange={this.handleChange}
                  checked={this.state.data.weatherFactor}
                      
                />
                  
              </div> 
              <Map handleMap={this.handleMap} data={this.state.data}/>
              <button type="submit" className="button is-fullwidth is-link">Make Geocache</button>
            
            </form>
          </div>
        </div>
      )
      
    }



}

export default TrailNew