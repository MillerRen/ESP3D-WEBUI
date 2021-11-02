import mock from "./mock"

mock.onGet('/login').reply(200, {
    authentication_lvl: 'admin',
    user: 'miller'
})