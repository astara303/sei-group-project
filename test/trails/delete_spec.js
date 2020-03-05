/* global api, describe, it, expect, beforeEach, afterEach */
const Trail = require('../../models/trail')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = [{
  username: 'testDelete',
  email: 'testDelete@email',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'testAgain',
  email: 'testAgain@email',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('DELETE /trails/:id', () => {
  let token = null
  let incorrectToken = null
  let trail = null

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Trail.create({
          name: 'Nectar Royalty',
          directions: 'E9 7HJ',
          longitude: -0.044288,
          latitude: 51.537367,
          clueOne: 'Opposite and next to royalty.',
          clueTwo: 'I am a cache box near a cash box.',
          clueThree: 'Large plant with a trunk.',
          image: 'https://thingstodoeverywhere.com/east-london/victoria-park/victoria-park-summers-day-thumb.jpg',
          weatherFactor: true,
          user: users[0] 
        })
      })
      .then(createdtrail => {
        trail = createdtrail
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Trail.deleteMany())
      .then(() => done())
  })

  //telling me to ensure done() is called but it is?
  it('should return a 401 response without a token', done => {
    api.delete(`/api/trails/${trail._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return no data', done => {
    api.delete(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })
  
  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
})