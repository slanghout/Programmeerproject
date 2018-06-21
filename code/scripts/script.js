// Sylvie Langhout
// 10792368
// 
// project.js
// File with the functions for D3 Map with charts

window.onload = function() {

  console.log('Lets GO GO GO!');

// load in the needed json files
queue()
	.defer(d3.json, '../data/Food_supply.json')
	.defer(d3.json, '../data/patients.json')
	.defer(d3.json, '../data/obesity.json')
	.defer(d3.json, '../data/deceased.json')
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

  protein = [];
  sugar = [];
  calories = [];
  fat = [];
  fruit = [];
  veggies = [];
  all_protein = [];
  all_sugar = [];
  all_calories = [];
  all_fat = [];
  all_fruit = [];
  all_veggies = [];

  food_length = Food_supply.length
  
  for (var element = 0; element < food_length; element ++){
    if(Food_supply[element].YEA == "2012"){
      if (Food_supply[element].Variable == "Total fat supply"){
        fat.push(Food_supply[element])
        all_fat.push(parseFloat(Food_supply[element].Value));
      }
      else if(Food_supply[element].Variable == "Total protein supply"){
        protein.push(Food_supply[element])
        all_protein.push(parseFloat(Food_supply[element].Value));
      }
      else if(Food_supply[element].Variable == "Total calories supply"){
        calories.push(Food_supply[element])
        all_calories.push(parseFloat(Food_supply[element].Value));
      }
      else if(Food_supply[element].Variable == "Sugar supply"){
        sugar.push(Food_supply[element])
        all_sugar.push(parseFloat(Food_supply[element].Value));
      }
      else if(Food_supply[element].Variable == "Fruits supply"){
        fruit.push(Food_supply[element])
        all_fruit.push(parseFloat(Food_supply[element].Value));
      }
      else if(Food_supply[element].Variable == "Vegetables supply"){
        veggies.push(Food_supply[element])
        all_veggies.push(parseFloat(Food_supply[element].Value));
      }
    }
  }

  var all_food = [calories, protein, fat, sugar, fruit, veggies]
  var all_food_data = [all_calories, all_protein, all_fat,all_sugar, all_fruit, all_veggies]

  MakeMap(patient_info, data_type, all_food, all_food_data);
  MakeScatter(ScatterData(calories, protein, patient_info[data_type]), all_food, all_food_data)
  
  var food_selected = protein
  var food_info = ["Grammes of protein", "per capita per day"]

  d3.selectAll(".dropdown-item").on("click", function(){
    var value = this.getAttribute("value")
    data_type = value;
    UpdateMap(patient_info, data_type, all_food, all_food_data)
    var scatter_data = ScatterData(calories, food_selected, patient_info[data_type])
    UpdateScatter(scatter_data, food_info[0], food_info[1] , data_type, all_food, all_food_data);

  })
    
    d3.selectAll("input[name='optradio']").on("click", function(){
      var selected = this.getAttribute("value");
      if (selected == "Fat"){
        food_selected = fat
        food_info = ["Grammes of fat", "per capita per day"]
      }
      if(selected == "Protein"){
        food_selected = protein
        food_info = ["Grammes of protein", "per capita per day"]
      }
      if (selected == "Sugar"){
        food_selected = sugar
        food_info = ["Kilos of sugar", "per capita per year"]
      }
      if(selected == "Fruit"){
        food_selected = fruit
        food_info = ["Kilos of fruit", "per capita per year"]
      }
      if (selected == "Vegetables"){
        food_selected = veggies
        food_info = ["Kilos of vegetables", "per capita per year"]
      }
      var this_data = ScatterData(calories, food_selected, patient_info[data_type])
      UpdateScatter(this_data, food_info[0], food_info[1] , data_type, all_food, all_food_data);
    })
    
 }  
