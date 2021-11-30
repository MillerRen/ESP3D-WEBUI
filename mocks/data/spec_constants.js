module.exports.validStrings = {
  status: [
    '<Hold:0|MPos:0.000,0.000,0.000|Bf:15,128|FS:675.5,24000|Ov:120,100,100|WCO:0.000,-5.200,306.351|A:SFM|Pn:XYZPDHRS>',
    '<Idle|WPos:0.000,0.000,0.000|FS:0,0|Pn:XHS>',
    '<Idle>',
    '<Run|MPos:0.000,0.000,0.000|FS:112,12000|Ov:120,110,100|A:C>',
    '<Run|MPos:10.000,15.282,0.000|FS:800,795|SD:99.99,/pwm.nc>',
    '<Idle,MPos:50.300,-120.000,0.000,WPos:-10.300,5.230,0.000,Buf:12,RX:101,Lim:010>', // grbl 09
    '<Hold,MPos:50.300,-120.000,0.000>', // grbl 09
    '<Idle,MPos:0.000,0.000,0.000,WPos:0.000,0.000,0.000,Pin:100|1|0100>', // grbl 10
    '<Idle,MPos:100.000,100.000,100.000,WPos:0.000,0.000,0.000,Pin:|1|>' // grbl 10
  ],
  init: [
    "Grbl 1.1f ['$' for help]",
    "Grbl 0.9j ['$' for help]" // grbl 09
  ],
  alarm: [
    'ALARM:1',
    'ALARM:2',
    'ALARM:3',
    'ALARM:4',
    'ALARM:5',
    'ALARM:6',
    'ALARM:7',
    'ALARM:8',
    'ALARM:9',
    'ALARM:Hard/soft limit', // grbl 09
    'ALARM:Abort during cycle' // grbl 09
  ],
  error: [
    'error:1',
    'error:2',
    'error:3',
    'error:4',
    'error:5',
    'error:6',
    'error:7',
    'error:8',
    'error:9',
    'error:10',
    'error:11',
    'error:12',
    'error:13',
    'error:14',
    'error:15',
    'error:16',
    'error:17',
    'error:20',
    'error:21',
    'error:22',
    'error:23',
    'error:24',
    'error:25',
    'error:26',
    'error:27',
    'error:28',
    'error:29',
    'error:30',
    'error:31',
    'error:32',
    'error:33',
    'error:34',
    'error:35',
    'error:36',
    'error:37',
    'error:38',
    'error:60',
    'error:61',
    'error:62',
    'error:63',
    'error:64',
    'error:70',
    'error:Bad number format',
    'error:Value < 0',
    'error:Invalid gcode ID:24'
  ],
  setting: [
    '$10=255.5',
    '$23=0 (homing dir invert mask:00000000)', // grbl 09
    '$6=1'
  ],
  feedbackMessage: [
    '[MSG:‘$H’|’$X’ to unlock]',
    '[MSG:Reset to continue]',
    '[MSG:Enabled]',
    '[Reset to continue]', // grbl 09
    '[Enabled]', // grbl 09
    "['$H'|'$X' to unlock]", // grbl 09
    '[Caution: Unlocked]' // grbl 09
  ],
  gcodeState: [
    '[GC:G0 G54 G17 G21 G90 G94 M5 M9 T0 F0 S0]',
    '[GC:G0 G58 G17 G20 G91 G94 M5 M7 M9 T4 F100 S12000]',
    '[G0 G54 G17 G21 G90 G94 M0 M5 M9 T0 F60 S12000]', // grbl 10
    '[G0 G54 G17 G21 G90 G94 M0 M5 M9 P2 T0 F0 S0]'
  ],
  helpMessage: [
    '[HLP:$$ $# $G $I $N $x=val $Nx=line $J=line $SLP $C $X $H ~ ! ? ctrl-x]'
  ],
  buildVersion: [
    '[VER:1.1f.20170131:]',
    '[VER:1.1e.20170131:My OEM string]',
    '[0.9j.20160316:Another OEM string!!]',
    '[1.0c.20161011:]'
  ],
  buildOptions: ['[OPT:V,15,128]'],
  success: ['ok'],
  gcodeSystem: [
    '[G54:0.000,0.000,306.351]',
    '[TLO:120.000]',
    '[G28:0.000,-10.225,0.000]'
  ],
  probeResult: ['[PRB:0.000,0.000,1.492:1]', '[PRB:53.223,0.000,-100.203:0]'],
  echo: ['[echo:G1X0.540Y10.4F100]'],
  startupLine: [
    '>G54G20:ok',
    'G28ok' // grbl 10
  ],
  settings: [
    `$0=5
    $1=250
    $2=0
    $3=0
    $4=0
    $5=1
    $6=1
    $10=1
    $11=0.010
    $12=0.002
    $13=0
    $20=0
    $21=0
    $22=0
    $23=3
    $24=200.000
    $25=2000.000
    $26=250.000
    $27=1.000
    $30=1000.000
    $31=0.000
    $32=0
    $100=100.000
    $101=100.000
    $102=100.000
    $103=100.000
    $104=100.000
    $105=100.000
    $110=1000.000
    $111=1000.000
    $112=1000.000
    $113=1000.000
    $114=1000.000
    $115=1000.000
    $120=200.000
    $121=200.000
    $122=200.000
    $123=200.000
    $124=200.000
    $125=200.000
    $130=300.000
    $131=300.000
    $132=300.000
    $133=300.000
    $134=300.000
    $135=300.000
    ok`
  ]
}
