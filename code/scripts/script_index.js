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
  BarData(countries, all_cancers, cancer_frequency)
}