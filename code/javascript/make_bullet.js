// Sylvie Langhout
// 10792368
// 
// make_bullet.js
// Function to make and update bullet chart

// function to create data needed for bullet chart
function BulletData(data, all_food_data){
  
  // set the daily/yearly recommended intake
  var daily_cal = [1800, 2800];
  var daily_pro = [75, 157];
  var daily_fat = [40, 70];
  var year_sugar = [9, 14];
  var year_fruit = [28, 146];
  var year_vegs = [73, 110];

  // calculate minimum and maximum of the data
  bounds_cal = SetBounds(all_food_data[0], 1000);
  bounds_pro = SetBounds(all_food_data[1], 100);
  bounds_fat = SetBounds(all_food_data[2], 100);
  bounds_sugar = SetBounds(all_food_data[3], 100);
  bounds_fruit = SetBounds(all_food_data[4], 100);
  bounds_vegs = SetBounds(all_food_data[5], 100);

  // create dataset for the bullet chart
  var data =   [{"title":"Kilocalories","subtitle":"Per capita per day","ranges":[daily_cal[0], daily_cal[1],bounds_cal[2]],"measures":[data[0]],"markers":[bounds_cal[0], bounds_cal[1]]},
    {"title":"Protein (Grammes)","subtitle":"per capita per day","ranges":[daily_pro[0], daily_pro[1],bounds_pro[2]],"measures":[data[1]],"markers":[bounds_pro[0], bounds_pro[1]]},
    {"title":"Fat (Grammes)","subtitle":"per capita per day","ranges":[daily_fat[0], daily_fat[1],bounds_fat[2]],"measures":[data[2]],"markers":[bounds_fat[0], bounds_fat[1]]},
    {"title":"Sugar (Kilos)","subtitle":"per capita per year","ranges":[year_sugar[0], year_sugar[1], bounds_sugar[2]],"measures":[data[3]],"markers":[bounds_sugar[0], bounds_sugar[1]]},
    {"title":"Fruit (Kilos)","subtitle":"per capita per year","ranges":[year_fruit[0], year_fruit[1], bounds_fruit[2]],"measures":[data[4]],"markers":[bounds_fruit[0], bounds_fruit[1]]},
    {"title":"Vegetables (Kilos)","subtitle":"per capita per year","ranges":[year_vegs[0], year_vegs[1], bounds_vegs[2]],"measures":[data[5]],"markers":[bounds_vegs[0], bounds_vegs[1]]}];

  return data;
}

// function to create minimum and maxium of the data
function SetBounds(data, x){
  
  // select minimum and maximum
  var min = d3.min(data, function(d) { return d; });
  var max = d3.max(data, function(d) { return d; });
  
  // round maximum off
  var max_ceil = Math.ceil(max / x) * x;

  return [min, max, max_ceil];
}

// function to make the bullet
function MakeBullet(data, all_food_data){
  
  // select data
  var country = data[6];
  var data = BulletData(data, all_food_data);

  // set margins
  var margin = {top: 5, right: 40, bottom: 20, left: 150},
    width = 800 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

  // set width and height of chart
  var chart = d3.bullet()
    .width(width)
    .height(height);

  // create bullet chart
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
      // .on("mouseover", Infobox)
      // .on("mouseout", exit);

  // create title
  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + height / 2 + ")");

  // print title text
  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  // create subtitle text
  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });

  // create country title 
  d3.select("#info")
    .append("h3")
    .attr("class", "countrytitle")
    .attr('x', 100)
    .attr('y', 10)
    .text(country);

  // create info box about the bullet chart
  d3.select("#datainfo")
    .append("text")
    .attr("class", "infobox")
    .attr('x', 100)
    .attr('y', 50)
    .text("This bullet chart shows the food supply of different \
      food types. The black lines display the minimum and maxiumum \
      of all countries. The bar shows the recommended daily intake. \
      Light blue displays below the recommended intake, and dark blue \
      above the recommended intake. The bar shows what the supply for \
      the country selected is. Sources: \
      http://healthyeating.sfgate.com/daily-amounts-carbs-fat-fiber-sodium-protein-4230.html, \
      https://www.healthline.com/nutrition/how-much-sugar-per-day#section3, \
      https://www.ahealthylife.nl/hoeveel-fruit-per-dag-is-het-gezondst/")
    .style("font-size", "12px")
    .style("color", "grey")
    .append("br");
}

// // function to create info on hover
// function Infobox(d){

//   if (parseFloat(d.measures) > parseFloat(d.ranges[1])){
//       d3.select("#datainfo")
//       .append("text")
//       .attr("class", "data-info")
//       .attr('x', 100)
//       .attr('y', 100)
//       .text("The " + d.title + " supply is above the recommended intake \n")
//       .style("color", "red")
//       .append("br");
//   }
//   if (parseFloat(d.measures) < parseFloat(d.ranges[0])){
//       d3.select("#datainfo")
//       .append("text")
//       .attr("class", "data-info")
//       .attr('x', 100)
//       .attr('y', 100)
//       .text("The " + d.title + " supply is below the recommended intake \n")
//       .style("color", "red")
//       .append("br");
//   }
//   else if (parseFloat(d.measures) > parseFloat(d.ranges[0]) && parseFloat(d.measures) < parseFloat(d.ranges[1])) {
//     d3.select("#datainfo")
//       .append("text")
//       .attr("class", "data-info")
//       .attr('x', 100)
//       .attr('y', 100)
//       .text("The " + d.title + " supply is good compared to the recommended intake \n")
//       .style("color", "green")
//       .append("br");
//   }
  
//   }

// // function to delete hover info
// function exit(){
//   d3.select("#datainfo").select(".data-info")
//     .remove();
// }

// function to update bullet
function UpdateBullet(data, all_food_data) {
  
  // select data
  var country = data[6];
  var data = BulletData(data, all_food_data);
  
  // set margins
  var margin = {top: 5, right: 40, bottom: 20, left: 150},
    width = 800 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom; 
  
  // create chart
  var chart = d3.bullet()
    .width(width)
    .height(height);

  // remove country title and print new country title
  d3.select(".countrytitle").remove()
  d3.select("#info")
    .append("h3")
    .attr("class", "countrytitle")
    .attr('x', 100)
    .attr('y', 10)
    .text(country);
  
  
  // update the bullet data with the new data
  d3.select("#bullet").selectAll("svg")
      .data(data)
      .datum(function (d, i) {
        d.ranges = data[i].ranges;
        d.measures = data[i].measures;
        d.markers = data[i].markers;
                return d;
        })
      .call(chart.duration(1000));
}