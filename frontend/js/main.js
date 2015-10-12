var transport = new Thrift.Transport("http://localhost:9090");
var protocol  = new Thrift.Protocol(transport);
var client    = new DeviceClient(protocol);
var devInfo;
var doneDrawing = false;

function getDigitalInputConfig() {
    try {
      return client.getDigitalInputConfig();
    } catch(NetworkError) {
      return "No network";
    }

}
console.log(getDigitalInputConfig());

function DigitalInModel() {
    var self = this;

    self.channels = [];
    for(var i = 0; i < 16; ++i) {
        self.channels.push({"num": i.toString()});
    }
    self.frequency = {
        min: 0,
        max: 2000,
        step: 200,
        val: 400
    }
}

ko.applyBindings(new DigitalInModel());

$("#digital-freq-select").slider();
