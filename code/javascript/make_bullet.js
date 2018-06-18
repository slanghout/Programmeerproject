function BulletData(data){
  var country = data[6]
  var data =   [{"title":"Kilocalories","subtitle":"Per capita per day","ranges":[1800,2800,4000],"measures":[data[0]],"markers":[2435, 3739]},
    {"title":"Protein(Grammes)","subtitle":"per capita per day","ranges":[75, 157,200],"measures":[data[1]],"markers":[52, 169]},
    {"title":"Fat(Grammes)","subtitle":"per capita per day","ranges":[40,70,200],"measures":[data[2]],"markers":[59, 167]},
    {"title":"Sugar(Kilos)","subtitle":"per capita per year","ranges":[9, 14, 100],"measures":[data[3]],"markers":[6, 63]},
    {"title":"Fruit(Kilos)","subtitle":"per capita per year","ranges":[28,146, 300],"measures":[data[4]],"markers":[32, 202]},
    {"title":"Vegetables(Kilos)","subtitle":"per capita per year","ranges":[73, 110,400],"measures":[data[5]],"markers":[41, 347]}]

  // source : http://healthyeating.sfgate.com/daily-amounts-carbs-fat-fiber-sodium-protein-4230.html
  // https://www.healthline.com/nutrition/how-much-sugar-per-day#section3
  // https://www.ahealthylife.nl/hoeveel-fruit-per-dag-is-het-gezondst/
  MakeBullet(data, country)
}

function MakeBullet(data, country){

  d3.select("#bullet").selectAll("text").remove()
  d3.select("#bullet").selectAll("svg").remove()

  var margin = {top: 5, right: 40, bottom: 20, left: 150},
    width = 800 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

  var chart = d3.bullet()
    .width(width)
    .height(height);

  var svg = d3.select("#bullet").selectAll("svg")
      .data(data)
      .enter()
      .append("svg")
      .attr("class", "bullet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(chart);

  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + height / 2 + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });

  d3.select("#bullet").append("text")
    .text(country)
    .attr('x', 10)
    .attr('y', 10)
    .attr("font-family", "sans-serif")
    .attr("font-size", "30px")
    .attr("fill", "black");

}


