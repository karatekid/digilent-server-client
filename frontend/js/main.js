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
var mapping = {
    create: function(options) {
        return new DigitalInConfigVM(options.data);
    }
}
//A global instance of the digitalIn configuration
var digitalInConfig = ko.mapping.fromJS(getDigitalInputConfig(), mapping);
ko.applyBindings(digitalInConfig, document.getElementById('digitalin'));
