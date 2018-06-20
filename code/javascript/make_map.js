// Sylvie Langhout
// 10792368
// 
// make_map.js
// Function to make map

// function create dataset for the map
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

// Function to select the colors and initiate making of map
function CreateMap(all_food, patient_info, data_type, all_food_data){	
	var data_map = MapData(patient_info, data_type)

	if (data_type == 0){
      var fills= {
             ">35": '#006d2c',
             "25-35": '#31a354',
             "10-25": '#74c476',
             "<10": '#bae4b3',
             NONE: "lightgrey",
             defaultFill: "lightgrey"
         }
    }
    if (data_type == 1){
      var fills = {
             ">35": '#08519c',
             "25-35": '#3182bd',
             "10-25": '#6baed6',
             "<10": '#bdd7e7',
             NONE: "lightgrey",
             defaultFill: 'lightgrey'
         }
    }
    if (data_type == 2){
      var fills =  {
             ">35": '#a50f15',
             "25-35": '#de2d26',
             "10-25": '#fb6a4a',
             "<10": '#fcae91',
             NONE: "lightgrey",
             defaultFill: "lightgrey"
         }
    }

	RemoveMap()
	MakeMap(data_map, fills, all_food, all_food_data)
}

// function to draw the map
function MakeMap(data_map, fills, all_food, all_food_data) {
  var map = new Datamap({element: document.getElementById('my-map'),
	fills: fills,
        data: data_map,
         done: function(datamap){
				 datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){
					 var location = geography.id
					 for (var i = 0; i < 44; i++){
						if (all_food[0][i].COU == geography.id){
							var data = [all_food[0][i].Value, all_food[1][i].Value,
							all_food[2][i].Value, all_food[3][i].Value,
							all_food[4][i].Value, all_food[5][i].Value,
							all_food[0][i].Country]
						}
					}
    				MakeBullet(data, all_food_data)			 	
					})
			 },
         geographyConfig: {
            popupTemplate: function LightUp(geo, data_map) {
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

// function to remove any prior map
function RemoveMap(){
	d3.select(".datamaps-legend").remove()
	d3.select("#my-map").select("svg").remove()
}