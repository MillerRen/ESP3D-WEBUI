/*
 index.js - ESP3D WebUI Target file

 Copyright (c) 2020 Luc Lebosse. All rights reserved.

 This code is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.

 This code is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public
 License along with This code; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

const chalk = require("chalk");
const wscolor = chalk.cyan;
const expresscolor = chalk.green;
const commandcolor = chalk.white;
const enableAuthentication = false;
let lastconnection = Date.now();
let logindone = false;
const sessiontTime = 60000;
let countStatus = 0;

function getLastconnection() {
  return lastconnection;
}

function hasEnabledAuthentication() {
  return enableAuthentication;
}

const commandsQuery = (req, res, SendBinary) => {
  let url = req.query.cmd ? req.query.cmd : req.originalUrl;
  if (req.query.cmd)
    console.log(commandcolor(`[server]/command params: ${req.query.cmd}`));
  else console.log(commandcolor(`[server]/command : ${url}`));
  if (url.indexOf("PING") != -1) {
    lastconnection = Date.now();
    res.status(200);
    res.send("ok\n");
    console.log(commandcolor(`[server]/command :PING`));
    return;
  }

  if (!logindone && enableAuthentication) {
    res.status(401);
    return;
  }
  lastconnection = Date.now();
  if (url.indexOf("$CD") != -1 && url.indexOf("$CD=") == -1) {
    SendBinary(
      "[MSG: BeginData]\n" +
        "board: Bart Board\n" +
        "name: Default (Test Drive with SD)\n" +
        "stepping:\n" +
        "  engine: RMT\n" +
        "  idle_ms: 255\n" +
        "  pulse_us: 4\n" +
        "  dir_delay_us: 0\n" +
        "  disable_delay_us: 0\n" +
        "\n" +
        "axes:\n" +
        "  shared_stepper_disable: NO_PIN\n" +
        "  x:\n" +
        "    steps_per_mm: 320.000\n" +
        "    max_rate: 1000.000\n" +
        "    acceleration: 25.000\n" +
        "    max_travel: 200.000\n" +
        "    soft_limits: false\n" +
        "\n" +
        "  y:\n" +
        "    steps_per_mm: 320.000\n" +
        "    max_rate: 1000.000\n" +
        "    acceleration: 25.000\n" +
        "    max_travel: 200.000\n" +
        "    soft_limits: false\n" +
        "\n" +
        "  z:\n" +
        "    steps_per_mm: 320.000\n" +
        "    max_rate: 1000.000\n" +
        "    acceleration: 25.000\n" +
        "    max_travel: 200.000\n" +
        "    soft_limits: false\n" +
        "\n" +
        "spi:\n" +
        "  miso: gpio.19\n" +
        "  mosi: gpio.23\n" +
        "  sck: gpio.18\n" +
        "\n" +
        "sdcard:\n" +
        "  cs: gpio.5\n" +
        "  card_detect: NO_PIN\n" +
        "\n" +
        "control:\n" +
        "  safety_door: NO_PIN\n" +
        "  reset: NO_PIN\n" +
        "  feed_hold: NO_PIN\n" +
        "  cycle_start: NO_PIN\n" +
        "  macro0: NO_PIN\n" +
        "  macro1: NO_PIN\n" +
        "  macro2: NO_PIN\n" +
        "  macro3: NO_PIN\n" +
        "\n" +
        "coolant:\n" +
        "  flood: NO_PIN\n" +
        "  mist: NO_PIN\n" +
        "  delay_ms: 0\n" +
        "\n" +
        "probe:\n" +
        "  pin: NO_PIN\n" +
        "  check_mode_start: true\n" +
        "\n" +
        "macros:\n" +
        "  n0: \n" +
        "  n1: \n" +
        "  macro0: \n" +
        "  macro1: \n" +
        "  macro2: \n" +
        "  macro3: \n" +
        "\n" +
        "user_outputs:\n" +
        "  analog0: NO_PIN\n" +
        "  analog1: NO_PIN\n" +
        "  analog2: NO_PIN\n" +
        "  analog3: NO_PIN\n" +
        "  analog_frequency0: 5000\n" +
        "  analog_frequency1: 5000\n" +
        "  analog_frequency2: 5000\n" +
        "  analog_frequency3: 5000\n" +
        "  digital0: NO_PIN\n" +
        "  digital1: NO_PIN\n" +
        "  digital2: NO_PIN\n" +
        "  digital3: NO_PIN\n" +
        "\n" +
        "software_debounce_ms: 0\n" +
        "laser_mode: false\n" +
        "arc_tolerance: 0.002\n" +
        "junction_deviation: 0.010\n" +
        "verbose_errors: false\n" +
        "report_inches: false\n" +
        "homing_init_lock: true\n" +
        "enable_parking_override_control: false\n" +
        "deactivate_parking_upon_init: false\n" +
        "check_limits_at_init: true\n" +
        "limits_two_switches_on_axis: false\n" +
        "disable_laser_during_hold: true\n" +
        "use_line_numbers: false\n" +
        "NoSpindle:\n" +
        "\n" +
        "[MSG: EndData]\n" +
        "ok\n"
    );
    res.send("");
    return;
  }

  if (url.indexOf("$Config/Filename") != -1) {
    if (url.indexOf("$Config/Filename=") == -1)
      SendBinary("$Config/Filename=config.yaml\n");
    SendBinary("ok\n");
    res.send("");
    return;
  }
  if (req.query.cmd && req.query.cmd == "?") {
    countStatus++;
    if (countStatus == 1)
      SendBinary(
        "<Idle|MPos:0.000,0.000,0.000,1.000,1.000|FS:0,0|WCO:0.000,0.000,0.000,1.000,1.000>\n"
      );
    if (countStatus == 2)
      SendBinary(
        "<Idle|MPos:0.000,0.000,0.000,1.000,1.000|FS:0,0|Ov:100,100,100>\n"
      );
    if (countStatus > 2)
      SendBinary("<Idle|MPos:0.000,0.000,0.000,1.000,1.000|FS:0,0>\n");
    if (countStatus == 10) countStatus = 0;
    res.send("");
    return;
  }

  if (url.indexOf("ESP800") != -1) {
    res.json({
      FWVersion: "3.2.2",
      FWTarget: 60,
      SDConnection: "none",
      Authentication: enableAuthentication ? "Enabled" : "Disabled",
      WebCommunication: "Synchronous",
      WebSocketIP: "localhost",
      WebSocketport: "81",
      Hostname: "esp3d",
      WiFiMode: "STA",
      WebUpdate: "Enabled",
      Filesystem: "SPIFFS",
      Time: "none",
      Cam_ID: "4",
      Cam_name: "ESP32 Cam",
      Axis: "4",
    });
    return;
  }
  if (url.indexOf("ESP111") != -1) {
    res.send("192.168.1.111");
    return;
  }
  if (url.indexOf("ESP420") != -1) {
    res.json({
      Status: [
        { id: "chip id", value: "38078" },
        { id: "CPU Freq", value: "240 Mhz" },
        { id: "CPU Temp", value: "50.6 C" },
        { id: "free mem", value: "217.50 KB" },
        { id: "SDK", value: "v3.3.1-61-g367c3c09c" },
        { id: "flash size", value: "4.00 MB" },
        { id: "size for update", value: "1.87 MB" },
        { id: "FS type", value: "SPIFFS" },
        { id: "FS usage", value: "39.95 KB/169.38 KB" },
        { id: "baud", value: "115200" },
        { id: "sleep mode", value: "none" },
        { id: "wifi", value: "ON" },
        { id: "hostname", value: "esp3d" },
        { id: "HTTP port", value: "80" },
        { id: "Telnet port", value: "23" },
        { id: "Ftp ports", value: "21, 20, 55600" },
        { id: "sta", value: "ON" },
        { id: "mac", value: "30:AE:A4:21:BE:94" },
        { id: "SSID", value: "WIFI_OFFICE_B2G" },
        { id: "signal", value: "100 %" },
        { id: "phy mode", value: "11n" },
        { id: "channel", value: "2" },
        { id: "ip mode", value: "dhcp" },
        { id: "ip", value: "192.168.1.43" },
        { id: "gw", value: "192.168.1.1" },
        { id: "msk", value: "255.255.255.0" },
        { id: "DNS", value: "192.168.1.1" },
        { id: "ap", value: "OFF" },
        { id: "mac", value: "30:AE:A4:21:BE:95" },
        { id: "serial", value: "ON" },
        { id: "notification", value: "OFF" },
        { id: "FW ver", value: "3.0.0.a28" },
        { id: "FW arch", value: "ESP32" },
      ],
    });
    return;
  }

  if (url.indexOf("ESP410") != -1) {
    res.json({
      AP_LIST: [
        {
          SSID: "HP-Setup>71-M277 LaserJet",
          SIGNAL: "92",
          IS_PROTECTED: "0",
        },
        { SSID: "WIFI_OFFICE_B2G", SIGNAL: "88", IS_PROTECTED: "1" },
        { SSID: "NETGEAR70", SIGNAL: "66", IS_PROTECTED: "1" },
        { SSID: "ZenFone6&#39;luc", SIGNAL: "48", IS_PROTECTED: "1" },
        { SSID: "Livebox-EF01", SIGNAL: "20", IS_PROTECTED: "1" },
        { SSID: "orange", SIGNAL: "20", IS_PROTECTED: "0" },
      ],
    });
    return;
  }

  if (url.indexOf("$$") != -1) {
    SendBinary(
      "$0=3\n" +
        "$1=250\n" +
        "$2=0\n" +
        "$3=0\n" +
        "$4=0\n" +
        "$5=1\n" +
        "$6=0\n" +
        "$10=1\n" +
        "$11=0.010\n" +
        "$12=0.002\n" +
        "$13=0\n" +
        "$20=0\n" +
        "$21=0\n" +
        "$22=0\n" +
        "$23=3\n" +
        "$24=200.000\n" +
        "$25=2000.000\n" +
        "$26=250\n" +
        "$27=1.000\n" +
        "$30=1000.000\n" +
        "$31=0.000\n" +
        "$32=0\n" +
        "$100=100.000\n" +
        "$101=100.000\n" +
        "$102=100.000\n" +
        "$103=100.000\n" +
        "$104=100.000\n" +
        "$105=100.000\n" +
        "$110=1000.000\n" +
        "$111=1000.000\n" +
        "$112=1000.000\n" +
        "$113=1000.000\n" +
        "$114=1000.000\n" +
        "$115=1000.000\n" +
        "$120=200.000\n" +
        "$121=200.000\n" +
        "$122=200.000\n" +
        "$123=200.000\n" +
        "$124=200.000\n" +
        "$125=200.000\n" +
        "$130=300.000\n" +
        "$131=300.000\n" +
        "$132=300.000\n" +
        "$133=300.000\n" +
        "$134=300.000\n" +
        "$135=300.000\n" +
        "ok\n"
    );
    res.send("");
    return;
  }

  if (url.indexOf("ESP400") != -1) {
    res.json({
      Settings: [
        {
          F: "network/network",
          P: "130",
          T: "S",
          V: "esp3d",
          H: "hostname",
          S: "32",
          M: "1",
        },
        {
          F: "network/network",
          P: "0",
          T: "B",
          V: "1",
          H: "radio mode",
          O: [{ none: "0" }, { sta: "1" }, { ap: "2" }],
          R: "1",
        },
        {
          F: "network/sta",
          P: "1",
          T: "S",
          V: "WIFI_OFFICE_B2G",
          S: "32",
          H: "SSID",
          M: "1",
          R: "1",
        },
        {
          F: "network/sta",
          P: "34",
          T: "S",
          N: "1",
          V: "********",
          S: "64",
          H: "pwd",
          M: "0",
          MS: "8",
          R: "1",
        },
        {
          F: "network/sta",
          P: "99",
          T: "B",
          V: "1",
          H: "ip mode",
          O: [{ dhcp: "1" }, { static: "0" }],
          R: "1",
        },
        {
          F: "network/sta",
          P: "100",
          T: "A",
          V: "192.168.0.1",
          H: "ip",
          R: "1",
        },
        {
          F: "network/sta",
          P: "108",
          T: "A",
          V: "192.168.0.1",
          H: "gw",
          R: "1",
        },
        {
          F: "network/sta",
          P: "104",
          T: "A",
          V: "255.255.255.0",
          H: "msk",
          R: "1",
        },
        {
          F: "network/ap",
          P: "218",
          T: "S",
          V: "ESP3D",
          S: "32",
          H: "SSID",
          M: "1",
          R: "1",
        },
        {
          F: "network/ap",
          P: "251",
          T: "S",
          N: "1",
          V: "********",
          S: "64",
          H: "pwd",
          M: "0",
          MS: "8",
          R: "1",
        },
        {
          F: "network/ap",
          P: "316",
          T: "A",
          V: "192.168.0.1",
          H: "ip",
          R: "1",
        },
        {
          F: "network/ap",
          P: "118",
          T: "B",
          V: "11",
          H: "channel",
          O: [
            { 1: "1" },
            { 2: "2" },
            { 3: "3" },
            { 4: "4" },
            { 5: "5" },
            { 6: "6" },
            { 7: "7" },
            { 8: "8" },
            { 9: "9" },
            { 10: "10" },
            { 11: "11" },
            { 12: "12" },
            { 13: "13" },
            { 14: "14" },
          ],
          R: "1",
        },
        {
          F: "service/http",
          P: "328",
          T: "B",
          V: "1",
          H: "enable",
          O: [{ no: "0" }, { yes: "1" }],
        },
        {
          F: "service/http",
          P: "121",
          T: "I",
          V: "80",
          H: "port",
          S: "65001",
          M: "1",
        },
        {
          F: "service/telnetp",
          P: "329",
          T: "B",
          V: "1",
          H: "enable",
          O: [{ no: "0" }, { yes: "1" }],
        },
        {
          F: "service/telnetp",
          P: "125",
          T: "I",
          V: "23",
          H: "port",
          S: "65001",
          M: "1",
        },
        {
          F: "service/ftp",
          P: "1021",
          T: "B",
          V: "1",
          H: "enable",
          O: [{ no: "0" }, { yes: "1" }],
        },
        {
          F: "service/ftp",
          P: "1009",
          T: "I",
          V: "21",
          H: "control port",
          S: "65001",
          M: "1",
        },
        {
          F: "service/ftp",
          P: "1013",
          T: "I",
          V: "20",
          H: "active port",
          S: "65001",
          M: "1",
        },
        {
          F: "service/ftp",
          P: "1017",
          T: "I",
          V: "55600",
          H: "passive port",
          S: "65001",
          M: "1",
        },
        {
          F: "service/notification",
          P: "1004",
          T: "B",
          V: "1",
          H: "auto notif",
          O: [{ no: "0" }, { yes: "1" }],
        },
        {
          F: "service/notification",
          P: "116",
          T: "B",
          V: "0",
          H: "notification",
          O: [{ none: "0" }, { pushover: "1" }, { email: "2" }, { line: "3" }],
        },
        {
          F: "service/notification",
          P: "332",
          T: "S",
          V: "********",
          S: "63",
          H: "t1",
          M: "0",
        },
        {
          F: "service/notification",
          P: "396",
          T: "S",
          V: "********",
          S: "63",
          H: "t2",
          M: "0",
        },
        {
          F: "service/notification",
          P: "855",
          T: "S",
          V: " ",
          S: "127",
          H: "ts",
          M: "0",
        },
        {
          F: "system/system",
          P: "112",
          T: "I",
          V: "115200",
          H: "baud",
          O: [
            { 9600: "9600" },
            { 19200: "19200" },
            { 38400: "38400" },
            { 57600: "57600" },
            { 74880: "74880" },
            { 115200: "115200" },
            { 230400: "230400" },
            { 250000: "250000" },
            { 500000: "500000" },
            { 921600: "921600" },
          ],
        },
        {
          F: "system/system",
          P: "320",
          T: "I",
          V: "10000",
          H: "bootdelay",
          S: "40000",
          M: "0",
        },
      ],
    });
    return;
  }
  SendBinary("ok\n");
  res.send("");
};

const loginURI = (req, res) => {
  if (req.body.DISCONNECT == "Yes") {
    res.status(401);
    logindone = false;
  } else if (req.body.USER == "admin" && req.body.PASSWORD == "admin") {
    logindone = true;
    lastconnection = Date.now();
  } else {
    res.status(401);
    logindone = false;
  }
  res.send("");
};

const configURI = (req, res) => {
  if (!logindone && enableAuthentication) {
    res.status(401);
    return;
  }
  lastconnection = Date.now();
  res.send(
    "chip id: 56398\nCPU Freq: 240 Mhz<br/>" +
      "CPU Temp: 58.3 C<br/>" +
      "free mem: 212.36 KB<br/>" +
      "SDK: v3.2.3-14-gd3e562907<br/>" +
      "flash size: 4.00 MB<br/>" +
      "size for update: 1.87 MB<br/>" +
      "FS type: LittleFS<br/>" +
      "FS usage: 104.00 KB/192.00 KB<br/>" +
      "baud: 115200<br/>" +
      "sleep mode: none<br/>" +
      "wifi: ON<br/>" +
      "hostname: esp3d<br/>" +
      "HTTP port: 80<br/>" +
      "Telnet port: 23<br/>" +
      "WebDav port: 8383<br/>" +
      "sta: ON<br/>" +
      "mac: 80:7D:3A:C4:4E:DC<br/>" +
      "SSID: WIFI_OFFICE_A2G<br/>" +
      "signal: 100 %<br/>" +
      "phy mode: 11n<br/>" +
      "channel: 11<br/>" +
      "ip mode: dhcp<br/>" +
      "ip: 192.168.1.61<br/>" +
      "gw: 192.168.1.1<br/>" +
      "msk: 255.255.255.0<br/>" +
      "DNS: 192.168.1.1<br/>" +
      "ap: OFF<br/>" +
      "mac: 80:7D:3A:C4:4E:DD<br/>" +
      "serial: ON<br/>" +
      "notification: OFF<br/>" +
      "Target Fw: FluidNC v3.2.2<br/>" +
      "FW arch: ESP32 "
  );
};

module.exports = {
  commandsQuery,
  configURI,
  loginURI,
  getLastconnection,
  hasEnabledAuthentication,
};
