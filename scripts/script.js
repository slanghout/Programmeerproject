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

  var data_type = 0

  patient_info = [all_info, male_info, female_info];

  start_map = MapData(patient_info, 0);
  MakeMap(start_map);

  document.getElementById("All").onclick = function() {
    data_type = 0
    UpdateMapAll(MapData(patient_info, data_type))
  }
  document.getElementById("Male").onclick = function() {
    data_type = 1
    UpdateMapMale(MapData(patient_info, data_type));
  }
  document.getElementById("Female").onclick = function() {
    data_type = 2
    UpdateMapFemale(MapData(patient_info, data_type));
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

  first_scatter = ScatterData(calories, patient_info[data_type])
  MakeScatter(first_scatter)
  var food_selected = calories

  document.getElementById("Calories").onclick = function() {
    UpdateScatter(ScatterData(calories, patient_info[data_type]), "Kilocalories", "per capita per day", data_type);
    food_selected = calories
  }
  document.getElementById("Fat").onclick = function() {
    UpdateScatter(ScatterData(fat, patient_info[data_type]), "Grammes of fat", "per capita per day", data_type);
    food_selected = fat
  }
  document.getElementById("Protein").onclick = function() {
    UpdateScatter(ScatterData(protein, patient_info[data_type]), "Grammes of protein", "per capita per day", data_type);
    food_selected = protein
  }
  document.getElementById("Fruit").onclick = function() {
    UpdateScatter(ScatterData(fruit, patient_info[data_type]), "Kilos of fruit", "per capita per year", data_type);
    food_selected = fruit
  }
  document.getElementById("Vegetables").onclick = function() {
    UpdateScatter(ScatterData(veggies, patient_info[data_type]), "Kilos of vegetables", "per capita per year", data_type);
    food_selected = veggies
  }
  document.getElementById("Sugar").onclick = function() {
    UpdateScatter(ScatterData(sugar, patient_info[data_type]), "Kilos of sugar", "per capita per year", data_type);
    food_selected = sugar
  }
  
 }  
