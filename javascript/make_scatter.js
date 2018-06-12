// Sylvie Langhout
// 10792368
// 
// make_scatter.js
// Function to make scatterplot

function scatter_data(food_data, cancer_data){
	food_and_patient = []
	countries = []
	for (var element = 0; element < 44; element ++)
	{
		countries.push(food_data[element].COU)
	}

	for (var i = 0; i < 44; i++)
	{
		elements = []
		for (var j = 0; j < 44; j++)
		{
			if (food_data[j].COU == countries[i])
			{
				elements.push(food_data[j].Value)
			}
			if (cancer_data[j].COU == countries[i])
			{
				elements.push(cancer_data[j].Value)
			}
		}
		food_and_patient.push(elements)
	}
	console.log(food_and_patient)
	make_scatter(food_and_patient)
}

function make_scatter(dataset){
 // set width and height for the scatterplot
  var h = 300
  var w = 600
  
  // set padding for width and height
  var w_padding = 100
  var h_padding = 40

// create svg of width and height
 var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // pick color scheme for scatterplot
  var color = d3.scale.ordinal(d3.schemeCategory20)

  // create Scale for x-axis
  var xScale = d3.scale.linear()
   .domain([0, 300])
   .range([w_padding, w - w_padding]);

  // create scale for y-axis 
  var yScale = d3.scale.linear()
    .domain([0, 50])
    .range([h - h_padding, h_padding]);

  // create circles for the datapoints in scatterplot
  svg.selectAll("circle")
	 .data(dataset)
	 .enter()
	 .append("circle")
	 .attr("cx", function(d) {return xScale(d[0]);})
	 .attr("cy", function(d) {return yScale(d[1]);})
	 .attr("r", 5)
   .style("fill", function(d) { return color(d); })

  // create x-axis
  xAxis = d3.svg.axis().scale(xScale).orient("bottom")
    
  // Create x-axis text
  svg.append('text')
    .attr('x', w)
    .attr('y', h - 10)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .text('Grams Per Day');

  // create y-axis
  xAxis = d3.svg.axis().scale(yScale).orient("left")

  // y-axis text
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 20)
    .attr("x", 0 - (h ))
    // .attr("dy", "1em")
    .attr("text-anchor", "begin")
    .attr('class', 'label')
    .text("Col. cancer incidence/100.000 citizens");  

}