// Process data -- run in browser console

var data
d3.csv('data.csv', function(d) {
	console.log(d)
	data = d
})