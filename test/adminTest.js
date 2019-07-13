const env = require('../env');
env.environment = 'test';
const Admin = require('../app/models/adminModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/index');
const should = chai.should();

chai.use(chaiHttp);
should;

describe('Admin', () => {
    before((done) => {
       Admin.deleteOne({}, (err) => {
           done();
        });
    });
    /*
    * Test the /POST route
    */
    describe('POST /api/v1/admin/signup', () => {
        it('should respond with a success message along with a single admin that was added', (done) => {
            let admin = {
                first_name: 'samuel',
                last_name: 'david',
                email: 'david@email.com',
                password: 'password'
            }
            chai.request(server)
                .post('/api/v1/admin/signup')
                .send(admin)
                .end((err, res) => {
                    res.should.have.status("ok");
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("success");
                    res.body.data.should.have.property('token');
                    res.body.data.admin.should.have.property('is_admin').eql(true);
                    res.body.data.admin.should.have.property('_id');
                    res.body.data.admin.should.have.property('first_name');
                    res.body.data.admin.should.have.property('last_name');
                    res.body.data.admin.should.have.property('email');
                    res.body.data.admin.should.have.property('date_created');
                    done();
                });
        });
    });


    describe('POST /api/v1/admin/signin', () => {
        it('should respond with a success message along with a signed in admin', (done) => {
            let admin = {
                email: 'david@email.com',
                password: 'password'
            }
            chai.request(server)
                .post('/api/v1/admin/signin')
                .send(admin)
                .end((err, res) => {
                    res.should.have.status("ok");
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("success");
                    res.body.data.should.have.property('token');
                    done();
                });
        });
    });
})

