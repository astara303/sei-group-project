import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'

const TrailCard = ({ name, image, directions, _id }) => (
  <div key={_id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/trails/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{name}</h4>
        </div>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={image} alt={name} />
          </figure>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">
            <span>
              <button className="button">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faBinoculars} />
                </span>
                <span className="has-text-weight-light">View</span>
              </button>
            </span>
          </p>
          <p className="card-footer-item has-text-centered">
            <span className="has-text-weight-light">
              {directions}
            </span>
          </p>
        </footer>
      </div>
    </Link>
  </div >
)

export default TrailCard