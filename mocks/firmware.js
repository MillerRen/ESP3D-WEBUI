import mock from "../lib/mock";
import progress from './progress'

mock.onPost('/updatefw').reply(progress)