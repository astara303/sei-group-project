/* global api, describe, it, expect, beforeEach, afterEach */
const Trail = require('../../models/trail')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testTrail = {
  name: 'One Person\'s Junk',
  directions: 'E17 9HQ',
  longitude: -0.008138,
  latitude: 51.583888,
  clueOne: 'These plates are out of your league; you could say, premier.',
  clueTwo: 'Just bare off of Shernal and you\'re nearly there.',
  clueThree: 'Through the day I blend, and at dark beware of the glare.',
  image: 'http://www.godsownjunkyard.co.uk/gods%20own%202.jpg',
  weatherFactor: true
}

const testUserData = {
  username: 'testCreate',
  email: 'testCreate@email',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /trails', () => {

  let token

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Trail.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.post('/api/trails')
      .send(testTrail)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api.post('/api/trails')
      .set('Authorization', `Bearer ${token}`)
      .send(testTrail)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/trails')
      .set('Authorization', `Bearer ${token}`)
      .send(testTrail)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
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
        done()
      })
  })

  it('should return the correct data types', done => {
    api.post('/api/trails')
      .set('Authorization', `Bearer ${token}`)
      .send(testTrail)
      .end((err, res) => {
        const trail = res.body
        expect(trail._id).to.be.a('string')
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
        done()
      })
  })

})