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
      return client.getDigitalInputConfig();
    } catch(NetworkError) {
      //Don't fail, mock currently for testing
      //TODO: Implement better Mock setup
      return DigitalInput();
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


$("#digitalin-startRead").click(startDigitalRead);
$("#digitalin-stopRead").click(stopDigitalRead);

// Must register components before applying bindings
ko.components.register('crInput', { require: 'CRTextInput-component'});
ko.components.register('setInput', { require: 'SetInput-component'});

//A global instance of the digitalIn configuration
var digitalInConfig = ko.mapping.fromJS(getDigitalInputConfig(), DigitalInKO.DigitalInMapping);
ko.applyBindings(digitalInConfig, document.getElementById('digitalin'));

function configureDigitalRead() {
    client.configureDigitalInput(ko.mapping.toJS(digitalInConfig));
}
});
