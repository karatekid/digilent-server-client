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

const DigitalInput MockDigitalInput = {
    "divider": {
        "min": 1,
        "val": 1,
        "max": -2147483648,
    },
    "bufferSize": {
        "min": 1,
        "val": 4096,
        "max": 4096,
    },
    "acquisitionMode": {
        "val": 0,
        "options": [0, 1]
    },
    "triggerSource": {
        "val": 0,
        "options": [0, 1, 2, 3]
    },
    "triggerPosition": {
        "min": 0,
        "val": 0,
        "max": -2147483648,
    },
    "triggerAutoTimeout": {
        "min": 0,
        "val": 0,
        "max": 53.477376,
    },
    "trigger": {
        "val": {
            "LevelLow":  [],
            "LevelHigh": [],
            "EdgeRise":  [],
            "EdgeFall":  []
        },
        "options": {
            "LevelLow":  [0,1,2,3],
            "LevelHigh": [0,1,2,3],
            "EdgeRise":  [0,1,2,3],
            "EdgeFall":  [0,1,2,3]
        }
    },
    "internalClkFreq": 100000000.0
}
