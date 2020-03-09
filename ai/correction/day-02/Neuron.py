import random
import numpy as np


def sigmoid(x):
    return 1. / (1. + np.exp(-x))


class Neuron:
    def __init__(self, nbEntry):
        self._weights = [random.uniform(-1, 1) for _ in range(nbEntry + 1)]
        self._activation = 0.
        self._gradient = 0.

    # EXO 1
    def activate(self, entries):
        sum = self._weights[0]
        for i in range(1, len(self._weights)):
            sum += self._weights[i] * entries[i - 1]
        self._activation = sigmoid(sum)

    def calcLoss(self, inputs, outputs):
        loss = 0.
        for i in range(len(inputs)):
            self.activate(inputs[i])
            loss += outputs[i] * np.log(self._activation) + (1. - outputs[i]) * np.log(1. - self._activation)
        return -loss / len(inputs)

    def calculateOutputGradient(self, desiredOutput):
        self._gradient = (desiredOutput - self._activation)

    def applyGradient(self, learningRate, entries):
        self._weights[0] += learningRate * self._gradient
        for i in range(1, len(self._weights)):
            self._weights[i] += learningRate * self._gradient * entries[i - 1]

    #EXO 2
    def activateWithLayer(self, prevLayer):
        sum = self._weights[0]
        for i in range(1, len(self._weights)):
            sum += self._weights[i] * prevLayer[i - 1]._activation
        self._activation = sigmoid(sum)

    def calculateHiddenGradient(self, nextLayer, idx):
        sum = 0.
        for k in nextLayer:
            sum += k._gradient * k._weights[idx + 1]
        self._gradient = (1 - self._activation) * self._activation * sum

    def applyGradientWithLayer(self, learningRate, entries):
        self._weights[0] += learningRate * self._gradient
        for i in range(1, len(self._weights)):
            self._weights[i] += (learningRate * self._gradient * entries[i - 1]._activation)
