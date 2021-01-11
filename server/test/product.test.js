const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server.js');

chai.should();
chai.use(chaiHttp);

// Main block
describe('Product:', () => {
  // get all products
  describe('GET /products', () => {
    it('Should get all products', done => {
      chai
        .request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // fetch single products
  describe('GET /products/:id', () => {
    it('Should get single product details', done => {
      chai
        .request(server)
        .get('/api/products/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
