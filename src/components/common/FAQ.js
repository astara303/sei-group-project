import React from 'react'
import Collapsible from 'react-collapsible'


class FAQ extends React.Component {

  render() {
    return (
      <>
      <section className="FAQPage">
        <div className="box" id="aboutBox">
          <br/>
          <h2 className="title is-3">FAQ</h2>
          <hr/>
          <Collapsible trigger = 'The Game  +' className="dropDown">
            <p className="FAQtxt">Geocaching is a real-world treasure hunting game. Participants navigate to a specific set of GPS coordinates and then attempt to find the geocache <q>container</q> hidden at that location.</p>
          </Collapsible>
          <hr/>
          <Collapsible trigger = 'How is the game played?  +' className="dropDown">
            <ul className="FAQtxt">
              <li>At its simplest level, geocaching requires these 6 steps:</li>
              <br/>
              <li>1. Register on on our website.</li>
              <li>2. Visit the <q>See All Trails</q> page.</li>
              <li>3. Choose any geocache from the list and click on its name.</li>
              <li>4. Look at the map and the clues to assist you in finding the hidden geocache.</li>
              <li>5. Log your find in the geocache logbook and return the geocache to its original location.</li>
              <li>6. Share your geocaching stories and photos online.</li>
            </ul>
          </Collapsible>
          <hr/>
          <Collapsible trigger = 'What are the rules of geocaching?  +'className="dropDown">
            <ul className="FAQtxt"> 
              <li>1.If you take something from the geocache, leave something of equal or greater value.</li>
              <li>2.Write about your find in the geocache logbook.</li>
            </ul>
          </Collapsible>
          <hr/>
          <Collapsible trigger = 'What do I need to go geocaching?  +'className="dropDown">
            <p className="FAQtxt">Some warm clothes, a camera to take a picture and a sense of adventure.</p>
          </Collapsible>
          <hr/>
          <Collapsible trigger = 'Where are geocaches located?  +'className="dropDown">
            <p className="FAQtxt">Geocaches can be found all over the world. It is common for geocachers to hide caches in locations that are important to them, reflecting a special interest or skill of the cache owner. These locations can be quite diverse. They may be at your local park, at the end of a long hike, underwater or on the side of a city street.</p>
          </Collapsible>
        </div>
      </section>
      </>
    )
  }

}

export default FAQ