/* Sylvie Langhout
* 10792368
* script_data.js
* Functions to load data, initialize project and update interactivity
*/

window.onload = function() {

// load in the needed json files
queue()
	.defer(d3.json, "../../data/foodSupply.json")
	.defer(d3.json, "../../data/patients.json")
	.await(makeMyProject);

};

// function to create initial data page
function makeMyProject(error, foodSupply, patients){
  if (error) throw error;

  // create empty datasets for all, male or female data
  allData = [];
  maleData = [];
  femaleData = [];

  // determine length of entire dataset
  length = patients.length;

  // iterate over dataset and select data of 2012 for entire population
  for (var i = 0; i < length; i ++){
      if (patients[i].YEA == "2012"){
        if (patients[i].Measure == "Incidence per 100 000 population"){
          allData.push(patients[i])
        };
      };
    };

    // iterate over dataset and select data of 2012 for female population
    for (var i = 0; i < length; i ++){
      if (patients[i].YEA == "2012"){
        if (patients[i].Measure == "Incidence per 100 000 females"){
          femaleData.push(patients[i])
        };
      };
    };

    // iterate over dataset and select data of 2012 for male population
    for (var i = 0; i < length; i ++){
      if (patients[i].YEA == "2012"){
        if (patients[i].Measure == "Incidence per 100 000 males"){
          maleData.push(patients[i])
        };
      };
    };

  // set initial datatype at 0 for all data
  var dataType = 0;

  // create array with datasets of
  var incidenceData = [allData, maleData, femaleData];

  // create empty arrays for the entire data per food type
  var proteinData = [];
  var sugarData = [];
  var caloriesData = [];
  var fatData = [];
  var fruitData = [];
  var veggiesData = [];

  // create empty arrays for only the values of the food type
  var proteinValue = [];
  var sugarValue = [];
  var caloriesValue = [];
  var fatValue = [];
  var fruitValue = [];
  var veggiesValue = [];

  // determine length of the food dataset
  var foodLength = foodSupply.length;
  
  // iterate over the length of the food dataset and select year 2012
  for (var i = 0; i < foodLength; i ++){
    if(foodSupply[i].YEA == "2012"){
      
      // find and push the data about fat
      if (foodSupply[i].Variable == "Total fat supply"){
        fatData.push(foodSupply[i]);
        fatValue.push(parseFloat(foodSupply[i].Value));
      }

      // find and push the data about protein
      else if(foodSupply[i].Variable == "Total protein supply"){
        proteinData.push(foodSupply[i])
        proteinValue.push(parseFloat(foodSupply[i].Value));
      }

      // find and push the data about calories
      else if(foodSupply[i].Variable == "Total calories supply"){
        caloriesData.push(foodSupply[i]);
        caloriesValue.push(parseFloat(foodSupply[i].Value));
      }

      // find and push the data about sugar
      else if(foodSupply[i].Variable == "Sugar supply"){
        sugarData.push(foodSupply[i]);
        sugarValue.push(parseFloat(foodSupply[i].Value));
      }

      // find and push the data about fruit 
      else if(foodSupply[i].Variable == "Fruits supply"){
        fruitData.push(foodSupply[i]);
        fruitValue.push(parseFloat(foodSupply[i].Value));
      }

      // find and push the data about vegetables
      else if(foodSupply[i].Variable == "Vegetables supply"){
        veggiesData.push(foodSupply[i]);
        veggiesValue.push(parseFloat(foodSupply[i].Value));
      };
    };
  };

  var nrOfCountries = caloriesData.length;

  // create datasets with all the values of the food types
  var foodData = [caloriesData, proteinData, fatData, sugarData,
    fruitData, veggiesData];
  var foodValue = [caloriesValue, proteinValue, fatValue,
    sugarValue, fruitValue, veggiesValue];

  // create initial scatterplot and map with the data
  makeMap(incidenceData, dataType, foodData, foodValue);
  makeScatter(scatterData(caloriesData, proteinData, incidenceData[dataType]),
    foodData, foodValue, dataType);
  
  // initial food selected is protein
  var foodSelected = proteinData;
  var foodInfo = ["Grammes of protein", "per capita per day"];

  // after dropdown click update scatterplot and map
  d3.selectAll(".dropdown-item").on("click", function(){
    
    // remember the data selected
    var value = this.getAttribute("value");
    dataType = value;

    // update the map and scatterplot
    updateMap(incidenceData, dataType, foodData, foodValue);
    var selectedData = scatterData(caloriesData, foodSelected,
      incidenceData[dataType]);
    updateScatter(selectedData, foodInfo[0], foodInfo[1] , dataType,
        foodData, foodValue);
    
  });
    
  // after checkbox click update scatterplot and map
  d3.selectAll("input[name='optradio']").on("click", function(){
    
    // determine the food type selected
    var selected = this.getAttribute("value");
    
    // if fat was selected update the food info and selected food to fat
    if (selected == "Fat"){
      foodSelected = fatData;
      foodInfo = ["Grammes of fat", "per capita per day"];
    }

    // if protein was selected update the food info and selected food to protein
    else if(selected == "Protein"){
      foodSelected = proteinData;
      foodInfo = ["Grammes of protein", "per capita per day"];
    }

    // if sugar was selected update the food info and selected food to sugar
    else if (selected == "Sugar"){
      foodSelected = sugarData;
      foodInfo = ["Kilos of sugar", "per capita per year"];
    }
    // if fruit was selected update the food info and selected food to fruit
    else if(selected == "Fruit"){
      foodSelected = fruitData;
      foodInfo = ["Kilos of fruit", "per capita per year"];
    }

    // if vegetables was selected update the food info and selected food to veg
    else if (selected == "Vegetables"){
      foodSelected = veggiesData;
      foodInfo = ["Kilos of vegetables", "per capita per year"];
    };

    // update map and scatterplot with the new data
    var selectedData = scatterData(caloriesData, foodSelected,
        incidenceData[dataType]);
    updateScatter(selectedData, foodInfo[0], foodInfo[1] , dataType,
        foodData, foodValue);
  });
};