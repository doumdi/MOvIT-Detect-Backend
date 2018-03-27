const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'MovIt';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error(`There was an error in the connect: ${err.message}`);
  }

  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const configCollection = db.collection('Config');

  configCollection.remove({});
  configCollection.insertMany([
    {
      "Value" : "Recommandation",
    },
    {
      "Value" : "Configuration"
    }
  ]);

  client.close();
});
