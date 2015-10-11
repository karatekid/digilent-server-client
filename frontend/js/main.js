var transport = new Thrift.Transport("http://localhost:9090");
var protocol  = new Thrift.Protocol(transport);
var client    = new DeviceClient(protocol);
var devInfo;
var doneDrawing = false;

function getDigitalInputConfig() {
    return client.getDigitalInputConfig();
}
console.log(getDigitalInputConfig());

