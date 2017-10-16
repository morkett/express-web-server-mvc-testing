var User = require('../models/user-model');
var pg = require('pg');

// // Action: index
// function indexUsers(req, res) {
//   User.find({}, function (err, users) {
//     if (err) {
//       console.log('Could not get list of users:', err);
//       // A little bit lazy, but not going to implement
//       // anything more complex at this point in time:
//       res.status(500).send('Could not get list of users');
//       return;
//     }
//     res.render('users/index', {
//       title: 'User list',
//       users: users
//     });
//   });
// }

function indexUsers(req, res) {
  pg.connect(process.env.DATABASE_URL+'?ssl=true', function(err, client, done) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  client.query('SELECT twitter_handle__c, sfid '+
               'FROM salesforce.contact '+
               'WHERE contact IS NOT NULL', function(err, result) {
    if (err) {
      console.error(err);
    } else {
      var contacts = {};
      result.rows.forEach(function(row){
        contacts[row.twitter_handle__c] = row;
      });
      console.log('contacts :', contacts);

    res.render('users/index', {
      title: 'User list',
      users: contacts
    });
  // });
}


//
//
//
// Action: new
function newUser(req, res) {
  res.render('users/new', {
    title: 'New user'
  });
}

// Action: create
function createUser(req, res) {
  var newUser = new User();

  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.email = req.body.email;

  newUser.save(function (err) {
    var errorJson = [];

    if (err) {
      for (var path in err.errors) {
        errorJson.push({
          path: path,
          message: err.errors[path].message
        });
        console.log('Could not create new user: error:', err.errors[path].message);
      }
      res.status(400).json(errorJson);
      return;
    }
    res.redirect('/users');
  });
}

// Action: edit
function editUser(req, res) {
  var userId = req.params.id;

  User.findOne({ _id: userId }, function (err, user) {
    if (err) {
      console.log('Could not get user:', err);
      // ditto comment above re. keeping complexity to a minimum:
      res.status(404).send('Could not get user');
      return;
    }
    res.render('users/edit', {
      title: 'Edit user',
      user: user
    });
  });
}

// Action: update
function updateUser(req, res) {
  var userId = req.params.id;
  var updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  User.findOneAndUpdate({ _id: userId }, updatedUser, function (err) {
    if (err) {
      console.log('Could not get existing user to update:', err.message);
      // ditto comment above re. keeping complexity to a minimum:
      res.status(404).send('Could not get existing user to update');
      return;
    }
    res.redirect('/users');
  });
}

// Action: show
function showUser(req, res) {
  var userId = req.params.id;

  User.findOne({ _id: userId }, function (err, user) {
    if (err) {
      console.log('Could not get user:', err);
      // ditto comment above re. keeping complexity to a minimum:
      res.status(404).send('Could not get user');
      return;
    }
    res.render('users/show', {
      title: 'Show user',
      user: user
    });
  });
}

// Action: destroy
function destroyUser(req, res) {
  var userId = req.params.id;

  User.deleteOne({ _id: userId }, function (err) {
    if (err) {
      console.log('Could not get user to delete:', err.message);
      // ditto comment above re. keeping complexity to a minimum:
      res.status(404).send('Could not get user to delete');
      return;
    }
    res.redirect('/users');
  });
}

module.exports = {
  index: indexUsers,
  new: newUser,
  create: createUser,
  edit: editUser,
  update: updateUser,
  show: showUser,
  destroy: destroyUser
};
