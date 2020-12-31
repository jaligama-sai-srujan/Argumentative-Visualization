
var mapSvg;

var lineSvg;
var lineWidth;
var lineHeight;
var lineInnerHeight;
var lineInnerWidth;
var lineMargin = { top: 20, right: 60, bottom: 60, left: 100 };

var mapData;
var timeData;

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
 

  // Load both files before doing anything else
  Promise.all([d3.csv('data/police_killings.csv')])
          .then(function(values){
    
	data = values[0];
    drawPie1();
	drawPie2();
  })

});

function drawPie1(){
	var tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "3px")
        .style("opacity", "0");
	var pieMargin = {top: 60, right: 40, bottom: 40, left: 80};
	pieMaxWidth = 700;
      pieMaxHeight = 450;
      pieWidth = pieMaxWidth - pieMargin.left - pieMargin.right,
      pieHeight = pieMaxHeight - pieMargin.top - pieMargin.bottom;
      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      var radius = pieMaxHeight / 2 - 40

      // append the svg object to the div called 'my_dataviz'
      var svg = d3.select("#pie1")
          .append("svg")
          .attr("width", pieMaxWidth)
          .attr("height", pieMaxHeight+radius)
          .append("g")
          .attr("transform", "translate(" + (pieMargin.left+radius) + "," + (pieMargin.top+radius) + ")");
		console.log(svg)
      var Kills = [0,0]
	  var race = ["White","Black"]
      for(var i in data){
          
        row = data[i];
         if(row["raceethnicity"] == "White")Kills[0]+=1
		 if(row["raceethnicity"] == "Black")Kills[1]+=1
      }
	  console.log(Kills)
	  var color = d3.scaleOrdinal(d3.schemeCategory10);
		var pie = d3.pie();


      // Generate the arcs
      var arc = d3.arc()
                  .innerRadius(0)
                  .outerRadius(radius);

      //Generate groups
        var arcs = svg.selectAll("arc")
                    .data(pie(Kills))
                    .enter()
                    .append("g")
                    .attr("class", "arc1")
		arcs.append("path")
          .attr("fill", function(d, i) {return color(i);})
          .attr("d", arc)
          .attr("stroke", "black")
		  .on('mouseover', function(d,i) {
              d3.select(this).style('stroke','cyan').style('stroke-width','4');
              tooltip.transition()
                        .style("opacity", 1).style("z-index","1");
              let val = "Number of "+race[i]+" People Killed by people: "+Kills[i];
              tooltip.html(val)
                  .style("font-size", "14px")
                  .style("stroke","black")
                  .style("left", (d3.event.pageX + 50) + "px")
                  .style("top", (d3.event.pageY - 15) + "px");
          })
          .on('mousemove',function(d,i) {
              console.log("mousemove");
          })
          .on('mouseout', function(d,i) {
              d3.select(this).style('stroke','black').style('stroke-width','1');
              tooltip.transition()
                        .style('opacity', '0').style("z-index","-1");
          })
		  
		  
	const l = svg.append('g')
              .attr('transform', `translate(${-radius},${radius})`);

      const xl = d3.scaleBand()
            .range([-20, 2*radius])
            .padding(0.2)
            .domain(color.domain());
			
	const legend = l.selectAll('yfyu')
              .data(color.domain())
              .enter()
              .append('g')
              .attr('class', 'pie-chart-legend')
              .attr('transform', (d, i) => `translate(${xl(d)+50},${30})`);

            legend.append('circle')
              .attr('r', 5)
              .style('fill', color)
            ;
            
            legend.append('text')
              .attr('x', 8)
              .attr('y', 5).style("fontSize","10")
              .text(d => race[d])
	l.append("text")
                  .attr("text-anchor", "end")
                  .style("font-size", "14px")
                  .attr('transform', (d, i) => `translate(${500},${100})`)
                  .text("Number of White People Killed by Police v/s Number of Black People Killed by Police")
				  .style("font-weight","bold");
}

function drawPie2(){
	var tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "3px")
        .style("opacity", "0");
	var pieMargin = {top: 60, right: 40, bottom: 40, left: 80};
	pieMaxWidth = 700;
      pieMaxHeight = 450;
      pieWidth = pieMaxWidth - pieMargin.left - pieMargin.right,
      pieHeight = pieMaxHeight - pieMargin.top - pieMargin.bottom;
      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      var radius = pieMaxHeight / 2 - 40

      // append the svg object to the div called 'my_dataviz'
      var svg = d3.select("#pie2")
          .append("svg")
          .attr("width", pieMaxWidth)
          .attr("height", pieMaxHeight+radius)
          .append("g")
          .attr("transform", "translate(" + (pieMargin.left+radius) + "," + (pieMargin.top+radius) + ")");
		console.log(svg)
      var Kills = [0,0]
	  var proportion = [0,0]
	  var race = ["White","Black"]
      for(var i in data){
          
        row = data[i];
         if(row["raceethnicity"] == "White"){
			proportion[0] += +row["share_white"]
			Kills[0]+=1
			 
		 }

		 if(row["raceethnicity"] == "Black"){
			 if(row["share_black"]!= '-'){
			 proportion[1] += +row["share_black"]
			 }
			 
			 Kills[1]+=1}
      }
	  
	  Kills[0] = Math.round((Kills[0]/ proportion[0]) *1000)
	  Kills[1] = Math.round((Kills[1]/ proportion[1]) *1000)
	  
	  console.log(Kills)
	  var color = d3.scaleOrdinal(d3.schemeCategory10);
		var pie = d3.pie();


      // Generate the arcs
      var arc = d3.arc()
                  .innerRadius(0)
                  .outerRadius(radius);

      //Generate groups
        var arcs = svg.selectAll("arc")
                    .data(pie(Kills))
                    .enter()
                    .append("g")
                    .attr("class", "arc1")
		arcs.append("path")
          .attr("fill", function(d, i) {return color(i);})
          .attr("d", arc)
          .attr("stroke", "black")
		  .on('mouseover', function(d,i) {
              d3.select(this).style('stroke','cyan').style('stroke-width','4');
              tooltip.transition()
                        .style("opacity", 1).style("z-index","1");
              let val = ""+Kills[i] +"% of "+race[i]+" Attacked by police";
              tooltip.html(val)
                  .style("font-size", "14px")
                  .style("stroke","black")
                  .style("left", (d3.event.pageX + 50) + "px")
                  .style("top", (d3.event.pageY - 15) + "px");
          })
          .on('mousemove',function(d,i) {
              console.log("mousemove");
          })
          .on('mouseout', function(d,i) {
              d3.select(this).style('stroke','black').style('stroke-width','1');
              tooltip.transition()
                        .style('opacity', '0').style("z-index","-1");
          })
		  
		  
	const l = svg.append('g')
              .attr('transform', `translate(${-radius},${radius})`);

      const xl = d3.scaleBand()
            .range([0, 2*radius])
            .padding(0.2)
            .domain(color.domain());
			
	const legend = l.selectAll('yfyu')
              .data(color.domain())
              .enter()
              .append('g')
              .attr('class', 'pie-chart-legend')
              .attr('transform', (d, i) => `translate(${xl(d)+50},${30})`);

            legend.append('circle')
              .attr('r', 5)
              .style('fill', color)
            ;
            
            legend.append('text')
              .attr('x', 8)
              .attr('y', 5).style("fontSize","10")
              .text(d => race[d])
	l.append("text")
                  .attr("text-anchor", "end")
                  .style("font-size", "14px")
                  .attr('transform', (d, i) => `translate(${450},${100})`)
                  .text("Proportion of White People v/s Proportion of Black People Killed by Police")
				  .style("font-weight","bold");
}

