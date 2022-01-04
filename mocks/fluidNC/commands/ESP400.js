const response = {
  EEPROM: [
    {
      F: 'nvs',
      P: 'Firmware/Build',
      H: 'Firmware/Build',
      T: 'S',
      V: '',
      S: '20',
      M: '0'
    },
    {
      F: 'nvs',
      P: 'Report/Status',
      H: 'Report/Status',
      T: 'I',
      V: '1',
      S: '3',
      M: '0'
    },
    {
      F: 'nvs',
      P: 'Config/Filename',
      H: 'Config/Filename',
      T: 'S',
      V: 'config.yaml',
      S: '50',
      M: '1'
    },
    {
      F: 'nvs',
      P: 'Message/Level',
      H: 'Message/Level',
      T: 'B',
      V: '3',
      O: [
        { Debug: '4' },
        { Error: '1' },
        { Info: '3' },
        { None: '0' },
        { Verbose: '5' },
        { Warning: '2' }
      ]
    },
    {
      F: 'nvs',
      P: 'Notification/Type',
      H: 'Notification/Type',
      T: 'B',
      V: '0',
      O: [{ EMAIL: '2' }, { LINE: '3' }, { NONE: '0' }, { PUSHOVER: '1' }]
    },
    {
      F: 'nvs',
      P: 'Notification/T1',
      H: 'Notification/T1',
      T: 'S',
      V: '',
      S: '63',
      M: '0'
    },
    {
      F: 'nvs',
      P: 'Notification/T2',
      H: 'Notification/T2',
      T: 'S',
      V: '',
      S: '63',
      M: '0'
    },
    {
      F: 'nvs',
      P: 'Notification/TS',
      H: 'Notification/TS',
      T: 'S',
      V: '',
      S: '127',
      M: '0'
    },
    {
      F: 'nvs',
      P: 'Telnet/Enable',
      H: 'Telnet/Enable',
      T: 'B',
      V: '1',
      O: [{ OFF: '0' }, { ON: '1' }]
    },
    {
      F: 'nvs',
      P: 'Telnet/Port',
      H: 'Telnet/Port',
      T: 'I',
      V: '23',
      S: '65001',
      M: '1'
    },
    {
      F: 'nvs',
      P: 'HTTP/Enable',
      H: 'HTTP/Enable',
      T: 'B',
      V: '1',
      O: [{ OFF: '0' }, { ON: '1' }]
    },
    {
      F: 'nvs',
      P: 'HTTP/Port',
      H: 'HTTP/Port',
      T: 'I',
      V: '80',
      S: '65001',
      M: '1'
    },
    {
      F: 'nvs',
      P: 'WiFi/Mode',
      H: 'WiFi/Mode',
      T: 'B',
      V: '3',
      O: [{ AP: '2' }, { Off: '0' }, { STA: '1' }, { 'STA>AP': '3' }]
    },
    { F: 'nvs', P: 'Sta/SSID', H: 'Sta/SSID', T: 'S', V: '', S: '32', M: '0' },
    {
      F: 'nvs',
      P: 'Sta/Password',
      H: 'Sta/Password',
      T: 'S',
      V: '******',
      S: '64',
      M: '8'
    },
    {
      F: 'nvs',
      P: 'Sta/IPMode',
      H: 'Sta/IPMode',
      T: 'B',
      V: '0',
      O: [{ DHCP: '0' }, { Static: '1' }]
    },
    { F: 'nvs', P: 'Sta/IP', H: 'Sta/IP', T: 'A', V: '0.0.0.0' },
    { F: 'nvs', P: 'Sta/Gateway', H: 'Sta/Gateway', T: 'A', V: '0.0.0.0' },
    { F: 'nvs', P: 'Sta/Netmask', H: 'Sta/Netmask', T: 'A', V: '0.0.0.0' },
    {
      F: 'nvs',
      P: 'AP/SSID',
      H: 'AP/SSID',
      T: 'S',
      V: 'FluidNC',
      S: '32',
      M: '0'
    },
    {
      F: 'nvs',
      P: 'AP/Password',
      H: 'AP/Password',
      T: 'S',
      V: '******',
      S: '64',
      M: '8'
    },
    { F: 'nvs', P: 'AP/IP', H: 'AP/IP', T: 'A', V: '192.168.0.1' },
    {
      F: 'nvs',
      P: 'AP/Channel',
      H: 'AP/Channel',
      T: 'I',
      V: '1',
      S: '14',
      M: '1'
    },
    {
      F: 'nvs',
      P: 'Hostname',
      H: 'Hostname',
      T: 'S',
      V: 'fluidnc',
      S: '32',
      M: '1'
    },
    {
      F: 'tree',
      P: '/board',
      H: '/board',
      T: 'S',
      V: 'ESP32 Dev Controller V4',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/name',
      H: '/name',
      T: 'S',
      V: 'ESP32 Dev Controller V4',
      S: '255',
      M: '0'
    },
    { F: 'tree', P: '/meta', H: '/meta', T: 'S', V: '', S: '255', M: '0' },
    {
      F: 'tree',
      P: '/stepping/engine',
      H: '/stepping/engine',
      T: 'B',
      V: '1',
      O: [
        { Timed: '0' },
        { RMT: '1' },
        { I2S_static: '2' },
        { I2S_stream: '3' }
      ]
    },
    {
      F: 'tree',
      P: '/stepping/idle_ms',
      H: '/stepping/idle_ms',
      T: 'I',
      V: '250',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/stepping/pulse_us',
      H: '/stepping/pulse_us',
      T: 'I',
      V: '2',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/stepping/dir_delay_us',
      H: '/stepping/dir_delay_us',
      T: 'I',
      V: '1',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/stepping/disable_delay_us',
      H: '/stepping/disable_delay_us',
      T: 'I',
      V: '0',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/x/steps_per_mm',
      H: '/axes/x/steps_per_mm',
      T: 'R',
      V: '800.000'
    },
    {
      F: 'tree',
      P: '/axes/x/max_rate_mm_per_min',
      H: '/axes/x/max_rate_mm_per_min',
      T: 'R',
      V: '2000.000'
    },
    {
      F: 'tree',
      P: '/axes/x/acceleration_mm_per_sec2',
      H: '/axes/x/acceleration_mm_per_sec2',
      T: 'R',
      V: '25.000'
    },
    {
      F: 'tree',
      P: '/axes/x/max_travel_mm',
      H: '/axes/x/max_travel_mm',
      T: 'R',
      V: '1000.000'
    },
    {
      F: 'tree',
      P: '/axes/x/soft_limits',
      H: '/axes/x/soft_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/x/homing/cycle',
      H: '/axes/x/homing/cycle',
      T: 'I',
      V: '2',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/x/homing/positive_direction',
      H: '/axes/x/homing/positive_direction',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/x/homing/mpos_mm',
      H: '/axes/x/homing/mpos_mm',
      T: 'R',
      V: '10.000'
    },
    {
      F: 'tree',
      P: '/axes/x/homing/feed_mm_per_min',
      H: '/axes/x/homing/feed_mm_per_min',
      T: 'R',
      V: '50.000'
    },
    {
      F: 'tree',
      P: '/axes/x/homing/seek_mm_per_min',
      H: '/axes/x/homing/seek_mm_per_min',
      T: 'R',
      V: '200.000'
    },
    {
      F: 'tree',
      P: '/axes/x/homing/settle_ms',
      H: '/axes/x/homing/settle_ms',
      T: 'I',
      V: '250',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/x/homing/seek_scaler',
      H: '/axes/x/homing/seek_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/x/homing/feed_scaler',
      H: '/axes/x/homing/feed_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/x/motor0/hard_limits',
      H: '/axes/x/motor0/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/x/motor0/pulloff_mm',
      H: '/axes/x/motor0/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/axes/x/motor1/hard_limits',
      H: '/axes/x/motor1/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/x/motor1/pulloff_mm',
      H: '/axes/x/motor1/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/axes/y/steps_per_mm',
      H: '/axes/y/steps_per_mm',
      T: 'R',
      V: '800.000'
    },
    {
      F: 'tree',
      P: '/axes/y/max_rate_mm_per_min',
      H: '/axes/y/max_rate_mm_per_min',
      T: 'R',
      V: '2000.000'
    },
    {
      F: 'tree',
      P: '/axes/y/acceleration_mm_per_sec2',
      H: '/axes/y/acceleration_mm_per_sec2',
      T: 'R',
      V: '25.000'
    },
    {
      F: 'tree',
      P: '/axes/y/max_travel_mm',
      H: '/axes/y/max_travel_mm',
      T: 'R',
      V: '1000.000'
    },
    {
      F: 'tree',
      P: '/axes/y/soft_limits',
      H: '/axes/y/soft_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/y/homing/cycle',
      H: '/axes/y/homing/cycle',
      T: 'I',
      V: '2',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/y/homing/positive_direction',
      H: '/axes/y/homing/positive_direction',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/y/homing/mpos_mm',
      H: '/axes/y/homing/mpos_mm',
      T: 'R',
      V: '10.000'
    },
    {
      F: 'tree',
      P: '/axes/y/homing/feed_mm_per_min',
      H: '/axes/y/homing/feed_mm_per_min',
      T: 'R',
      V: '50.000'
    },
    {
      F: 'tree',
      P: '/axes/y/homing/seek_mm_per_min',
      H: '/axes/y/homing/seek_mm_per_min',
      T: 'R',
      V: '200.000'
    },
    {
      F: 'tree',
      P: '/axes/y/homing/settle_ms',
      H: '/axes/y/homing/settle_ms',
      T: 'I',
      V: '250',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/y/homing/seek_scaler',
      H: '/axes/y/homing/seek_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/y/homing/feed_scaler',
      H: '/axes/y/homing/feed_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/y/motor0/hard_limits',
      H: '/axes/y/motor0/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/y/motor0/pulloff_mm',
      H: '/axes/y/motor0/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/axes/y/motor1/hard_limits',
      H: '/axes/y/motor1/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/y/motor1/pulloff_mm',
      H: '/axes/y/motor1/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/axes/z/steps_per_mm',
      H: '/axes/z/steps_per_mm',
      T: 'R',
      V: '800.000'
    },
    {
      F: 'tree',
      P: '/axes/z/max_rate_mm_per_min',
      H: '/axes/z/max_rate_mm_per_min',
      T: 'R',
      V: '2000.000'
    },
    {
      F: 'tree',
      P: '/axes/z/acceleration_mm_per_sec2',
      H: '/axes/z/acceleration_mm_per_sec2',
      T: 'R',
      V: '25.000'
    },
    {
      F: 'tree',
      P: '/axes/z/max_travel_mm',
      H: '/axes/z/max_travel_mm',
      T: 'R',
      V: '1000.000'
    },
    {
      F: 'tree',
      P: '/axes/z/soft_limits',
      H: '/axes/z/soft_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/z/homing/cycle',
      H: '/axes/z/homing/cycle',
      T: 'I',
      V: '1',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/z/homing/positive_direction',
      H: '/axes/z/homing/positive_direction',
      T: 'B',
      V: '1',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/z/homing/mpos_mm',
      H: '/axes/z/homing/mpos_mm',
      T: 'R',
      V: '10.000'
    },
    {
      F: 'tree',
      P: '/axes/z/homing/feed_mm_per_min',
      H: '/axes/z/homing/feed_mm_per_min',
      T: 'R',
      V: '50.000'
    },
    {
      F: 'tree',
      P: '/axes/z/homing/seek_mm_per_min',
      H: '/axes/z/homing/seek_mm_per_min',
      T: 'R',
      V: '200.000'
    },
    {
      F: 'tree',
      P: '/axes/z/homing/settle_ms',
      H: '/axes/z/homing/settle_ms',
      T: 'I',
      V: '250',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/z/homing/seek_scaler',
      H: '/axes/z/homing/seek_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/z/homing/feed_scaler',
      H: '/axes/z/homing/feed_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/z/motor0/hard_limits',
      H: '/axes/z/motor0/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/z/motor0/pulloff_mm',
      H: '/axes/z/motor0/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/axes/z/motor1/hard_limits',
      H: '/axes/z/motor1/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/z/motor1/pulloff_mm',
      H: '/axes/z/motor1/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/axes/a/steps_per_mm',
      H: '/axes/a/steps_per_mm',
      T: 'R',
      V: '800.000'
    },
    {
      F: 'tree',
      P: '/axes/a/max_rate_mm_per_min',
      H: '/axes/a/max_rate_mm_per_min',
      T: 'R',
      V: '2000.000'
    },
    {
      F: 'tree',
      P: '/axes/a/acceleration_mm_per_sec2',
      H: '/axes/a/acceleration_mm_per_sec2',
      T: 'R',
      V: '25.000'
    },
    {
      F: 'tree',
      P: '/axes/a/max_travel_mm',
      H: '/axes/a/max_travel_mm',
      T: 'R',
      V: '1000.000'
    },
    {
      F: 'tree',
      P: '/axes/a/soft_limits',
      H: '/axes/a/soft_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/a/homing/cycle',
      H: '/axes/a/homing/cycle',
      T: 'I',
      V: '1',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/a/homing/positive_direction',
      H: '/axes/a/homing/positive_direction',
      T: 'B',
      V: '1',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/a/homing/mpos_mm',
      H: '/axes/a/homing/mpos_mm',
      T: 'R',
      V: '10.000'
    },
    {
      F: 'tree',
      P: '/axes/a/homing/feed_mm_per_min',
      H: '/axes/a/homing/feed_mm_per_min',
      T: 'R',
      V: '50.000'
    },
    {
      F: 'tree',
      P: '/axes/a/homing/seek_mm_per_min',
      H: '/axes/a/homing/seek_mm_per_min',
      T: 'R',
      V: '200.000'
    },
    {
      F: 'tree',
      P: '/axes/a/homing/settle_ms',
      H: '/axes/a/homing/settle_ms',
      T: 'I',
      V: '250',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/axes/a/homing/seek_scaler',
      H: '/axes/a/homing/seek_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/a/homing/feed_scaler',
      H: '/axes/a/homing/feed_scaler',
      T: 'R',
      V: '1.100'
    },
    {
      F: 'tree',
      P: '/axes/a/motor0/hard_limits',
      H: '/axes/a/motor0/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/a/motor0/pulloff_mm',
      H: '/axes/a/motor0/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/axes/a/motor1/hard_limits',
      H: '/axes/a/motor1/hard_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/axes/a/motor1/pulloff_mm',
      H: '/axes/a/motor1/pulloff_mm',
      T: 'R',
      V: '1.000'
    },
    {
      F: 'tree',
      P: '/coolant/delay_ms',
      H: '/coolant/delay_ms',
      T: 'I',
      V: '0',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/probe/check_mode_start',
      H: '/probe/check_mode_start',
      T: 'B',
      V: '1',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/macros/startup_line0',
      H: '/macros/startup_line0',
      T: 'S',
      V: '',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/macros/startup_line1',
      H: '/macros/startup_line1',
      T: 'S',
      V: '',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/macros/macro0',
      H: '/macros/macro0',
      T: 'S',
      V: '',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/macros/macro1',
      H: '/macros/macro1',
      T: 'S',
      V: '',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/macros/macro2',
      H: '/macros/macro2',
      T: 'S',
      V: '',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/macros/macro3',
      H: '/macros/macro3',
      T: 'S',
      V: '',
      S: '255',
      M: '0'
    },
    {
      F: 'tree',
      P: '/start/must_home',
      H: '/start/must_home',
      T: 'B',
      V: '1',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/start/deactivate_parking',
      H: '/start/deactivate_parking',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/start/check_limits',
      H: '/start/check_limits',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/user_outputs/analog0_hz',
      H: '/user_outputs/analog0_hz',
      T: 'I',
      V: '5000',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/user_outputs/analog1_hz',
      H: '/user_outputs/analog1_hz',
      T: 'I',
      V: '5000',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/user_outputs/analog2_hz',
      H: '/user_outputs/analog2_hz',
      T: 'I',
      V: '5000',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/user_outputs/analog3_hz',
      H: '/user_outputs/analog3_hz',
      T: 'I',
      V: '5000',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/arc_tolerance_mm',
      H: '/arc_tolerance_mm',
      T: 'R',
      V: '0.002'
    },
    {
      F: 'tree',
      P: '/junction_deviation_mm',
      H: '/junction_deviation_mm',
      T: 'R',
      V: '0.010'
    },
    {
      F: 'tree',
      P: '/verbose_errors',
      H: '/verbose_errors',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/report_inches',
      H: '/report_inches',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/enable_parking_override_control',
      H: '/enable_parking_override_control',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/use_line_numbers',
      H: '/use_line_numbers',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/PWM/pwm_hz',
      H: '/PWM/pwm_hz',
      T: 'I',
      V: '5000',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/PWM/disable_with_s0',
      H: '/PWM/disable_with_s0',
      T: 'B',
      V: '0',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/PWM/s0_with_disable',
      H: '/PWM/s0_with_disable',
      T: 'B',
      V: '1',
      O: [{ False: '0', True: '1' }]
    },
    {
      F: 'tree',
      P: '/PWM/spinup_ms',
      H: '/PWM/spinup_ms',
      T: 'I',
      V: '0',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/PWM/spindown_ms',
      H: '/PWM/spindown_ms',
      T: 'I',
      V: '0',
      S: '2147483647',
      M: '0'
    },
    {
      F: 'tree',
      P: '/PWM/tool_num',
      H: '/PWM/tool_num',
      T: 'I',
      V: '0',
      S: '2147483647',
      M: '0'
    }
  ]
}

module.exports = function (req, res, next) {
  if (req.query.plain == '[ESP400]') {
    return res.json(response)
  }
  next()
}
