const response = {
  files: [
    {
      name: 'test2.gco',
      shortname: 'test2.gco',
      size: '992 B',
      datetime: '2000-01-01 01:00:00'
    },
    {
      name: 'simpl3d.gcode',
      shortname: 'SIMPL3~1.GCO',
      size: '0 B',
      datetime: '2000-01-01 01:00:00'
    },
    {
      name: 'patt2.g',
      shortname: 'patt2.g',
      size: '9.73 MB',
      datetime: '2000-01-01 01:00:00'
    },
    {
      name: 'myfolder',
      shortname: 'myfolder',
      size: '-1',
      datetime: '2016-08-01 18:15:00'
    },
    {
      name: 'wconfig.ok',
      shortname: 'wconfig.ok',
      size: '1.10 KB',
      datetime: '2017-01-06 14:35:54'
    },
    {
      name: 'gpl.txt',
      shortname: 'gpl.txt',
      size: '34.98 KB',
      datetime: '2017-04-17 20:22:32'
    },
    {
      name: 'm1.g',
      shortname: 'm1.g',
      size: '17 B',
      datetime: '2000-01-01 01:00:00'
    },
    {
      name: 'm2.g',
      shortname: 'm2.g',
      size: '17 B',
      datetime: '2000-01-01 01:00:00'
    },
    {
      name: 'Test4.g',
      shortname: 'TEST4.G',
      size: '20.47 KB',
      datetime: '2000-01-01 01:00:00'
    },
    {
      name: 'README.md',
      shortname: 'README.md',
      size: '11.83 KB',
      datetime: '2017-04-17 20:25:08'
    },
    {
      name: 'test file.gcode',
      shortname: 'TESTFI~1.GCO',
      size: '11 B',
      datetime: '2000-01-01 01:00:00'
    },
    {
      name: 'M3.g',
      shortname: 'M3.g',
      size: '32 B',
      datetime: '2000-01-01 01:00:00'
    }
  ],
  path: '/',
  total: '14 GB',
  used: '28 MB',
  occupation: '1',
  mode: 'direct',
  status: 'Ok'
}

module.exports = function (req, res, next) {
  res.json(response)
}
