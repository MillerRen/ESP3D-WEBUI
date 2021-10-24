import spiffs from '../../src/models/spiffs'
import '../../mocks/spiffs/files'
import files from '../../mocks/data/files.json'

describe('spiffs.list', () => {
  it('list all files when path is /', () => {
    const msg = 'new message'
    return spiffs.list()
      .then(res => {
        expect(Array.isArray(res.files)).toBe(true)
      })
    
  })
})
