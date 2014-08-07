// Width and height settings
var settings = {
  width:600, 
  height:600, 
  radius:10,
  padding:45
}
 
 
// Scale setting function
var setScales = function() {
	// Get min/max values for x
	xValues = data.map(function(d) {return d.ex_1960})
	xMin = d3.min(xValues)
	xMax = d3.max(xValues)
  
	// Using a function for y
	yMin = d3.min(data, function(d ){return d.ex_2012})
	yMax = d3.max(data, function(d ){return d.ex_2012})
  
	// Define the xScale
	xScale = d3.scale.linear().domain([xMin, xMax]).range([settings.radius, settings.width - settings.radius])
 
	// Define the yScale
	yScale = d3.scale.linear().domain([yMin, yMax]).range([settings.height - settings.radius,settings.radius])
	
	// Define the xAxis
	xAxisFunction = d3.svg.axis()
	  .scale(xScale)
	  .orient('bottom')
	  .ticks(4)
	  
	// Define the yAxis
	yAxisFunction = d3.svg.axis()
	  .scale(yScale)
	  .orient('left')
	  .ticks(4)
	  
	// Color scale
	colorScale = d3.scale.category10()
}  

// Function to build chart -- appends axes, then calls the draw function for the circle elements
var build = function() {
	// Set scales
	setScales()
	
	// Append xAxis
	xAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + settings.padding + ','+ (settings.height + settings.padding) + ')')
	  .call(xAxisFunction)
	  
	// Append yAxis
	yAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + settings.padding + ',' + settings.padding + ')')
	  .call(yAxisFunction)
	  
	// Append G in which to draw the plot
	plotG = d3.select('#scatter-svg').append('g').attr('transform', 'translate(' + settings.padding + ',' + settings.padding + ')')
	
	// Draw legend
	drawLegend()
	
	// Draw axis labels
	drawAxisLabels()
	
	// Draw circles and axes
	draw()
}
// Circle positioning function
var circleFunc = function(circ) {
	circ
	.attr('cx', function(d) {return xScale(d.ex_1960)})
  	.attr('cy', function(d) {return yScale(d.ex_2012)})
	.attr('r', settings.radius)
	.attr('fill', function(d) {
		return colorScale(d.region)
	})
	.style('opacity', '.8')
} 

// Draw function
var draw = function() {
	// Set the scales
	setScales()
	
	// Bind data
	var circles = plotG.selectAll('circle').data(data)
	
	// Enter new elements
	circles.enter().append('circle').call(circleFunc)
	
	// Exit elements that may have left
	circles.exit().remove()
	
	// Transition all circles to new ddata
	plotG.selectAll('circle').transition().duration(500).call(circleFunc)
	
	// Axes
	
}	

// Draw axis labels
var drawAxisLabels = function() {
	// xAxisLabel
	xAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.width/2 + ',' + (settings.height + settings.padding*2) + ')').text('Life expectancy 1960')
	
	// yAxisLabel
	yAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.padding/3 + ',' + (settings.height*2/3) + ') rotate(270)').text('Life expectancy 2012')

	// title
	title = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.width/2.5 + ',' + (30) + ')').text('Life expectancy: 1960 versus 2012')
}

// Legend function
var drawLegend = function() {
	// Get unique list of regions from data
	var regions = []
	data.map(function(d) {
		if(regions.indexOf(d.region) == -1) regions.push(d.region)
	})
	
	// Append a legend G
	legendG = d3.select('#scatter-svg').append('g').attr('id', 'legendG').attr('transform', 'translate(' + (settings.width + 2*settings.padding) + ',' + settings.padding + ')')
	legendG.selectAll('text')
		.data(regions)
		.enter().append('text')
		.text(function(d) {return d})
		.attr('transform', function(d,i) {return 'translate(0, ' + i*20 + ')'})
		.style('fill', function(d) {return colorScale(d)})
}

// Call the draw function to make the visualization
build()