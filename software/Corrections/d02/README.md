# Jour 2

✔ Manipuler des formats de données.

✔ Apprendre la différence entre synchronisation et asynchronisation.

✔ Savoir architecturer son code pour séparer les tâches.

✔ Savoir faire une requête HTTP à une API publique.

## Exercice 01 - Les fichiers JSON

Pour commencer, vous allez devoir transformer le fichier `pokemon.data` en `pokemon.json`. Ces fichiers contiennent les inforamtions définissant un pokémon et ses objets. La moulinette va essayer d'accèder à ces données. Votre JSON doit être correctement formatté.

Vous devez rendre un programme JavaScript, qui ouvre le fichier Pokemon donné en
paramètre, qui le transforme en JSON et qui l'écrit dans un second fichier aussi donné
en paramètres.

> Les lignes suivantes doivent fonctionner.

```bash
$ node src/pokemon.js files/pokemon.data pokemon.json
```

```javascript
let file = require("pokemon.json");
console.log(file.game.pokemon[0].type);
console.log(file.game.berry[3].effect);
console.log(file.game.potion[2].heal);
```

> Vous pouvez considérer que le fichier sera toujours correctement formatté, avec des
indentations de 4 espaces.

**Rendu :** `src/pokemon.js`.

## Exercice 02 - Do-Op

> Reprenons les bases. Notre ordinateur fonctionne majoritariement, même exclusivement
avec des opérations mathématiques. Recréons ce méchanisme.

- Créer une fonction `doOp` avec le prototype suivant consommant 4 paramètres :
  - Le premier nombre
  - Le symbole opératoire
  - Le second nombre
  - Une fonction où envoyer le résultat (et possiblement l'erreur survenue)

> Prendre en paramètre une fonction où envoyer le résultat est une pratique courante en
JavaScript. Ce sont des `callbacks` (pour `appel retour`). Nous vous laissons vous
renseigner à ce sujet.

> L'opération peut échouer. Auquel cas nous vous demandons de nous envoyer en premier
paramètre de la fonction l'erreur survenue.

> Prettez attention à la note précédente. Relisez-là.

- Mettre en place une gestion d'erreur :
  - Opérateur invalide (`Bad operator`)
  - Division par 0 (`Division by 0`)
  - _Something else?_

**Rendu :** `src/do_op.js`.

## Exercice 03 - Usine de Robots

> Vous avez remarqué cette fonction de retour sur l'exercice précédent. Nous allons vous
en faire manipuler un bon nombre dans cet exercice, ne prenez pas peur.

Un robot est composé de plusieurs parties, toutes en un seul exemplaire. Certaines pièces
du robot peuvent en nécéssiter d'autre pour être installées.

Dans une chaîne d'assemblage, pour installer un nouveau composant, il faut passer
sur une nouvelle étape de la chaîne où une machine précise installera le nouveau
composant. A l'image d'une chaîne d'assemblage, vous devez, pour toutes les pièces
listées en dessous, créer une fonction recevant en paramètre :
- le robot en cours de construction
- les différents paramètres nécéssaires pour construire la pièce
- la fonction `callback`.

Comme l'exercice précédent, la fonction callback doit être appelée aussi bien
en cas de succès que d'échec. En cas de succès, appelez la fonction `callback`
avec le robot modifié. Les pièces suivantes doivent être implémentées :
- tête (via `createHead`) nécéssitant une forme (`shape`) et une couleur (`color`)
- corps (via `createBody`) nécéssitant une armure (`armor`)
- maillot de bain (via `createMaillotDeBain`) nécéssitant d'avoir un **corps**
ainsi qu'une couleur (`color`).

> Vous l'avez compris. Une gestion d'erreur est à mettre en place.

Une pièce, dans le robot est stocké sous la forme d'un object JSON possédant
les paramètres reçus lors de la construction. Par exemple, dans le cas d'une pièce
`foot` prenant en paramètre une taille (`size`) :

```javascript
const robot = {
    foot: {
        size: 32,
    },
};
```

Jusqu'à présents, vous avez mis en place 3 fonctions pour créer 3 pièces sur
un robot. Il est maintenant temps de créer la logique de votre chaîne d'assemblage.

- Créer une fonction `conveyorBelt` prenant en paramètre un robot, une liste
de fonctions appelées `consumers` ainsi qu'une fonction à appeler à la fin de
l'assemblage du robot.

> Ici, les _consumers_ prennent 2 paramètres : le robot sur lequel ajouter la pièce
ainsi que la fonction à appeler après l'assemblage.

> Vous l'aurez compris, tout est fait pour que vous fassiez de la récursivité.

Exemple :

```javascript
conveyorBelt({}, [
    (robot, cb) => createBody(robot, 'diamond', cb),
], (err, robot) => {
    console.log(robot.body.armor);
});
```

**Rendu :** `src/robot_factory.js`.

## Exercice 04 - La Guerre Des Étoiles

Pour nous ne savons quelle raison, une personne à créée une API permettant de
récupérer tout un tas d'information sur Star Wars et ses univers :
[SWAPI](https://swapi.co/).

- Installer la dépendance `axios` permettant d'effectuer des requêtes HTTP

- Créer une fonction `fetchFilm` qui prends en paramètre l'identifieur (ID) de
l'épisode

- Créer une fonction `fetchPlanet` qui fait la même chose, avec une ID de planète

En utilisant les 2 fonctions précédentes :

- Créer une fonction `fetchFilmAndPlayers` qui prend en paramètre un ID de film et
qui remplace la liste d'ID de planètes par les objets renvoyés par `fetchPlanet`

> Pour cet exercice, vous devez utiliser les promesses (`Promise`), toutefois
les mots clés `async` et `await` vous sont interdits.

> Pour la dernière fonction, vous devez utiliser les fonctions `Array.map` et
`Promise.all`.

**Rendu :** `src/star_wars.js`.

## Exercice 05 - L'API de GitHub

Maintenant que vous vous êtes familiarisé avec l'organisation des JSON, nous allons récuperer ceux proposés par GitHub.

> GitHub fournit une API très complète pour récupérer de la donnée via des requêtes.
> Nous allons donc nous en servir pour recuperer la liste des membres de l'organisation "PoCFrance".

- Trouvez sur la documentation la bonne requête
- Effectuez la dans votre terminal à l'aide de `curl`
    - Si vous ne vous êtes pas trompé, vous devriez avoir une réponse de plus de 200 lignes

## Exercice 06 - De JSON à objets

- Créez la fonction `requestUsers`
    - Utilisez à nouveau la requête, mais depuis votre code
    - Stockez son retour dans un objet

**Rendu :** `src/github.js`.

## Exercice 07 - Manipulation d'objet

Maintenant que nous avons les informations accessibles depuis notre code, nous allons les exploiter.

- Créez la foncion `displayUsers` qui prend un tableau d'objets en parametre
- Affichez les _logins_ suivis des URL des utilisateurs dans la console

Example :

```
IamBlueSlime's user page is https://github.com/IamBlueSlime
Oursin's user page is https://github.com/Oursin
...
```

**Rendu :** `src/github.js`.

## Exercice 08 - À la recherche des utilisateurs

C'est bien beau d'avoir tout ça dans la console, mais ca serait encore mieux de pouvoir consulter le profil des utilisateurs en fonction de leur _login_.

- Créez une route **GET** '/poc/user/**un_login**'
    - Elle prend en parametre le _login_ de l'utilisateur
    - Elle redirige vers le profil GitHub de l'utilisateur

> Dorénavement, nous attendons que vous rendiez un serveur `Express` pouvant être
lancé avec la commande `npm start`.

## Exercice 09 - Passons à quelquechose de plus... gros

Nous allons maintenant requêter les dépôts publics de PoCFrance.
La taille de l'objet va être multipliée par 10 !

- Trouvez la bonne requête sur l'API de GitHub
- Créez la fonction `requestRepos` et faites la même chose qu'à l'[Exercice 2](#Exercice-06---De-JSON-à-objets)
- Créez une route **GET** '/poc/repos/star'
    - Elle renvoie la somme des stars de tous les dépôts de PoC cummulés
- Créez une route **GET** '/poc/repo/**un_dépôt**'
    - Elle renvoie toutes les informations concernant le dépôt

> À vous de trouver le bon champ...

> PoC - 2020
