var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;


var marginLeft = 100;
var marginTop = 10;


//set up scales to position circles using the data
var scaleX = d3.scalePoint().domain(["16-19", "20-24", "25-34", "35-44", "45-54", "55-64","65+"]).range([0, 600]);
var scaleY = d3.scaleLinear().domain([0,1200]).range([400, 0]);  //remember that 0,0 is at the top of the screen! 300 is the lowest value on the y axis


var makeLine = d3.line()
    .x(function(d){
        return scaleX(d.age);
    })
    .y(function(d){
        return scaleY(d.total);
    });

var makeLine1 = d3.line()
    .x(function(d){
        return scaleX(d.age);
    })
    .y(function(d){
        return scaleY(d.TESLA);
    });


var svg1 = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate('+ marginLeft +', '+ marginTop+')');

var svg2 = d3.select('#svg2')

    .append('g')
    .attr('transform', 'translate('+ marginLeft +', '+ marginTop+')');

var svg3 = d3.select('#svg3')
    .append('g')
    .attr('transform', 'translate('+ marginLeft +', '+ marginTop+')');

var svg4 = d3.select('#svg4')
    .append('g')
    .attr('transform', 'translate('+ marginLeft +', '+ marginTop+')');

d3.csv('./incomeData.csv', function(dataIn) {

    svg1.append('text')
        .text('Weekly income by age and gender')
        .attr('transform','translate(300, 100)')
        .style('text-anchor','middle');

    svg1.append('text')
        .text('age group')
        .attr('transform','translate(260, '+(height-30)+')');

    svg1.append('text')
        .text('weekly income')
        .attr('transform', 'translate(-50,250)rotate(270)');


    svg1.append('path')
        .datum(dataIn)
        .attr('class', 'line')
        .attr('d', makeLine)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-dasharray', 8);

    svg1.append('path')
        .datum(dataIn)
        .attr('class', 'line1')
        .attr('d', makeLine1)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-dasharray', 5);


    //svg2 part

    svg2.append('text')
        .text('age group2')
        .attr('transform','translate(260, '+(height-30)+')');

    svg2.append('text')
        .text('weekly income')
        .attr('transform', 'translate(-50,250)rotate(270)');


    svg2.append('path')
        .datum(dataIn)
        .attr('class', 'line')
        .attr('d', makeLine)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-dasharray', 8);

    svg2.append('path')
        .datum(dataIn)
        .attr('class', 'line1')
        .attr('d', makeLine1)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-dasharray', 5);



});