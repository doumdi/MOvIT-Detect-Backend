# MOvIT-Detect-Backend

MOvIT-Detect-Backend est la partie backend du système MOvIT+ destinée à fonctionner sur un Raspberry Pi Zero W. Le backend ce sépare en différentes parties soit:
  - Backend avec Node-Red sur le port 1880
  - Base de données MongoDB sur le port 27017
___
### Table des matières :

- [MOvIT-Detect-Backend](#movit-detect-backend)
    - [Table des matières :](#table-des-mati%c3%a8res)
- [1. Guide d'installation](#1-guide-dinstallation)
    - [1.1. Installation de NodeJS](#11-installation-de-nodejs)
    - [1.2. Installation de MQTT](#12-installation-de-mqtt)
    - [1.3. Installation de Mongo et Node-RED](#13-installation-de-mongo-et-node-red)
    - [1.4. Installation de GitHub](#14-installation-de-github)
    - [1.5. Installation du backend](#15-installation-du-backend)
    - [1.6. Installation des modules](#16-installation-des-modules)
- [2. Guide d'utilisation](#2-guide-dutilisation)
    - [2.1. Démarrage](#21-d%c3%a9marrage)
    - [2.2. Différents URLs](#22-diff%c3%a9rents-urls)
- [3. Modification du système](#3-modification-du-syst%c3%a8me)
___

# 1. Guide d'installation
### 1.1. Installation de NodeJS
Il faut commencer par installer NodeJS et Node Package Manager (NPM).L'installation de NodeJS se fait facilement avec les commandes suivantes :
```bash
sudo wget -qO- https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get update && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs yarn
```
> NodeJS est également essentiel pour faire fonctionner [la partie frontend]

### 1.2. Installation de MQTT
Il faut installer un broker MQTT, celui choisi est Mosquitto. Aussi, des librairies sont essentielles à la compilation qui suivra, soit libkrb5-dev et libzmq3-dev. Il faut enfin installer le tout de la façon suivante :
```bash
sudo apt-get update
sudo apt-get install -y vim i2c-tools build-essential cmake mosquitto git libmosquittopp-dev mosquitto-clients mongodb mongodb-server libkrb5-dev libzmq3-dev autoconf
```

Par la suite il faut ajouter un nom d'utilisateur et un mot de passe au broker MQTT, le nom d'utilisateur est `admin` et le mot de passe `movitplus`. La configuration se fait comme suit :
```bash
sudo systemctl stop mosquitto
sudo mosquitto_passwd -c /etc/mosquitto/passwd admin
```
Il faut entrer le mot de passe lorsque demandé, puis modifier le fichier de configuration :
```bash
sudo nano /etc/mosquitto/mosquitto.conf
```
Il faut ajouter ces lignes aux fichiers mosquitto.conf
```bash
#Password options
password_file /etc/mosquitto/passwd
allow_anonymous false
```
Et finalement relancer le serveur mosquitto:
```bash
sudo systemctl start mosquitto
```
### 1.3. Installation de Mongo et Node-RED
Mongo permet la gestion d'une base de données et est le logiciel choisie
```bash
sudo apt-get install -y mongodb mongodb-server
npm install -g node-red
```
> Limitation de MongoDB : Le serveur MongoDB est limité a un maximum de 2GB de donnée, car le serveur fonctionne en 32-bit. Cette limitation est imposée par MongoDB et ne peut être corrigée.

### 1.4. Installation de GitHub
Si _git_ n'est pas installé, il faut exécuter cette commande : `sudo apt-get install -y git`

### 1.5. Installation du backend
Finalement pour installer le backend et le préparer, les commandes suivantes sont nécessaires :
```bash
git clone https://github.com/introlab/MOvIT-Detect-Backend.git
cd ~/MOvIT-Detect-Backend
git checkout #(+la branche désirée, permet d'accéder aux versions de branches en développment)
```
### 1.6. Installation des modules
```bash
npm install #Installe tous les modules nécessaires (long sur le RaspberryPi)
node initDatabase.js #Initialisation de la base de données
```
Un redémarrage peut s'avérer nécessaire pour que le service Mongo (_mongod.service_) soit correctement démarré. La commande `systemctl status mongodb.service` donnera l'état de ce service.
___



# 2. Guide d'utilisation
### 2.1. Démarrage
Une fois installé, pour démarrer le backend, il suffit d'exécuter cette commande dans le dossier racine du projet :
```bash
cd ~/MOvIT-Detect-Backend #Navigue jusqu'au dossier racine du projet
node-red-pi --userDir $(pwd) #où $(pwd) retourne l'emplacement actuel
```
Le démarrage avec des commandes similaires est géré avec un service (basé sur _systemd_) pour les systèmes préconfigurés. Le fichier qui constitue le service se trouve sous `/etc/systemd/system/movit_backend.service`. Voir la documentation sur le [démarrage du RaspberryPi].

L'interface web de Node-RED est alors accessible en se connectant sur le point d'accès généré par le RaspberryPi (voir les [instructions de configuration réseau]) à l'addresse [movit.plus:1880]. Il est aussi possible d'y accèder à l'aide de l'addresse [192.168.10.1:1880]. Aussi, pour le développement local, l'addresse pour accèder à l'interface à même la machine est simplement : [localhost:1880]

### 2.2. Différents URLs
Il existe différents URLs pratiques pour déverminer le système, et s'assurer que tout fonctionne comme prévu :

| URL | Utilité |
| --- | --- |
| /log      | Affiche les différentes actions effectuées par le système, notamment les tentatives d'envoi, et plusieurs autres éléments importants relatifs au système
| /debug      | Affiche via websocket les différents états de chacune des machines à états finis de MOvIT-Detect, ainsi que les données brutes et traitées des capteurs|
___



# 3. Modification du système
Pour modifier le système, l'interface de Node-RED permet que le code du backend soit affiché sous forme de bloc et de liens. Chacun de ces blocs représente une partie du code. Les onglets sont séparés en plusieurs parties distinctes, ce qui facilite la compréhension. Certains blocs peuvent contenir du code JavaScript, permettant ainsi des fonctions plus puissantes et complexes.
___





 [guide NVM]:https://tecadmin.net/install-nodejs-with-nvm/ "Guide de NVM et instruction supplémentaires"

 [la partie frontend]:https://github.com/introlab/MOvIT-Detect-Frontend "MOvIT-Detect-Frontend"

 [démarrage du RaspberryPi]:https://github.com/introlab/MOvITPlus/blob/master/docs/FR/InstallationLogiciel/DemarragePi.md#service-backend "Service de démarrage du backend"

 [instructions de configuration réseau]:https://github.com/introlab/MOvITPlus/blob/master/docs/FR/InstallationLogiciel/ConfigurationReseau.md#access-point "Configuration du wi-fi, du point d'accès et du nom de domaine"

[movit.plus:1880]:http://movit.plus:1880 "Addresse de l'interface en utilisant le point d'accès"

[192.168.10.1:1880]:http://192.168.10.1:1880 "Autre option d'addresse de l'interface en utilisant le point d'accès"

[localhost:1880]:http://localhost:1880 "Addresse de l'interface en utilisant le navigateur de la machine sur laquelle le serveur s'exécute"
