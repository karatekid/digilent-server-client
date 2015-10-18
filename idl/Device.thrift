include "DigitalInput.thrift"
include "AnalogInput.thrift"

exception DeviceNotAvailable {
    1: string why
}
exception InvalidConfiguration {
    1: string why
}

service Device {
    // DigitalInput functions
    // Gets beginning info and original value
    DigitalInput.DigitalInput getDigitalInputConfig(),
    // Set configuration and get what was actually set
    DigitalInput.DigitalInput configureDigitalInput(1:DigitalInput.DigitalInput config) throws (1:InvalidConfiguration ouch),
    void resetDigitalInput(),
    void startDigitalInput(),
    void stopDigitalInput(),
    list<DigitalInput.DigitalData> readDigitalInput(),

    // AnalogInput functions
    // Gets beginning info and original value
    AnalogInput.AnalogInput getAnalogInputConfig(),
    // Set configuration and get what was actually set
    AnalogInput.AnalogInput configureAnalogInput(1:AnalogInput.AnalogInput config) throws (1:InvalidConfiguration ouch),
    oneway void resetAnalogInput(),
    oneway void startAnalogInput(),
    oneway void stopAnalogInput(),
    list<AnalogInput.AnalogData> readAnalogInput()
}
