const { Client } = require('pg')


const dbUrl = process.env.DATABASE_URL;

const sslVal = (process.env.PORT) ? true : false;

const client = new Client({
  connectionString: dbUrl,
  ssl: sslVal
});

client.connect();



// Action: index
function indexUsers(req, res) {
  client.query('SELECT * FROM salesforce.contact;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
      res.send(row);
    }
    client.end();
  });

}



module.exports = {
  index: indexUsers
};
