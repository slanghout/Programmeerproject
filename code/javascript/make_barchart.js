function BarData(countries, all_cancers, cancer_frequency){
	var nr_of_countries = countries.length

	for (var i = 0; i < nr_of_countries; i ++){ 
  		for (var j = 0; j < cancer_length; j++){
  			if(countries[i] == all_cancers[j].COU){
  				if (all_cancers[j].YEA == "2012"){
	  				if(all_cancers[j].Variable == "Malignant neoplasms of lung" && all_cancers[j].Measure == "Incidence per 100 000 population"){
	  					cancer_frequency[i][0] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(1))
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of colon" && all_cancers[j].Measure == "Incidence per 100 000 population"){
	  					cancer_frequency[i][1] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(1))
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of female breast" && all_cancers[j].Measure == "Incidence per 100 000 females"){
	  					cancer_frequency[i][2] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(1))
	  				}
	  				if(all_cancers[j].Variable == "Malignant neoplasms of prostate" && all_cancers[j].Measure == "Incidence per 100 000 males"){
	  					cancer_frequency[i][3] = parseFloat(parseFloat(all_cancers[j].Value).toFixed(1))
	  					cancer_frequency[i][4] = all_cancers[j].Country
	  				}
	  			}
  			}
  		}
  	}

var lung = 0
var colon = 0
var breast = 0
var pros = 0

for (var i = 0; i < nr_of_countries; i++){
	lung += cancer_frequency[i][0]
	colon += cancer_frequency[i][1]
	breast += cancer_frequency[i][2]
	pros += cancer_frequency[i][3]
}

lung = parseFloat(parseFloat(lung / nr_of_countries).toFixed(1))
colon = parseFloat(parseFloat(colon / nr_of_countries).toFixed(1))
breast = parseFloat(parseFloat(breast / nr_of_countries).toFixed(1))
pros = parseFloat(parseFloat(pros / nr_of_countries).toFixed(1))

var name = "World"
var World = [lung, colon, breast, pros, name]
MakeBarchart(World, World[4], countries, cancer_frequency)

d3.selectAll(".dropdown-item").on("click", function(){
    var country = this.getAttribute("value");
    if (country == "World"){
    		UpdateBarchart(World, World[4])
    	}
    else{
    for (var i = 0; i < countries.length; i++){
    	if (country == countries[i]){
    		UpdateBarchart(cancer_frequency[i], cancer_frequency[i][4])
    	}
    }
    }
  })
}

function MakeBarchart(dataset, countryname, countries, cancer_frequency){
	// set width and height for the scatterplot
	var h = 400;
	var w = 600;

	// set padding for width and height
	var w_padding = 100;
	var h_padding = 40;

	var max_y = d3.max(dataset, function(d) { return d; })
	max_y_up = Math.ceil(max_y / 20.0) * 20

	var xscale = d3.scale.linear()
    	.domain([0, 4])
    	.range([w_padding, w - w_padding])
    	.nice();

    var yscale = d3.scale.linear()
        .domain([0, max_y_up])
        .range([h - h_padding, h_padding])
        .nice();

	var svg = d3.select("#barchart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

     svg.append("text")
		.text(countryname)
		.attr('x', 300)
		.attr('y', 30)
		.attr('class', 'title')
		.attr("font-family", "sans-serif")
   		.attr("font-size", "30px")
   		.attr("fill", "black");

   	svg.append("text")
		.text("Lung")
		.attr('x', 125)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

   	svg.append("text")
		.text("Colon")
		.attr('x', 225)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	svg.append("text")
		.text("Breast")
		.attr('x', 325)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	svg.append("text")
		.text("Prostate")
		.attr('x', 425)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

    var data = [dataset[0], dataset[1], dataset[2], dataset[3]]
    svg.selectAll("rect")
	   .data(data)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) { return xscale(i) +10})
	   .attr("y", function(d){ return yscale(d)})
	   .attr("width", 80)
	   .attr("height", function(d){ return h  - yscale(d) - h_padding})
	   .attr("fill", "#9e0142");

	svg.selectAll("rect")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut)
    	.on("click", ClickFunction);

	   var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(0);

	svg.append("g")
	    .attr("class", "x-axis")
	    .attr("transform", "translate(0," + (h - h_padding) + ")")
	    .call(xAxis);

 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(6);

  	svg.append("g")
		.attr("class", "y-axis")
		.attr("transform", "translate(" + w_padding + ",0)")
		.call(yAxis);

	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Cancer incidence per 100.000 citizens');
}

function UpdateBarchart(dataset, countryname){
	// set width and height for the scatterplot
	var h = 400;
	var w = 600;

	// set padding for width and height
	var w_padding = 100;
	var h_padding = 40;

	var max_y = d3.max(dataset, function(d) { return d; })
	max_y_up = Math.ceil(max_y / 20.0) * 20

	var xscale = d3.scale.linear()
    	.domain([0, 4])
    	.range([w_padding, w - w_padding])
    	.nice();

    var yscale = d3.scale.linear()
        .domain([0, max_y_up])
        .range([h - h_padding, h_padding])
        .nice();

	var svg = d3.select("#barchart").select("svg")

	 svg.select(".title")
		.text(countryname)

    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(1000)
	   	.attr("y", function(d){ return  yscale(d)})
	   	.attr("height", function(d){ return h  - yscale(d) - h_padding})
	
	svg.selectAll("rect")
	   	.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut)
    	.on("click", ClickFunction);

 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(6);
	
	svg.select(".y-axis")
    	.transition()
    	.duration(1000)
    	.call(yAxis)
}

function HoverFunction(d){
	
	// determine the x and y position you hover over 
	var yPos = parseFloat(d3.select(this).attr("y"))
	var xPos = parseFloat(d3.select(this).attr("x"))

	d3.select("#barchart").select("svg").append("text")
	   .attr({id: "Hover"})
	   .text(d)
        .attr("x", xPos + 5)
   		.attr("y", yPos+ 30)
   		.attr("font-family", "sans-serif")
   		.attr("font-size", "30px")
   		.attr("fill", "black");
}

function HoverOut(){
	d3.select(this)
		.transition().delay(300)
        .attr("r", 5)
    
    d3.select("#Hover")
    .remove()
}

function ClickFunction(d, i){
	if (i == 2){
		window.open("https://www.pinkribbon.nl/")
	}
	else{
		window.open("https://www.kwf.nl/")

	}
}
