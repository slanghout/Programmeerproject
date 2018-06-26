/* Sylvie Langhout
* 10792368
* bullet.js
* Functions to make and update bullet chart for the data page via script_data.js
*/

// function to create data needed for bullet chart
function bulletData(data, all_food_data){
  
  // set the daily/yearly recommended intake
  var dailyCal = [1800, 2800];
  var dailyProtein = [75, 157];
  var dailyFat = [40, 70];
  var yearSugar = [9, 14];
  var yearFruit = [28, 146];
  var yearVegs = [73, 110];

  // calculate minimum and maximum of the data
  boundsCal = setBounds(all_food_data[0], 1000);
  boundsProtein = setBounds(all_food_data[1], 100);
  boundsFat = setBounds(all_food_data[2], 100);
  boundsSugar = setBounds(all_food_data[3], 100);
  boundsFruit = setBounds(all_food_data[4], 100);
  boundsVegs = setBounds(all_food_data[5], 100);

  // create dataset for the bullet chart
  var data =   [{"title":"Kilocalories","subtitle":"Per capita per day",
    "ranges":[dailyCal[0], dailyCal[1], boundsCal[2]],"measures":[data[0]],
    "markers":[boundsCal[0], boundsCal[1]]},
    {"title":"Protein (Grammes)","subtitle":"per capita per day",
    "ranges":[dailyProtein[0], dailyProtein[1], boundsProtein[2]],
    "measures":[data[1]],"markers":[boundsProtein[0], boundsProtein[1]]},
    {"title":"Fat (Grammes)","subtitle":"per capita per day",
    "ranges":[dailyFat[0], dailyFat[1], boundsFat[2]],
    "measures":[data[2]],"markers":[boundsFat[0], boundsFat[1]]},
    {"title":"Sugar (Kilos)","subtitle":"per capita per year",
    "ranges":[yearSugar[0], yearSugar[1], boundsSugar[2]],
    "measures":[data[3]],"markers":[boundsSugar[0], boundsSugar[1]]},
    {"title":"Fruit (Kilos)","subtitle":"per capita per year",
    "ranges":[yearFruit[0], yearFruit[1], boundsFruit[2]],
    "measures":[data[4]],"markers":[boundsFruit[0], boundsFruit[1]]},
    {"title":"Vegetables (Kilos)","subtitle":"per capita per year",
    "ranges":[yearVegs[0], yearVegs[1], boundsVegs[2]],
    "measures":[data[5]],"markers":[boundsVegs[0], boundsVegs[1]]}];

  return data;
};

// function to make the bullet
function makeBullet(data, foodValue){
  
  if (data != undefined){

    // select data
    var country = data[6];
    var data = bulletData(data, foodValue);

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
        Light grey displays below the recommended intake, and dark grey \
        above the recommended intake. The bar shows what the supply for \
        the country selected is. Green bars are within the daily intake, \
        red bars are below or above.") 
      .style("font-size", "12px")
      .style("color", "grey")
      .append("br");

      // color the bullet
      colorBullet();
    };
};

// function to update bullet
function updateBullet(data, foodValue) {
  
  if (data != undefined){
    // select data
    var country = data[6];
    var data = bulletData(data, foodValue);
    
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

      // color the bullet
      colorBullet();
  };
};

// function to create minimum and maxium of the data
function setBounds(data, x){
  
  // select minimum and maximum
  var min = d3.min(data, function(d) { return d; });
  var max = d3.max(data, function(d) { return d; });
  
  // round maximum off
  var maxCeil = Math.ceil(max / x) * x;

  return [min, max, maxCeil];
};

// function to color the bullet chart measures
function colorBullet(){
  d3.select("#bullet").selectAll("svg").select(".measure")
    .style("opacity", 0.6)
    .style("fill", function(d){
      
      // if the value is between the ranges make the bar green
      if (parseFloat(d.measures) < parseFloat(d.ranges[1])
        && parseFloat(d.measures) > parseFloat(d.ranges[0])){
        return "#74c476";
      }

      // else make it red
      else{
        return "#ef3b2c";
      };
  });
};