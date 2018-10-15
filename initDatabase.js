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
  configCollection.insert({"Value" : "Goal"});
  
 const configCollection = db.collection('Current_State');

  configCollection.remove({});
  configCollection.insert({"Value" : "CurrentState"});
  
  const configUser = db.collection('User');

  configUser.remove({});
  configUser.insert({"username" : "user", "password" : "948FE603F61DC036B5C596DC09FE3CE3F3D30DC90F024C85F3C82DB2CCAB679D"});
  //client
  configUser.insert({"username" : "clinician", "password" : "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"}); //admin
  
  client.close();
});
