/* Sylvie Langhout
* 10792368
* make_map.js
* Functions to make and update world map
*/

var NR_OF_COUNTRIES = 44;

// function create dataset for the map
function MapData(patient_info, x){
	
    // create empty dict for data
    data = {}
	
    // iterate over the length of the data
    // create dict with value and fillkey for legend
    for (var i = 0; i < patient_info[x].length; i ++)
	{
        if (patient_info[x][i].Value <= 10){
    	  country = patient_info[x][i].COU;
    	  data[country] = {fillKey: "<10", value: patient_info[x][i].Value};
    	}
    	else if (patient_info[x][i].Value <= 25 && patient_info[x][i].Value > 10){
    	  country = patient_info[x][i].COU;
    	  data[country] = {fillKey: "10-25", value: patient_info[x][i].Value};
    	}
    	else if (patient_info[x][i].Value <= 35 && patient_info[x][i].Value > 25){
    	  country = patient_info[x][i].COU;
    	  data[country] = {fillKey: "25-35", value: patient_info[x][i].Value};
    	}
    	else if (patient_info[x][i].Value > 35){
    	  country = patient_info[x][i].COU;
    	  data[country] = {fillKey: ">35", value: patient_info[x][i].Value};
    	};
    };
    return(data);
}

// Function to select the colors and initiate making of map
function CreateColorMap(data_type){	

	// create color scheme depending on data
    // color scheme for all data
    if (data_type == 0){
      var fills= {
             ">35": '#006d2c',
             "25-35": '#31a354',
             "10-25": '#74c476',
             "<10": '#bae4b3',
             NONE: "lightgrey",
             defaultFill: "lightgrey"
         }
    };

    // color scheme if user picked male 
    if (data_type == 1){
      var fills = {
             ">35": '#08519c',
             "25-35": '#3182bd',
             "10-25": '#6baed6',
             "<10": '#bdd7e7',
             NONE: "lightgrey",
             defaultFill: 'lightgrey'
         }
    };

    // colorscheme if user picked female
    if (data_type == 2){
      var fills =  {
             ">35": '#a50f15',
             "25-35": '#de2d26',
             "10-25": '#fb6a4a',
             "<10": '#fcae91',
             NONE: "lightgrey",
             defaultFill: "lightgrey"
         }
    };

    return fills;
}

// function to draw the map
function MakeMap(patient_info, data_type, all_food, all_food_data) {
  
  // select data and color for map
  var data = MapData(patient_info, data_type);
  var fills = CreateColorMap(data_type);

  // select map and color and data
  var map = new Datamap({element: document.getElementById('my-map'),
	fills: fills,
        data: data,
         done: function(datamap){
				 
                 // after clicking on a country create bullet chart
                 datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){
					
                    // select the data for the country clicked on
                     for (var i = 0; i < NR_OF_COUNTRIES; i++){
						if (all_food[0][i].COU == geography.id){
							var data = [all_food[0][i].Value, all_food[1][i].Value,
							all_food[2][i].Value, all_food[3][i].Value,
							all_food[4][i].Value, all_food[5][i].Value,
							all_food[0][i].Country];
						};
					};
                    // if there is no bullet chart yet create new one
    				if (d3.select("#bullet").selectAll("svg")[0].length == 0){
                        MakeBullet(data, all_food_data);
                    }

                    // if there is a bullet chart already update it
                    else if (d3.select("#bullet").selectAll("svg")[0].length != 0){
                         UpdateBullet(data, all_food_data);
                    };	 	
					})
			 },
         geographyConfig: {
            popupTemplate: function LightUp(geo, data) {
            	if (!data){
					 return ['<div class="hoverinfo"><strong>',
									 'There is no data available for ' + geo.properties.name,
									 '</strong></div>'].join('');
				}
                return ['<div class="hoverinfo"><strong>',
                        'In ' + geo.properties.name,
                        ' cancer incidence per 100.000 citizens is: ' + data.value,
                        '</strong></div>'].join('');
            },
            popOnHover: true,
            highlightOnHover: true,
            highlightFillColor: function(geo) {return geo["fillKey"] || "#edf8e9"; },
            highlightBorderColor: "white",
       		highlightBorderWidth: "4",
        	highlightBorderOpacity: "1"
            
        }
        });

  // call function to show dot corresponding to country
  ShowDot();
  
  // create legend
  map.legend();
  
};

// function to update the map with new data
function UpdateMap(patient_info, data_type, all_food, all_food_data){
    
    // remove the map and then recreate
    RemoveMap();
    MakeMap(patient_info, data_type, all_food, all_food_data);
}


// function to remove any prior map
function RemoveMap(){
	d3.select(".datamaps-legend").remove();
    d3.select("#my-map").select("svg").remove();

}

// function to show dot on scatter corresponding to country
function ShowDot(){
    
    // select map and create mouseover event
    var map = d3.select("#my-map")
        .on("mouseover", function(){
        
        // select country
        selected_country = d3.select(d3.event.target).data()[0];

        // if the country is found search dot that corresponds to it
        if (selected_country != undefined){
            var dot = d3.select("#scatter").select("svg").selectAll("circle")[0];
        
            // iterate over dots and check if it corresponds to country
            // enlarge dot that is selected and hide others
            for (var i = 0; i < NR_OF_COUNTRIES; i++){
                if (dot[i].id == selected_country.id){
                    d3.select(dot[i])
                        .attr("r", 10);
                    };
                if (dot[i].id != selected_country.id){
                        d3.select(dot[i])
                            .style("opacity", 0.3);
                };
            };
        };
    })
        // if mouse moves reset scatterplot
        .on("mouseout", function(){
        var dot = d3.select("#scatter").select("svg").selectAll("circle")[0]
            for (var i = 0; i < NR_OF_COUNTRIES; i++){
                d3.select(dot[i])
                    .style("opacity", 1.0)
                    .attr("r", 5) 
            }; 
        });
}