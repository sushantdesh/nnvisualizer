function generate_data(){
var c = document.getElementById("myCanvas");
ctx = c.getContext('2d');
ctx.clearRect(0, 0, c.width, c.height);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      trainingData = JSON.parse(this.responseText);
      console.log(trainingData.coordinates)
       for (var aa=0;aa<100;aa++) {
        ctx.fillStyle = ((trainingData.targets[aa]>0) ? "#0000ff": "#b36200");
        ctx.fillRect(trainingData.coordinates[aa][0], trainingData.coordinates[aa][1],3,3);
    }

      }
  };
  xhttp.open("GET", "/generate_data", true);
  xhttp.send();

}
