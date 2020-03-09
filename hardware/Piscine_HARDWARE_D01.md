---
title: "Piscine HARDWARE D01"
date: 2019-02-11T07:15:51Z
draft: false
---

# Piscine Hardware D01

### Introduction

Les exercices devront être réalisés dans l'ordre et présentés a un encadrant une fois terminés pour qu'il vérifie votre travail.

Même si l'accès à des tutoriels sur internet est autorisé, nous vous conseillons de réfléchir par vous-mêmes aux exercices.

Merci de télécharger :

* [IDE Arduino](https://www.arduino.cc/en/main/software)
* Configurer IDE Arduino pour les boards [ESP32](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/)


### Preambule
Merci de lire/regarder

* [Amps vs Volts](https://www.youtube.com/watch?v=XDf2nhfxVzg)
* [Une résistance ?](https://openclassrooms.com/forum/sujet/pourquoi-et-quand-placer-une-resistance)

### Exercice 1
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Led
* ???

**Consigne**: Faites un circuit reliant une led a un Arduino et allumer cette led. Appelez un encadrant avant d'alimenter votre Arduino.

**Contraintes**: Vous ne devrez utiliser aucun code pour cet exercice. Vous n'avez pas le droit à la pin 3,3V de votre board.

**Attention**: Est-ce que le voltage accepté par la led est compatible avec le voltage produit par la board ?

### Exercice 2
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Led
* Bouton poussoir
* ???

**Consigne**:  Faites en sorte que le bouton change d'état (allume/éteint) la led a chaque pression.

**Contraintes**: Aucune

### Exercice 3
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Led
* ???

**Consigne**: Faites en sorte que la led clignote toutes les secondes.

**Contraintes**: Aucune

### Exercice 4
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Led
* Potentiomètre
* ???

**Consigne**:  En reprenant le circuit de l'exercice 3, faites en sorte que le délai de clignotement de la led soit dépendant du potentiomètre.

**Contraintes**: Aucune

### Exercice 5
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Led
* Potentiomètre
* ???

**Consigne**: En reprenant le circuit de l'exercice 4, faites en sorte que la led ne clignote plus, et que l'intensité de son éclairage dépende de la valeur du potentiomètre.

**Contraintes**: Aucune

### Exercice 6
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Capteur distance ultrasons
* led

**Consigne**: Créer un nouveau circuit qui va récupérer la distance donnée par le capteur ultrasons et qui, si elle est inférieure a 30cm, allume la led.

**Contraintes**: Aucune

### Exercice 7
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Capteur distance ultrasons

**Consigne**: En reprenant le circuit de l'exercice 6, afficher la distance donnée par le capteur, et envoyez la en cm via une connexion série a votre ordinateur.

### Exercice 8
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Capteur distance ultrasons

**Consigne**: En reprenant le circuit de l'exercice 7, et le code Arduino de l'exercice 8, réaliser un programme dans le langage de votre choix qui va récupérer la sortie série de votre Arduino et l'afficher a l'écran dans un format de votre choix.

**Contraintes**: aucune librairie spécifiquement créée pour ESP32 n'est autorisée.

**Bonus**: afficher la distance sous forme de graphe

### Exercice 9
Matériel requis:

* ESP32
* Cable USB
* Breadboard
* Jumpers
* Boutton poussoir
* Relais
* Moteur
* Alimentation

**Consigne**: Créer un nouveau circuit qui va alimenter un moteur quand le bouton sera pressé. Appelez un encadrant avant d'alimenter votre circuit.

**Contraintes**: Ne pas utiliser de résistances.

**Attention**: Les moteurs fonctionne mieux avec une alimentation 12v.

### Exercice 10
Matériel requis:

* ESP32
* jumpers
* led rgb
* ???

**Consigne**: Realiser une webui ou gui avec un colorpicker qui pilote la led selon la couleur selectionnée

**Contraintes**: Ne pas connecter l'ESP32 à un reseau wifi existant;

**Attention**: Appelez un encadrant avant de faire vos branchements

### Exercice 11
Matériel requis:

* ESP32
* jumpers
* module bluetooth
* capteur ultrason

**Consigne**: Votre ESP32 devra se connecté a votre telephone ou ordinateur en bluetooth et afficher la distance en cm donne par le capteur ultrason

**Attention**: Appelez un encadrant avant de faire vos branchements

## Exercice bonus
Matériel requis:

* ESP32
* etc

**Consigne**: Reprendre les exercices précédents et ajouter plus de contenu et d'interaction sur le webGui

## En plus
Si vous êtes intéressé par des vidéastes traitant de l'électronique/hardware en voici une liste :

* AvE
* Great Scott
* This old Tony
* NYC CNC
* Electroboom
