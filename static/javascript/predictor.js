var st=0
var epoch=0

//function play(from_user){
//
//
//  if (from_user==true){
//// instance=setInterval(updatecanvas,50);
//  document.getElementById("label").innerHTML = "Connecting..."
//  st=0}
//  var xhttp = new XMLHttpRequest();
//  xhttp.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//      myObj = JSON.parse(this.responseText);
//      document.getElementById("label").innerHTML =
//      myObj.name;
//      updatecanvas(myObj.target)
////      testdata=myObj.target
////
//
//      if (st==1){ //clearInterval(instance)
//      document.getElementById("label").innerHTML = "Paused"}
//      else{
////      clearInterval(instance)
//
//    setTimeout(play,1,false);}
//
//    }
//  };
//  xhttp.open("GET", "/predict", true);
//  xhttp.send();
//}
function play(from_user){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      console.log("done")
      updatecanvas()
//      setTimeout(play,1,false)
//      testdata=myObj.target
//
}

  };
  xhttp.open("GET", "/predict", true);
  xhttp.send();
}

function pause(){

document.getElementById("label").innerHTML = "Pausing..."
st=1

}
function updatecanvas(){

var c = document.getElementById("myCanvas");
ctx = c.getContext('2d');
var im = ctx.createImageData(200, 200); // only do this once per page
        var d = im.data;
        var j;
        var pixel=0;
        for (j = 0; j <= 160000; j += 4) {
//            let c=( (w0*b+w1*(pixel%300)+w2*parseInt(pixel/300,10))>=0 ? 1 : 0)
            d[j] = 0//Math.round(Math.random())*255;
            d[j + 1] = 255*myObj.name[j/4]//Math.round(Math.random())*255;
            d[j + 2] = 255*(1-myObj.name[j/4])//Math.round(Math.random())*255;
//
            d[j + 3] = 120//Math.round(Math.random())*255;
        pixel++;
        }

        /* var imgData = ctx.getImageData(10, 10, 50, 50) ; */
        ctx.putImageData(im, 0, 0);
        epoch+=1
        document.getElementById("epoch").innerHTML ="epoch : "+epoch.toString();
        for (var aa=0;aa<100;aa++) {
        ctx.fillStyle = ((trainingData.targets[aa]>0) ? "blue": "orange");
        ctx.fillRect(trainingData.coordinates[aa][0], trainingData.coordinates[aa][1],3,3);
    }
    return

}