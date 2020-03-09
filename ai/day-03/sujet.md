# Sujet day-03

Avant de commencer cette journée, il est fortement recommandé d'avoir fini la journée précédente et/ou de regarder la correction et de la comprendre.

Vous allez découvrir aujourd'hui un framework nommé pytorch qui vous servira d'aller plus loin dans l'IA plus simplement.

Pytorch uilise utilise un systeme de graph afin de pouvoir faire ses calculs,
<br/>
vous aller utiliser pytorch et ainsi réaliser votre premier réseau de neurones issue d'un framework

("pip3 install torch")

!!! Attention, ce jour est dédié à la découverte de l'utilisation d'un framework
 <br/>
 tout ne vous sera pas directement expliqué et dit.
 <br/>
 Il vous faudra naviguer sur la doc afin de pouvoir trouver
 d'avantage d'informations et donc réussir les exercices !!!

Pytorch utilise des tenseurs, qui ne sont en réalité rien d'autre que des tableaux multidimensionnels similaire à des numpy.ndarray
<br>
Pour commencer, quelques utilisations simple de pytorch:
- initialiser deux torch.tensor, les additionner ainsi que les multiplier
- créer deux matrix de dimension (3, 3) avec torch.randn et les multiplier

Vous allez maiteant créer votre premier réseau de neurones grâce à un framwork
<br/>
[pytorch neural network tutorial](https://adventuresinmachinelearning.com/pytorch-tutorial-deep-learning/)
<br/>
- entraîner un réseau de neurones pour la porte logique XOR
- entraîner un réseau de neurones pour un [MNIST](https://pytorch.org/docs/stable/torchvision/datasets.html)

Lors de ces derniers jours, vous avez uniquement construit des réseaux de neurones fully connected.
<br/>
C'est à dire que chaque neurones est connecté à tout ceux de la couche précédante.
<br/>
Testez les limites de ce genre de réseaux de neurone avec un [Fashion-MNIST](https://pytorch.org/docs/stable/torchvision/datasets.html)
<br/>
Vous pouvez constater que vous n'avez pas un taux de réussite énormement élevé.
<br/>
Vous verrez demain un autre type de réseau de neurones, qui vous servira à dépasser ces limites.
