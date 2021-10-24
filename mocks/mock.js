import axios from "axios"
import AxiosMockAdapter from 'axios-mock-adapter'

const mock = new AxiosMockAdapter(axios, { onNoMatch: "passthrough" })

export default mock