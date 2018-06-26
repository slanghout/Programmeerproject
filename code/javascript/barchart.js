/* Sylvie Langhout
* 10792368
* barchart.js
* Functions to make and update barchart for the home page via script_index.js
*/

// function to make barchart
function barData(countries, allCancers, cancerFrequency){
	
	// select nr of countries and cancer data to iterate over
	var nrOfCountries = countries.length;
	var cancerDataLength = allCancers.length;

	// iterate over datasets and select data for the barchart
	for (var i = 0; i < nrOfCountries; i ++){ 
  		for (var j = 0; j < cancerDataLength; j++){
  			if(countries[i] == allCancers[j].COU){
  				
  				// select all data for 2012 and push
  				if (allCancers[j].YEA == "2012"){
	  				if(allCancers[j].Variable == "Malignant neoplasms of lung"
	  					&& allCancers[j].Measure ==
	  					"Incidence per 100 000 population"){
	  					var value = parseFloat(allCancers[j].Value).toFixed(1);
	  					cancerFrequency[i][0] = parseFloat(value);
	  				}
	  				if(allCancers[j].Variable == "Malignant neoplasms of colon"
	  					&& allCancers[j].Measure ==
	  					"Incidence per 100 000 population"){
	  					var value = parseFloat(allCancers[j].Value).toFixed(1);
	  					cancerFrequency[i][1] = parseFloat(value);
	  				}
	  				if(allCancers[j].Variable ==
	  					"Malignant neoplasms of female breast"
	  					&& allCancers[j].Measure ==
	  					"Incidence per 100 000 females"){
	  					var value = parseFloat(allCancers[j].Value).toFixed(1);
	  					cancerFrequency[i][2] = parseFloat(value);
	  				}
	  				if(allCancers[j].Variable ==
	  					"Malignant neoplasms of prostate"
	  					&& allCancers[j].Measure ==
	  					"Incidence per 100 000 males"){
	  					var value = parseFloat(allCancers[j].Value).toFixed(1);
	  					cancerFrequency[i][3] = parseFloat(value);
	  					cancerFrequency[i][4] = allCancers[j].Country;
	  				};
	  			};
  			};
  		};
  	};

	// create empty array for the world data
	var lung = 0;
	var colon = 0;
	var breast = 0;
	var pros = 0;

	// push the data of all countries to dataset
	for (var i = 0; i < nrOfCountries; i++){
		lung += cancerFrequency[i][0];
		colon += cancerFrequency[i][1];
		breast += cancerFrequency[i][2];
		pros += cancerFrequency[i][3];
	};

	// create averages of all countries
	lung = parseFloat(parseFloat(lung / nrOfCountries).toFixed(1));
	colon = parseFloat(parseFloat(colon / nrOfCountries).toFixed(1));
	breast = parseFloat(parseFloat(breast / nrOfCountries).toFixed(1));
	pros = parseFloat(parseFloat(pros / nrOfCountries).toFixed(1));

	// create initial barchart with world data
	var name = "World";
	var world = [lung, colon, breast, pros, name];
	makeBarchart(world, world[4], countries, cancerFrequency);

	// after clicking the dropdown, select data for specific country
	d3.selectAll(".dropdown-item").on("click", function(){
	    var country = this.getAttribute("value");
	    
	    // if world was selected take the world dataset
	    if (country == "World"){
	    		updateBarchart(world, world[4]);
	    }
	    
	    // else select the data for the selected country
	    else{
		    for (var i = 0; i < countries.length; i++){
		    	if (country == countries[i]){
		    		updateBarchart(cancerFrequency[i], cancerFrequency[i][4]);
		    	};
	    	};
	    };
	});
};

// function to make the initial barchart
function makeBarchart(dataset, countryname, countries, cancerFrequency){
	
	// select data for the barchart
    var data = [dataset[0], dataset[1], dataset[2], dataset[3]];

	// set width and height for the barchart
	var h = 400;
	var w = 600;

	// set padding for width and height
	var wPadding = 100;
	var hPadding = 40;

	// determine the maximum of the y-axis and round it off
	var maxY = d3.max(dataset, function(d) { return d; });
	maxYUp = Math.ceil(maxY / 20.0) * 20;

	// create the x-axis scale
	var xscale = d3.scale.linear()
    	.domain([0, 4])
    	.range([wPadding, w - wPadding])
    	.nice();

    // create the y-axis scale
    var yscale = d3.scale.linear()
        .domain([0, maxYUp])
        .range([h - hPadding, hPadding])
        .nice();

	// create svg for the barchart
	var svg = d3.select("#barchart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // append title with countryname to the barchart
    svg.append("text")
		.text(countryname)
		.attr('x', 300)
		.attr('y', 30)
		.attr('class', 'title')
		.attr("font-family", "sans-serif")
   		.attr("font-size", "30px")
   		.attr("fill", "black");

   	// create x-axis label lung
   	svg.append("text")
		.text("Lung")
		.attr('x', 125)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

   	// create x-axis label colon
   	svg.append("text")
		.text("Colon")
		.attr('x', 225)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	// create x-axis label breast
   	svg.append("text")
		.text("Breast")
		.attr('x', 325)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	// create x-axis label prostate
   	svg.append("text")
		.text("Prostate")
		.attr('x', 425)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

    // draw the bars of the barchart
    svg.selectAll("rect")
	   .data(data)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) { return xscale(i) +10})
	   .attr("y", function(d){ return yscale(d)})
	   .attr("width", 80)
	   .attr("height", function(d){ return h  - yscale(d) - hPadding})
	   .attr("fill", "#9e0142");

	// select the functions for the clickon of the barchart
	svg.selectAll("rect")
		.on("mouseover", hoverFunction)   		
    	.on("mouseout", hoverOut)
    	.on("click", clickFunction);

	// create x-xis
	var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(0);

	// draw x-axis
	svg.append("g")
	    .attr("class", "x-axis")
	    .attr("transform", "translate(0," + (h - hPadding) + ")")
	    .call(xAxis);

 	// create y-axis
 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(6);

  	// draw y-axis
  	svg.append("g")
		.attr("class", "y-axis")
		.attr("transform", "translate(" + wPadding + ",0)")
		.call(yAxis);

	// create y-axis label
	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Cancer incidence per 100.000 citizens');
};

// function to update the barchart
function updateBarchart(dataset, countryname){
	// set width and height for the scatterplot
	var h = 400;
	var w = 600;

	// set padding for width and height
	var wPadding = 100;
	var hPadding = 40;

	// determine the maximum of the y-axis and round it off
	var maxY = d3.max(dataset, function(d) { return d; });
	maxYUp = Math.ceil(maxY / 20.0) * 20;

	// create x-axis scale
	var xscale = d3.scale.linear()
    	.domain([0, 4])
    	.range([wPadding, w - wPadding])
    	.nice();

    // create y-axis scale
    var yscale = d3.scale.linear()
        .domain([0, maxYUp])
        .range([h - hPadding, hPadding])
        .nice();

	// select the svg of the barchart
	var svg = d3.select("#barchart").select("svg");

	// update the title of the barchart
	svg.select(".title")
		.text(countryname);

    // update the size of the bars
    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(1000)
	   	.attr("y", function(d){ return  yscale(d)})
	   	.attr("height", function(d){ return h  - yscale(d) - hPadding});

 	// update the y-axis
 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(6);
	
	// draw the new y-axis
	svg.select(".y-axis")
    	.transition()
    	.duration(1000)
    	.call(yAxis);
};

// function to draw values in bars on hover
function hoverFunction(d){
	
	// determine the x and y position you hover over 
	var yPos = parseFloat(d3.select(this).attr("y"));
	var xPos = parseFloat(d3.select(this).attr("x"));

	// draw value in the barchart
	d3.select("#barchart").select("svg").append("text")
	   .attr({id: "Hover"})
	   .text(d)
       .attr("x", xPos + 5)
       .attr("y", yPos+ 30)
       .attr("font-family", "sans-serif")
       .attr("font-size", "30px")
       .attr("fill", "black");
};

// function to delete value of bar after hover
function hoverOut(){

	// delete the hover
    d3.select("#Hover")
    .remove();
};

// function to determine what happens after clicking on bars
function clickFunction(d, i){
	
	// if breast cancer bar clicked open pink ribbon site
	if (i == 2){
		window.open("https://www.pinkribbon.nl/");
	}

	// if other bars are clicked open kwf site
	else{
		window.open("https://www.kwf.nl/");

	};
};
