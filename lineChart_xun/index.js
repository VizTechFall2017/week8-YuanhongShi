var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 100;
var marginTop = 100;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//set up scales to position circles using the data
var scaleX = d3.scalePoint().domain(["","Nov-16", "Dec-16", "Jan-17", "Feb-17", "Mar-17", "Apr-17","May-17","Jun-17","Jul-17","Aug-17","Sep-17","Oct-17"]).range([0, 600]);
var scaleY = d3.scaleLinear().domain([0,1200]).range([400, 0]);  //remember that 0,0 is at the top of the screen! 300 is the lowest value on the y axis

var nestedData = [];

// Add the x Axis
svg.append("g")
    .attr('transform','translate(0,400)')  //move the x axis from the top of the y axis to the bottom
    .call(d3.axisBottom(scaleX));

svg.append("g")
    .call(d3.axisLeft(scaleY));

var makeLine = d3.line()
    .x(function(d) { return scaleX(d.Stock); })
    .y(function(d) { return scaleY(d.total); });

//import the data from the .csv file
d3.csv('./xundata4.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);

    var loadData = dataIn;

    svg.append('text')
        .text('Portfolio Perspective of Average VOLUME')
        .attr('transform','translate(300, -20)')
        .style('text-anchor','middle');


    svg.append('text')
        .text('Average Volume (x1000,000)')
        .attr('transform', 'translate(-50,250)rotate(270)');






    svg.append("path")

        .datum(dataIn)
        .attr("class", "line")
        .attr("d", makeLine)

        .attr('fill','none')
        .attr('stroke','pink')
        .attr('stroke-width',4)
    ;

});