typedef i32 ClockSource
const map<ClockSource, string> ClockSourceNames = {
    1: 'Internal',
    2: 'External'
}

typedef i32 AcqMode
const map<AcqMode, string> AcqModeNames = {
    0: 'Single',
    1: 'ScanShift',
    2: 'ScanScreen',
    3: 'Record'
}

typedef byte TrigSrc
const map<TrigSrc, string> TrigSrcNames = {
    0: 'None',
    1: 'PC',
    2: 'DetectorAnalogIn',
    3: 'DetectorDigitalIn',
    4: 'AnalogIn',
    5: 'DigitalIn',
    6: 'DigitalOut',
    7: 'AnalogOut1',
    8: 'AnalogOut2',
    9: 'AnalogOut3',
    10: 'AnalogOut4',
    11: 'External1',
    12: 'External2',
    13: 'External3',
    14: 'External4'
}

struct CRConfigInt {
    1: i32 val,

    2: optional i32 min,
    3: optional i32 max
}

struct CRConfigDouble {
   1: double val,

   2: optional double min,
   3: optional double max
}

struct DRConfigDouble {
   1: double val,

   2: optional double min,
   3: optional double max,
   4: optional double stepSize
}

struct SetConfig {
    1: i32 val,

    2: optional set<i32> options
}

// A set of all triggers to/can/are set
struct DigitalInTrigger {
    1: set<i32> LevelLow,
    2: set<i32> LevelHigh,
    3: set<i32> EdgeRise,
    4: set<i32> EdgeFall
}

struct DInTriggerConfig {
    1: DigitalInTrigger val,
    2: optional DigitalInTrigger options
}
