const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const insertDocuments = function(db, log, callback) {
  const collection = db.collection('logs');
  collection.insertOne(log, function(err, result) {
    assert.equal(err, null);
    console.log("Log written to database successfully");
    callback(result);
  });
};

module.exports = function(log) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db('bluster');
    insertDocuments(db, log, function() {
      client.close();
    });
  });
};
