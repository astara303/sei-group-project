import React from 'react'
import Collapsible from 'react-collapsible'
import LogoImage from '../../assets/geo_planet_with_text.svg'


class About extends React.Component {

  render() {
    return (
      <>
      <section className="FAQPage">
        <span className='styleLogo'><img src={LogoImage} id="logo2" /></span>
        <div className="box" id="aboutBox">
          <h1 className=" title is-3">ABOUT US</h1>
          <hr/>
          <div className='content'>
            <Collapsible trigger = 'Our Mission  +' className="dropDown">
              <p className="FAQtxt">Our mission is to help <span className="emph">connect</span> people by getting them outdoors. Not only will you explore our city, you will start to look at it differently. </p>
            </Collapsible>
            <hr/>
            <Collapsible trigger = 'Our Story  +' className="dropDown">
              <p className="FAQtxt">Geo-cache formed when four friends wanted to take part in local treasure hunts and found that we were limited with options to do so. The options were either too easy, didn&apos;t have any challenges and there were just too few to complete.</p>
            </Collapsible>
            <hr/>
            <Collapsible trigger = 'Time to Grow  +'className="dropDown">
              <p>We started with our first treasure hunt in 2019 and have slowly built up a collection of interesting and challenging hunts, each with their own riddles necessary to solve to get to the treasure. We are continuously adding more hunts to our page and hope to eventually host bigger and more exciting challenges and events later on. After attracting much attention from the press and by word of mouth, we received funding from billionaire web tycoon Jack May and acquired Geocaching.com, which helped expand the company to who we are today.</p>
            </Collapsible>
            <hr/>
            <Collapsible trigger = 'What We&apos;re About +'className="dropDown">
              <p className="FAQtxt">We cater to anyone who is looking for challenges to solve and looking for a new outdoor experience. We have our own in-house built challenges and also offer our users the ability to create their own that they can share with other members of our treasure hunting community. You can complete these own your own, with friends and family, or even connect with other users and solve the challenges together.</p>
            </Collapsible>
          </div>
        </div>
      </section>
      </>
    )
  }

}

export default About