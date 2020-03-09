import numpy as np
from Neuron import *


class NeuralNetwork:
    def __init__(self, layerDescriptor):
        self.layers = []
        for i, it in enumerate(layerDescriptor):
            layer = self.createLayer(layerDescriptor[i], 0 if i == 0 else layerDescriptor[i - 1])
            self.layers.append(layer)

    def createLayer(self, nbNeuron, nbLast):
        return [Neuron(nbLast) for _ in range(nbNeuron)]

    def activate(self, entries):
        for i in range(len(entries)):
            self.layers[0][i]._activation = entries[i]  # Initialize entry layer with entries values
        for i in range(1, len(self.layers)):  # For each layer
            for j in range(0, len(self.layers[i])):  # For each neuron of this layer
                self.layers[i][j].activateWithLayer(self.layers[i - 1])  # Compute the neuron

    def getOutputs(self):
        out = []
        for i in self.layers[-1]:
            out.append(i._activation)
        return out

    # Calculate the total loss of the network
    def calcLoss(self, inputs, outputs):
        loss = 0.
        for i in range(len(inputs)):
            self.activate(inputs[i])
            for i in range(len(self.layers[-1])):
                loss += outputs[i] * np.log(self.layers[-1][i]._activation) + \
                        (1. - outputs[i]) * np.log(1. - self.layers[-1][i]._activation)
        return -loss / len(inputs)

    def calculateGradients(self, desiredOutputs):
        for i in range(len(self.layers) - 1, 0, -1):
            for j in range(len(self.layers[i])):
                if i == len(self.layers) - 1:
                    self.layers[i][j].calculateOutputGradient(desiredOutputs[j])
                else:
                    self.layers[i][j].calculateHiddenGradient(self.layers[i + 1], j)

    def applyGradients(self, learningRate):
        for i in range(1, len(self.layers)):
            for n in self.layers[i]:
                n.applyGradientWithLayer(learningRate, self.layers[i - 1])


nn = NeuralNetwork([2, 2, 1])
inputs = [[0, 0], [1, 0], [0, 1], [1, 1]]
outputs = [[0], [1], [1], [1]]
for _ in range(500):
    for i in range(len(inputs)):
        nn.activate(inputs[i])
        nn.calculateGradients(outputs[i])
        nn.applyGradients(0.2)

nn.activate(inputs[0])
print(nn.getOutputs())
nn.activate(inputs[1])
print(nn.getOutputs())
nn.activate(inputs[2])
print(nn.getOutputs())
nn.activate(inputs[3])
print(nn.getOutputs())
