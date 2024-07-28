const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert a valid input such as 10L', (done) => {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=10L')
        .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 10)
            assert.equal(res.body.initUnit, 'L')
            assert.equal(res.body.returnUnit, 'gal')
            done();
        })
    })
    test('Convert an invalid input such as 32g', (done) => {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=32g')
        .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body, 'invalid unit')
            done();
        })
    })
    test('Convert an invalid number such as 3/7.2/4kg', (done)=> {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body, 'invalid number')
            done();
        })
    })
    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', (done)=> {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body, 'invalid number and unit')
            done();
        })
    })
    test('Convert with no number such as kg', (done)=> {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=kg')
        .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 1)
            assert.equal(res.body.initUnit, 'kg')
            assert.equal(res.body.returnUnit, 'lbs')
            done();
        })
    })
});
