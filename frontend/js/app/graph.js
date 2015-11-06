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
    var zoom = d3.behavior.zoom()
        .x(x)
        .on("zoom", zoomed);
    // Step Fxn
    line.interpolate('step-after');

    // Generate fake data
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
    var updateSteppers = [
        [300, 100, 30, 130, 140],
        [50, 150, 90, 160, 150],
        [100, 400, 100, 100],
        [120, 180, 400],
        [300, 100, 30, 130, 140],
        [50, 150, 90, 160, 150],
        [100, 400, 100, 100],
        [120, 180, 400],
        [300, 100, 30, 130, 140],
        [50, 150, 90, 160, 150],
        [100, 400, 100, 100],
        [120, 180, 400],
        [300, 100, 30, 130, 140],
        [50, 150, 90, 160, 150],
        [100, 400, 100, 100],
        [120, 180, 400],
        ];
    var updateData = [];
    for(var i = 0; i < updateSteppers.length; ++i) {
        updateData.push(genFakeData(updateSteppers[i]));
    }


    // SVG Creation / update
    var svg = d3.select("#digitalin-graph-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .call(zoom);

    // Axes
    var xAxisGraph = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

    // Lines
    var lineContainer = svg.append("g")
        .attr("id", "lineContainer");

    // Update lines w/o new data ie) zoom
    var reloadLines = function() {
        // Axis update
        xAxisGraph.call(xAxis);
        // Get Lines
        lineContainer.selectAll("g")
            .select("path")
            .attr("d", line);
    };

    // Update lines w/ new data ie) fetch
    var updateLines = function(data) {
        // Setup domain
        x.domain([
                d3.min(data, function(c) { return d3.min(c, function(d, i) { return i; }); }),
                d3.max(data, function(c) { return d3.max(c, function(d, i) { return i; }); })
                ]);
        y.domain([
                d3.min(data, function(c) { return d3.min(c, function(d) { return d; }); }),
                d3.max(data, function(c) { return d3.max(c, function(d) { return d; }); })
                ]);
        // Axis update
        xAxisGraph.call(xAxis);
        // Get Lines
        var lines = lineContainer.selectAll("g").data(data);
        // Update only
        // Enter only
        lines.enter()
            .append("g")
            .attr("height", lineHeight)
            .attr("transform", function(d, i) { return "translate(" + margin.left + "," + (margin.top + i*(lineHeight + linePadding)) + ")";})
            .attr("id", function(d, i) { return "line" + i; })
            .append("path")
            .attr("class", "line")
            .attr("stroke", function(d, i) { return colors(i); });
        // Update & enter
        lines.select("path")
            .attr("d", line);
        // Exit
        lines.exit().remove();
    };

    function zoomed() {
        console.log(d3.event);
        reloadLines();
    }

    updateLines(allData);
    return {
        updateLines: updateLines,
        updateData: updateData
    };
});
