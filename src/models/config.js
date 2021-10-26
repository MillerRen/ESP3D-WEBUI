import grbl from "./grbl";


function getConfig(fw) {
    console.log(fw)
    switch (fw) {
        case 'smoothieware':
            break;
        case 'grbl':
            return grbl.getConfig()
        case 'marlin':
            break;
        case 'grbl-embedded':
            return grbl.getConfig()
        case 'marlin-embeded':
            break;
    }
    
}

export default {
    getConfig
}