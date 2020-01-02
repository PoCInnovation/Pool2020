# Web Serveur Partie 2 - Injections SQL

Nous continuons cet après-midi sur des vulnérabilités ultra classiques, puisque nous allons parler de
[la plus courante](https://www.owasp.org/index.php/Top_10-2017_Top_10) de nos jours, l'injection SQL.

L'écrasante majorité des applications ont besoin de manipuler des donnés, et il est très courant que l'on
ait besoin que cette donnée soit persistante. Pour ça on se repose en général sur un ou plusieurs systèmes
de gestion de base données (SGBD, ou DBMS en anglais). On a donc besoin de communiquer les donnés de
l'application au SGBD, et c'est là que les choses se gâtent.

Il existe une multitude de langages qui peuvent être utilisés pour communiquer avec des bases de données,
mais SQL est encore aujourd'hui le plus commun. La logique du langage est assez simple, et est facile à
transposer d'un SGBD à l'autre.

Pas d'inquiétude si vous n'avez jamais fait de SQL auparavant, vous apprendrez sur le tas. Si vous en avez,
déjà faitm tant mieux pour vous, profitez du temps gagné pour rattrapper ce que vous n'avez pas eu le temps
de faire.

## Exercice 00

Ce premier exercice a pour objectif de vous familiariser avec la logique derrière une injection SQL.

Pour cet exercice, rendez vous sur la plateforme suivante:

- http://chall01.sql.oursin.eu/

Votre objectif principal pour cet exercice va être de récupérer les mots de passe des utilisateurs.

Suivez la démonstration, puis à vous de jouer pour trouver le mot de passe de l'utilisateur Oursin.

## Exercice 01

Maintenant que vous vous êtes familiarisés avec le principe de l'injection SQL, on va pouvoir mettre
ça en pratique.

A vous de résoudre [cette épreuve](https://www.root-me.org/fr/Challenges/Web-Serveur/SQL-injection-authentification).

Voici quelques questions pour vous guider:

- quelle entrée utilisatgeur est vulnérable ?
- imaginez à quoi ressemble la requête, comment peut-on l'injecter tout en la rendant valide ?

## Exercice 02

Retournez sur le challenge 00, y a-t-il d'autres tables dans la base de données ? Que contiennent-elles ?

- Combien de champs la requête contient-elle ?
- Quel est le type de SGBD utilisé ?
- Comment récupérer la liste des tables ?

## Exercice 03

A vous d'affronter [cette épreuve](https://www.root-me.org/fr/Challenges/Web-Serveur/SQL-injection-String)
maintenant.

- Est-il possible d'injecter le champ de connection ?
- Quels autres champs d'entrée utilisateur sont présents ?

## Exercice 04

Vous allez affronter [cette épreuve](https://www.root-me.org/fr/Challenges/Web-Serveur/SQL-injection-numerique).
Plus d'aide à présent, vous êtes grands maintenant.

## Exercice 05

Enfin vous aurez [cette épreuve](https://www.root-me.org/fr/Challenges/Web-Serveur/SQL-injection-en-aveugle) à résoudre.

Pour cette épreuve vous aurez besoin d'écrire un script. Pour ceux d'entre vous qui n'ont pas d'idées
de langage, prenez Python, vous trouverez plus facilement des ressources utiles. Ne restez pas
bloqués sur des soucis liés au langage, ce n'est pas une piscine Python, n'ayez pas peur de poser des
questions.

Quelques questions pour vous guider:
- Quel est le problème ? Qu'est-ce qui fait que ce challenge est différent des précédents ?
- Pouvez vous trouver la longueur de ce que vous cherchez ? Ça aiderait pas mal déjà.
- Quel jeu de caractères pouvez vous logiquement utiliser ?

## Exercice 06

Faites nous de retours sur ce que vous avez pensé de la piscine :D