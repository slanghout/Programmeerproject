// Sylvie Langhout
// 10792368
// 
// make_bullet.js
// Function to make bullet chart

// function to create data needed for bullet
function BulletData(data, all_food_data){
  var daily_cal = [1800, 2800]
  var daily_pro = [75, 157]
  var daily_fat = [40, 70]
  var year_sugar = [9, 14]
  var year_fruit = [28, 146]
  var year_vegs = [73, 110]

  var min_cal = d3.min(all_food_data[0], function(d) { return d; })
  var max_cal = d3.max(all_food_data[0], function(d) { return d; })
  var max_cal_up = Math.ceil(max_cal / 1000.0) * 1000
  
  var min_pro = d3.min(all_food_data[1], function(d) { return d; })
  var max_pro = d3.max(all_food_data[1], function(d) { return d; })
  var max_pro_up = Math.ceil(max_pro / 100.0) * 100

  var min_fat = d3.min(all_food_data[2], function(d) { return d; })
  var max_fat = d3.max(all_food_data[2], function(d) { return d; })
  var max_fat_up = Math.ceil(max_fat / 100.0) * 100

  var min_sugar = d3.min(all_food_data[3], function(d) { return d; })
  var max_sugar = d3.max(all_food_data[3], function(d) { return d; })
  var max_sugar_up = Math.ceil(max_sugar / 100.0) * 100

  var min_fruit = d3.min(all_food_data[4], function(d) { return d; })
  var max_fruit = d3.max(all_food_data[4], function(d) { return d; })
  var max_fruit_up = Math.ceil(max_fruit / 100.0) * 100

  var min_vegs = d3.min(all_food_data[5], function(d) { return d; })
  var max_vegs = d3.max(all_food_data[5], function(d) { return d; })
  var max_vegs_up = Math.ceil(max_vegs / 100.0) * 100

  var data =   [{"title":"Kilocalories","subtitle":"Per capita per day","ranges":[daily_cal[0], daily_cal[1],max_cal_up],"measures":[data[0]],"markers":[min_cal, max_cal]},
    {"title":"Protein (Grammes)","subtitle":"per capita per day","ranges":[daily_pro[0], daily_pro[1],max_pro_up],"measures":[data[1]],"markers":[min_pro, max_pro]},
    {"title":"Fat (Grammes)","subtitle":"per capita per day","ranges":[daily_fat[0], daily_fat[1],max_fat_up],"measures":[data[2]],"markers":[min_fat, max_fat]},
    {"title":"Sugar (Kilos)","subtitle":"per capita per year","ranges":[year_sugar[0], year_sugar[1], max_sugar_up],"measures":[data[3]],"markers":[min_sugar, max_sugar]},
    {"title":"Fruit (Kilos)","subtitle":"per capita per year","ranges":[year_fruit[0], year_fruit[1], max_fruit_up],"measures":[data[4]],"markers":[min_fruit, max_fruit]},
    {"title":"Vegetables (Kilos)","subtitle":"per capita per year","ranges":[year_vegs[0], year_vegs[1], max_vegs_up],"measures":[data[5]],"markers":[min_vegs, max_vegs]}]

  // source : http://healthyeating.sfgate.com/daily-amounts-carbs-fat-fiber-sodium-protein-4230.html
  // https://www.healthline.com/nutrition/how-much-sugar-per-day#section3
  // https://www.ahealthylife.nl/hoeveel-fruit-per-dag-is-het-gezondst/
  return data
}

// function to make the bullet
function MakeBullet(data, all_food_data){

  console.log(all_food_data)
  var country = data[6]
  var data = BulletData(data, all_food_data)

  d3.select("#info").selectAll("h3").remove()
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
      .call(chart)
      .on("mouseover", Infobox)
      .on("mouseout", exit);

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

  d3.select("#info")
    .append("h3")
    .attr('x', 100)
    .attr('y', 10)
    .text(country);
}

function Infobox(){

  d3.select("#information")
    .append("text")
    .attr("class", "infobox")
    .attr('x', 100)
    .attr('y', 100)
    .text("This bullet chart shows the food supply\
      against what the minimum and maximum of all countries are \
      ,displayed by the black lines, and what the recommended daily\
       intake should be according to the healthy standards. \
      Light blue displays below the recommended intake, and dark blue \
      above the recommended intake. The bar shows what the supply for\
       the country selected is. Sources: \
       http://healthyeating.sfgate.com/daily-amounts-carbs-fat-fiber-sodium-protein-4230.html , \
       https://www.healthline.com/nutrition/how-much-sugar-per-day#section3 , \
      https://www.ahealthylife.nl/hoeveel-fruit-per-dag-is-het-gezondst/");
}

function exit(){
  d3.select("#information").select(".infobox")
    .remove()
}

function UpdateBullet(){
  d3.select("#info").selectAll("h3").remove()
  // d3.select("#bullet").selectAll("svg").remove()
  var svg = d3.select("#bullet").selectAll("svg")
  svg.datum(randomize).call(chart.duration(1000));
}
