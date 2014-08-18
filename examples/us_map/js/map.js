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

// States
svg.append("path")
    .datum(topojson.feature(shape, shape.objects.states))
    .attr("class", "border border--state")
    .attr("d", path)
    
// Bubbles
svg.append("g")
    .attr('class', 'bubble')
	.selectAll("circle")
    .data(topojson.feature(shape, shape.objects.counties).features)
  	.enter().append("circle")
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("r", function(d) {
    	return formattedData[(d.id)] == undefined ? 0 : bubbleScale(formattedData[(d.id)])
    })
    

    
    
    