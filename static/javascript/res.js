var data1=[]
var data=[]
var count=0


//updateData()

function solve(values,time) {

var svg = d3.select('svg'),
        svgWidth = +svg.attr('width'),

        n = 31, // data width
        m = 31 // data height


    var thresholds = d3.range(0, 1, 0.01);
    var color = d3.scaleLinear()
        .domain(d3.extent(thresholds))
        .interpolate(function() {
            return d3.interpolateCool;
        });


    let paths = svg.selectAll('path')
        .data(d3.contours()
            .size([n, m])
            .thresholds(thresholds)(values) // this will create 6 step

        );

    const pathsExit = paths.exit().remove();

    const pathsEnter = paths.enter().append('path')
        .attr('d', d3.geoPath(d3.geoIdentity().scale(svgWidth / n)))
        .style('fill', function(d) {
            return color(d.value);
        })
        .style('stroke', function(d) {
            return color(d.value);
        })
        .style('stroke-width', 2.5)
        .style('stroke-dasharray', '0, 1000');

    paths = pathsEnter.merge(paths);

    paths.transition()
        .duration(100)
        .attr('d', d3.geoPath(d3.geoIdentity().scale(svgWidth / n)))
    console.log(data)
     var circles = svg
            .selectAll('circle')
            .data(data);

        circles.enter()
            .append('circle')
            .attr('cx', function(d) {
                return d.x;
            })
            .attr('cy', function(d) {
                return d.y;
            })
            .attr('r', 2)
            .attr('stroke', 'black')
            .attr('fill', function(d){
            return color(d.z)

            });
        circles.exit()
            .remove();

        circles.transition()
            .duration(time)
            .attr('cx', function(d) {
                return d.x;
            })
            .attr('cy', function(d) {
                return d.y;
            })
            .attr('fill',function (d){
            return color(d.z)})


    // march the contours into existence
    /*  svg.selectAll('path')
       .transition()
       .duration(1000)

       .style('stroke-dasharray', '1000, 0'); */
    return

}



function updateData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            myObj = JSON.parse(this.responseText);
            data1=data1.concat(myObj.data)
            console.log("data is ready")

//      setTimeout(play,1,false)
//      testdata=myObj.target
//
        }

    };
    xhttp.open("GET", "/predict", true);
    xhttp.send();
}
function run() {

updateData()
   var fps=setInterval(function () {
        if (data1.length%50==0){
        updateData}
        if (data1.length>1){
        console.log("this")
        solve(data1[count],1)
        count+=1}
//        else{ clearInterval(fps)}

    }, 100);
}


function regenerate(p) {

    var params="dataset="
    params=params.concat(p)
    var xhttp = new XMLHttpRequest();
    console.log(params)
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            myObj = JSON.parse(this.responseText);
            data=myObj.coordinates
            console.log(myObj.coordinates)

//            show_data()
              var f=[]
             for (var i=0;i<31*31;i++){
             if (Math.random()>=0.5){
             f.push(1)}
             else {f.push(0)}
             }
             console.log(f)
             solve([f],1000)

//      setTimeout(play,1,false)
//      testdata=myObj.target
//
        }

    };
    xhttp.open("GET", "/generate_data"+"?"+params, true);
    xhttp.send();

}