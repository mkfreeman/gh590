// Format JSON file -- local server must be running to work
var data

// Read in data, filter out missing observations
d3.csv('ex_1960_2012.csv', function(d) {
	data = d.filter(function(dd) {
		return dd.ex_1960!= "" && dd.ex_2012 != "" && dd.region!=""
	})
})

// Stringify data for saving: run in console, copy and paste into data.js file
JSON.stringify(data)