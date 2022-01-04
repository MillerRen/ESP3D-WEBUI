const response = [
  {
   "name": "M1",
   "glyph": "star",
   "filename": "/macro1.g",
   "target": "ESP",
   "class": "primary",
   "index": 0
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 1
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 2
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 3
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 4
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 5
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 6
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 7
  },
  {
   "name": "",
   "glyph": "",
   "filename": "",
   "target": "",
   "class": "",
   "index": 8
  }
 ]

module.exports = function (app) {
  app.get('/macrocfg.json', function (req, res, next) {
    res.json(response)
  })
}
