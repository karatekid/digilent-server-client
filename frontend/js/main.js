requirejs.config({
    baseUrl: 'js/app',
    paths: {
        lib: '../lib',
    }
});
requirejs([
    'DigitalInKnockout',
    'graph',
    'utils'
],
function (DigitalInKO, graph, utils) {
var transport = new Thrift.Transport("http://localhost:9090");
var protocol  = new Thrift.Protocol(transport);
var client    = new DeviceClient(protocol);
var devInfo;
var doneDrawing = false;
var lastData = null;
var blackList = new Set();

function getDigitalInputConfig() {
    try {
        var d = client.getDigitalInputConfig();
        return d;
    } catch(NetworkError) {
      //Don't fail, mock currently for testing
      console.log("<WARNING>: You are using a mocked digital input");
      return MockDigitalInput;
    }
}

function filterData(data, bList) {
    var newData = {}
    for(var key in data) {
        key = parseInt(key);
        if(!bList.has(key)) {
            newData[key] = data[key];
        }
    }
    return newData;
}

function updateGraphWithDictData(dictData) {
    lastData = dictData;
    graph.updateLines(filterData(dictData, blackList), digitalInConfig.frequency.val());
}
function updateGraphWithRawData(rawData) {
    updateGraphWithDictData(utils.breakupDigitalInput(rawData));
}

function performDigitalRead() {
    var arr = client.readDigitalInput();
    updateGraphWithRawData(arr);
}
function startDigitalRead() {
    configureDigitalRead();
    client.startDigitalInput();
    setTimeout(performDigitalRead, 500);
}
function stopDigitalRead() {
    client.stopDigitalInput();
}


function legendClick() {
    var channel = parseInt($(this).context.textContent);
    var html = " <button type='button' class='btn btn-danger btn-xs hide-channel' channel='" + channel + "'>Hide</button>";
    html += " <button type='button' class='btn btn-danger btn-xs hide-channels-below' channel='" + channel + "'>Hide all below</button>";
    html += " <button type='button' class='btn btn-danger btn-xs hide-channels-above' channel='" + channel + "'>Hide all above</button>";
    html += " <button type='button' class='btn btn-success btn-xs show-channels-below' channel='" + channel + "'>Show all below</button>";
    html += " <button type='button' class='btn btn-success btn-xs show-channels-above' channel='" + channel + "'>Show all above</button>";
    return html;
}
function legendTitle() {
    var channel = parseInt($(this).context.textContent);
    return "CH: " + channel;
}
var legendPopoverOptions = {
    container: "body",
    html: true,

    content: legendClick,
    title: legendTitle
};

function doStuffToBlacklistAndUpdate(fxn) {
    return function() {
        var channel = parseInt($(this).attr("channel"));
        console.log(channel);
        fxn(channel);
        $(".legendTextEntry").popover("hide");
        graph.updateLines(filterData(lastData, blackList), digitalInConfig.frequency.val());
    };
}

// Must register components before applying bindings
ko.components.register('crInput', { require: 'CRTextInput-component'});
ko.components.register('setInput', { require: 'SetInput-component'});

DigitalInKO.initialize({formatTime: graph.formatTime});
//A global instance of the digitalIn configuration
var digitalInConfig = ko.mapping.fromJS(getDigitalInputConfig(), DigitalInKO.DigitalInMapping);
ko.applyBindings(digitalInConfig, document.getElementById('digitalin'));

function configureDigitalRead() {
    client.configureDigitalInput(ko.mapping.toJS(digitalInConfig));
}

function cursorChanged(id, val) {
    if(id === "lCursor") {
        digitalInConfig.lCursor(val);
    } else if(id === "rCursor") {
        digitalInConfig.rCursor(val);
    } else {
        digitalInConfig.lCursor(graph.invertX($("#lCursor").attr("x")));
        digitalInConfig.rCursor(graph.invertX($("#rCursor").attr("x")));
    }
}

// Register dom with functions
$("#digitalin-startRead").click(startDigitalRead);
$("#digitalin-stopRead").click(stopDigitalRead);
$(".legendTextEntry").popover(legendPopoverOptions);
$(document).on("click", ".hide-channel",
        doStuffToBlacklistAndUpdate(function(ch) {
            blackList.add(ch);
        }));
$(document).on("click", ".hide-channels-below",
        doStuffToBlacklistAndUpdate(function(ch) {
            for(var i = ch + 1; i < digitalInConfig.channels.length; ++i) {
                blackList.add(i);
            }
        }));
$(document).on("click", ".hide-channels-above",
        doStuffToBlacklistAndUpdate(function(ch) {
            for(var i = ch - 1; i >= 0; --i) {
                blackList.add(i);
            }
        }));
$(document).on("click", ".show-channels-below",
        doStuffToBlacklistAndUpdate(function(ch) {
            for(var i = ch + 1; i < digitalInConfig.channels.length; ++i) {
                blackList.delete(i);
            }
        }));
$(document).on("click", ".show-channels-above",
        doStuffToBlacklistAndUpdate(function(ch) {
            for(var i = ch - 1; i >= 0; --i) {
                blackList.delete(i);
            }
        }));

graph.initialize({onCursorChanged: cursorChanged});
cursorChanged();
$("#cursor-toggle").click(function() {
    $(".cursor").toggle();
});

updateGraphWithDictData(graph.updateData);

});
