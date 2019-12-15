// @TODO: YOUR CODE HERE!

d3.select(window).on("resize", makeResponsive);

loadChart();

function makeResponsive() {

    var svgArea = d3.select("#scatter").select("svg");

     if(!svgArea.empty()) {
         svgArea.remove();
    }

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgwidth - margin.left - margin.right;

    var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgwidth);

    var chartGroup = svg.append("g")
    .attr("transform"), `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data.csv").then(function(healthData) {
        console.log(healthData);

        healthData.forEach(function(data) {
            data.smokes = +data.smokes;
            data.age = +data.age;
        });

        var xLinearScale = d3/scaleLinear()
        .domain(d3.extent(healthData, d => d.age))
        .range([0, width]);

        var yLinearScale = d3.scaleLinear()
        .domain([8, d3.max(healthData, d => d.smokes)])
        .range([height, 0]);

        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

        chartGroup.append("g")
            .call(yAxis);

        chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("opacity", ".5");

        chartGroup.append("g").selectAll("text")
        .data(healthData)
        .enter()
        .append("text")
        .attr(d => d.abbr)
        .atrr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "white")
        .attr("font-weight", "bold");

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 10})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .text("Median Age");

        chartGroup.append("text")
        .attr("y", 0 - (margin.left / 2))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .attr("transform", "rotate(-90)")
        .text("Percentage Who Smoke");

    
    })

};

makeResponsive();

d3.select(window).on("resize", makeResponsive);



