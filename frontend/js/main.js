requirejs.config({
    baseUrl: 'js/app',
});
requirejs([
    'DigitalInKnockout'
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
ko.components.register('crInput', {
    viewModel: function(params) {
        var self  = this;
        self.min  = (params && params.data && params.data.min) || 0;
        self.max  = (params && params.data && params.data.max) || 0;
        self.val  = (params && params.data && params.data.val) || 0;
        self.name = (params && params.name) || 0;
    },
    template:
        "<label data-bind=\"text: name + '[' + min() + ', ' + max() + ']: '\"></label>" +
        '<input type="text" class="form-control"' +
                'data-bind="value: val">'
});
ko.components.register('setInput', {
    viewModel: function(params) {
        var self = this;
        self.roptions = (params && params.data && params.data.options) || 0;
        self.val = (params && params.data && params.data.val) || 0;
        self.dict = (params && params.dict) || 0;
        self.name = (params && params.name) || 0;
    },
    template:
        "<label data-bind='text: name'></label>" +
        "<select class='form-control' " +
                 "data-bind='options: roptions, " +
                           "optionsText: function(key) {" +
                                "return dict[key];}, " +
                           "value: val'></select>"
});

//A global instance of the digitalIn configuration
var digitalInConfig = ko.mapping.fromJS(getDigitalInputConfig(), DigitalInKO.DigitalInMapping);
ko.applyBindings(digitalInConfig, document.getElementById('digitalin'));
});
