$(document).ready(function(){
  $svg = $("#svg");
  width = 500;
  height = 500;
  radius = width/2 * 4/5;
  pins = [];

  points = [];

  pinsLength = 20;
  $pins = $svgElement("g");
  $lines = $svgElement("path", {
    class: "line"
  });

  $svg.append($pins);
  $svg.append($lines);

  for(var i = 0; i < pinsLength; i++){
    var angle = Math.PI * 2 / pinsLength * i;
    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;
    var $pin = $svgElement("circle");

    $pin.attr("cx", width / 2 + x);
    $pin.attr("cy", height / 2 + y);
    $pin.attr("class", "circle");

    $pin.click(addPoint);

    $pins.append($pin);
  }

});

function addPoint(){
  points.push({
    x: Number(this.getAttribute("cx")),
    y: Number(this.getAttribute("cy"))
  });

  draw();
}

function draw(){
  var d = [];

  for(var i = 0; i < points.length; i++){
    var p = points[i];
    d.push(["M", "L"][Math.sign(i)]);
    d.push(p.x);
    d.push(p.y);
  }

  $lines.attr("d", d.join(" "));
}

function $svgElement(tag, attributes){
  attributes = attributes || {};
  var $elem = $(document.createElementNS("http://www.w3.org/2000/svg", tag));
  for(var key in attributes){
    $elem.attr(key, attributes[key]);
  }
  return $elem;
};
