/* global api, describe, it, expect, beforeEach, afterEach */ 

const Trail = require('../../models/trail')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = [{
  username: 'testOne',
  email: 'testOne@email',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'testTwo',
  email: 'testTwo@email',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('PUT /trails/:id', () => {
  let token, incorrectToken, trail

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' }) 
        return Trail.create({
          name: 'The Clapping Robbers',
          directions: 'SW11 1DJ',
          longitude: -0.162389,
          latitude: 51.463496,
          clueOne: 'Located near the busiest train station in the UK.',
          clueTwo: 'Drinks, games and people. Comes alive at night.',
          clueThree: 'Beware of the four tea-leaves!',
          image: 'https://thenudge.com/wp-content/uploads/2019/08/Four_Thieves_2.jpg',
          weatherFactor: false,
          user: users[0]
        })
      })
      .then(createdTrail => {
        trail = createdTrail
        done()
      })
  })  

  afterEach(done => {
    User.deleteMany()
      .then(() => Trail.deleteMany())
      .then(() => done())
  }) 
  
  it('should return a 401 response without a token', done => {
    api.put(`/api/trails/${trail._id}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 response with a token', done => {
    api.put(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/trails/${trail._id}`) 
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) =>  {
        expect(res.body).to.contain.keys([
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
    api.put(`/api/trails/${trail._id}`) 
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
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
        expect(trail.user).to.be.a('string')
        done()
      })
  })   

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.put(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })


})
