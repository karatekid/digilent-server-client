define(["lib/d3.min"], function(d3) {
    // Generate series of 1's & 0's from array of durations
    var genFakeData = function(arr, curVal) {
        // Default params
        curVal = typeof curVal !== 'undefined' ? curVal : 1;
        // Computation
        var data = [];
        for(var i = 0; i < arr.length; ++i) {
            for(var len = 0; len < arr[i]; ++len) {
                data.push(curVal);
            }
            curVal = curVal == 1 ? 0 : 1;
        }
        return data;
    };
    // Setup
    var margin = {top: 40, right: 20, bottom: 30, left: 50},
        width  = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var x = d3.scale.linear()
        .range([0, width]);
    var linePadding = 10;
    var lineHeight = height / 16 - linePadding;
    var y = d3.scale.linear()
        .range([lineHeight, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    var colors = d3.scale.category20()
        .domain(d3.range(16));
    var line = d3.svg.area()
        .x(function(d, i) { return x(i); })
        .y(function(d) { return y(d); });
    // Step Fxn
    line.interpolate('step-after');

    // Generate fake data
    var stepper = [100, 300, 10, 20, 200];
    var steppers = [
        [100, 300, 10, 20, 200, 70],
        [100, 200, 100, 150, 150],
        [200, 300, 200],
        [120, 140, 40, 400],
        [100, 300, 10, 20, 200, 70],
        [100, 200, 100, 150, 150],
        [200, 300, 200],
        [120, 140, 40, 400],
        [100, 300, 10, 20, 200, 70],
        [100, 200, 100, 150, 150],
        [200, 300, 200],
        [120, 140, 40, 400],
        [100, 300, 10, 20, 200, 70],
        [100, 200, 100, 150, 150],
        [200, 300, 200],
        [120, 140, 40, 400]];
    var allData = [];
    for(var i = 0; i < steppers.length; ++i) {
        allData.push(genFakeData(steppers[i]));
    }

    // Use fake data
    x.domain([
            d3.min(allData, function(c) { return d3.min(c, function(d, i) { return i; }); }),
            d3.max(allData, function(c) { return d3.max(c, function(d, i) { return i; }); })
            ]);
    y.domain([
            d3.min(allData, function(c) { return d3.min(c, function(d) { return d; }); }),
            d3.max(allData, function(c) { return d3.max(c, function(d) { return d; }); })
            ]);
    // SVG Creation / update
    var svg = d3.select("#digitalin-graph-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    // Axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
        .call(xAxis);
    // Lines
    var lineContainer = svg.append("g")
        .attr("id", "lineContainer");
    var lines = lineContainer.selectAll("g").data(allData);
    lines.enter()
        .append("g")
        .attr("height", lineHeight)
        .attr("transform", function(d, i) { return "translate(" + margin.left + "," + (margin.top + i*(lineHeight + linePadding)) + ")";})
        .attr("id", function(d, i) { return "line" + i; })
        .append("path")
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", function(d, i) { return colors(i); });
});
