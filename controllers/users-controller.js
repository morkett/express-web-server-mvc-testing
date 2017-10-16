// var User = require('../models/user-model');

const connectionString = process.env.DATABASE_URL;
var pgp = require('pg-promise')(/*options*/);
var db = pgp(connectionString);

// Action: index
function indexUsers(req, res) {
  db.many('SELECT * FROM Contact ORDER BY systemmodstamp DESC;')
    .then(function (data) {
      console.log('DATA:', data.value);
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      console.log('ERROR:', error);
    });

}



module.exports = {
  index: indexUsers
};
