Solution exercice 1
parcourir le ficher notamment les packets http de début de fichier.
trouver un patern bizarre dans la partie host des requètes http
Just right click on a column, edit preferences, +, Host, Custom, http.host
find the IP, filter by ip.addr == 175.187.69.163, filter length by ascending order, respond to challenge.

solution : PoC{175.187.69.163;192}

Solution exercice 2

file->export objects-> http
fouille 2 minutes;

solution : PoC{jack-o-lantern.jpg}

Solution Exercice 3

Tout les protocole réseau ne contiennent pas de champs "data" à proprement parlé. Filtré par data, trouver le seul packet noté tcp aillant un champ data, et résolvez le challenge.

solution : PoC{$!.1386}

Solution Exercice 4
UDP to RTP Analysis -> decode as -> port 1313
https://osqa-ask.wireshark.org/questions/56472/i-see-udp-i-want-rtp

solution: PoC{52.TheGreatPumpkin}

Solution Exercice 5

NetworkMiner -> email -> pre-masterkey-> ssl decrypting with wireshark via premaster key

solution: PoC{711}
