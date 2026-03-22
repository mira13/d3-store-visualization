import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

export default function LinePlot({
  data
}) {

 const margin = { top: 0, right: 100, bottom: 30, left: 100 };
 const width = 1600 - margin.left - margin.right;
 const height = 300 - margin.top - margin.bottom ;
 const svgRef = useRef();
 useEffect(() => {
  d3.selectAll("svg > *").remove();

  const svg = d3.select(svgRef.current);
  
  //X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.name; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(40," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  //Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height, 0]);
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(40, 0)") 
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("fill", function(d) { return d.value > 0 ? "#69b3a2" : "#b369a2" })
      .attr("transform", "translate(40, 0)") 
      .attr("y", function(d) { return y(0); })

  // Animation
  svg.selectAll("rect")
    .transition()
    .duration(500)
    .attr("y", function(d) { return y(Math.abs(d.value)); })
    .attr("height", function(d) { return height - y(Math.abs(d.value)); })
    .delay(function(d,i){return(i*30)})
    }, [data]);

  return (
    <div>
      <svg ref={svgRef} 
        style={{padding:"20px"}} 
        width={width + margin.left + margin.right} 
        height={height + margin.top + margin.bottom + 100}>
      </svg>
    </div>
  );
}
