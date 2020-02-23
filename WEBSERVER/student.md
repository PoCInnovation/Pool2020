Disclaimer : This subject is made with root-me challenges but you still must enter the flag you found in the [CTF platform of this pool](https://challs.pwnh4.com/) with the format PoC{flag you found}.

## Introduction

Web server are a major component of web services. It is the part dealing with databases and user authentication. If a security issue is detected is a web server, it can lead to severe security problems : credentials stealing, code injection, modification of the user interface etc.

A useful tool to play with Web Server security is the [Burp Community Suite](https://portswigger.net/burp) which will allow you to see and edit your HTTP requests.
Do not hesitate to ask a PoC helper for installation issues !

## -1 - Understand all this stuff

Take some paper and a pen (or go to paint online :p) and represent all the interactions between the frontend, the backend API and the database for a Login page.

You must represent your HTTP requests as clearly as possible (with at least the verb and the targeted url).

Show it to a helper once you're proud of your scheme !

## 0 - Basic misconfigurations

In this first part, we are going to learn to detect and exploit basic server misconfigurations which can lead to severe security issues.

Start with these challenges :
1. [Command Injection](https://www.root-me.org/fr/Challenges/Web-Serveur/Injection-de-commande)
2. [Directory Indexing](https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-Directory-indexing)
3. [Verb Tampering](https://www.root-me.org/fr/Challenges/Web-Serveur/HTTP-verb-tampering)

## 1 - Authentication issues

Some token and cookies system were invented in order to be able to recognize a user when he is logged in. These tokens must be really secured in their implementation, otherwise you can make some serious damages...
This challenge will make you exploit a vulnerable configuration of a [JSON Web Token](https://jwt.io/).

[Introduction to JWT](https://www.root-me.org/fr/Challenges/Web-Serveur/JSON-Web-Token-JWT-Introduction)

## 2 - PHP nonsense

PHP has known a lot of severe security vulnerabilities which make it a meme in the security community. Let's start our PHP joke discovery with Type Juggling !

[When not equal can be equal](https://www.root-me.org/fr/Challenges/Web-Serveur/PHP-type-juggling)

## 3 - File Inclusions

File Inclusions are misconfigurations that lead to the execution / exploitation of files that are not supposed to be treated by the web server application...

#### Local File Inclusion

[LFI challenge](https://www.root-me.org/fr/Challenges/Web-Serveur/Local-File-Inclusion)

#### Remote File Inclusion

[RFI challenge](https://www.root-me.org/fr/Challenges/Web-Serveur/Remote-File-Inclusion)

# 4 - Go further

[LFI 2](https://www.root-me.org/fr/Challenges/Web-Serveur/Local-File-Inclusion-Double-encoding)

