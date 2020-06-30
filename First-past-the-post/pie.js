// D3 pie chart example: https://observablehq.com/@d3/pie-chart
let svg_pie = {};

function updatePieChart(data, colorSchema, id, width=150, height=150) {
    console.log(data);
    console.log(colorSchema);

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    let radius = Math.min(width, height) / 2;

    svg_pie[id] = d3.select(id).append("svg").attr("viewBox", [-width / 2, -height / 2, width, height]);
    svg_pie[id].append("g")
        .attr("stroke", "white")
        .selectAll("path")
        .join("path");

    // Compute the position of each group on the pie:
    let pie = d3.pie().value(function (d) {
        return d.value;
    });
    let data_ready = pie(d3.entries(data));

    // shape helper to build arcs:
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg_pie[id]
        .selectAll(id)
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator
        )
        .attr('fill', function (d) {
            return colorSchema[d.data.key]
        })
        .attr("stroke", "black")
        .style("stroke-width", "0.5px")
        //.on('mousemove', function (d) {
    //    updateMap(d.data.key);
        //  })
    //.on('mouseout', function (d) {
    //      updateMap("allParties");
    //  });

    svg_pie[id].selectAll("path")
        .attr("stroke", "white");

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg_pie[id]
        .selectAll(id)
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) {
            if (d.value > 3) {
                return d.data.key
            } else {
                return d.data.key.charAt(0)
            }
        })
        .attr("transform", function (d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .attr("fill", "white")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .call(text => text.append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill", "black")
            .text(function (d) {
                if (d.value > 3) {
                    return Math.round(d.value * 10) / 10
                } else {
                    return Math.round(d.value)
                }
            }))
}