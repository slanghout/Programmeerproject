function MakeBarchart(dataset, countryname){
	// set width and height for the scatterplot
	var h = 400;
	var w = 600;

	// set padding for width and height
	var w_padding = 100;
	var h_padding = 40;

	var max_y = d3.max(dataset, function(d) { return d; })

	var min_y = d3.min(dataset, function(d) { return d; })

	var xscale = d3.scale.linear()
    	.domain([0, 4])
    	.range([w_padding, w - w_padding])
    	.nice();

    var yscale = d3.scale.linear()
        .domain([0, max_y])
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
		.attr("font-family", "sans-serif")
   		.attr("font-size", "30px")
   		.attr("fill", "black");

   	svg.append("text")
		.text("Lung")
		.attr('x', 100)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

   	svg.append("text")
		.text("Colon")
		.attr('x', 200)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	svg.append("text")
		.text("Breast")
		.attr('x', 300)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	svg.append("text")
		.text("Prostate")
		.attr('x', 400)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

    svg.selectAll("rect")
	   .data(dataset)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) { return xscale(i)})
	   .attr("y", function(d){ return  yscale(d)})
	   .attr("width", 80)
	   .attr("height", function(d){ return h  - yscale(d) - h_padding})
	   .attr("fill", "#9e0142");

	svg.selectAll("rect")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut);

	   var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(0);

	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(0," + (h - h_padding) + ")")
	    .call(xAxis);

 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(6);

  	svg.append("g")
		.attr("class", "axis")
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

	var min_y = d3.min(dataset, function(d) { return d; })

	var xscale = d3.scale.linear()
    	.domain([0, 4])
    	.range([w_padding, w - w_padding])
    	.nice();

    var yscale = d3.scale.linear()
        .domain([0, max_y])
        .range([h - h_padding, h_padding])
        .nice();

	var svg = d3.select("#barchart").select("svg")

	svg.selectAll("rect").remove()
	svg.selectAll("text").remove()
	svg.selectAll("g").remove()

	 svg.append("text")
		.text(countryname)
		.attr('x', 300)
		.attr('y', 30)
		.attr("font-family", "sans-serif")
   		.attr("font-size", "30px")
   		.attr("fill", "black");

   	svg.append("text")
		.text("Lung")
		.attr('x', 100)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

   	svg.append("text")
		.text("Colon")
		.attr('x', 200)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	svg.append("text")
		.text("Breast")
		.attr('x', 300)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");
   	
   	svg.append("text")
		.text("Prostate")
		.attr('x', 400)
		.attr('y', 380)
		.attr("font-family", "sans-serif")
   		.attr("fill", "black");

	svg.selectAll("rect")
	   .data(dataset)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) { return xscale(i)})
	   .attr("y", function(d){ return  yscale(d)})
	   .attr("width", 80)
	   .attr("height", function(d){ return h  - yscale(d) - h_padding})
	   .attr("fill", "#9e0142");

  	svg.selectAll("rect")
		.on("mouseover", HoverFunction)   		
    	.on("mouseout", HoverOut);

	   var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom")
		.ticks(0);

	svg.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(0," + (h - h_padding) + ")")
	    .call(xAxis);

 	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(6);

  	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + w_padding + ",0)")
		.call(yAxis);

	svg.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
		.text('Cancer incidence per 100.000 citizens');

	svg.selectAll("text")
		.data(dataset)
	   	.enter()
	   	.append("text")
		.text(function(d){ return d[4]})
		.attr('x', 150)
		.attr('y', 30);
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
