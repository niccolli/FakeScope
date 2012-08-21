var MAX_OCL, browse, colors, container, drawGraph, oscilloRaw, reloadSpeed, reloadTimerId;

oscilloRaw = [];

MAX_OCL = 200;

reloadTimerId = null;

reloadSpeed = 100;

colors = {
  blue: '#00a7db',
  green: '#6cbb5a',
  red: '#e60012',
  yellow: '#d7c447',
  orange: '#f39700',
  pink: '#e85298',
  purple: '#9b7cb6'
};

browse = io.connect('http://strawberry.local:3000');

browse.on('push', function(data) {
  var point;
  point = data.split(",");
  oscilloRaw.push([point[0], point[1]]);
  if (oscilloRaw.length > MAX_OCL) return oscilloRaw.shift();
});

container = document.getElementById("graphDiv");

drawGraph = function() {
  var first, graph, oscilloView, point, _i, _len;
  oscilloView = [];
  first = oscilloRaw[0][0];
  for (_i = 0, _len = oscilloRaw.length; _i < _len; _i++) {
    point = oscilloRaw[_i];
    oscilloView.push([point[0] - first, point[1]]);
  }
  return graph = Flotr.draw(container, [oscilloView], {
    colors: [colors.green],
    xaxis: {
      minorTickFreq: 5,
      max: 2200,
      min: 0
    },
    yaxis: {
      max: 500,
      min: -500
    },
    grid: {
      minorVerticalLines: true
    }
  });
};

reloadTimerId = setInterval(function() {
  return drawGraph();
}, reloadSpeed);
