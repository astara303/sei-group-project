import React from 'react'
import axios from 'axios'
import auth from '../../lib/auth'
import Map from '../common/Map'

class TrailEdit extends React.Component{

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
      weatherFactor: false
    }     
  }

  handleMap = (e) => {
    // console.log(e.lngLat)
    const data = { ...this.state.data, latitude: e.lngLat[1], longitude: e.lngLat[0], clickedLocation: e.lngLat }
    this.setState({ data })
  }

  async componentDidMount() {
    const trailId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/trails/${trailId}`)
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { name, value, checked, type } }) => {
    console.log(this.state.data) //value of type is if someone checked the check box
    const newValue = type === 'checkbox' ? checked : value //update state with calculated new value, if the type is check box then use checked value, if not then use it's own value
    const data = ({ ...this.state.data, [name]: newValue })
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const trailId = this.props.match.params.id
    try {
      const { data } = await axios.put(`/api/trails/${trailId}`, this.state.data, {
        headers: { Authorization: `Bearer ${auth.getToken()}` }
      })
      this.props.history.push(`/trails/${data._id}`)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', 'rksde5wr')
    const res = await axios.post(' https://api.cloudinary.com/v1_1/dbpx50jcj/image/upload', data)
    this.setState({ image: res.data.url }, () => {
      this.handleChange({ target: { name: 'image', value: res.data.url } })
    })
  }


  render() {
    console.log(this.state)
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const { image } = this.state
    return (
      <div className="columns">
        <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter">
          <h2 className="title">Create a new GeoCache</h2>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input 
                className="input"
                name="name"
                required
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
              <input 
                className="input"
                name="clueTwo"
                required
                placeholder="Clue Two"
                onChange={this.handleChange}
                value={this.state.data.clueTwo}
              />
                
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
          <h4>Please upload a photo</h4>
          <label className={labelClass}>{this.props.labelText}</label>
          <input
            className={this.props.inputClassName}
            type="file"
            onChange={this.handleUpload}
          />
        </>
          }
          <div className="field">
            <label className="checkbox label">Please check if weather is a factor</label>
            <input 
              type="checkbox"
              name="weatherFactor"
              onChange={this.handleChange}
              checked={this.state.data.weatherFactor}
                    
            />
                
          </div> 
          <Map handleMap={this.handleMap} data={this.state.data}/>
          <button type="submit" className="button is-fullwidth is-warning">Make Geocache</button>
          
        </form>
      </div>
    )
    
  }


}

export default TrailEdit 