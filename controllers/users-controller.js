var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

const dbUrl = process.env.DATABASE_URL || 'mylocaldb2';
var connectionString = dbUrl;
var db = pgp(connectionString);


function getContacts(req, res, next) {
  db.any('SELECT * FROM salesforcenodetest.contact ORDER BY firstname ASC;')
    .then(function (data) {
      res.status(200)
        .render('index', {
          title: 'Test',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function addContact(req, res, next) {
  db.none('INSERT into salesforcenodetest.contact(firstname, lastname, email)' + 'values(${firstname}, ${lastname}, ${email})', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Added contact'
        });
    })
    .catch((err) => {
      return next(err);
    });
}


module.exports = {
  getContacts: getContacts,
  addContact: addContact
};
