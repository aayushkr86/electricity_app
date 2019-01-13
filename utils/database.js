var MongoClient = require('mongodb').MongoClient

function getDb () {
  return MongoClient.connect('mongodb://localhost:27017/electricityapp').then(function (db) {
    return db
  })
}

module.exports = getDb()
