module.exports.validStrings = {
  status: [
    '<Hold:0|MPos:0.000,0.000,0.000|Bf:15,128|FS:675.5,24000|Ov:120,100,100|WCO:0.000,-5.200,306.351|A:SFM|Pn:XYZPDHRS>',
    '<Idle|WPos:0.000,0.000,0.000|FS:0,0|Pn:XHS>',
    '<Idle>',
    '<Run|MPos:0.000,0.000,0.000|FS:112,12000|Ov:120,110,100|A:C>',
    '<Alarm|MPos:10.000,1.000,-40.000,0.000|FS:0,0|Ov:100,100,100>',
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
    '[MSG:\'$H\'|\'$X\' to unlock]',
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
    `$0=10\n$1=25\n$2=0\n$3=0\n$4=0\n$5=0\n$6=0\n$10=1\n$11=0.010\n$12=0.002\n$13=0\n$20=0\n$21=0\n$22=0\n$23=0\n$24=25.000\n$25=500.000\n$26=250\n$27=1.000\n$30=1000\n$31=0\n$32=0\n$100=250.000\n$101=250.000\n$102=250.000\n$110=500.000\n$111=500.000\n$112=500.000\n$120=10.000\n$121=20.000\n$122=10.000\n$130=200.000\n$131=200.000\n$132=200.000`
  ]
}
