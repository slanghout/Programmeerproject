function BulletData(country, food_data){


} 


function MakeBullet(){
 // set width and height for the scatterplot
  var h = 400;
  var w = 600;
  
  // set padding for width and height
  var w_padding = 100;
  var h_padding = 40;

  // create svg of width and height
  var svg = d3.select("#bullet")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

}