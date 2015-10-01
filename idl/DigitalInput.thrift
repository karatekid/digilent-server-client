include "Config.thrift"

typedef i16 DigitalData

struct DigitalInput {
    // Instrument Configs
    1: Config.CRConfigInt      divider,
    2: Config.CRConfigInt      bufferSize,
    3: Config.SetConfig        acquisitionMode,
    // Trigger Configs
    4: Config.SetConfig        triggerSource,
    5: Config.CRConfigInt      triggerPosition,
    6: Config.DRConfigDouble   triggerAutoTimeout,
    7: Config.DInTriggerConfig trigger,
    // Instrument Information
    8: optional double         internalClkFreq
}
