window.onload = function() {

// Load data of all cancer types
queue()
	.defer(d3.json, 'data/allCancers.json')
	.await(createIndex);

};

// function to create the home page
function createIndex(error, allCancers) {
  if (error) throw error;

  // create empty array for the countries and cancer data
  var countries = [];
  var cancerFrequency = [];
  cancerLength = allCancers.length;
  
  // iterate over the list of cancer types and select countries
  for (var element = 1; element < cancerLength; element ++){
		
		// push first country to the list
		if(countries.length < 1){
			countries.push(allCancers[element].COU);
			cancerFrequency.push([]);
		}

		// check if cancer is already in list, if it's not push it
		else{
			for(var k = 0; k < countries.length; k++){
				if (countries[k] == allCancers[element].COU){
					break
				}
				if (k == countries.length - 1
					&& countries[k] != allCancers[element].COU){
					countries.push(allCancers[element].COU);
					cancerFrequency.push([]);
				};
			};
		};
		
	};
	
	// create dataset for the initial bargraph 
  	barData(countries, allCancers, cancerFrequency);
};