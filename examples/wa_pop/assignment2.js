// Assignment2

// What is the length of the "data" array?  
data.length


// What is the fourth element of the array *hint: remember how indexing for arrays beings
data[3]


//  Using the array "map" funcitonality, create a variable "city_names" that is only the name of each city
city_names = data.map(function(d) {return d.city})

//  Using the array "map" funcitonality, create a variable "populations" that is only the population of each city
populations = data.map(function(d) {return d.pop})


// Sort the data variable by median age
data.sort(function(a,b) {return a.age > b.age})

// Based on this, what are the cities with the youngest/oldest median ages?

// Write a function called "description" that takes in an object (one element from the data array) and constructs the following sentence:
/*
	"The median age in " {city} " is " {median age}

*/

var description = function(city) {
	return "The median age in " + city.city + " is " + city.pop
}

// Pass one of the data elements to your function and view the results
description(data[10])

// Using the array filter functionality, create an array called "maleCities" that has the names of cities where there are more men than women
var maleCities  = data.filter(function(d) {return d.males>d.females})

// How many of the top 100 cities have more males than females?
maleCities.length
