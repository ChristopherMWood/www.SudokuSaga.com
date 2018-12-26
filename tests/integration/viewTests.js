var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = require('request');
var expect  = require('chai').expect;
var server = require('../../app.js')();

describe('View Loading Tests', function () {
    it('Index page returns 200', function(done) {
      request('http://localhost:8080/', function (error, response, body) {
        expect(response).to.have.status(200);
        return done();
      });
    });

    it('404 page returns 200', function(done) {
      request('http://localhost:8080/asdfa', function (error, response, body) {
        expect(response).to.have.status(200);
        return done();
      });
    });

    after(function(done) {
      server.close(done);
    });
  });
