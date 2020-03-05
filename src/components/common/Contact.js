import React from 'react'
import IdMap from './IdMap'
import Teamgeocache from '../../assets/Teamgeocache.png'


class Contact extends React.Component {

  render() {
    return (
      <>
     
        <div className="box" id="contactBox">
          <br/>
          <h1 className=" title is-3">CONTACT US</h1>
          <div className="columns is-multiline is-mobile">
            <div className="column is half">
              <h3 className="is-size-4">The Team</h3>
              <div>&nbsp;</div> 
              <img src={Teamgeocache} id="theGang" />      
              <div>&nbsp;</div> 
              <h3 className="is-size-4">Email</h3>
              <a href="mailto:contact@geocachr.com"><p className="FAQtxt"> contact@geocachr.com</p></a>
              <div>&nbsp;</div> 
              <h3 className="is-size-4">Phone Number</h3>
              <p className="FAQtxt">01443 567982</p>
              <hr/>
              <hr/>
            </div>
            <div className="column is-half">
             
              <h3 className="is-size-4">Address</h3>
              <ul className="FAQtxt">
                <li>45 Made Up Street</li>
                <li>London</li>
                <li>EC2N 6UP</li>
              </ul>
              <div className="mapSpace">
                <IdMap
                  data={{
                    latitude: 51.5074,
                    longitude: 0.1278
                  }}
                />
              </div>
            
            </div>
          </div>
        </div> 
      
      </>
    )
  }

}

export default Contact