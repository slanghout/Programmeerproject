// Sylvie Langhout
// 10792368
// 
// make_map.js
// Function to make map

// function create dataset for the map with all, male of female data
function MapData(patient_info, x){
	data_map = {}
	for (var i = 0; i < patient_info[x].length; i ++)
	{
	if (patient_info[x][i].Value <= 10)
	 {
	  country = patient_info[x][i].COU
	  data_map[country] = {fillKey: "LOW", value: patient_info[x][i].Value};
	}
	else if (patient_info[x][i].Value <= 25 && patient_info[x][i].Value > 10)
	{
	  country = patient_info[x][i].COU
	  data_map[country] = {fillKey: "MEDIUM", value: patient_info[x][i].Value};
	}
	else if (patient_info[x][i].Value <= 35 && patient_info[x][i].Value > 25)
	{
	  country = patient_info[x][i].COU
	  data_map[country] = {fillKey: "HIGH", value: patient_info[x][i].Value};
	}
	else if (patient_info[x][i].Value > 35)
	{
	  country = patient_info[x][i].COU
	  data_map[country] = {fillKey: "HIGHEST", value: patient_info[x][i].Value};
	}
	}
	return(data_map)
}

// function to create initial map
function MakeMap(data_map) {
  var map = new Datamap({element: document.getElementById('my-map'),
	fills: {
	            HIGHEST: '#006d2c',
	            HIGH: '#31a354',
	            MEDIUM: '#74c476',
	            LOW: '#bae4b3',
	            defaultFill: "#edf8e9"
	        },
        data: data_map,

         geographyConfig: {
            popupTemplate: function(geo, data_map) {
            	if (!data_map){
					 return ['<div class="hoverinfo"><strong>',
									 'There is no data available for ' + geo.properties.name,
									 '</strong></div>'].join('');
				}
                return ['<div class="hoverinfo"><strong>',
                        'In ' + geo.properties.name,
                        ' cancer incidence per 100.000 citizens is: ' + data_map.value,
                        '</strong></div>'].join('');
            }
        }
        })
};

// function to reset colors of the map after selected by dropdown menu
function UpdateMapFemale(data_map){
	d3.select("#my-map").select("svg").remove()

	 var map = new Datamap({element: document.getElementById('my-map'),
		 fills: {
	            HIGHEST: '#a50f15',
	            HIGH: '#de2d26',
	            MEDIUM: '#fb6a4a',
	            LOW: '#fcae91',
	            defaultFill: "#fee5d9"
	        },
        data: data_map,

         geographyConfig: {
            popupTemplate: function(geo, data_map) {
            	if (!data_map){
					 return ['<div class="hoverinfo"><strong>',
									 'There is no data available for ' + geo.properties.name,
									 '</strong></div>'].join('');
				}
                return ['<div class="hoverinfo"><strong>',
                        'In ' + geo.properties.name,
                        ' cancer incidence per 100.000 citizens is: ' + data_map.value,
                        '</strong></div>'].join('');
            }
        }
        })
}

function UpdateMapMale(data_map){
	d3.select("#my-map").select("svg").remove()

	 var map = new Datamap({element: document.getElementById('my-map'),
		 fills: {
	            HIGHEST: '#08519c',
	            HIGH: '#3182bd',
	            MEDIUM: '#6baed6',
	            LOW: '#bdd7e7',
	            defaultFill: "#eff3ff"
	        },
	        data: data_map,

         	geographyConfig: {
            popupTemplate: function(geo, data_map) {
            	if (!data_map){
					 return ['<div class="hoverinfo"><strong>',
									 'There is no data available for ' + geo.properties.name,
									 '</strong></div>'].join('');
				}
                return ['<div class="hoverinfo"><strong>',
                        'In ' + geo.properties.name,
                        ' cancer incidence per 100.000 citizens is: ' + data_map.value,
                        '</strong></div>'].join('');
            }
        }
        })
}

function UpdateMapAll(data_map){
	d3.select("#my-map").select("svg").remove()

	 var map = new Datamap({element: document.getElementById('my-map'),

		 fills: {
	            HIGHEST: '#006d2c',
	            HIGH: '#31a354',
	            MEDIUM: '#74c476',
	            LOW: '#bae4b3',
	            defaultFill: "#edf8e9"
	        },
	        data: data_map,

         	geographyConfig: {
            popupTemplate: function(geo, data_map) {
            	if (!data_map){
					 return ['<div class="hoverinfo"><strong>',
									 'There is no data available for ' + geo.properties.name,
									 '</strong></div>'].join('');
				}
                return ['<div class="hoverinfo"><strong>',
                        'In ' + geo.properties.name,
                        ' cancer incidence per 100.000 citizens is: ' + data_map.value,
                        '</strong></div>'].join('');
            }
        }
        })
}



    	
 