---
title: "Piscine HARDWARE D02"
date: 2019-02-11T18:35:51Z
draft: false
---

# Piscine Hardware D02

### Introduction

Les exercices devront être réalisés dans l'ordre et présentés a un encadrant une fois terminés pour qu'il vérifie votre travail.

Même si l'accès à des tutoriels sur internet est autorisé, nous vous conseillons de réfléchir par vous-mêmes aux exercices.


### Exercice 1

Matériel requis:

* ESP32
* Capteur de temperature / Humidité

**Consigne**: Réaliser un circuit qui va récupérer periodiquement le taux d'humidité et la température et qui va la logger sur une base de données de votre choix.

### Exercice 2

Matériel requis:

* ESP32
* Capteur de temperature / Humidité
* Exercice 01

**Consigne**: Réaliser une application qui va afficher en temps réel les données récupérées précédemment.

**Bonus**: Envie d'utiliser des outils de Big Data au passage ? Envoyer les données dans une base InfluxDB puis les afficher avec un dashboard Grafana c'est assez stylé. Sinon une stack ELK c'est overkill mais tout aussi sympa.


### Exercice 3

Matériel requis:

* ESP32
* servo moteur

**Consigne**: Piloter un servo moteur via une liason serie.

### Exercice 4

Matériel requis:

* ESP32
* servo moteur
* Capteur à ultrasons

**Consigne**: Réaliser un radar

**Bonus**: Que dites-vous d'un radar tridimensionnel ? Qui affiche ses données via InfluxDB et Grafana ?

### Exercice 5

Matériel requis:

* lecteur nfc
* esp32

**Consigne**: Réaliser un système d'accès par carte RFID qui pilote une led RGB via l'API fournie `http://poc.theozapata.space/api/piscine_d2`

**Bonus**: Utiliser l'api d'EPITECH de gestion des cartes étudiant et logger le nom de la personne qui vient de passer sur la console série. (Ou logger les entrées sur un dashboard)
