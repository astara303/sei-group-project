//need to make this a props component like trail card
//styling and look here. 
import React from 'react'
import { Link } from 'react-router-dom'

const CompletedTrailForm = ({ text, image, _id }) => (
  
  <div key={_id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/trails/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4>Comments from users</h4>
          <h4 className="card-header-title">{text}</h4>
        </div>
        <div className="card-image">
          <figure className="image">
            <img src={image} alt={name} />
          </figure>
        </div>
      </div>
    </Link>
  </div>

)






// class CheeseShow extends React.Component {
//   // our state field is just called cheese, singular, here. thats important to keep our mindset on that our show page should just be dealing with showing one thing!, this is also reflecited by us starting an empty object, unline an array on the index page.
//   state = { cheese: {} }

//   async componentDidMount() {
//     const cheeseId = this.props.match.params.id // to know which cheese we should be requesting data for on the show page, we pull the cheeses id from the url bar using react-routers special props. We get access to them because this component is wrapped in a <Route /> component(you can see that in app.js). How did the id get into the url bar in the first place? We put it there using react-router again, it was in the Link of the cheesecard the user has clicked to navigate here.
//     try {
//       const res = await axios.get(`https://cheesebored.herokuapp.com/cheeses/${cheeseId}`) // going through our familiar pattern of request data
//       this.setState({ cheese: res.data }) // setting the response in state, and rendering that response to the page
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   render() {
//     const { cheese } = this.state
//     return (
//       <section className="section">
//         <div className="container">
//           <h2 className="title">{cheese.name}</h2>
//           <hr />
//           <div className="columns">
//             <div className="column is-half">
//               <figure className="image">
//                 <img src={cheese.image} alt={cheese.name} />
//               </figure>
//             </div>
//             <div className="column is-half">
//               <h4 className="title is-4">Tasting Notes</h4>
//               <p>{cheese.tastingNotes}</p>
//               <hr />
//               <h4 className="title is-4">Origin</h4>
//               <hr />
//               <p>{cheese.origin}</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     )
//   }
// }

// export default CompletedTrailForm


