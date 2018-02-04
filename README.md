# MOvIT-Detect-Backend

## Table des matières

* [1. Node-RED](#1-node-red)
* [2. MongoDB](#2-mongodb)

# 1. Node-RED

Pour la partie back-end du projet, nous avons décidé d'utiliser l'outil Node-RED. Vous retrouverez un résumé de qu'est-ce qu'est React et pourquoi nous l'avons utilisé ci-dessous.

### Node-RED, c'est quoi?

Node-RED, c'est un outil de programmation construit au-dessus de Node.js. Cet outil est entièrement compatible avec les Raspberry Pi et permet tout ce qui est possible avec Node.js.

Au-delà de ça, ce qui différencie Node-RED de Node.js est son concept de node. Avec Node-RED, on programme des nodes qui ont des intrants et des extrants bien définis. Node-RED nous offre alors un éditeur disponible dans tous les navigateurs permettant de connecter ces nodes et d'en faire le programme que l'on désire.

### Pourquoi Node-RED?

* Compatible avec Node.js. Avec le code initial qui est en Node.js, ceci est un avantage non-négligeable. De plus, Node.js est très répandu dans la communauté et ce serait dommage de ne pas profiter.
* Facilité à tester. Avec des composants modulaires, il est facile de faire les tests unitaires.
* Réutilisation des composantes. Avec des composants modulaires, il est facile de les réutiliser et avec une communauté forte, on peut même importer des composantes *open source*!
* Facile à comprendre. L'éditeur en ligne avec des nodes nous oblige à schématiser notre logiciel qui permet de documenter le code en temps réel.
* Facile à apprendre. Avec un support visuel et de nombreux composants disponible par défaut, il est très facile d'assembler son premier programme. De plus, il n'est même pas nécessaire de savoir programmer si les nodes existent déjà!

# 2. MongoDB

Pour la partie database du projet, nous avons décidé d'utiliser une base de donnée NoSQL en MongoDB.

### MongoDB, c'est quoi?

MongoDB est une base de donnée qui enregistre le data dans des documents BSon qui est très semblable à du JSON. Cela permet donc d'avoir une structure flexible qui change dans le temps et des champs qui varient de documents en documents, contrairement à une base de donnée SQL.

### Pourquoi MongoDB?

* Une structure flexible. Cela permet donc un développement plus rapide. Car contrairement à des bases de données relationnelles, il est plus facile de modifier les schémas en cours de route.
* Des petites bases de données. En effet, puisque la base de donnée est hébergée sur le module, les données demeureront très petites. Ainsi, la performance d'une base de donnée relationnelle est négligeable dans ce contexte.
