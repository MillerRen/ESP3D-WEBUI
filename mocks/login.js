import mock from "../lib/mock";

mock.onGet('/login').reply(200, {
    authentication_lvl: 'admin',
    user: 'miller'
})