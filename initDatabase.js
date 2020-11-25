const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'MovIt';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error(`There was an error while trying to connect to the mongo database: ${err.message}`);
  }

  console.log("Connected successfully to the mongo server - Database initialised");

  const db = client.db(dbName);

  
  //Flush all AngleData
  const angleDataCollection = db.collection('AngleData')
  angleDataCollection.remove({})

  //Flush all AngleState
  const angleStateCollection = db.collection('AngleState')
  angleStateCollection.remove({})

  //Flush all TravelData
  const travelDataCollection = db.collection('TravelData')
  travelDataCollection.remove({})

  //Flush all TravelState
  const travelStateCollection = db.collection('TravelState')
  travelStateCollection.remove({})

  //Flush all SeatingData
  const seatingDataCollection = db.collection('SeatingData')
  seatingDataCollection.remove({})

  //Flush all SeatingState
  const seatingStateCollection = db.collection('SeatingState')
  seatingStateCollection.remove({})


  //Flush all NotivationState
  const notificationStateCollection = db.collection('NotificationState')
  notificationStateCollection.remove({})


  const configCollection = db.collection('Config');

  configCollection.remove({});
  configCollection.insert({"Value" : "Recommandation"});
  configCollection.insert({"Value" : "Configuration"});
  configCollection.update({Value: "Configuration"}, {$set:{"maxAngle": 50, "minAngle": 0}});
	
	
	
  configCollection.insert({"Value" : "Goal"});
  configCollection.update({Value: "Goal"}, {$set: {"tiltAngle": 32, "tiltFrequency": 300, "tiltLength": 61}});

	
  configCollection.insert({"Value" : "Alarm"});
  configCollection.update({Value: "Alarm"}, {$set: {"enabled": false, "isLedBlinkingEnabled": false, "isVibrationEnabled": false, "snoozeTime": 60}});

  configCollection.insert({"Value" : "DataAgreement"});
  configCollection.update({Value : "DataAgreement"},{$set: {"dataAgreement" : false}}); // Assume disagreement of user
  

  configCollection.insert({"Value" : "AngleOffset"});
  configCollection.update({Value : "AngleOffset"}, {$set: {"mIMU": 0, "fIMU": 0}});	

  // Success of this last line to be verified
  const configFileReport = db.collection('FileReport');

  configFileReport.remove({});
  configFileReport.insert({"Value" : ""});



  const configUser = db.collection('User');

  configUser.remove({});
  configUser.insert({"username" : "user", "password" : "bbcec2abf77fb1893ad27c963d0b3038bcbdc7c6bb1c89e985a420343aef51b8"}); //Mot de passe: movit-user
  configUser.insert({"username" : "clinician", "password" : "fd5034b2595fadc3390e04aaf2f48b1886e71d6eeb2b81d91238a4d2b2a0d271"}); //Mot de passe: movit-admin
  
  client.close();
});
