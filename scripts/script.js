// Sylvie Langhout
// 10792368
// 
// project.js
// File with the functions for D3 Map with charts

window.onload = function() {

  console.log('Lets GO GO GO!')

// load in the needed json files
queue()
	.defer(d3.json, 'data/Food_supply.json')
	.defer(d3.json, 'data/patients.json')
	.defer(d3.json, 'data/obesity.json')
	.defer(d3.json, 'data/deceased.json')
	.await(MakeMyProject);

};
function MakeMyProject(error, Food_supply, patients, obesity, deceased) {
  if (error) throw error;

  console.log(Food_supply[201])
  console.log(patients[345])
  console.log(obesity[654])
  console.log(deceased[234])
  MakeMap()

 }  
