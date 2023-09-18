const Fastify = require('fastify')
const fastStatic = require('@fastify/static')

const app = Fastify({
  logger: true
})


app.register(fastStatic, { root: __dirname + '/public' })

module.exports = { app }
