// var User = require('../models/user-model');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
client.connect();


// Action: index
function indexUsers(req, res) {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// function indexUsers(req, res) {
//   pg.connect(process.env.DATABASE_URL+'?ssl=true', function(err, client, done) {
//
//   client.query('SELECT twitter_handle__c, sfid '+
//                'FROM salesforce.contact '+
//                'WHERE contact IS NOT NULL', function(err, result) {
//
//       var contacts = {};
//       console.log('contacts :', contacts);
//
//     res.render('users/index', {
//       title: 'User list',
//       users: contacts
//     });
//   });
// }

module.exports = {
  index: indexUsers
};
