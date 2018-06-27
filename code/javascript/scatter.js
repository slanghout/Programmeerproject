/* Sylvie Langhout
* 10792368
* scatter.js
* Functions to make and update scatterplot for the data page via script_data.js
*/

// global variables for width and height and padding
var h = 400;
var w = 600;
var wPadding = 100;
var hPadding = 40;

// remember number of countries
var nrOfCountries = 44;

// function to create data for the scatterplot
function scatterData(calories, foodData, cancerData){
	
	//  create empty arrays for the data
	var dataset = [];
	var countries = [];
	
	// create list of all the countries
	for (var element = 0; element < nrOfCountries; element ++){
		countries.push(foodData[element].COU);
		dataset.push([]);
	};

	// push the calories, selected foodtype and the country to the array
	for (var i = 0; i < nrOfCountries; i++){
		for (var j = 0; j < nrOfCountries; j++){
			if (foodData[j].COU == countries[i]){
				dataset[i][0] = (parseFloat(foodData[j].Value));
			}
			if (calories[j].COU == countries[i]){
				dataset[i][1] = (parseFloat(calories[j].Value));
			}
			if (cancerData[j].COU == countries[i]){
				dataset[i][2] = (parseFloat(cancerData[j].Value));
				dataset[i][3] = ((cancerData[j].COU));
				dataset[i][4] = ((cancerData[j].Country));
			}; 
		};
	};
	return dataset;
}

// function to create the initialcscatterplot
function makeScatter(dataset, foodData, foodValue, dataType){
	
	// select colorscheme depending on input user
	var colorscheme = selectColorscheme(dataType);

	// create svg of width and height
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	// create x and y scale
	var xscale = xScale(dataset);
	var yscale = yScale(dataset);

	// create circles for the scatterplot
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
	   
	   // select colors for the dot depending on cancer incidence data
	   .attr("fill", function(d){
			if(d[2] < 10){
				return colorscheme[0]
			}
			else if(d[2] <= 25 && d[2] > 10){
				return colorscheme[1]
			}
			else if(d[2] <= 35 && d[2] > 25){
				return colorscheme[2]
			}
			else if(d[2] > 35){
				return colorscheme[3]
			};
		});

	// create functions for hover and clicking on circles
	svg.selectAll("circle")
		.on("mouseover", hoverFunction)   		
    	.on("mouseout", hoverOut)
    	.on("click", function(d){
			
    		// iterate over countries and select data of the selected country
			for (var i = 0; i < nrOfCountries; i++){
				if (foodData[0][i].COU == d[3]){
					var data = [foodData[0][i].Value, foodData[1][i].Value,
						foodData[2][i].Value, foodData[3][i].Value,
						foodData[4][i].Value,foodData[5][i].Value,
						foodData[0][i].Country]
				}
			};

			// if there is no buller chart yet draw it
			if (d3.select("#bullet").selectAll("svg")[0].length == 0){
				makeBullet(data, foodValue)
			}

			// if there is one already update it
			else if (d3.select("#bullet").selectAll("svg")[0].length != 0){
				updateBullet(data, foodValue)
			};
    		
    	});
	     
  	// create x-axis
  	var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(4);

	// transform x-axis and draw
	svg.append("g")
	    .attr("class", "x-axis")
	    .attr("transform", "translate(0," + (h - hPadding) + ")")
	    .call(xAxis);

 	// create y-axis
 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(4);

  	// transform y-axis and draw
  	svg.append("g")
		.attr("class", "y-axis")
		.attr("transform", "translate(" + wPadding + ",0)")
		.call(yAxis);

	// create label y-axis
	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'y-label')
		.text('Kilocalories (per capita per day)');

	// create x-axis label
	svg.append('text')
		.attr('x', w- 100)
		.attr('y', h - 10)
		.attr('text-anchor', 'end')
		.attr('class', 'x-label')
		.text('Grammes of protein (per capita per day)');   
}

// function to update scatterplot after the data selected changes
function updateScatter(dataset, food, unit, dataType, foodData, FoodValue){

	// select colors for the scatterplot
	colorscheme = selectColorscheme(dataType);
	
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

          // select colors for the dot depending on cancer incidence data
          .attr("fill", function(d){
			if(d[2] < 10){
				return colorscheme[0]
			}
			else if(d[2] <= 25 && d[2] > 10){
				return colorscheme[1]
			}
			else if(d[2] <= 35 && d[2] > 25){
				return colorscheme[2]
			}
			else if(d[2] > 35){
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
 	var maxX = d3.max(dataset, function(d) { return d[0]; });
	var maxXUp = Math.ceil(maxX / 100.0) * 100;

	// select the maximum of the dataset and decide maxumum for x-axis
	var minX = d3.min(dataset, function(d) { return d[0]; });
	var minXUp = Math.floor(minX / 100.0) * 100;

	// create the x-scale with width height and min and max
	var xScale = d3.scale.linear()
    	.domain([minXUp, (maxXUp)])
    	.range([wPadding, w - wPadding])
    	.nice();

    return xScale;
 }

 // function to create y scale
function yScale(dataset){
 	
	// select the minimum of the dataset and decide minimum for y-axis
 	var minY = d3.min(dataset, function(d) { return d[1]; });
	var minYUp = Math.floor(minY / 1000.0) * 1000;

	// select the maxium of the dataset and decide maximum for y-axis
	var maxY = d3.max(dataset, function(d) { return d[1]; });
	var maxYUp = Math.ceil(maxY / 1000.0) * 1000;

	// create the y-scale with width height and min and max
	var yScale = d3.scale.linear()
        .domain([minYUp, maxYUp])
        .range([h - hPadding, hPadding])
        .nice();

   return yScale;
  }

// function to create the colorscheme of the datatype
function selectColorscheme(dataType){
	
	// if datatype is 0, all is chosen color green
	if (dataType == 0){
		var color_low = "#bae4b3";
		var color_medium = "#74c476";
		var color_high = "#31a354";
		var color_highest = "#006d2c";
	}

	// if datatype is 1, male is chosen color blue
	else if (dataType == 1){
		var color_low = "#bdd7e7";
		var color_medium = "#6baed6";
		var color_high = "#3182bd";
		var color_highest = "#08519c";
	}
	// if datatype is 2, female is chosen color red
	else if (dataType == 2){
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
function hoverFunction(d){
	// determine the x and y position you hover over 
	var yPos = parseFloat(d3.select(this).attr("cy"));
	var xPos = parseFloat(d3.select(this).attr("cx"));
 
	// create hover over text with x and y value
	d3.select("#scatter").select("svg").append("text").attr({
		id: "Hover_x",
		x: xPos + 10,
		y: yPos + 10
		})
	   .text(d[4] + ": " + d[0]+ ", " + d[1]);
	
	// iterate over dots and set opacity down
	var dot = d3.select("#scatter").select("svg").selectAll("circle")[0];
    for (var i = 0; i < nrOfCountries; i++){

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
function hoverOut(){
	
	// select the dots and set size and opacity of all circles back
	var dot = d3.select("#scatter").select("svg").selectAll("circle")[0];
    for (var i = 0; i < nrOfCountries; i++){
        d3.select(dot[i])
            .attr("r", 5) 
            .style("opacity", 1.0)
    };
    
    // remove the hover elements
    d3.select("#Hover")
    .remove();

    d3.select("#Hover_x")
    .remove();
}