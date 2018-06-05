// Sylvie Langhout
// 10792368
// 
// project.js
// File with the functions for D3 Map with charts

window.onload = function() {

  console.log('Lets GO!')
};

// load in the needed json files
queue()
	.defer(d3.json, '../data/food_supply.json')
	.defer(d3.json, '../data/patients.json')
	.defer(d3.json, '../data/obesity.json')
	.defer(d3.json, '../data/deceased.json')
	.await(MakeMyProject);

function MakeMyProject(error, food_supply, patients, obesity, deceased) {
  if (error) throw error;

  console.log(food_supply)
  console.log(patients)
  console.log(obesity)
  console.log(deceased)


 }  

