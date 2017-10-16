const { Client } = require('pg')


const dbUrl = process.env.DATABASE_URL || 'mylocaldb2';

const sslVal = (process.env.PORT) ? true : false;

const client = new Client({
  connectionString: dbUrl,
  ssl: sslVal
});

client.connect();



// Action: index
function indexUsers(req, res) {
  client.query('SELECT * FROM salesforcenodetest.contact;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });

}



module.exports = {
  index: indexUsers
};
