'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/beverages_test';
var server = require(__dirname + '/../../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Beverage = require(__dirname + '/../../models/beverage');

describe('the beverages resource', function () {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function (err) {
      server.close();
      if (err) throw err;
      done();
    });
  });

  it('should be able to get beverages', function (done) {
    chai.request(url)
      .get('/beverages')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to create a beverage', function (done) {
    chai.request(url)
      .post('/beverages')
      .send({beverageBody: 'test beverage'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.beverageBody).to.eql('test beverage');
        done();
      });
  });

  describe('routes that need a Beverage in the database', function () {

    beforeEach(function(done) {
      var testBeverage = new Beverage({beverageBody: 'test'});
      testBeverage.save(function(err, data) {
        if (err) throw err;
        this.testBeverage = data;
        done();
      }.bind(this));
    });

    it('should be able to update a Beverage', function (done) {
      chai.request(url)
        .put('/beverages/' + this.testBeverage._id)
        .send({beverageBody: 'new beverageBody'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a Beverage', function (done) {
      chai.request(url)
        .delete('/beverages/' + this.testBeverage._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});