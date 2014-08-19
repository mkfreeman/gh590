// Width and height settings
var settings = {
  width:600, 
  height:600, 
  radius:10,
  padding:45, 
  xVar:'ex_1990', 
  yVar:'ex_2000',
}
 
var prepData = function() {
	data = rawData.filter(function(d) {
		return d[settings.xVar] != "" &  d[settings.yVar] != "" &&  d[settings.region] != ""
	}).map(function(d) {
		var obj = {}
		obj.region = d.region
		obj.x = d[settings.xVar]
		obj.y = d[settings.yVar]
		return obj
	})	
}
// Scale setting function
var setScales = function() {
	// Get min/max values for x
	xValues = data.map(function(d) {return d.x})
	xMin = d3.min(xValues)
	xMax = d3.max(xValues)
  
	// Using a function for y
	yMin = d3.min(data, function(d ){return d.y})
	yMax = d3.max(data, function(d ){return d.y})
  
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
	// Append xAxis
	xAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + settings.padding + ','+ (settings.height + settings.padding) + ')')
	  
	  
	// Append yAxis
	yAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + settings.padding + ',' + settings.padding + ')')
	  
	  
	// Append G in which to draw the plot
	plotG = d3.select('#scatter-svg').append('g').attr('transform', 'translate(' + settings.padding + ',' + settings.padding + ')')
	
	
	// Append text elements to hold axis labels
	xAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.width/2 + ',' + (settings.height + settings.padding*2) + ')')
	
	// yAxisLabel
	yAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.padding/3 + ',' + (settings.height*2/3) + ') rotate(270)')

	// title
	title = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.width/2.5 + ',' + (30) + ')')

	drawAxisLabels()
	
	// Draw circles and axes
	draw()
	
	// Draw legend
	drawLegend()
	
	// Bind events to dropdowns
	$('#xvar').selectmenu({
		change:function() {
			settings.xVar = $(this).val()
			draw()
		}
	})
	
	$('#yvar').selectmenu({
		change:function() {
			settings.yVar = $(this).val()
			draw()
		}, 
	})
}
// Circle positioning function
var circleFunc = function(circ) {
	circ
	.attr('cx', function(d) {return xScale(d.x)})
  	.attr('cy', function(d) {return yScale(d.y)})
	.attr('r', settings.radius)
	.attr('fill', function(d) {
		return colorScale(d.region)
	})
	.style('opacity', '.8')
} 

// Draw function
var draw = function() {
	// Prep Data
	prepData()
	
	// Set scales
	setScales()
	
	// Bind data
	var circles = plotG.selectAll('circle').data(data)
	
	// Enter new elements
	circles.enter().append('circle').call(circleFunc)
	
	// Exit elements that may have left
	circles.exit().remove()
	
	// Transition all circles to new ddata
	plotG.selectAll('circle').transition().duration(500).call(circleFunc)
	
	// Call axis functions
	xAxis.call(xAxisFunction)
	yAxis.call(yAxisFunction)
	
	// Update text
	drawAxisLabels()
}	

// Draw axis labels
var drawAxisLabels = function() {
	// xAxisLabel
	var xYear = settings.xVar.replace("ex_", "")
	var yYear = settings.yVar.replace("ex_", "")	
	xAxisLabel.text('Life expectancy ' + xYear)
	
	// yAxisLabel
	yAxisLabel.text('Life expectancy ' + yYear)

	// title
	title.text('Life expectancy: ' + xYear + ' versus ' + yYear)
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