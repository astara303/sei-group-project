import React from 'react'
import axios from 'axios'
import auth from './../../lib/auth'


class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    errors: ''
    
  }

  handleChange = ({ target: { name, value } } ) => {
    const data = ({ ...this.state.data, [name]: value })
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data)
      auth.setToken(res.data.token)
      
    } catch (err) {
      this.setState({ error: 'Incorrect Credentials' })
    }
    this.props.history.push('/trails')
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter">
              <h2 className="title">Login</h2>
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left"> 
                  <input 
                    className="input"
                    name="email"
                    placeholder="email"
                    required
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left"> 
                  <input 
                    className="input"
                    name="password"
                    placeholder="password"
                    type="password"
                    required
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <button type="submit" className="button is-warning-is-fullwidth">Login
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }




}


export default Login