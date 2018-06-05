// Sylvie Langhout
// 10792368
// 
// project.js
// File with the functions for D3 Map with charts

window.onload = function() {

  console.log('Lets GO!')
};

// load in the needed json files
d3.queue()
	.defer(d3.json, 'Food_supply.json')
	.defer(d3.json, 'Colorectal_cancer.json')
	.await(make_my_project);
