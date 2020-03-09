# Jour 3

✔ Manipuler des formats de données (encore).

✔ Organiser le stockage de ses données.

✔ Lier les données entre elles et apporter des modifications en cascade.

✔ Maîtriser le langage SQL.

## Exercice 00 - Mise en contexte

Bonjour à tous et bienvenue sur ce dernier jour de théorie. Vous l'avez bien vu,
ces deux derniers jours se sont orientés majoritairement sur la maîtrise du langage
JavaScript et des concepts du protocole HTTP.

Jusqu'à présent vous avez manipulé des données simples, ou que vous consommiez
directement (des données obtenues par d'autres API, comme GitHub hier). Aujourd'hui
vous allez stocker ces données plutôt que les manipuler. Vous allez découvrir
l'envers du décors, même plus, le développer.

> Ne vous fiez pas à la quantité d'excercices, le tout dernier vous fera tout
recommencer, mais différemment, vous verrez bien le moment venu.

Vous allez créer le serveur de gestion d'un système bancaire. Quand vous pensez
organisation de code, design, vous faites généralement un petit point sur ce que
vous voudriez avoir au final. Lorsque vous composez une base de donnée, le même
principe s'applique.

Une base de donnée stocke des _tables_ (anglais), aussi appelées _entitées_. Ces
entitées peuvent dépendre les unes des autres. C'est ce qu'on appelle les
_liaisons_. Généralement, ces entités ont toutes un champ `id` possédant une
valeur unique propre à l'entité (et donc permettant de récupérer rapidement
l'information si nous sommes en possession de cet identifieur).

Reprenons notre système bancaire, nous pouvons isoler 2 entitées :
- un **utilisateur** (le client de notre banque)
- un **compte bancaire**

Notre **utilisateur** est une association de plusieurs informations :
- un prénom (stocké sous `firstname`)
- un nom de famille (stocké sous `lastname`)

Tandis que notre **compte bancaire** est une association de :
- un propriétaire (stocké sous `owner_id`)
- un montant (stocké sous `balance`)

> Vous l'avez remarqué, un compte bancaire appartient à un utilisateur. Il devra
donc systématiquement être créé après un utilisateur...

> Pour des raisons légales, notre banque ne peut avoir plusieurs clients avec
la même paire prénom-nom.

> Si un client souhaitait quitter notre banque, qu'adviendrait-il de ses comptes
bancaires ?

## Exercice 01 - Base de données hâlamain _(à-la-main)_

Vous allez stocker votre base de données dans un objet JSON que vous pourrez
organiser de la manière que vous souhaitez. En ce qui concerne les identifieurs,
vous êtes libres de les générer de la manière de votre choix. Nous vous
recommandons tout de même le package `uuid` que vous pouvez retrouver sur NPM.

- Créez un fichier `my_db.js` exportant une classe nommée `MyDB`
  - Ajoutez un constructeur prenant en paramètre un objet JSON représentant
    une base de données
  - Ajoutez une fonction `save` prenant un chemin en paramètre. Celle-ci
    renverra une promesse et enregistrera votre base de données au chemin
    donné (encore une fois stocké de la manière que vous souhaitez)
  - Ajoutez une fonction statique `load` prenant un chemin et renvoyant
    une promesse contenant une instance de la classe `MyDB`

> A présent vous êtes sensés pouvoir sauvegarder et charger un objet JSON.
Il est maintenant temps de le remplir.

## Exercice 02 - Gestion des utilisateurs

Les fonctions si dessous doivent être ajoutées à la classe `MyDB`.

- Créez une fonction `createUser(firstname, lastname)` créant un utilisateur
et le renvoyant

- Créez une fonction `getUser(id)` retournant un utilisateur en fonction d'un
indentifieur

- Créez une fonction `updateUser(id, firstname, lastname)` mettant à jour
un utilisateur identifié par un _id_

- Créez une fonction `deleteUser(id)` supprimant un utilisateur de la base
de données

> Attribuez une attention très particulière à la gestion d'erreur.

## Exercice 03 - Gestion des comptes bancaires

- Créez une fonction `createAccount(owner, initialBalance)` créant un compte
bancaire pour un utilisateur donné avec un solde initial et le renvoyant

- Créez une fonction `getAccount(id)` retournant un compte bancaire en
fonction d'un identifieur

- Créez une fonction `creditAccount(id, amount)` ajoutant au compte identifié
le montant donné

- Créez une fonction `withdrawAccount(id, amount)` retirant au compte identifié
le montant donné

- Créez une fonction `deleteAccount(id)` supprimant un compte bancaire de la
base de données.

> Que devrait-il se passer si nous devions supprimer un utilisateur ?

## Exercice 04 - Tester ce n'est toujours pas douter

Souvenez-vous du premier jour quand nous parlions de tests unitaires ?
Votre base de données n'est pas si compliquée à tester...

Avant de continuer assurez-vous qu'elle fonctionne parfaitement en
écrivant des tests unitaires pour manipuler des fichiers existants ou en
créer des nouveaux.

## Exercice 05 - Recommencer, en mieux

Vous imaginez sûrement qu'en réalité, nous ne stockons pas nos données dans
des fichiers JSON. Nous utilisons des logiciels (plus ou moins) spécialisés
pour déléguer cette tâche. Nous pouvons vous en lister plusieurs : MySQL, 
MariaDB, Postgresql, Microsoft SQL Server, SQLite... Nous allons dans cet
exercice utiliser le dernier car celui-ci ne nécéssite pas l'installation
de logiciel et permet de stocker et charger votre base de données grace à
un fichier (finissant généralement par `.sqlite`).

- Installez le package `sqlite3`

- Créez une classe `MyLiteDB` dans un fichier `my_lite_db.js`
  - Ajoutez une fonction statique `load` prenant un chemin et renvoyant
    une promesse contenant une instance de la classe `MyLiteDB`
  - Ajoutez une fonction `close` fermant la base de données chargée
  - Ajoutez une fonction `init` appelée dans le constructeur et
    initialisant les tables

- Recréez les mêmes fonctions que les exercices 2 et 3 en utilisant, cette
fois, votre base de données SQL. Elles renvoient toutes des promesses avec,
selon les fonctions, du contenu (`void` sinon).

> Votre code devrait être sensiblement plus court. Vous verrez demain
comment faire plus, en écrivant moins...

> Il serait judicieux de tester aussi votre code, sait-on jamais.

> PoC - 2020
