import React from 'react'
import axios from 'axios'
import auth from '../../lib/auth'

class CompleteForm extends React.Component {
  state = {
    data: {
      text: '',
      image: null
    },
    
    errors: {},
    trail: null

  }
 


  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const trailId = this.props.match.params.id
    console.log(this.state.data, 'submit')
    try {
      await axios.post(`/api/trails/${trailId}/complete`, this.state.data,
        {
          headers: { Authorization: `Bearer ${auth.getToken()}` }
        })
      this.props.history.push(`/trails/${trailId}`) 
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
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
    console.log(this.props.match.params.id)
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const { image } = this.state
    return (

      <section className="section">
        <div className="columns">
          <form onSubmit={this.handleSubmit} className="column is-half">
            <h2 className="title">Geocache Completion Form</h2>
            <div className="field">
              <label className="label">How was your experience?</label>
              <div className="control">
                <input
                  className="input"
                  name="text"
                  required
                  placeholder="Text"
                  onChange={this.handleChange}               
                />
              </div>
            </div>
            <hr />
            {image ? 
              <div>
                <img src={image} />
              </div>
              :
          <>
            <h4>Please upload a photo</h4>
            <br />
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              className={this.props.inputClassName}
              type="file"
              onChange={this.handleUpload}
            />
          </>
            }
            <hr />
            <button type="submit" className="button is-fullwidth is-warning">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default CompleteForm



