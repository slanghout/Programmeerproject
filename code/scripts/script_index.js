window.onload = function() {

  console.log('Lets GO GO GO!');


queue()
	.defer(d3.json, 'data/all_cancers.json')
	.await(CreateIndex);

};

function CreateIndex(error, all_cancers) {
  if (error) throw error;

  var countries = []
  var cancer_frequency = []
  cancer_length = all_cancers.length
  for (var element = 1; element < cancer_length; element ++){
		if(countries.length < 1){
			countries.push(all_cancers[element].COU)
			cancer_frequency.push([])
		}
		else{
			for(var k = 0; k < countries.length; k++){
				if (countries[k] == all_cancers[element].COU){
					break
				}
				if (countries[k] == all_cancers[element].COU){
					continue
				}
				if (k == countries.length - 1 && countries[k] != all_cancers[element].COU){
					countries.push(all_cancers[element].COU)
					cancer_frequency.push([])
					}
			}
		}
		
	}
	var nr_of_countries = countries.length


  for (var i = 0; i < nr_of_countries; i ++){ 
  		for (var j = 0; j < cancer_length; j++){
  			if(countries[i] == all_cancers[j].COU){
  				if (all_cancers[j].YEA == "2012"){
	  				if(all_cancers[j].Variable == "Malignant neoplasms of colon" && all_cancers[j].Measure == "Incidence per 100 000 population"){
	  					cancer_frequency[i][0] = parseFloat(all_cancers[j].Value)
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of lung" && all_cancers[j].Measure == "Incidence per 100 000 population"){
	  					cancer_frequency[i][1] = parseFloat(all_cancers[j].Value)
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of female breast" && all_cancers[j].Measure == "Incidence per 100 000 females"){
	  					cancer_frequency[i][2] = parseFloat(all_cancers[j].Value)
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of prostate" && all_cancers[j].Measure == "Incidence per 100 000 males"){
	  					cancer_frequency[i][3] = parseFloat(all_cancers[j].Value)
	  				}
	  			}
  			}
  		}
  	}

console.log(cancer_frequency)


MakeBarchart(cancer_frequency[0])
}