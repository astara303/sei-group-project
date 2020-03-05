import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Collapsible from 'react-collapsible'
import auth from '../../lib/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import IdMap from '../common/IdMap'
import Auth from '../../lib/auth'

class TrailShow extends React.Component {
  state = {

    trail: null,
    save: false,
    text: '',
    image: null,
    completeOwner: ''

  }

  async componentDidMount() {
    const trailId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/trails/${trailId}`)
      this.setState({ trail: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleDelete = async () => {
    const trailId = this.props.match.params.id
    try {
      await axios.delete(`/api/trails/${trailId}`, {
        headers: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
      this.props.history.push('/trails')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  isOwner = () => {
    return auth.getPayLoad().sub === this.state.trail.user._id
  }

  handleSave = async () => {
    const trailId = this.props.match.params.id
    try {
      await axios.get(`/api/trails/${trailId}/like`, {
        headers: { Authorization: `Bearer ${auth.getToken()}` }
      })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleLikeDelete = async () => {
    const trailId = this.props.match.params.id
    try {
      await axios.delete(`/api/trails/${trailId}/like`, {
        headers: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
      this.props.history.push('/trails')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit = async () => {
    //e.preventDefault()
    const trailId = this.props.match.params.id
    try {
      await axios.post(`/api/trails/${trailId}/complete`, this.state.data,
        {
          headers: { Authorization: `Bearer ${auth.getToken()}` }
        })
      this.setState({ image: null, text: '' })
    } catch (err) {
      this.props.history.push('/notfound')
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

  isCompleteOwner = completion => {
    return completion.user._id === Auth.getUser()
  }

  handleCompleteDelete = async (completetion) => {
    const trailId = this.props.match.params.id
    const completeId = completetion._id
    try {
      await axios.delete(`/api/trails/${trailId}/complete/${completeId}`,
        {
          headers: { Authorization: `Bearer ${auth.getToken()}` }
        })
      this.props.history.push('/profile')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    const { trail } = this.state
    if (!trail) return null
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const { image } = this.state
    return (
      <section className="section">
        <div className="SHOWPAGE">
          <h2 className='trailTitle is-size-1'>{trail.name}</h2>
          {trail.weatherFactor &&
          <div>
            <i className="fas fa-cloud-sun-rain"></i>
            &nbsp;You&apos;ll need good weather for this trail!
          </div>
          }
          {!trail.weatherFactor &&
          <div>
            <i className="fas fa-building"></i>
             &nbsp;You can do this trail in any weather!
          </div>   
          }
          <br />
          <br />
          <button onClick={this.handleSave} className="button is-danger">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <span>Save</span>
          </button>
          <button onClick={this.handleLikeDelete} className="button">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faHeartBroken} />
            </span>
            <span>Remove</span>
          </button>
          
          <hr />
          <div className="columns">
            <div className="column is-6">
           
              <div className="Mapbox">
                <br />

                <IdMap
                  data={{
                    latitude: trail.latitude,
                    longitude: trail.longitude
                  }}
                />
              </div>
              <br />
              
              <h1 className='commentTitle'>Comments on this Geocache!</h1>
              <br />
              <article className="media">
                {this.state.trail.completion.map(complete => {
                  return <div key={complete._id}>
                    <div className='box'>
                      <p>{complete.user.username}</p>
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <img src={complete.image} />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>{complete.text}</p>
                        </div>
                      </div>
                    </div>
                    {this.isCompleteOwner(complete) && <button onClick={() => this.handleCompleteDelete(complete)} className="button is-danger">Delete my comment</button>}
                  </div>
                })
                }
              </article>
              <br />
            </div>
           
            <div className="box">
              <h3 className="clueTitle is-size-3">Trail Clues</h3>
              <hr />
              <Collapsible trigger='Clue One +' className="dropDown">
                <p className="showClue">{trail.clueOne}</p>
              </Collapsible>
              <hr />
              <Collapsible trigger='Clue Two +' className="dropDown">
                <p className="showClue">{trail.clueTwo}</p>
              </Collapsible>
              <hr />
              <Collapsible trigger='Clue Three +' className="dropDown">
                <p className="showClue">{trail.clueThree}</p>
              </Collapsible>
              <hr />
              <h4>{trail.weatherFactor}</h4>
              <Collapsible trigger='Have You Completed This GeoCache?' className="dropDown">
                <div className="card-content">
                  <form onSubmit={this.handleSubmit}>
                    <h2 className="title">Geocache Logbook</h2>
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
              </Collapsible>
              <hr />

              {this.isOwner() &&
                <div>
                  <Link to={`/trails/${trail._id}/edit`} className="button is-warning">Edit Trail</Link>
                  <button onClick={this.handleDelete} className="button is-danger">Delete Trail</button>
                </div>
              }

            </div>
          </div>
        </div>
       
      </section>
    )
  }
}

export default TrailShow