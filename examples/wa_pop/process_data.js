// Process data -- run in browser console

var data
var len
d3.csv('data.csv', function(d) {
	console.log(d)
	data = d
	len = data.length
})

