process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');


chai.use(chaiHttp);

  /*
  * Test the /POST route
  */
  describe('/POST User', () => {
      it('it should POST a new user', (done) => {
          let user = {
            username: "The Lord of the Rings",
            email: "J.R.R. Tolkien",
            password: "1954"
          }
        request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('pages');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });


