include "Config.thrift"

typedef map<i32, list<double>> AnalogData

struct AnalogInput {
    // Instrument Configs
    1: Config.CRConfigDouble     frequency,
    2: Config.CRConfigInt        bufferSize,
    3: Config.SetConfig          acquisitionMode,
    // Instrument Channel Configs
    4: list<Config.SetConfig>      channelEnable,
    5: list<Config.SetConfig>      channelFilter,
    6: list<Config.DRConfigDouble> channelRange,
    7: list<Config.DRConfigDouble> channelOffset,
    // Trigger Configs
    8: Config.SetConfig            triggerSource,
    9: Config.DRConfigDouble       triggerPosition,
    10: Config.DRConfigDouble      triggerAutoTimeout,
    11: Config.DRConfigDouble      triggerHoldOff,
    12: Config.SetConfig           triggerType,
    13: Config.CRConfigInt         triggerChannel,
    14: Config.SetConfig           triggerFilter,
    15: Config.SetConfig           triggerCondition,
    16: Config.DRConfigDouble      triggerLevel,
    17: Config.DRConfigDouble      triggerHysteresis,
    18: Config.SetConfig           triggerLengthCondition,
    19: Config.DRConfigDouble      triggerLength,
    //Instrument Information
    20: optional i32               numChannels
}
