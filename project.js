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
	.defer(d3.json, '../data/Food_supply.json')
	.defer(d3.json, '../data/Colorectal_cancer.json')
	.await(make_my_project);

function MakeMap(error, Food_supply, Colorectal_cancer) {
  if (error) throw error;

  console.log(Food_supply)
  console.log(Colorectal_cancer)

 }  

