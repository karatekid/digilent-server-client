requirejs.config({
    baseUrl: 'js/app',
});
requirejs([
],
function () {
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

function getClosestDigitalFreq(minFreq, maxFreq, setFreq) {
    //Normalize
    return maxFreq / getDigitalDivider(minFreq, maxFreq, setFreq);
}
function getDigitalDivider(minFreq, maxFreq, setFreq) {
    if(setFreq < minFreq) {
        return minFreq;
    } else if(setFreq > maxFreq) {
        return maxFreq;
    }
    return Math.round(maxFreq / setFreq);
}

//View Model mostly based off of DigitalInputConfig, with extra fields
function DigitalInConfigVM(data) {
    var self = this;
    //Thrift object
    ko.mapping.fromJS(data, {}, self);
    //Additional fields
    self.channels = [];
    for(var i = 0; i < 16; ++i) {
        self.channels.push({"num": i.toString()});
    }
    self.frequency = {
        min: ko.pureComputed(function() {
            return self.internalClkFreq()/self.divider.max();
        }, self),
        max: ko.pureComputed(function() {
            return self.internalClkFreq()/self.divider.min();
        }, self),
        val: ko.pureComputed({
            read: function() {
                return self.internalClkFreq()/self.divider.val();
            },
            write: function(value) {
                var min = self.internalClkFreq()/self.divider.max();
                var max = self.internalClkFreq()/self.divider.min();
                self.divider.val(getDigitalDivider(min, max , value));
            },
            owner: self
        }),
        step: 1
    }
}
var DigitalInMapping = {
    create: function(options) {
        return new DigitalInConfigVM(options.data);
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
var digitalInConfig = ko.mapping.fromJS(getDigitalInputConfig(), DigitalInMapping);
ko.applyBindings(digitalInConfig, document.getElementById('digitalin'));
});
