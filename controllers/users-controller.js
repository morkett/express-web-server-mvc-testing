var User = require('../models/user-model');
var pg = require('pg');

// Action: index
function indexUsers(req, res) {
  User.find({}, function (err, users) {
    if (err) {
      console.log('Could not get list of users:', err);
      // A little bit lazy, but not going to implement
      // anything more complex at this point in time:
      res.status(500).send('Could not get list of users');
      return;
    }
    res.render('users/index', {
      title: 'User list',
      users: users
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
