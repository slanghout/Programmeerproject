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
	  				if(all_cancers[j].Variable == "Malignant neoplasms of lung" && all_cancers[j].Measure == "Incidence per 100 000 population"){
	  					cancer_frequency[i][0] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(2))
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of colon" && all_cancers[j].Measure == "Incidence per 100 000 population"){
	  					cancer_frequency[i][1] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(2))
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of female breast" && all_cancers[j].Measure == "Incidence per 100 000 females"){
	  					cancer_frequency[i][2] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(2))
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of prostate" && all_cancers[j].Measure == "Incidence per 100 000 males"){
	  					cancer_frequency[i][3] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(2))
	  					cancer_frequency[i][4] = all_cancers[j].Country
	  				}
	  			}
  			}
  		}
  	}

var lung = 0
var colon = 0
var breast = 0
var pros = 0

for (var i = 0; i < nr_of_countries; i++){
	lung += cancer_frequency[i][0]
	colon += cancer_frequency[i][1]
	breast += cancer_frequency[i][2]
	pros += cancer_frequency[i][3]

}

lung = parseFloat(parseFloat(lung / nr_of_countries).toFixed(2))
colon = parseFloat(parseFloat(colon / nr_of_countries).toFixed(2))
breast = parseFloat(parseFloat(breast / nr_of_countries).toFixed(2))
pros = parseFloat(parseFloat(pros / nr_of_countries).toFixed(2))
var name = "World"

var AUS = cancer_frequency[0]
var NL = cancer_frequency[18]
var USA = cancer_frequency[29]
var UK = cancer_frequency[28]
var BRZ = cancer_frequency[30]
var ZAF = cancer_frequency[39]
var World = [lung, colon, breast, pros, name]

MakeBarchart(World, World[4])

document.getElementById("NLD").onclick = function() {
    UpdateBarchart(NL, NL[4]); 
 }
 document.getElementById("AUS").onclick = function() {
    UpdateBarchart(AUS, AUS[4]); 
 }
 document.getElementById("USA").onclick = function() {
    UpdateBarchart(USA, USA[4]); 
 }
 document.getElementById("GBR").onclick = function() {
    UpdateBarchart(UK, UK[4]); 
 }
 document.getElementById("BRA").onclick = function() {
    UpdateBarchart(BRZ, BRZ[4]); 
 }
 document.getElementById("ZAF").onclick = function() {
    UpdateBarchart(ZAF, ZAF[4]); 
 }
  document.getElementById("World").onclick = function() {
    UpdateBarchart(World, World[4]); 
 }

}
