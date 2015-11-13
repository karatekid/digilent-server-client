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

function getDigitalInputConfig() {
    try {
        var d = client.getDigitalInputConfig();
        console.log(d);
      return d;
    } catch(NetworkError) {
      //Don't fail, mock currently for testing
      console.log("<WARNING>: You are using a mocked digital input");
      return MockDigitalInput;
    }
}

function performDigitalRead() {
    var arr = client.readDigitalInput();
    var brokenLines = utils.breakupDigitalInput(arr);
    graph.updateLines(brokenLines, digitalInConfig.frequency.val());
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
    var html = " <button type='button' class='btn btn-danger btn-xs'>Hide</button>";
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

// Must register components before applying bindings
ko.components.register('crInput', { require: 'CRTextInput-component'});
ko.components.register('setInput', { require: 'SetInput-component'});

//A global instance of the digitalIn configuration
var digitalInConfig = ko.mapping.fromJS(getDigitalInputConfig(), DigitalInKO.DigitalInMapping);
ko.applyBindings(digitalInConfig, document.getElementById('digitalin'));

function configureDigitalRead() {
    client.configureDigitalInput(ko.mapping.toJS(digitalInConfig));
}

// Register dom with functions
$("#digitalin-startRead").click(startDigitalRead);
$("#digitalin-stopRead").click(stopDigitalRead);
$(".legendTextEntry").popover(legendPopoverOptions);
$("#cursor-toggle").click(function() {
    console.log("Toggling cursor");
    $(".cursor").toggle();
});

});
