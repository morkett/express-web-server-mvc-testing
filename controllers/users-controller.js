// const { Client } = require('pg');
//
//
// const dbUrl = process.env.DATABASE_URL || 'mylocaldb2';
//
// const sslVal = (process.env.PORT) ? true : false;
//
// const client = new Client({
//   connectionString: dbUrl,
//   ssl: sslVal
// });
//
// client.connect();

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

const dbUrl = process.env.DATABASE_URL || 'mylocaldb2';
var connectionString = dbUrl;
var db = pgp(connectionString);


function indexUsers(req, res, next) {
  db.any('SELECT * FROM salesforcenodetest.contact;')
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






// // Action: index
// function indexUsers(req, res) {
//   client.query('SELECT * FROM salesforcenodetest.contact;', (err, contact) => {
//     if (err) throw err;
//     // for (const row of contact.rows) {
//     //   console.log(JSON.stringify(row));
//     // }
//     res.render('index', {
//       title: 'Test',
//       data: contact.rows
//     });
//   });
//
// }



module.exports = {
  index: indexUsers
};
