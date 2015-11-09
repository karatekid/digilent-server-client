define(function() {
    // Accept an array of integers and breakup into 16 arrays of 1's & 0's
    var breakupDigitalInput = function(arr) {
        var numChannels = 16;
        var digitalDict = {};
        // Setup array
        for(var i = 0; i < numChannels; ++i) {
            digitalDict[i] = [];
        }
        // Breakup input
        for(var i = 0; i < arr.length; ++i) {
            for(var mask = 0; mask < numChannels; ++mask) {
                digitalDict[mask].push(arr[i] & (1 << mask));
            }
        }
        return digitalDict;
    };

    return {
        breakupDigitalInput: breakupDigitalInput
    }
});
