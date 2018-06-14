// Sylvie Langhout
// 10792368
// 
// make_scatter.js
// Function to make scatterplot

// Function to create a dataset of the foodtype data with cancer data
function ScatterData(food_data, cancer_data){
	food_and_patient = [];
	countries = [];
	NR_OF_COUNTRIES = 44;
	
	// select all the countries
	for (var element = 0; element < NR_OF_COUNTRIES; element ++){
		countries.push(food_data[element].COU);
		food_and_patient.push([]);
	}

	for (var i = 0; i < NR_OF_COUNTRIES; i++){
		for (var j = 0; j < NR_OF_COUNTRIES; j++){
			if (food_data[j].COU == countries[i]){
				food_and_patient[i][0] = (parseFloat(food_data[j].Value));
			}
			if (cancer_data[j].COU == countries[i]){
				food_and_patient[i][1] = (parseFloat(cancer_data[j].Value));
			}
		}
	}
	return(food_and_patient)
}

function MakeScatter(dataset){
	// set width and height for the scatterplot
	var h = 400;
	var w = 600;
  
	// set padding for width and height
	var w_padding = 100;
	var h_padding = 40;

	var color_low = "#bae4b3"
	var color_medium = "#74c476"
	var color_high = "#31a354"
	var color_highest = "#006d2c"

	// create svg of width and height
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	var max_x = d3.max(dataset, function(d) { return d[0]; })
	max_x_up = Math.ceil(max_x / 100.0) * 100

	var min_x = d3.min(dataset, function(d) { return d[0]; })
	min_x_up = Math.floor(min_x / 100.0) * 100

	var max_y = d3.max(dataset, function(d) { return d[1]; })
	max_y_up = Math.ceil(max_y / 10.0) * 10

	var xscale = d3.scale.linear()
    	.domain([min_x_up, (max_x_up)])
    	.range([w_padding, w - w_padding])
    	.nice();

    var yscale = d3.scale.linear()
        .domain([0, max_y_up])
        .range([h - h_padding, h_padding])
        .nice();

	svg.selectAll("circle")
	   .data(dataset)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) {
	        return xscale(d[0]);
	   })
	   .attr("cy", function(d) {
	        return yscale(d[1]);
	   })
	   .attr("r", 5)
	   .attr("fill", function(d){
			if(d[1] < 10){
				return color_low
			}
			if(d[1] <= 25 && d[1] > 10){
				return color_medium
			}
			if(d[1] <= 35 && d[1] > 25){
				return color_high
			}
			if(d[1] > 35){
				return color_highest
			}
		});

	svg.selectAll("circle")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut);
	     
  	var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(4);

	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(0," + (h - h_padding) + ")")
	    .call(xAxis);

 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(4);

  	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + w_padding + ",0)")
		.call(yAxis);

	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Cancer Incidence per 100.000 citizens');

	svg.append('text')
		.attr('x', w)
		.attr('y', h - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'label')
		.text('Kilocalories (per capita per day)');   
}

function HoverFunction(d){
	// determine the x and y position you hover over 
	var yPos = parseFloat(d3.select(this).attr("cy"))
	var xPos = parseFloat(d3.select(this).attr("cx"))
	console.log(xPos, yPos)

	d3.select("#scatter").select("svg").append("text").attr({
		id: "Hover",
		x: 500,
		y: 50
	})
	   .text(d[0] + ", " + d[1])
   // make the dot bigger
	d3.select(this)
	    .attr("r", 10)
}

function HoverOut(){
	d3.select(this)
		.transition().delay(300)
        .attr("r", 5)
    
    d3.select("#Hover")
    .remove()

    // LightUp  
}


function UpdateScatter(dataset, food, unit, data_type){
	// set width and height for the scatterplot
	var h = 400;
	var w = 600;

	// set padding for width and height
	var w_padding = 100;
	var h_padding = 40;

	if (data_type == 0){
		var color_low = "#bae4b3"
		var color_medium = "#74c476"
		var color_high = "#31a354"
		var color_highest = "#006d2c"
	}
	if (data_type == 1){
		var color_low = "#bdd7e7"
		var color_medium = "#6baed6"
		var color_high = "#3182bd"
		var color_highest = "#08519c"
}
	if (data_type == 2){
		var color_low = "#fcae91"
		var color_medium = "#fb6a4a"
		var color_high = "#de2d26"
		var color_highest = "#a50f15"
	} 
	
	
	svg = d3.select("#scatter").select("svg")

	svg.selectAll("circle").remove()
	svg.selectAll("text").remove()
	svg.selectAll("g").remove()

	var max_x = d3.max(dataset, function(d) { return d[0]; })
	max_x_up = Math.ceil(max_x / 100.0) * 100

	var min_x = d3.min(dataset, function(d) { return d[0]; })
	min_x_up = Math.floor(min_x / 100.0) * 100

	var max_y = d3.max(dataset, function(d) { return d[1]; })
	max_y_up = Math.ceil(max_y / 10.0) * 10

	var xscale = d3.scale.linear()
    	.domain([min_x_up, (max_x_up)])
    	.range([w_padding, w - w_padding])
    	.nice();

    var yscale = d3.scale.linear()
        .domain([0, max_y_up])
        .range([h - h_padding, h_padding])
        .nice();

	svg.selectAll("circle")
	   .data(dataset)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) { 
	        return xscale(d[0]);
	   })
	   .attr("cy", function(d) {
	        return yscale(d[1]);
	   })
	   .attr("r", 5)
	   .attr("fill", function(d){
			if(d[1] < 10){
				return color_low
			}
			if(d[1] <= 25 && d[1] > 10){
				return color_medium
			}
			if(d[1] <= 35 && d[1] > 25){
				return color_high
			}
			if(d[1] > 35){
				return color_highest
			}
		});

	svg.selectAll("circle")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut);
	     
  	var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(4);

	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(0," + (h - h_padding) + ")")
	    .call(xAxis);

 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(4);

  	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + w_padding + ",0)")
		.call(yAxis);

	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Cancer Incidence per 100.000 citizens');

	svg.append('text')
		.attr('x', w)
		.attr('y', h - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'label')
		.text(food + ' (' + unit + ")");   
}