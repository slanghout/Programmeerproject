// Sylvie Langhout
// 10792368
// 
// make_map.js
// Function to make map

// function create dataset for the map with all, male of female data
function map_data(patient_info, x){
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
function make_map(data_map) {
  var map = new Datamap({element: document.getElementById('container'),
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
									 'There is no data for cancer indidence in ' + geo.properties.name,
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

// dropdown menu to select data for map
d3.select("#dropdown")
	.on("change", function(d){
		console.log("JA")
		var selected = (d3.select(this).property("value"))
		d3.select("body")
		.append("p")
		.text(selected + "ja")
		new_map = map_data(patient_info, selected)
    	update_map(new_map)
	})


// function to reset colors of the map after selected by dropdown menu
function update_map(data_map){
	map.updateChoropleth(null, {reset: true})
}



    	
 