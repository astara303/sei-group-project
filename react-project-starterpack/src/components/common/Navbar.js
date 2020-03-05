import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import auth from '../../lib/auth'
import GeoSvg from './../../assets/geo_planet.svg'


class Navbar extends React.Component {

  state = { navbarOpen: false }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }


  handleLogout = () => {
    auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }


  render() {
    
    const { navbarOpen } = this.state
    return (
      <nav className="navbar has-background-link">
        <div className="container">
          <div className="navbar-brand">
            <img src={GeoSvg} id="logo" />
            <Link className="navbar-item" to="/">Home </Link>
            <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar} >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/trails">See All Trails</Link>
              <Link className="navbar-item" to="/FAQ">FAQ</Link>
              <Link className="navbar-item" to="/about">About</Link>
              <Link className="navbar-item" to="/contact">Contact</Link>
              {!auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {!auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {auth.isAuthenticated() && <Link className="navbar-item" to="/trails/new">Add a Trail</Link>}
              {auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}
              {auth.isAuthenticated() && <Link className="navbar-item" to="/profile">Profile</Link>}
            </div>
          </div>
        </div>
      </nav>
    )
  }

}

export default withRouter(Navbar)