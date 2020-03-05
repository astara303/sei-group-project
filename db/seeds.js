const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Trail = require('../models/trail')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'Astara',
          email: 'astara@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
        {
          username: 'Ellen',
          email: 'ellen@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
        {
          username: 'Rory',
          email: 'rory@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
        {
          username: 'Latch',
          email: 'latch@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(createdUsers => {
      return Trail.create([
        {
          name: 'Snakes in Hydeing',
          directions: 'W2 2UH',
          longitude: -0.166276,
          latitude: 51.507998,
          clueOne: 'You\'re a trail blazer- visit the royal geographical society and follow the road north.', 
          clueTwo: 'A serpent Hydes in the grass to your left. Have a visit!', 
          clueThree: 'Find its sister by the water and ask her for a gin and tonic!',
          image: 'https://live.staticflickr.com/795/41372147681_474b2acda4_b.jpg',
          weatherFactor: true,
          user: createdUsers[0]
        },
        {
          name: 'General Assembly Trail',
          directions: 'E1 7PT',
          longitude: -0.072513,
          latitude: 51.515379,
          clueOne: 'Find the chef and keep him on your right as you turn the corner.', 
          clueTwo: 'This is Major Tom to Ground Control- there\'s something to my left and it\'s floating in a most peculiar way.', 
          clueThree: 'From below it looks very different today!',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQiATmRAoabIWz6dVqdIT2bsYv1CfaFxj6KdMJyvP8nPxN_jadl',
          weatherFactor: false,
          user: createdUsers[0]
        },
        {
          name: 'A Stable For Your Steed',
          directions: 'RM6 4HY',
          longitude: 0.111934,
          latitude: 51.566546,
          clueOne: 'Here your metal steed quenches its thirst.', 
          clueTwo: 'As you exit, look right.', 
          clueThree: 'Tall I stand amidst the green. Look near my feet- it will be seen.',
          image: 'https://media.timeout.com/images/105223912/1372/772/image.jpg',
          weatherFactor: true,
          user: createdUsers[3]
        },
        {
          name: 'Brick-n-mixx',
          directions: 'E13 8PT',
          longitude: 0.028978,
          latitude: 51.525969,
          clueOne: 'Twit twit twoo, we are staring at you.',
          clueTwo: 'London\'s most famous murderer committed his second grizzly offence here.',
          clueThree: 'I am hidden in outer space',
          image: 'https://media.timeout.com/images/103621681/630/472/image.jpg',
          weatherFactor: true,
          user: createdUsers[1] 
        },
        {
          name: 'Nectar Royalty',
          directions: 'E9 7HJ',
          longitude: -0.044288,
          latitude: 51.537367,
          clueOne: 'Opposite and next to royalty.',
          clueTwo: 'I am a cache box near a cash box.',
          clueThree: 'Large plant with a trunk.',
          image: 'https://thingstodoeverywhere.com/east-london/victoria-park/victoria-park-summers-day-thumb.jpg',
          weatherFactor: true,
          user: createdUsers[1]
        },
        {
          name: 'One Person\'s Junk',
          directions: 'E17 9HQ',
          longitude: -0.008138,
          latitude: 51.583888,
          clueOne: 'These plates are out of your league; you could say, premier.',
          clueTwo: 'Just bare off of Shernal and you\'re nearly there.',
          clueThree: 'Through the day I blend, and at dark beware of the glare.',
          image: 'http://www.godsownjunkyard.co.uk/gods%20own%202.jpg',
          weatherFactor: true,
          user: createdUsers[3]
        },
        {
          name: 'Ensnared',
          directions: 'E11 1PE',
          longitude: 0.020725,
          latitude: 51.583145,
          clueOne: ' A man with a knife, similar but not quite.',
          clueTwo: 'Feast here, you might.',
          clueThree: 'Not a trap but a snare with brook that\'s not near.',
          image: 'https://s3.geograph.org.uk/geophotos/04/68/12/4681299_c93298e5_1024x1024.jpg',
          weatherFactor: true,
          user: createdUsers[3]
        },
        {
          name: 'Ditch Divers',
          directions: 'E1 6GY',
          longitude: -0.076338,
          latitude: 51.523454,
          clueOne: 'It\'s a park, but cubic in nature.',
          clueTwo: 'Feast, Fun & Fashion.',
          clueThree: 'The park is in a ditch.',
          image: 'https://www.boxpark.co.uk/assets/Managed/RetailerGalleries/2579-shoreditch-single-retail-unit-available-300-square-foot/Boxpark-Shoreditch-31__ScaleWidthWzE1MDBd.jpg',
          weatherFactor: true,
          user: createdUsers[2]
        },
        {
          name: 'The Clapping Robbers',
          directions: 'SW11 1DJ',
          longitude: -0.162389,
          latitude: 51.463496,
          clueOne: 'Located near the busiest train station in the UK.',
          clueTwo: 'Drinks, games and people. Comes alive at night.',
          clueThree: 'Beware of the four tea-leaves!',
          image: 'https://thenudge.com/wp-content/uploads/2019/08/Four_Thieves_2.jpg',
          weatherFactor: false,
          user: createdUsers[2]
        }
      ])
    })
    .then(createdTrails => console.log(`${createdTrails.length} trails created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})