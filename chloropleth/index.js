var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 0;
var marginTop = 0;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//set up the projection for the map
var albersProjection = d3.geoAlbersUsa()  //tell it which projection to use
    .scale(700)                           //tell it how big the map should be
    .translate([(width/2), (height/2)]);  //set the center of the map to show up in the center of the screen

//set up the path generator function to draw the map outlines
path = d3.geoPath()
    .projection(albersProjection);        //tell it to use the projection that we just made to convert lat/long to pixels

var stateLookup =  d3.map();

var colorScale = d3.scaleLinear().range(['white','blue']);

svg.append('text')
    .attr('x',100)
    .attr('y', 100)
    .attr('class', 'textBox')
    .text('');



queue()
    .defer(d3.json, './cb_2016_us_state_20m.json')
    .defer(d3.csv, './statePop.csv')
    .await(function(err, stateData, PopData){

        PopData.forEach(function(d){
            stateLookup.set(d.name, d.population);
        });

        colorScale.domain([0, d3.max(PopData.map(function(d){
            return d.population;
        }))]);

        //console.log(stateLookup.get('Maine'));

        svg.selectAll("path")               //make empty selection
            .data(stateData.features)          //bind to the features array in the map data
            .enter()
            .append("path")                 //add the paths to the DOM
            .attr("d", path)                //actually draw them
            .attr("class", "feature")
            .attr('fill',function(d){
                //console.log(stateData.properties.NAME);
                return colorScale(stateLookup.get(d.properties.NAME));
            })
            .attr('stroke','white')
            .attr('stroke-width',.2)
            .on('mouseover', function(d){
                //console.log(d.properties.NAME);
                d3.selectAll('.textBox')
                    .text(d.properties.NAME);
            });
    });


