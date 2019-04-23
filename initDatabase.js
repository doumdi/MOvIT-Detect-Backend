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

  
  const configUser = db.collection('User');

  configUser.remove({});
  configUser.insert({"username" : "user", "password" : "bbcec2abf77fb1893ad27c963d0b3038bcbdc7c6bb1c89e985a420343aef51b8"}); //Mot de passe: movit-user
  configUser.insert({"username" : "clinician", "password" : "fd5034b2595fadc3390e04aaf2f48b1886e71d6eeb2b81d91238a4d2b2a0d271"}); //Mot de passe: movit-admin
  
  client.close();
});
