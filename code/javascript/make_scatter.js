/* Sylvie Langhout
* 10792368
* make_scatter.js
* Functions to make and update scatterplot
*/

// global variable for number of countries
var NR_OF_COUNTRIES = 44;

// global variables for width and height and padding
var h = 400;
var w = 600;
var w_padding = 100;
var h_padding = 40;

// function to create data for the scatterplot
function ScatterData(calories, food_data, cancer_data){
	
	//  create empty arrays for the data
	var food_and_patient = [];
	var countries = [];
	
	// create list of all the countries
	for (var element = 0; element < NR_OF_COUNTRIES; element ++){
		countries.push(food_data[element].COU);
		food_and_patient.push([]);
	};

	// push the calories, selected foodtype and the country to the array
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
				food_and_patient[i][3] = ((cancer_data[j].COU));
				food_and_patient[i][4] = ((cancer_data[j].Country));
			};
		};
	};
	return(food_and_patient);
}

// function to create the initialcscatterplot
function MakeScatter(dataset, all_food, all_food_data, data_type){
	
	var colorscheme = SelectColorscheme(data_type);

	// create svg of width and height
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	var xscale = xScale(dataset)
	var yscale = yScale(dataset)

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
	   .attr("id", function(d) {return d[3]})
	   .style("opacity", 1.0)
	   .attr("fill", function(d){
			if(d[2] < 10){
				return colorscheme[0]
			}
			if(d[2] <= 25 && d[2] > 10){
				return colorscheme[1]
			}
			if(d[2] <= 35 && d[2] > 25){
				return colorscheme[2]
			}
			if(d[2] > 35){
				return colorscheme[3]
			};
		});

	svg.selectAll("circle")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut)
    	.on("click", function(d){
			for (var i = 0; i < 44; i++){
				if (all_food[0][i].COU == d[3]){
					var data = [all_food[0][i].Value, all_food[1][i].Value,
						all_food[2][i].Value, all_food[3][i].Value,
						all_food[4][i].Value,all_food[5][i].Value, all_food[0][i].Country]
				}
			}
			if (d3.select("#bullet").selectAll("svg")[0].length == 0){
				MakeBullet(data, all_food_data)
			}
			else if (d3.select("#bullet").selectAll("svg")[0].length != 0){
				UpdateBullet(data, all_food_data)
			}
    		
    	})
	     
  	var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(4);

	svg.append("g")
	    .attr("class", "x-axis")
	    .attr("transform", "translate(0," + (h - h_padding) + ")")
	    .call(xAxis);

 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(4);

  	svg.append("g")
		.attr("class", "y-axis")
		.attr("transform", "translate(" + w_padding + ",0)")
		.call(yAxis);

	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'y-label')
		.text('Kilocalories (per capita per day)');

	svg.append('text')
		.attr('x', w- 100)
		.attr('y', h - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'x-label')
		.text('Grammes of protein (per capita per day)');   
}

// function to update scatterplot after the data selected changes
function UpdateScatter(dataset, food, unit, data_type, all_food, all_food_data){

	// select colors for the scatterplot
	colorscheme = SelectColorscheme(data_type);
	
	// create x and y scale
	var xscale = xScale(dataset);
	var yscale = yScale(dataset);

   	// update dots in the scatterplot
    svg = d3.select("#scatter").select("svg");
    svg.selectAll("circle")
          .data(dataset)
          .transition()
          .duration(1000)
          .attr("cx", function(d) {
               return xscale(d[0]);
          })
          .attr("cy", function(d) {
               return yscale(d[1]);
          })
          .attr("r", 5)

          // select colors for the dot depending on cancer incidence
          .attr("fill", function(d){
			if(d[2] < 10){
				return colorscheme[0]
			}
			if(d[2] <= 25 && d[2] > 10){
				return colorscheme[1]
			}
			if(d[2] <= 35 && d[2] > 25){
				return colorscheme[2]
			}
			if(d[2] > 35){
				return colorscheme[3]
			};
		});

	// select x-axis
	var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(4);

	// update the x-axis
	svg.select(".x-axis")
	  .transition()
	  .duration(1000)
	  .call(xAxis);

	// update the label of the x-axis
	svg.select(".x-label")
		.transition()
		.duration(1000)
		.text(food + ' (' + unit + ")");   
 }

// function to create x scale
 function xScale(dataset){
 	
 	// select the minimum of the dataset and decide minimum for x-axis
 	var max_x = d3.max(dataset, function(d) { return d[0]; });
	var max_x_up = Math.ceil(max_x / 100.0) * 100;

	// select the maximum of the dataset and decide maxumum for x-axis
	var min_x = d3.min(dataset, function(d) { return d[0]; });
	min_x_up = Math.floor(min_x / 100.0) * 100;

	// create the x-scale with width height and min and max
	var xscale = d3.scale.linear()
    	.domain([min_x_up, (max_x_up)])
    	.range([w_padding, w - w_padding])
    	.nice();

    return xscale;
 }

 // function to create y scale
function yScale(dataset){
 	
	// select the minimum of the dataset and decide minimum for y-axis
 	var min_y = d3.min(dataset, function(d) { return d[1]; });
	var min_y_up = Math.floor(min_y / 1000.0) * 1000;

	// select the maxium of the dataset and decide maximum for y-axis
	var max_y = d3.max(dataset, function(d) { return d[1]; });
	var max_y_up = Math.ceil(max_y / 1000.0) * 1000;

	// create the y-scale with width height and min and max
	var yscale = d3.scale.linear()
        .domain([min_y_up, max_y_up])
        .range([h - h_padding, h_padding])
        .nice();

   return yscale;
  }

// function to create the colorscheme of the datatype
function SelectColorscheme(data_type){
	
	// if datatype is 0, all is chosen color green
	if (data_type == 0){
		var color_low = "#bae4b3";
		var color_medium = "#74c476";
		var color_high = "#31a354";
		var color_highest = "#006d2c";
	}

	// if datatype is 1, male is chosen color blue
	if (data_type == 1){
		var color_low = "#bdd7e7";
		var color_medium = "#6baed6";
		var color_high = "#3182bd";
		var color_highest = "#08519c";
	}
	// if datatype is 2, female is chosen color red
	if (data_type == 2){
		var color_low = "#fcae91";
		var color_medium = "#fb6a4a";
		var color_high = "#de2d26";
		var color_highest = "#a50f15";
	};

	// return the colorscheme
	var colorscheme = [color_low, color_medium, color_high, color_highest];
	return colorscheme;
}

// function to show data on hover
function HoverFunction(d){
	// determine the x and y position you hover over 
	var yPos = parseFloat(d3.select(this).attr("cy"))
	var xPos = parseFloat(d3.select(this).attr("cx"))
 
	// create hover over text with x and y value
	d3.select("#scatter").select("svg").append("text").attr({
		id: "Hover_x",
		x: xPos + 10,
		y: yPos + 10
		})
	   .text(d[4] + ": " + d[0]+ ", " + d[1]);
	
	// iterate over dots and set opacity down
	var dot = d3.select("#scatter").select("svg").selectAll("circle")[0];
    for (var i = 0; i < NR_OF_COUNTRIES; i++){

        if (d3.select(dot[i]) != this){
            d3.select(dot[i])
            	.style("opacity", 0.3)
    	};
    };

    // make the selected dot bigger and opacity at 1
	d3.select(this)
	    .attr("r", 10) 
	    .style("opacity", 1.0);
}

// function to reset the scatterplot after hover
function HoverOut(){
	
	// select the dots and set size and opacity of all circles back
	var dot = d3.select("#scatter").select("svg").selectAll("circle")[0]
    for (var i = 0; i < NR_OF_COUNTRIES; i++){
        d3.select(dot[i])
            .attr("r", 5) 
            .style("opacity", 1.0)
    }
    
    // remove the hover elements
    d3.select("#Hover")
    .remove();

    d3.select("#Hover_x")
    .remove();
}