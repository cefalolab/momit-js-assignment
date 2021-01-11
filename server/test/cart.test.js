const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const server = require('../../server.js');

chai.should();
chai.use(chaiHttp);

// Main block
describe('Cart:', () => {
  let token;
  // create user
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const email = faker.internet.email();
  const password = faker.internet.password();

  // register user
  describe('POST /register', () => {
    it('Should register a user to login for checkout', done => {
      chai
        .request(server)
        .post('/api/register')
        .send({ name, email, password })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // login user
  describe('POST /login', () => {
    it('Should login a user to get token', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({ email, password })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          token = res.body.data.token;
          done();
        });
    });
  });

  // get all products
  describe('POST /checkout', () => {
    it('Should get total price and cart', done => {
      chai
        .request(server)
        .get('/api/checkout')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
