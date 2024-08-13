const { Router } = require('express');
const { criarTableNum, criarTableMes } = require('./busca')

const routes = new Router();


routes.route("/mes")
            .post(criarTableMes)
routes.route("/num")
            .post(criarTableNum)

module.exports = routes