var width = 960,
    height = 500;
    
var color = d3.scale.category10()

// Format data
var formattedData = {}
data.map(function(d) {
	formattedData[d.fips] = (d.pop)
})

// Get min, max for scale
var min = d3.min(data, function(d) {return (d.pop)})
var max = d3.max(data, function(d) {return (d.pop)})

// Set scale

var scale = d3.scale.linear().range(['gray', 'red']).domain([min, max])
var path = d3.geo.path()

var bubbleScale = d3.scale.linear().range([.5, 50]).domain([min,max])
var svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);


// svg.append("path")
//     .datum(topojson.feature(shape, shape.objects.nation))
//     .attr("class", "land")
//     .attr("d", path);
// 
// svg.append("path")
//     .datum(topojson.mesh(shape, shape.objects.states, function(a, b) { return a !== b; }))
//     .attr("class", "border border--state")
//     .attr("d", path);
// States
svg.append("path")
    .datum(topojson.feature(shape, shape.objects.states))
    .attr("class", "border border--state")
    .attr("d", path)
    
// Counties
// svg.selectAll("path")
// 	.data(topojson.feature(shape, shape.objects.counties).features)
// 	.enter().append("path")
// 	.attr("d", path)
// 	.style('fill', '#d3d3d3')


	svg.append("g")
    .attr("class", "bubble")
  .selectAll("circle")
    .data(topojson.feature(shape, shape.objects.counties).features)
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("r", function(d) {
    	return bubbleScale(formattedData[(d.id)])
    })
    
   
    
    
    
    