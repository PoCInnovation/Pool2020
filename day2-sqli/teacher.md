# Web Serveur Partie 2 - Injections SQL

Les objectifs de la demi-journée sont:
- Faire découvrir le principe des injections SQL.
- Acquérir les habitudes de base pour l'exploitation de ce type de vulnérabilité
- présenter les cas les plus courant d'apparition ce ces vulns

Chez certains l'acquisition de la syntaxe SQL se fera sans soucis, chez d'autres ce sera plus compliqué.
Il peut être utile de faire quelques exercices sur le principe du SQL poour les étudiants les plus
en difficulté, par exemple en utilisant un playground tel que [DB Fiddle](https://www.db-fiddle.com/)
pour les aider à visualiser ce quíl se passe en base de données.

## Exercice 00

Le premier exercice a pour objectif d'aider l'étudiant à visualiser comment les inputs qu'il effectue
sur une page web. Quand la requête effectuée est valide, elle est renvoyée au client. Il est
important que les étudiants observent bien la manière dont leurs requêtes sont faites.

On peut commencer par vérifier si le champ est bien injectable:

```sql
" hello
```

La requête est invalide, c'est ce qu'on cherche. Maintenant on sait que le password n'est pas remonté
par la requête, il va nous falloir ajouter une `UNION` pour manipuler la donnée qu'on veut remonter.

Note: On peut aussi utiliser `--` pour commenter le reste de la requête, il faut juste ajouter un espace
après pour avoir du MySQL valide, le `#` n'a pas ce problème.

```sql
" UNION SELECT 1,2,3 #
```

L'`UNION` est un mot-clé SQL qui permet de fusionner les résultats de deux requêtes. Une condition cependant,
il est obligatoire que les deux requêtes en question contiennent le même nombre de colonnes. Aucun soucis
de ce côté là puisque SQL nous pernmet de sélectionner un entier, ce qui aura pour effet de créer une colonne
entièrement constituée de cet entier.

Un autre avantage à cette technique est qu'elle nous permet de savoir à quel champ en DB correspond quel élément d'UI.

Il ne nous reste plus qu'à changer les colonnes récupérées pour obtenir les mots de passe.

```sql
aaaa" UNION SELECT pass,nickname,email FROM users #
```

## Exercice 01

Root-me donc pas de correction publique.

SQLi classique, on peut appliquer une logique très similaire à celle de l'exercice 00.

## Exercice 02

On apprend que le premier exercice avait également d'autres tables qu'on pourrait vouloir récupérer.
Malheureusement il n'existe pas de méthode qui fonctionne quel que soit le SGBD autre que la chance pure,
il va donc nous falloir commencer par savoir à quel SGBD on a affaire.

Pour ça [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection#dbms-identification)
a une super liste de payloads à tester qui sont uniques à certains SGBD.

On teste un payload MySQL, ça marche, on peut donc tester les méthodes MySQL pour récupérer la liste des tables.
Pour ça on va se baser sur la table information_schema.columns. Cette table contient la description de l'ensemble
des bases de donnée du système, et on peut donc récupérer dedans les informations que l'on souhaite.

```sql
" and 1=0 UNION SELECT DISTINCT table_name, 1, 1 FROM information_schema.columns
" and 1=0 UNION SELECT column_name, 1, 1 FROM information_schema.columns WHERE table_name='secret'
```

On découvre la présence d'une colonne secret dqans la table secret, qu'on peut aller chercher.

## Exercice 03

Root-me, pas de correction publique.

## Exercice 04

Root-me, pas de correction publique.

## Exercice 05

Cette épreuve est différente car l'injection SQL doit se faire à l'aveugle. La technique que nous avons utilisé précédemment ne fonctionnera pas en raison d'un filtre.

L'approche du temps (time based attack) pourrait résoudre le problème. Mais, encore plus simple... On utilise un OR pour valider une expression. Si l'exression est vraie, on est connecté. Autrement, la connection échoue.

Nous allons tester la valeur recherchée caractère par caractère. On peut utiliser la dichotomie pour gagner du temps.

La longueur peut être trouvée à l'avance avec la fonction SQL LENGTH.

On peut itérer sur la range ASCII, moins les caractères qui ne sont pas imprimables.
