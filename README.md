# Geocachr
> A full-stack social website for scavenger-hunting. Sign up, search for trails you like, save them to your profile, or create your own.

![](https://i.ibb.co/1zmbbjq/slideshow2.png)

In a group of four we created a social website for scavenger hunting that includes requests to and from our back end, which was built with Express.js, Node.js and MongoDB. This project took one week to build and was made during our _[General Assembly](https://generalassemb.ly/)_ Software Engineering Immersive course. 

You can visit the site _[here](https://geocachr.herokuapp.com/)_.

## Tools and Skills

- JavaScript
- React.js
- HTML5
- CSS3
- Express.js
- Node.js
- MongoDB
- jwt Authorization
- RESTful APIs
- [Mapbox](https://www.mapbox.com/)
- Mocha
- Chai
- Supertest
- Bulma CSS Framework
- Insomnia
- Yarn
- Heroku
- GitHub

My main responsibilities included:
- Coding the back end of the product using Express.js, Node.js and MongoDB.
- Testing of the back end and updating tests as needed using Mocha, Chai and Supertest.
- Creating virtual schemas for the profile page, and implementing their functionality on the React front end.

My biggest takeaway from this project is that I am definitely a fan of coding the back end with Express. It was so fun to have control over what is "behind the curtain" for a fully functioning website. There were challenges with the front end that I could easily solve in the back end, such as populating models and data when needed in the controllers in order to properly authorize users.

## Usage

When not logged in, users may see the trail index (list of scavenger hunt trails), the FAQ, About, and Contact pages routed on the nav bar. 

After registering and logging in, the user gains access to their profile and the ability to create a trail (routed on the nav bar), or save and complete a trail (options on the show page of an individual trail).

After logging in, the user is automatically sent the the trail index page. There is a search bar to search trails by postcode. 

You may then click on any of the trail cards and see the information you need to complete the trail: 
1. Is weather a factor? If it is, you can scroll down to the footer which utilizes [this weather API](https://openweathermap.org/) to provide the latest London weather. It updates itself every five minutes.
2. What is the general location of the trail? You can see this on the Mapbox map on the left of the page.
3. On the right of the page are the clues. They are hidden until the user clicks on them, so that they may follow the first clue without giving away the second and third.
4. At the bottom of the page is the "completion" section. If you have completed the trail, you may leave a comment on that trail.

## Functionality

The trail model was built to include clues for the scavenger hunt game, and longitude and latitude to display the location of the trail on a map (using Mapbox), and a post code for quick identification of the area for the user.

```
const trailSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  directions: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  clueOne: { type: String, required: true },
  clueTwo: { type: String },
  clueThree: { type: String },
  image: { type: String },
  weatherFactor: { type: Boolean, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ],
  likes: [ likeSchema ],
  completion: [ completionSchema ]
}, {
  timestamps: true
})
```

When creating a trail the user does not have to include the longitude and latitude. We made Mapbox a part of the Create a New Trail form to allow users to drop a pin on the map, and the longitude and latitidue of that pin is saved to state and then sent as a POST request with the rest of the new trail information to our Mongo Database.

I used authorization with jwt to check if a user created a trail they are viewing. If they did, only this user has access to edit or delete buttons on the trail.

When filling out a trail completion form, the user may upload a photo as part of their comment. These photos are resized to fit the space allowance given to the displayed comment.

I needed to make a similar button for users who left a comment on a trail. I wanted the page to display a "delete comment" button only if the user viewing the page had left a comment. And then only that user may delete their comment. This proved to be really tricky for me. The comments are mapped onto the page, so I took advantage of this. I ended up passing the mapped argument into the event handler that makes the button work, and placed that as a check before displaying the button. This way, a delete button would be mapped alongside a comment if the user viewing the page was the user who created the comment.

```
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
```

I wrote the back-end models and the virtual schemas that connected to those models: created trails, saved trails, and completed trails. This was the foundation for the user profile. I added "save" buttons onto the trails that made it possible to connect that trail to that user.

```
userSchema.virtual('createdTrails', {
  ref: 'Trail',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('likedTrails', {
  ref: 'Trail',
  localField: '_id',
  foreignField: 'likes.user'
})

userSchema.virtual('completedTrails', {
  ref: 'Trail',
  localField: '_id',
  foreignField: 'completion.user'
})

userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      delete json.email
      return json
    }
  })
```

<img src="https://i.ibb.co/0cxqYK8/Screenshot-2020-03-29-at-10-18-27.png" width="275" height="150">
<img src="https://i.imgur.com/M12YUNe.png" width="250" height="200">

## Needs Improvement

- The show page is not entirely mobile responsive. It was very difficult to work with Mapbox in terms of responsive viewing. On mobile, the clues display on top of the map at times. To fix this I would add a media query into the CSS to shift the clues below the map, rather than to its right, on certain view widths.

- I would add even more thorough testing. I have recently learned how to test a React front end and I would certainly implement these skills.

- I would like the user who created the trail to be able to delete completion comments on their trail, the same way you may delete another user's comments on Facebook if the comments are on your own post. I would need to do some work with the jwt authorization in order to create this functionality.

- Presently you cannot look at another user's profile. I would add controllers into the back end and include them in the router in order to make this possible.


## Hello!

I'm an avid enjoyer of JavaScript. I would be so happy to discuss this project, or any of your JavaScript projects with you.
I am a big gaming nerd so feel free to share your games with me!
If you'd like to see more of my work or get to know a bit more about me, please check out my portfolio:

_[My Portfolio](https://astara303.github.io/portfolio/)_

Thank you for reading!