/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = 'test'

// Dev dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const Weather = require('../models/weather')
const server = require('../../server')

const should = chai.should()

chai.use(chaiHttp)
describe('Clear weather docs', () => {
  beforeEach((done) => {
    Weather.deleteMany({}, (err) => {
      if (err) return done(err)
      done()
    })
  })

  // Test the GET/ rout
  describe('/GET Test', () => {
    it('it should send a string message', (done) => {
      chai
        .request(server)
        .get('/test')
        .end((err, res) => {
          if (err) return done(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
        })
      return done()
    })
  })
})
