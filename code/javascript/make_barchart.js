function MakeBarchart(dataset){
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
        .domain([min_y, max_y])
        .range([h - h_padding, h_padding])
        .nice();

	var svg = d3.select("#barchart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
	   .data(dataset)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {
    return (i * ( (w - w_padding) / dataset.length) + w_padding);
})
	   .attr("y", function(d){ return  (h - d) - 40})
	   .attr("width", 20)
	   .attr("height", function(d){ return d})
	   .attr("fill", "teal");


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
