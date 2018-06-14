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
	  data_map[country] = {fillKey: "<10", value: patient_info[x][i].Value};
	}
	else if (patient_info[x][i].Value <= 25 && patient_info[x][i].Value > 10)
	{
	  country = patient_info[x][i].COU
	  data_map[country] = {fillKey: "10-25", value: patient_info[x][i].Value};
	}
	else if (patient_info[x][i].Value <= 35 && patient_info[x][i].Value > 25)
	{
	  country = patient_info[x][i].COU
	  data_map[country] = {fillKey: "25-35", value: patient_info[x][i].Value};
	}
	else if (patient_info[x][i].Value > 35)
	{
	  country = patient_info[x][i].COU
	  data_map[country] = {fillKey: ">35", value: patient_info[x][i].Value};
	}
	}
	return(data_map)
}

// function to create initial map
function MakeMap(data_map) {
  var map = new Datamap({element: document.getElementById('my-map'),
	fills: {
	            ">35": '#006d2c',
	            "25-35": '#31a354',
	            "10-25": '#74c476',
	            "<10": '#bae4b3',
	            NONE: "#edf8e9",
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
            },
            popOnHover: true,
            highlightOnHover: true,
            highlightFillColor: function(geo) {return geo["fillKey"] || "#edf8e9"; },
            highlightBorderColor: "white",
       		highlightBorderWidth: "4",
        	highlightBorderOpacity: "1"
            
        }
        })
  map.legend();
  
};

// function to reset colors of the map after selected by dropdown menu
function UpdateMapFemale(data_map){
	d3.select(".datamaps-legend").remove()
	d3.select("#my-map").select("svg").remove()

	 var map = new Datamap({element: document.getElementById('my-map'),
		 fills: {
	            ">35": '#a50f15',
	            "25-35": '#de2d26',
	            "10-25": '#fb6a4a',
	            "<10": '#fcae91',
	            NONE: "#fee5d9",
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
            },
            popOnHover: true,
            highlightOnHover: true,
            highlightFillColor: function(geo) {return geo["fillKey"] || "#fee5d9"; },
            highlightBorderColor: "white",
       		highlightBorderWidth: "4",
        	highlightBorderOpacity: "1"
        }
        })
	 map.legend();
}

function UpdateMapMale(data_map){
	d3.select(".datamaps-legend").remove()
	d3.select("#my-map").select("svg").remove()
	 var map = new Datamap({element: document.getElementById('my-map'),
		 fills: {
	            ">35": '#08519c',
	            "25-35": '#3182bd',
	            "10-25": '#6baed6',
	            "<10": '#bdd7e7',
	            NONE: "#eff3ff",
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
            },
         	popOnHover: true,
         	highlightOnHover: true,
	        highlightFillColor: function(geo) {return geo["fillKey"] || "#eff3ff"; },
	        highlightBorderColor: "white",
	   		highlightBorderWidth: "4",
	    	highlightBorderOpacity: "1"
    }
        })
	 map.legend();
}

function UpdateMapAll(data_map){
	d3.select(".datamaps-legend").remove()
	d3.select("#my-map").select("svg").remove()
	 var map = new Datamap({element: document.getElementById('my-map'),

		 fills: {
	            ">35": '#006d2c',
	            "25-35": '#31a354',
	            "10-25": '#74c476',
	            "<10": '#bae4b3',
	            NONE : "#edf8e9",
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
            },
	        popOnHover: true,
	        highlightOnHover: true,
	        highlightFillColor: function(geo) {return geo["fillKey"] || "#edf8e9"; },
	        highlightBorderColor: "white",
	   		highlightBorderWidth: "4",
	    	highlightBorderOpacity: "1"
        }
        })
	 map.legend();
}



    	
 