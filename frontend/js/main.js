requirejs.config({
    baseUrl: 'js/app',
    paths: {
        lib: '../lib',
    }
});
requirejs([
    'DigitalInKnockout',
],
function (DigitalInKO) {
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

// Must register components before applying bindings
ko.components.register('crInput', { require: 'CRTextInput-component'});
ko.components.register('setInput', { require: 'SetInput-component'});

//A global instance of the digitalIn configuration
var digitalInConfig = ko.mapping.fromJS(getDigitalInputConfig(), DigitalInKO.DigitalInMapping);
ko.applyBindings(digitalInConfig, document.getElementById('digitalin'));
});
