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
  // var upsert = new Date().getTime();
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

function getOneContact(req, res, next) {
  var contactId = req.params.id;
  db.one('SELECT * from salesforcenodetest.contact WHERE sfid = $1', contactId)
    .then( (data) => {
      res.status(200)
        .render('users/show', {
          title: `User: ${data.firstname} ${data.lastname}`,
          data: data
        });

    })
    .catch((err) => {
      return next(err);
    });
}

function updateContact (req, res, next) {
  var contactId = req.params.id;
  db.none('UPDATE salesforcenodetest.contact SET firstname=$1, lastname=$2, email=$3 WHERE sfid =$4',
    [req.body.firstname, req.body.lastname, req.body.email, contactId])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: `Updated Contact ${req.body.firstname}`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteOneContact(req, res, next) {
  var contactId = req.params.id;
  db.result('DELETE from salesforcenodetest.contact WHERE sfid = $1', contactId)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${contactId} contact`
        });
    })
    .catch((err) => {
      return next(err);
    });
}


module.exports = {
  getContacts: getContacts,
  addContact: addContact,
  getOneContact: getOneContact,
  updateContact: updateContact,
  deleteOneContact: deleteOneContact
};
