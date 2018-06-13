// Sylvie Langhout
// 10792368
// 
// project.js
// File with the functions for D3 Map with charts

window.onload = function() {

  console.log('Lets GO GO GO!');

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

  all_info = [];
  male_info = [];
  female_info = [];

  data_options = ["All", "Male", "Female"];
  patients_lenght = patients.length;

  for (var element = 0; element < patients_lenght; element ++){
      if (patients[element].YEA == "2012"){
        if (patients[element].Measure == "Incidence per 100 000 population"){
          all_info.push(patients[element]);
        }
      }
    }

    for (var element = 0; element < patients_lenght; element ++){
      if (patients[element].YEA == "2012"){
        if (patients[element].Measure == "Incidence per 100 000 females"){
          female_info.push(patients[element]);
        }
      }
    }
    for (var element = 0; element < patients_lenght; element ++){
      if (patients[element].YEA == "2012"){
        if (patients[element].Measure == "Incidence per 100 000 males"){
          male_info.push(patients[element]);
        }
      }
    }

  patient_info = [all_info, male_info, female_info];

  start_map = MapData(patient_info, 0);
  MakeMap(start_map);

  document.getElementById("All").onclick = function() {
    UpdateMapAll(MapData(patient_info, 0));
  }
  document.getElementById("Male").onclick = function() {
    UpdateMapMale(MapData(patient_info, 1));
  }
  document.getElementById("Female").onclick = function() {
    UpdateMapFemale(MapData(patient_info, 2));
  }

  protein = [];
  sugar = [];
  calories = [];
  fat = [];
  fruit = [];
  veggies = [];

  food_length = Food_supply.length
  for (var element = 0; element < food_length; element ++){
    if(Food_supply[element].YEA == "2012"){
      if (Food_supply[element].Variable == "Total fat supply"){
        fat.push(Food_supply[element]);
      }
      else if(Food_supply[element].Variable == "Total protein supply"){
        protein.push(Food_supply[element]);
      }
      else if(Food_supply[element].Variable == "Total calories supply"){
        calories.push(Food_supply[element]);
      }
      else if(Food_supply[element].Variable == "Sugar supply"){
        sugar.push(Food_supply[element]);
      }
      else if(Food_supply[element].Variable == "Fruits supply"){
        fruit.push(Food_supply[element]);
      }
      else if(Food_supply[element].Variable == "Vegetables supply"){
        veggies.push(Food_supply[element]);
      }
    }
  }

  first_scatter = ScatterData(calories, patient_info[0])
  MakeScatter(first_scatter)

  document.getElementById("Calories").onclick = function() {
    UpdateScatter(ScatterData(calories, patient_info[0]));
  }
  document.getElementById("Fat").onclick = function() {
    UpdateScatter(ScatterData(fat, patient_info[0]));
  }
  document.getElementById("Protein").onclick = function() {
    UpdateScatter(ScatterData(protein, patient_info[0]));
  }
  document.getElementById("Fruit").onclick = function() {
    UpdateScatter(ScatterData(fruit, patient_info[0]));
  }
  document.getElementById("Vegetables").onclick = function() {
    UpdateScatter(ScatterData(veggies, patient_info[0]));
  }
  document.getElementById("Sugar").onclick = function() {
    UpdateScatter(ScatterData(sugar, patient_info[0]));
  }
  
 }  
