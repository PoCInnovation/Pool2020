# Jour 1

✔ Apprendre a créer un serveur HTTP basique avec [Express](https://expressjs.com/).

✔ Savoir différencier les différentes ressources d'une requête, leur localisation et leur utilité.

✔ Sécuriser les paramètres d'une requête HTTP en avec une bibliothèque de validation de donnée (data validator library).

## Exercice 00 - Prérequis

- [NodeJS](https://nodejs.org/en/) >= 10 ([installation](https://lmgtfy.com/?q=how+to+install+nodejs))
- [npm](https://www.npmjs.com/) (généralement installé avec NodeJS)

Nous vous demanderons d'effectuer vos rendus sur GitHub, dans un dépôt
dédié à la journée. Nommez le `POC_SoftwarePool2020_DAY` où `DAY` correspond
au nom de la journée, ici `d01`.

Envoyez nous un message sur Discord avec le lien de votre dépôt pour qu'on
puisse suivre l'avancée de votre travail et, possiblement, faire passer des
tests automatisés.

## Exercice 01 - Tout a un début

- Créer une application NodeJS basique

> Se documenter sur la structure basique d'une application NodeJS, à quoi servent les fichiers `package.json`, `package.lock.json` ?

- Ajouter une règle 'start' dans le package.json
  - Elle execute `node src/index.js`

> Si tout se passe bien `npm start` ou `yarn start` devrait lancer votre application.

N'oubliez pas d'informer l'utilisateur que le serveur est correctement lancé en affichant `Ready.` dans le terminal.

## Exercice 02 - Coder bien pour soi et pour les autres

Il est important d'avoir une norme commune au sein d'un projet. C'est pour ca qu'il est interressant d'intégrer [ESLint](https://eslint.org/) a votre projet

- Ajouter ESLint
    - Utiliser le coding Style AirBnB
    - Ajouter la règle 'lint' qui exécute `eslint`
    - Ajouter la règle 'lint:format' qui exécute `eslint --fix`

> Au sein d'un projet NodeJS, on peut différencier 2 catégories de dépendances car elles ne sont pas toutes indispensables au bon fonctionnement de votre projet.

> En ce qui concerne les codes de retours HTTP, utiliser une bibliothèque qui les enumère peut être une bonne idée, comme [http-status](https://www.npmjs.com/package/http-status).

## Exercice 03 - Le Hello World du serveur web

Mettre en place un server qui expose une route `/hello` qui retourne `world` par la méthode **GET**.

- Ajouter express
- Créer une fonction `startServer()` qui
  - Instancie l'application express
  - Ecoute sur le port 8080
  - Définie une route **GET** '/hello' qui renvoit `world`

## Exercice 04 - Abuser des bonnes choses

En HTTP, les paramètres de votre demande peuvent être exprimés à différents endroits :

- `body`
- `parameter`
- `query`
- `cookie`
- `header`

Il s'agira alors de savoir comment récupérer les informations à ces endroits, puis de s'interresser à l'utilité de ces différents localisations.

- Créer une route **GET** '/repeat-my-fixed'
  - Renvoit 200 `For better and for worst`

- Créer une route **GET** '/repeat-my-query'
  - Prend un paramètre query `message`
  - Renvoit le message donné en paramètre
  - Si aucun message est donné
    - Définir le statut 400
    - Renvoyer `Bad Request`

- Créer une route **POST** '/repeat-my-body'
  - Renvoit le message donné dans le corps de la requête
  - Si le corps est vide
    - Définir le statut 400
    - Renvoyer `Bad Request`

- Créer une route **GET** '/repeat-my-header'
  - Cherche un header `X-Message`
  - Renvoit le message donné en paramètre
  - Si aucun message est donné
    - Définir le statut 400
    - Renvoyer `Bad Request`

- Créer une route **GET** '/repeat-my-cookie'
  - Cherche un cookie `message`
  - Renvoit le message donné en cookie
  - Si aucun message est donné
    - Définir le statut 400
    - Renvoyer `Bad Request`

- Créer une route **GET** `/repeat-my-param/:message`
  - Cherche un paramètre de requête `message`
  - Renvoit le message donné en paramètre

> 💡 L'outil [Postman](https://www.getpostman.com/) permet de tester rapidement et facilement des routes HTTP.

## Exercice 05 - Toujours penser Scaling

> Il est important de penser depuis le début de l'application a l'intégration de votre Serveur dans une architecture Web en plaçant le maximum de variables susceptibles de changer dans l'environnement.

- Installer dotenv
- Créer un fichier `env.example` qui définira les variables d'environnement suivantes :
  - SERVER_PORT=8080
  - FIXED_MESSAGE=For better and for worse

- Adapter le code du serveur express pour utiliser le port défini dans l'environnement de préférence, si non défini, utiliser le port 8080

- Adapter le code de la route **GET** '/repeat-my-fixed' pour utiliser la variable
  - Si la variable n'est pas présente
      - Définir le statut 404
      - Renvoyer `No Message Defined`

## Exercice 06 - Tester c'est douter mais c'est bien quand même

- Installer [jest](https://jestjs.io/)
  - Le coverage doit être stocké dans le dossier `coverage`
    - Ajouter la règle 'test' qui exécute `jest`
    - Ajouter la règle 'test:cov' qui exécute `jest --coverage`
    - Créer des tests pour chaque routes '/repeat-' créées

## Exercice 07 - Qui utilise du texte brut ?

- Créer une route **GET** '/repeat-all-my-queries'
  - Renvoit un tableau d'objets de la forme suivante :
    ```json
    [
        {
            "key": "", // -> name of the query
            "value": "" // -> value of the query
        }
    ]
    ```

## Exercice 08 - Un peu de logique 🤯

- Créer une route **POST** '/are-these-palindromes'
  - Recoit en paramètre un corps JSON de la forme suivante :
    ```json
    [
        "meow",
        "lol"
    ]
    ```
- Doit renvoyer un tableau d'objets de la forme suivante :
  ```json
  [
      {
          "input": "meow",
          "result": false
      },
      {
          "input": "lol",
          "result": true
      }
  ]
  ```

## Exercice 09 - Ne jamais avoir confiance dans les utilisateurs

> En JavaScript, il est important de savoir sur quel type de donnée on travail, il s'agit donc de vérifier ces type.

- Installer [Joi](https://hapi.dev/family/joi/)
- Valider la route **POST** '/are-these-palindromes' en utilisant Joi

> Ne jamais oublier qu'en HTTP, une requête non valide ou ne pouvant pas être traitée dans l'état a forcément un code de retour correspondant.

> Il ne fait aucun sens de demander si [] sont des palindromes...

## Exercice 10 - Automatisation ⚙

> Il va de soi qu'on va pas prendre la peine de réitérer la logique de validation de donnée dans chaque route, on va donc créer des middleware de validation !

- IMPORTANT: S'informer sur ce qu'est un middleware dans Express ([ici](https://expressjs.com/en/guide/using-middleware.html) par exemple)

Le but de cet exercice est de créer une fonction qui s'assure de retourner `BAD_REQUEST` en cas de requête non valide.
On lui donne un chemin d'accès a la donnée et un schéma Joi a valider, puis nous retourne une fonction middleware qui s'assurera de la validité du schéma donné.

> Si vous avez bien tout compris, il s'agit bien d'une fonction qui retourne une fonction 🤯.

Les signatures des fonctions peuvent être comme ci-dessous:

`const validate = (schema, location) => (req, res, next) => your logic goes here`

> Vous pouvez bien évidemment mettre un paramètre par défaut pour la location ce qui facilitera la lecture.

- Créer une fonction qui prend un `schema` et une `location` et qui retourne un middleware
- Le middleware doit:
  - Analyser le schéma dans `req[location]` avec le schéma Joi donné et:
    - Si la requête n'est pas valide: renvoyer `BAD_REQUEST` et ne pas continuer de propager la liste de middleware
    - Si la requête est valide: continuer de propager la liste de middleware
- Remplacer votre ancienne logique de validation par l'utilisation du middleware dans votre route `/are-these-palindromes`
  - Vérifier si ça fonctionne toujours 🙄

> Selon votre schéma, Joi peut modifier les valeurs pour les convertir, il peut donc être interressant de stocker ces valeurs dans l'objet `req` directement (i.e `req.values`), pour pouvoir y accéder plus tard dans la logique de votre route.

> Il est important de penser a créer des middlewares quand une même action se répète souvent dans vos routes, cela rend le code plus agréable à lire et assure une maintenabilité.

## Exercice 11 - Souvenez-vous, [Coder bien pour soi et pour les autres](#Exercice-02---Coder-bien-pour-soi-et-pour-les-autres)

A ce point la du sujet, vous avez donc un fichier avec plusieurs routes:
- Quelques unes qui récupèrent du contenu de la requête
- D'autres qui analysent des palindromes

Il s'agirait d'organiser ces routes dans différents fichiers et de les importer dans le **serveur**.

- Créer un dossier `routes`
  - Dedans vous aurez toutes vos routes:
    - route_utils.js
    - palindromes.js
  - Déplacer vos routes dans les fichiers correspondant
    - Un dossier middleware à la racine avec vos middleware est aussi le bienvenu
- Trouver un moyen de les importer dans votre index.js

> Protip: `Express.Router()` vous mènera loin.

## Ressources du jour 🔨

- [NodeJS](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [ESlint](https://eslint.org/)
- [http-status](https://www.npmjs.com/package/http-status)
- [Postman](https://www.getpostman.com/)
- [jest](https://jestjs.io/)
- [joi](https://hapi.dev/family/joi/)
- [Express](https://expressjs.com/)

> PoC - 2020