# MOvIT-Detect-Backend

MOvIT-Detect-Backend est comme son nom l'indique, le backend du système MOvIT+ destiné à fonctionner sur un Raspberry Pi Zero W. Le backend ce sépare en différentes parties soit:

  - Serveur Node-Red-Pi sur le port 1880
  - Serveur MongoDB sur le port 27017

## Installation
Il faut commencer par installer la version nodeJS `9.10.0`. Les versions plus récente de nodeJs ne permettront pas de compiler le code. ([référence](https://github.com/chjj/pty.js/issues/195))
```bash
curl -o node-v9.10.0-linux-armv6l.tar.gz https://nodejs.org/dist/v9.10.0/node-v9.10.0-linux-armv6l.tar.gz
tar -xzf node-v9.10.0-linux-armv6l.tar.gz
sudo cp -r node-v9.10.0-linux-armv6l/* /usr/local/
rm -r -f node-v9.10.0-linux-armv6l/ node-v9.10.0-linux-armv6l.tar.gz
```

Il faut procéder ensuite à l'installation de la version NPM `5.6.0`. Des librairies sont également essentielles à la compilation qui suivra. ([référence 1](https://github.com/mongodb-js/kerberos/issues/45), [référence 2](https://github.com/JustinTulloss/zeromq.node/issues/596))

Il faut également installer un broker MQTT, celui choisi est Mosquitto. Il faut enfin installer le tout de la façon suivante :
```bash
sudo apt-get install -y npm libkrb5-dev libzmq3-dev mosquitto 
```

Par la suite il faut ajouter un nom d'utilisateur et un mot de passe au broker MQTT, le nom d'utilisateur est `admin` et le mot de passe `movitplus`, c'est ce que nous allons configurer ici
```bash
sudo systemctl stop mosquitto
sudo mosquitto_passwd -c /etc/mosquitto/passwd admin
```
Il faudra entrer le mot de passe lorsque demandé, ensuite on doit modifier le fichier de configuration
```bash
sudo nano /etc/mosquitto/mosquitto.conf
```
    Il faut ajouter ces lignes aux fichiers mosquitto.conf
```bash
password_file /etc/mosquitto/passwd
allow_anonymous false
```
Et finalement relancer le serveur mosquitto:
```bash
sudo systemctl start mosquitto
```

On peut ensuite installer et configurer MOvIT-Detect-Backend

```bash
sudo apt-get install -y git mongodb mongodb-server
sudo npm install -g node-red
git clone https://github.com/introlab/MOvIT-Detect-Backend.git
cd ~/MOvIT-Detect-Backend
npm install
```
Il est normal d'avoir une quantité importante de `warning`.
```bash
node initDatabase.js
```

Le serveur est finalement installé. Pour le démarrer, il suffit d'exécuter la commande dans le dossier racine du projet:
```bash
cd ~/MOvIT-Detect-Backend
node-red-pi --userDir $(pwd)
```
Il est possible de changer la commande `$(pwd)` par l'emplacement du fichier MovIt.json

Le serveur node-red est alors connecté a l'adresse http://192.168.10.1:1880 si l'on utilise le point d'accès créer par le Raspberry Pi Zero W, autrement il est accessible via l'adresse DHCP assignée par le routeur.

## Différentes URLs
Il existe différentes URL pratiques pour déverminer le système, et s'assurer que tout fonctionne comme prévu.

| URL | Utilité |
| --- | --- |
| /log      | Cette URL permet de voir les différentes actions effectuées par le système, il est possible de voir les tentatives d'envoi, et autres éléments importants relatifs au système
| /debug      | Affiche via websocket les différents états de chacune des machines à états finis de MOvIT-Detect, les données brutes et traitées des capteurs y sont présentes également.|

## Modification du système
Pour modifier le système, il suffit d'aller a l'adresse http://192.168.10.1:1880 si l'on utilise le point d'accès créer par le Raspberry Pi Zero W, le code du backend devrais alors s'afficher sous forme de bloc. Chacun de ces blocs représente une partie du code. Les onglets sont séparés en plusieurs parties distinctes, ce qui facilite la compréhension.


## Limitation MongoDB
Le serveur MongoDB est limité a un maximum de 2GB de donnée, car le serveur fonctionne en 32-bit, cette limitation est imposée par MongoDB et ne peut être corrigée.
