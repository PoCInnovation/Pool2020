# Jour 5

✔ Identifier un utilisateur

✔ Sécuriser des parties de votre API

## Introduction

Vous avez normalement réussis à stocker vos utilisateurs, à pouvoir en
créer, en modifier, en supprimer. Mais sur toute API publique, les droits
en modification ne sont pas accéssibles pour tous les utilisateurs. Des
autorisations sont données à certains afin qu'ils puissent effectuer plus
d'actions que d'autres.

A la fin de la journée, vous serez en mesure d'inscrire et connecter
des utilisateurs.

## Objectif 01 - Route d'inscription

- Créer une route `POST /register` prenant en paramètres :
  - Nom d'utilisateur
  - Mot de passe

Reprenez votre modèle _Sequelize_ d'hier et ajoutez y un champ supplémentaire
pour y stocker le mot de passe de l'utilisateur.

**Ne stockez JAMAIS les mots de passe des utilisateurs en clair.**

Vous avez peut-être déjà subis une fuite de base de données exposant
certaines de vos informations personneles dont, possiblement, votre
mot de passe préféré que vous utilisez sur tous les sites (et ce n'est
pas une bonne habitude).

A présent vous avez deux possibilités :
- Utiliser un algorithme de chiffrement (permet de chiffer mais aussi
déchiffrer l'information)
- Utiliser un algorithme de hash (permet seulement de chiffer l'information)

Pour des raisons évidentes de sécurité, n'utilisez que des chiffrements
de hashage. Il en existe plusieurs, le plus connu étant `bcrypt`,
n'était (pour certains) plus considéré comme sur.

- Installez `argon2` et sécurisez votre mot de passe en le hashant

## Objectif 02 - Route de connexion

Vous pouvez stocker vos utilisateurs, avec leur mot de passe de manière
sécurisée. Il est temps de pouvoir connecter vos utilisateurs.

- Créer une route `POST /login` prenant les mêmes paramètres que
la route d'inscription

Pour identifier votre utilisateur, cherchez tout d'abord si un utilisateur
avec le nom donné existe. En l'ayant préalablement récupéré, utilisez
la fonction de comparaison d'`argon2` pour comparer le hash du mot de passe
stocké avec le mot de passe que vous avez reçu.

> Hasher plusieurs fois le mot de passe peut donner des résultats
différents. C'est pour cette raison qu'on utilise la fonction de
comparaison de l'algorithme que l'on utilise.

## Objectif 03 - Persistance de la connexion

Un utilisateur n'envoie ses identifiants qu'une seule fois : quand il se
connecte. Et non à chaque fois qu'il souhaite interragir avec une API.
Vous devez donc mettre en place un moyen de rendre la connexion
de l'utilisateur persistante (du moins pendant quelques temps).

Nous vous proposons 2 choix :
- Utiliser une session temporaire (via [express-session](https://www.npmjs.com/package/express-session))
- Utiliser un token JWT (pour _JSON Web Token_)

Chacun a ses aventages et ses inconvénients et des sites Internet vous
expliquerons beaucoup mieux que nous le pourquoi du comment.

> Le deuxième est sensiblement plus complèxe que le premier.

### Objectif 03.1 - Session

- Installez `express-session` et installez l'extension sur votre serveur
express.

Lors de la connexion, remplissez la session de l'utilisateur via la
requêtes (`req`) : `req.session`.

Vous pouvez par exemple stocker l'objet renvoyé par Sequelize représentant
votre utilisateur. Ainsi, vous n'aurez pas à récupérer ces informations
redondantes et statiques à chaque requêtes.

- Ajoutez une route `GET /me` renvoyant l'utilisateur actuellement connecté

> Sans penser à la sécurisation de la route pour l'instant, une fois connecté,
l'utilisateur devrait voir ses informations apparaître.

### Objectif 03.2 - JSON Web Token

- Installez `jsonwebtoken`

Lors de la connexion, signez l'object de l'utilisateur et renvoyez le
en réponse de la requête, le stockage du token sera géré côté client et
n'est donc (pour l'instant), pas de votre ressort.

Le client renverra votre token dans le header `Authorization` et aura la
forme suivante (communément admise) : `Authorization: Bearer votre_token`.

- Ajoutez une route `GET /me` renvoyant l'utilisateur actuellement connecté

Afin de récupérer et valider le token :
- Prenez le header `Authorization`
- Vérifiez que le premier segment vaut `Bearer`
- Vérifiez la signature du token (afin d'être certain que vous l'avis
émis et non un tiers)

> Sans penser à la sécurisation de la route pour l'instant, une fois connecté,
l'utilisateur devrait voir ses informations apparaître.

## Objectif 04 - Sécurisation des routes

Vous pouvez dorénavent connecter et faire persister la connexion de vos
utilisateurs. Afin de ne pas faire la vérification sur chacune des routes
que vous souhaitez sécuriser ; vous allez créer un _middleware_ qui
s'exécutera avant votre fonction et que vous réutiliserez à volonté.

Ce middleware remplira aussi le champ `user` de votre requête (`req.user`)
avec l'objet Sequelize représentant l'utilisateur connecté. De cette
manière, peu importe votre méthode pour connecter votre utilisateur,
vos routes utiliserons `req.user`.

- Déportez la logique de votre route `GET /me` dans un middleware (en
remplissant `req.user`)

- Si un utilisateur n'est pas connecté, renvoyez directement une réponse
**401 Unauthorized**. De ce fait, quand votre route sera exécutée, vous
serez certains que l'utilisateur est connecté

- Appliquez votre middleware sur votre route `GET /me` et vérifiez
son fonctionnement

## Un peu plus ?

S'il vous reste encore un petit peu de temps, renseignez-vous sur
`PassportJS`. Même si nous n'avons pas le temps de couvrir ce module,
celui-ci permet de généraliser plusieurs méthodes de connexion. Vous avez
sûrement déjà vu un site proposant plusieurs méthodes de connexion (comme
Facebook, Twitter, Google, etc...). Ils utilisent sûrement un système
similaire derrière afin de simplifier cette mise en place.

Par exemple, le module d'extension [passport-azure-ad](https://github.com/AzureAD/passport-azure-ad) pourrait vous permettre de vous connecter
en utilisant vos identifiants Epitech...

> PoC - 2020
