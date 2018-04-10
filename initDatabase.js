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
  configCollection.insert({"Value" : "Recommandation"});
  configCollection.insert({"Value" : "Configuration"});
  
  t configCollection = db.collection('User');

  configCollection.remove({});
  configCollection.insert({"username" : "client", "password" : "37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f"});
  configCollection.insert({"username" : "admin", "password" : "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"});
  
  client.close();
});
