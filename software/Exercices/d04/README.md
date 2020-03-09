# Jour 4

✔ Maîtriser le langage SQL (suite).

✔ Savoir utiliser les outils existants.

✔ Créer la première brique de votre projet

## Introduction

Nous en avons terminé avec la théorie. Félicitations.

Nous espérons que cela n'aura pas été trop long, nous passons enfin
aux choses sérieuses. Vous n'aurez plus d'exercices prédéfinis.
Dorénavent, nous vous listerons certains objectifs à atteindre en fin de
journée. Ces objectifs représenterons les premières briques de votre
projet de fin de semaine.

En effet, ce Samedi, vous pourrez vous mettre en groupe de 2 ou 3 afin
de réaliser un projet réutilisant toutes les notions que vous aurez vu cette
semaine. 

Nous vous donnerons plus tard la liste de ces fameux projets, pour
l'instant restons sur nos objectifs. Il est important que vous
conceviez votre code de la meilleure manière possible car vous ne
ferez qu'y ajouter de nouvelles briques jusqu'à la fin de la semaine.

Aujourd'hui nous nous focaliserons sur la gestion des utilisateurs.

> Another Brick In The Wall - Pink Floyd

## Objectif 01 - Base de données simplifiée

Après le jour précédent vous l'aurez compris, le JSON n'est pas un format
de stockage de données en masse. Et le SQL peut très rapidement être long
et compliqué à écrire, surtout quand on s'oriente vers des modèles
relationnels. Des outils appelés ORM (pour _Object-Relationnal Mapping_)
permettent de gérer pour vous le côté SQL afin de vous permettre
de manipuler uniquement des objets dépendants du langage sur lequel
vous travaillez.

Vous avez plusieurs choix en JavaScript, en NodeJS, mais nous resterons
sur `Sequelize`.

- Manipulez `Sequelize` afin de créer un modèle `User`
  - Qu'est-ce qu'un utilisateur de votre solution doit posséder comme
    informations ?

- Faites des essais sur l'insertion, modification et suppression d'objets
  dans votre base de données

> Même si vous utilisez Sequelize, nous vous conseillons de rester sur
le connecteur SQLite, qui reste malgré tout, très simple d'utilisation
car ne nécéssite aucune installation lourde. Vous aurez l'occasion de
changer cela dans une future journée.

## Objectif 02 - Créer un serveur express

Savoir intéragir avec votre base de données de manière logicielle, c'est bien.
Savoir le faire directement depuis une API, c'est mieux.

Jusqu'à présent, vous avez vu comment créer des routes très simples. A
vous de créer des routes permettant de manipuler vos utilisateurs.

- Créer une route `POST /users/` permettant de créer un utilisateur
- Créer une route `GET /users/:id` permettant d'obtenir un utilisateur
- Créer une route `PUT /users/:id` permettant de modifier un utilisateur
- Créer une route `DELETE /users/:id` permettant de supprimer un utilisateur

Afin de créer et modifier vos utilisateurs, vous prendrez en _body_ un
objet JSON que vous **prendrez soin de valider correctement** afin d'éviter
une quelconque erreur.

> Une requête PUT attend un _body_ complet tandis qu'une requête PATCH
accepte seulement les entrées à modifier. A vous de choisir ce qui
vous plait le mieux. Généralement, les 2 sont rarements implémentés ensembles.

## Objectif 03 - Contrôle et transparence

Lorsque vous pensez à ajouter des fonctionnalités, n'oubliez pas de pensez
à tous les cas d'erreurs possibles. Est-ce que vous vous souvenez du nom
d'un des exercices du jour 1 ? "N'ayez jamais confiance en vos utilisateurs".

Ce qu'il faut éviter le plus possible, c'est qu'une erreur ne soit pas
attrapée (`catch`) par votre code et tombe directement dans la gestion
d'erreur d'`express` qui renverra une erreur au client. Faites toujours
en sorte de renvoyer une erreur explicite au client.

- Faites en sorte de renvoyer un format d'erreur consistant

> Sequelize peut remonter des erreurs dans certains cas...

## Un peu plus ?

Si vous avez terminés tout ce qu'on vous a proposé aujourd'hui rapprochez
vous d'un encadrant. Nous avons plein d'idées à vous proposer afin
d'eggayer un petit peu plus votre projet. Nous ferons en sorte de vous
conseiller des choses différentes afin que votre projet de fin de semaine
soit plus dynamique.

> PoC - 2020
