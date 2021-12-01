// const response = {"EEPROM":[{"F":"network","P":"0","T":"B","V":"2","H":"Wifi mode","O":[{"AP":"1"},{"STA":"2"}]},{"F":"network","P":"1","T":"S","V":"totolink_luc","S":"32","H":"Station SSID","M":"1"},{"F":"network","P":"34","T":"S","V":"********","S":"64","H":"Station Password","M":"0"},{"F":"network","P":"99","T":"B","V":"1","H":"Station IP Mode","O":[{"DHCP":"1"},{"Static":"2"}]},{"F":"network","P":"100","T":"A","V":"192.168.0.1","H":"Station Static IP"},{"F":"network","P":"104","T":"A","V":"255.255.255.0","H":"Station Static Mask"},{"F":"network","P":"108","T":"A","V":"192.168.0.12","H":"Station Static Gateway"},{"F":"network","P":"130","T":"S","V":"lucesp","H":"Hostname","S":"32","M":"1"},{"F":"network","P":"112","T":"I","V":"115200","H":"Baud Rate","O":[{"9600":"9600"},{"19200":"19200"},{"38400":"38400"},{"57600":"57600"},{"115200":"115200"},{"230400":"230400"},{"250000":"250000"}]},{"F":"network","P":"116","T":"B","V":"2","H":"Station Network Mode","O":[{"11b":"1"},{"11g":"2"},{"11n":"3"}]},{"F":"network","P":"117","T":"B","V":"0","H":"Sleep Mode","O":[{"None":"0"},{"Light":"1"},{"Modem":"2"}]},{"F":"network","P":"118","T":"B","V":"9","H":"AP Channel","O":[{"1":"1"},{"2":"2"},{"3":"3"},{"4":"4"},{"5":"5"},{"6":"6"},{"7":"7"},{"8":"8"},{"9":"9"},{"10":"10"},{"11":"11"}]},{"F":"network","P":"119","T":"B","V":"2","H":"Authentication","O":[{"Open":"0"},{"WPA":"2"},{"WPA2":"3"},{"WPA/WPA2":"4"}]},{"F":"network","P":"120","T":"B","V":"1","H":"SSID Visible","O":[{"No":"0"},{"Yes":"1"}]},{"F":"network","P":"121","T":"I","V":"80","H":"Web Port","S":"65001","M":"1"},{"F":"network","P":"125","T":"I","V":"8881","H":"Data Port","S":"65001","M":"1"},{"F":"network","P":"176","T":"S","V":"********","S":"16","H":"Admin Password","M":"1"},{"F":"network","P":"197","T":"S","V":"********","S":"16","H":"User Password","M":"1"},{"F":"network","P":"218","T":"S","V":"MYESP","S":"32","H":"AP SSID","M":"1"},{"F":"network","P":"251","T":"S","V":"********","S":"64","H":"AP Password","M":"0"},{"F":"network","P":"329","T":"B","V":"2","H":"AP IP Mode","O":[{"DHCP":"1"},{"Static":"2"}]},{"F":"network","P":"316","T":"A","V":"192.168.0.1","H":"AP Static IP"},{"F":"network","P":"320","T":"A","V":"255.255.255.0","H":"AP Static Mask"},{"F":"network","P":"324","T":"A","V":"192.168.0.1","H":"AP Static Gateway"},{"F":"network","P":"330","T":"B","V":"1","H":"AP Network Mode","O":[{"11b":"1"},{"11g":"2"}]},{"F":"printer","P":"461","T":"B","V":"4","H":"TargetFW","O":[{"Repetier":"5"},{"Repetier for Davinci":"1"},{"Marlin":"2"},{"MarlinKimbra":"3"},{"Smoothieware":"4"},{"Unknown":"0"}]},{"F":"printer","P":"129","T":"B","V":"3","H":"Temperature Refresh Time","S":"99","M":"0"},{"F":"printer","P":"164","T":"I","V":"1500","H":"XY feedrate","S":"9999","M":"1"},{"F":"printer","P":"168","T":"I","V":"110","H":"Z feedrate","S":"9999","M":"1"},{"F":"printer","P":"172","T":"I","V":"400","H":"E feedrate","S":"9999","M":"1"},{"F":"printer","P":"331","T":"S","V":"NO","S":"128","H":"Camera address","M":"0"},{"F":"printer","P":"460","T":"B","V":"3","H":"Position Refresh Time","S":"99","M":"0"}]}
const response = {
  EEPROM: [
    {
      F: 'network',
      P: 'Sta/SSID',
      H: 'Station SSID',
      T: 'S',
      V: 'CMCC-sun',
      S: '32',
      M: '1'
    },
    {
      F: 'network',
      P: 'Sta/Password',
      H: 'Station Password',
      T: 'S',
      V: '******',
      S: '64',
      M: '8'
    },
    {
      F: 'network',
      P: 'Sta/IPMode',
      H: 'Station IP Mode',
      T: 'B',
      V: '0',
      O: [{ DHCP: '0' }, { Static: '1' }]
    },
    { F: 'network', P: 'Sta/IP', H: 'Station Static IP', T: 'A', V: '0.0.0.0' },
    {
      F: 'network',
      P: 'Sta/Gateway',
      H: 'Station Static Gateway',
      T: 'A',
      V: '0.0.0.0'
    },
    {
      F: 'network',
      P: 'Sta/Netmask',
      H: 'Station Static Mask',
      T: 'A',
      V: '0.0.0.0'
    },
    {
      F: 'network',
      P: 'AP/SSID',
      H: 'AP SSID',
      T: 'S',
      V: 'GRBL_ESP',
      S: '32',
      M: '1'
    },
    {
      F: 'network',
      P: 'AP/Password',
      H: 'AP Password',
      T: 'S',
      V: '******',
      S: '64',
      M: '8'
    },
    { F: 'network', P: 'AP/IP', H: 'AP Static IP', T: 'A', V: '192.168.0.1' },
    {
      F: 'network',
      P: 'AP/Channel',
      H: 'AP Channel',
      T: 'I',
      V: '1',
      S: '14',
      M: '1'
    },
    {
      F: 'network',
      P: 'System/Hostname',
      H: 'Hostname',
      T: 'S',
      V: 'grblesp',
      S: '32',
      M: '1'
    },
    {
      F: 'network',
      P: 'Http/Enable',
      H: 'HTTP Enable',
      T: 'B',
      V: '1',
      O: [{ OFF: '0' }, { ON: '1' }]
    },
    {
      F: 'network',
      P: 'Http/Port',
      H: 'HTTP Port',
      T: 'I',
      V: '80',
      S: '65001',
      M: '1'
    },
    {
      F: 'network',
      P: 'Telnet/Enable',
      H: 'Telnet Enable',
      T: 'B',
      V: '1',
      O: [{ OFF: '0' }, { ON: '1' }]
    },
    {
      F: 'network',
      P: 'Telnet/Port',
      H: 'Telnet Port',
      T: 'I',
      V: '23',
      S: '65001',
      M: '1'
    },
    {
      F: 'network',
      P: 'Radio/Mode',
      H: 'Radio mode',
      T: 'B',
      V: '1',
      O: [{ AP: '2' }, { BT: '3' }, { NONE: '0' }, { STA: '1' }]
    },
    {
      F: 'network',
      P: 'Bluetooth/Name',
      H: 'Bluetooth name',
      T: 'S',
      V: 'btgrblesp',
      S: '32',
      M: '1'
    },
    {
      F: 'network',
      P: 'Notification/Type',
      H: 'Notification type',
      T: 'B',
      V: '0',
      O: [{ EMAIL: '2' }, { LINE: '3' }, { NONE: '0' }, { PUSHOVER: '1' }]
    },
    {
      F: 'network',
      P: 'Notification/T1',
      H: 'Notification Token 1',
      T: 'S',
      V: '',
      S: '63',
      M: '0'
    },
    {
      F: 'network',
      P: 'Notification/T2',
      H: 'Notification Token 2',
      T: 'S',
      V: '',
      S: '63',
      M: '0'
    },
    {
      F: 'network',
      P: 'Notification/TS',
      H: 'Notification Settings',
      T: 'S',
      V: '',
      S: '127',
      M: '0'
    }
  ]
}

module.exports = function (req, res, next) {
  if (req.query.cmd == '[ESP400]') {
    return res.json(response)
  }
  next()
}
