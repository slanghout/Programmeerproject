// Sylvie Langhout
// 10792368
// 
// make_scatter.js
// Function to make scatterplot

// Function to create a dataset of the foodtype data with cancer data
function ScatterData(calories, food_data, cancer_data){
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
			if (calories[j].COU == countries[i]){
				food_and_patient[i][1] = (parseFloat(calories[j].Value));
			}
			if (cancer_data[j].COU == countries[i]){
				food_and_patient[i][2] = (parseFloat(cancer_data[j].Value));
			}
			if (cancer_data[j].COU == countries[i]){
				food_and_patient[i][3] = ((cancer_data[j].COU));
			}
			if (cancer_data[j].COU == countries[i]){
				food_and_patient[i][4] = ((cancer_data[j].Country));
			}
		}
	}
	return(food_and_patient)
}

function MakeScatter(dataset, all_food){
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

	var min_y = d3.min(dataset, function(d) { return d[1]; })
	min_y_up = Math.floor(min_y / 1000.0) * 1000

	var max_y = d3.max(dataset, function(d) { return d[1]; })
	max_y_up = Math.ceil(max_y / 1000.0) * 1000

	var xscale = d3.scale.linear()
    	.domain([min_x_up, (max_x_up)])
    	.range([w_padding, w - w_padding])
    	.nice();

    var yscale = d3.scale.linear()
        .domain([min_y_up, max_y_up])
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
			if(d[2] < 10){
				return color_low
			}
			if(d[2] <= 25 && d[2] > 10){
				return color_medium
			}
			if(d[2] <= 35 && d[2] > 25){
				return color_high
			}
			if(d[2] > 35){
				return color_highest
			}
		});

	svg.selectAll("circle")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut)
    	.on("click", function(d){
    		d3.select("#Nametag").append("svg")
			   	.append("text")
				.text(d[3])
				.attr('x', 300)
				.attr('y', 30)
				.attr("font-family", "sans-serif")
		   		.attr("font-size", "30px")
		   		.attr("fill", "black");
    		console.log(all_food)
			for (var i = 0; i < 44; i++){
				if (all_food[0][i].COU == d[3]){
					var data = [all_food[0][i].Value, all_food[1][i].Value,
						all_food[2][i].Value, all_food[3][i].Value,
						all_food[4][i].Value,all_food[5][i].Value, all_food[0][i].Country]
				}
			}
    		BulletData(data)
    		// MakeBullet(new_bullet)
    	})
	     
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
		.text('Kilocalories (per capita per day)');

	svg.append('text')
		.attr('x', w)
		.attr('y', h - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'label')
		.text('Grammes of fat (per capita per day)');   
}

function HoverFunction(d){
	
	// LightUp(d[3], d[2])
	// determine the x and y position you hover over 
	var yPos = parseFloat(d3.select(this).attr("cy"))
	var xPos = parseFloat(d3.select(this).attr("cx"))

	d3.select("#scatter").select("svg").append("text").attr({
		id: "Hover",
		x: 150,
		y: 30
	})
	   .text("In " + d[4] + " cancer Incidence is " + d[2])

	 d3.select("#scatter").select("svg").append("text").attr({
		id: "Hover_x",
		x: xPos,
		y: 355
	})
	   .text(d[0])

  	d3.select("#scatter").select("svg").append("text").attr({
		id: "Hover_y",
		x: 100,
		y: yPos
	})
	   .text(d[1])
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
    d3.select("#Hover_x")
    .remove()
    d3.select("#Hover_y")
    .remove()
}

function UpdateScatter(dataset, food, unit, data_type, all_food){
	console.log(all_food)
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

	var min_y = d3.min(dataset, function(d) { return d[1]; })
	min_y_up = Math.floor(min_y / 1000.0) * 1000

	var max_y = d3.max(dataset, function(d) { return d[1]; })
	max_y_up = Math.ceil(max_y / 1000.0) * 1000

	var xscale = d3.scale.linear()
    	.domain([min_x_up, (max_x_up)])
    	.range([w_padding, w - w_padding])

    var yscale = d3.scale.linear()
        .domain([min_y_up, max_y_up])
        .range([h - h_padding, h_padding])

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
			if(d[2] < 10){
				return color_low
			}
			if(d[2] <= 25 && d[2] > 10){
				return color_medium
			}
			if(d[2] <= 35 && d[2] > 25){
				return color_high
			}
			if(d[2] > 35){
				return color_highest
			}
		});

	svg.selectAll("circle")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut)
    	.on("click", function(d){
    		console.log(all_food)
    		d3.select("#Nametag").append("svg")
			   	.append("text")
				.text(d[3])
				.attr('x', 300)
				.attr('y', 30)
				.attr("font-family", "sans-serif")
		   		.attr("font-size", "30px")
		   		.attr("fill", "black");
    		console.log(all_food)
			for (var i = 0; i < 44; i++){
				if (all_food[0][i].COU == d[3]){
					var data = [all_food[0][i].Value, all_food[1][i].Value,
						all_food[2][i].Value, all_food[3][i].Value,
						all_food[4][i].Value, all_food[5][i].Value,
						all_food[0][i].Country]
				}
			}
    		BulletData(data)
    	});
	     
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
		.text('Kilocalories (per capita per day)');

	svg.append('text')
		.attr('x', w)
		.attr('y', h - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'label')
		.text(food + ' (' + unit + ")");   
}