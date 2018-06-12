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

  all_info = []
  male_info = []
  female_info = []

  data_options = ["All", "Male", "Female"]
  patients_lenght = patients.length

  for (var element = 0; element < patients_lenght; element ++)
    {
      if (patients[element].YEA == "2012")
      {
        if (patients[element].Measure == "Incidence per 100 000 population")
        {
          all_info.push(patients[element])
        }
      }
    }

    for (var element = 0; element < patients_lenght; element ++)
    {
      if (patients[element].YEA == "2012")
      {
        if (patients[element].Measure == "Incidence per 100 000 females")
        {
          female_info.push(patients[element])
        }
      }
    }
    for (var element = 0; element < patients_lenght; element ++)
    {
      if (patients[element].YEA == "2012")
      {
        if (patients[element].Measure == "Incidence per 100 000 males")
        {
          male_info.push(patients[element])
        }
      }
    }

    patient_info = [all_info, male_info, female_info]

  protein = []
  sugar = []
  calories = []
  fat = []
  fruit = []
  veggies = []
  all_food = []

  food_length = Food_supply.length
  for (var element = 0; element < food_length; element ++)
  {
    if(Food_supply[element].YEA == "2012")
    {
      if (Food_supply[element].Variable == "Total fat supply")
      {
        fat.push(Food_supply[element])
      }
      else if(Food_supply[element].Variable == "Total protein supply")
      {
        protein.push(Food_supply[element])
      }
      else if(Food_supply[element].Variable == "Total calories supply")
      {
        calories.push(Food_supply[element])
      }
      else if(Food_supply[element].Variable == "Sugar supply")
      {
        sugar.push(Food_supply[element])
      }
      else if(Food_supply[element].Variable == "Fruits supply")
      {
        fruit.push(Food_supply[element])
      }
      else if(Food_supply[element].Variable == "Vegetables supply")
      {
        veggies.push(Food_supply[element])
      }
    }
  }
  all_food.push(veggies)
  all_food.push(fruit)
  all_food.push(sugar)
  all_food.push(calories)
  all_food.push(protein)
  all_food.push(fat)

  start_map = map_data(patient_info, 0)
  make_map(start_map)

  document.getElementById("All").onclick = function() {
    update_map_all(map_data(patient_info, 0))
  }
  document.getElementById("Male").onclick = function() {
    update_map_male(map_data(patient_info, 1))
  }
  document.getElementById("Female").onclick = function() {
    update_map_female(map_data(patient_info, 2))
  }

  scatter_data(veggies, patient_info[0])
  console.log(patient_info[0])

 }  
