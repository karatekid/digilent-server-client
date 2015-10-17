define(["lib/d3.min"], function(d3) {
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width  = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var x = d3.scale.linear()
        .range([0, width]);
    var lineHeight = height / 16;
    lineHeight = 10;
    var linePadding = 10;
    var y = d3.scale.linear()
        .range([lineHeight, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    var line = d3.svg.area()
        .x(function(d, i) { return x(i); })
        .y(function(d) { return y(d); });
    // Step Fxn
    line.interpolate('step-after');

    var svg = d3.select("#digitalin-graph-container").append("svg")
        .attr("width", width)
        .attr("height", height);
    var lineGs = [];
    for(var i = 0; i < 16; ++i) {
        var yTranslate = margin.top + i*(lineHeight + linePadding);
        console.log(i);
        console.log(yTranslate);
        lineGs.push(svg.append("g")
                .attr("height", lineHeight)
                .attr("transform", "translate(" + margin.left + "," + yTranslate + ")"));
    }
    // Generate fake data
    var stepper = [100, 300, 10, 20, 200];
    var curVal = 1;
    var data = [];
    for(var i = 0; i < stepper.length; ++i) {
        for(var len = 0; len < stepper[i]; ++len) {
            data.push(curVal);
        }
        curVal = curVal == 1 ? 0 : 1;
    }
    // Use fake data
    x.domain(d3.extent(data, function(d, i) { return i; }));
    y.domain(d3.extent(data, function(d) { return d; }));
    // Axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    var colors = d3.scale.category20()
        .domain(d3.range(16));
    // Line
    for(var i = 0; i < lineGs.length; ++i) {
        lineGs[i].append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .attr("stroke", colors(i));
    }
});
