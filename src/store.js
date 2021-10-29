import Vue from 'vue'
import firmware from './models/firmware'
import grbl from './models/grbl'

var fw = null

const store = Vue.observable({
    fwData: null
})

function createTargetFirmware(target){
    switch (target) {
        case 'grbl':
            return grbl
    }
}

function bootstrap (callback) {
    var step = 1
    return firmware.getFWData()
        .then(fwData => {
            fw = createTargetFirmware(fwData.target_firmware)
            store.fwData = fwData
            callback&&callback(step++)`1`
        })
        .then(fw.getSettings)
}

export default {
    store,
    bootstrap
}
