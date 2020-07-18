from flask import Flask, render_template,jsonify
import random,time,math
import torch

from flask import request
if torch.cuda.is_available():
  device = torch.device("cuda")
else:
  device = torch.device("cpu")
import numpy as np
# from torch.utils.data import TensorDataset, DataLoader

import torchvision
from torchvision import transforms, datasets
import torch.nn as nn
import torch.nn.functional as F
import sklearn.datasets


app = Flask(__name__)


class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        # Our network consists of 3 layers. 1 input, 1 hidden and 1 output layer
        # This applies Linear transformation to input data.
        self.fc1 = nn.Linear(2, 6)
        self.fc2 = nn.Linear(6, 32)
        self.fc3 = nn.Linear(32, 8)

        # This applies linear transformation to produce output data
        self.fc4 = nn.Linear(8, 2)

    # This must be implemented
    def forward(self, x):
        # Output of the first layer
        x = self.fc1(x)
        # Activation function is Relu. Feel free to experiment with this
        x = F.tanh(x)
        x = F.tanh(self.fc2(x))
        x = F.tanh(self.fc3(x))
        # This produces output
        x = self.fc4(x)
        return x

    # This function takes an input and predicts the class, (0 or 1)
    def predict(self, x):
        # Apply softmax to output
        pred = F.softmax(self.forward(x))
        ans = []
        for t in pred:
            if t[0] > t[1]:
                ans.append(0)
            else:
                ans.append(1)
        return torch.tensor(ans)


@app.route('/')
def start():
    return render_template("index1.html")

@app.route('/generate_data')
def generatedata():

    coordinates=[]
    dataset = request.args.get('dataset')
    global X, y

    if dataset=="blob":
        X, y = sklearn.datasets.make_blobs(n_samples=200, centers=2, center_box=(100, 110))
    elif dataset=="circle":
        X, y = sklearn.datasets.make_circles(200, noise=0.04)
    elif dataset=="moon":
        X, y = sklearn.datasets.make_moons(n_samples=200, noise=0.1)
    elif dataset=="random":
        for i in range(200):
            coordinates.append({"x": random.random()*310,
                                "y": random.random()*310,
                                "z": random.choice([0,1])
                                })
        return jsonify({"coordinates": coordinates})
    else :
        return jsonify(error=404)


    # X,y=sklearn.datasets.make_blobs(n_samples=200, centers=2,center_box=(100,110))
    #                             shuffle=True, random_state=None)
    # X, y = sklearn.datasets.make_circles(500,noise=0.04)
    # X,y=sklearn.datasets.make_moons(n_samples=500, noise=0.1)


    x_min, x_max = X[:, 0].min()-.5, X[:, 0].max()+0.5
    y_min, y_max = X[:, 1].min()-0.5, X[:, 1].max()+.5
    # NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
    for i, val in enumerate(X):
        coordinates.append({"x":float(((val[0]-x_min)*310)/(x_max-x_min)),"y":float(((val[1]-y_min)*310)/(y_max-y_min)),
                            "z":int(y[i])})
    X = torch.from_numpy(X).type(torch.FloatTensor)
    y = torch.from_numpy(y).type(torch.LongTensor)

    return jsonify({"coordinates":coordinates})
@app.route('/predict')
def predict1():
    Data = []


    x_min, x_max = X[:, 0].min() - .5, X[:, 0].max() + .5
    y_min, y_max = X[:, 1].min() - .5, X[:, 1].max() + .5
    h = 0.1
    # print("l",len(xx))
    # Generate a grid of points with distance h between them

    xx, yy = np.meshgrid(np.arange(x_min, x_max, (x_max-x_min)/31), np.arange(y_min, y_max, (y_max-y_min)/31))
    print("shape is ",xx.shape)


    def predict(x):
        x = torch.from_numpy(x).type(torch.FloatTensor)
        ans = model.predict(x)
        return ans.tolist()

    model = Net()
    # Define loss criterion
    criterion = nn.CrossEntropyLoss()
    # Define the optimizer
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

    # Number of epochs
    epochs = 200
    # List to store losses
    losses = []
    import time
    t1 = time.time()
    for i in range(epochs):
        # print("epoch : ",i)
        # Precit the output for Given input
        y_pred = model.forward(X)
        # Compute Cross entropy loss
        loss = criterion(y_pred, y)
        # Add loss to the list
        losses.append(loss.item())
        # Clear the previous gradients
        optimizer.zero_grad()
        # Compute gradients
        loss.backward()
        # Adjust weights
        optimizer.step()
        # plot_decision_boundary(lambda x: predict(x), X.numpy(), y.numpy())
        pred_func=lambda x: predict(x)
        Z = pred_func(np.c_[xx.ravel(), yy.ravel()])
        # Z = lambda x: predict(np.c_[xx.ravel(), yy.ravel()])
        z = ["," if x == " " else x for x in Z]
        Data.append(z)

    t2 = time.time()

    from sklearn.metrics import accuracy_score
    print("accuracy is ",accuracy_score(model.predict(X), y))

    print("time took", t2 - t1)


    return jsonify({"data":Data})
if "__name__"=="__main__":
    app.run()

