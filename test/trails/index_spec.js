/* global describe, beforeEach, afterEach, it, api, expect */
const Trail = require('../../models/trail')
const User = require('../../models/user')

describe('GET /trails', () => {

  beforeEach(done => {
    User.create({
      username: 'me',
      email: 'me@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Trail.create([
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
            user
          }, {
            name: 'General Assembly Trail',
            directions: 'E1 7PT',
            longitude: -0.072513,
            latitude: 51.515379,
            clueOne: 'Find the chef and keep him on your right as you turn the corner.',
            clueTwo: 'This is Major Tom to Ground Control- there\'s something to my left and it\'s floating in a most peculiar way.',
            clueThree: 'From below it looks very different today!',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQiATmRAoabIWz6dVqdIT2bsYv1CfaFxj6KdMJyvP8nPxN_jadl',
            weatherFactor: false,
            user
          }
        ])
      })
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Trail.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/trails')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/trails')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/trails')
      .end((err, res) => {
        res.body.forEach(trail => {
          expect(trail).to.be.an('object')
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', done => {
    api.get('/api/trails')
      .end((err, res) => {
        res.body.forEach(trail => {
          expect(trail).to.contains.keys([
            'name',
            'directions',
            'clueOne',
            'clueTwo',
            'clueThree',
            'longitude',
            'latitude',
            'image',
            'weatherFactor',
            'likes',
            'completion',
            'user'
          ])
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields and types of values', done => {
    api.get('/api/trails')
      .end((err, res) => {
        res.body.forEach(trail => {
          expect(trail.name).to.be.a('string')
          expect(trail.directions).to.be.a('string')
          expect(trail.clueOne).to.be.a('string')
          expect(trail.clueTwo).to.be.a('string')
          expect(trail.clueThree).to.be.a('string')
          expect(trail.longitude).to.be.a('number')
          expect(trail.latitude).to.be.a('number')
          expect(trail.image).to.be.a('string')
          expect(trail.weatherFactor).to.be.a('boolean')
          expect(trail.likes).to.be.an('array')
          expect(trail.completion).to.be.an('array')
          expect(trail.user).to.be.an('object')
        })
        done()
      })
  })

})