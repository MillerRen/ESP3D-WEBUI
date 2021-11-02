import mock from "./mock"
import progress from './progress'

mock.onPost('/updatefw').reply(progress)