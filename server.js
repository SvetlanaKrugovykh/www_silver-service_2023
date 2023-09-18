const { app } = require('./index')
const HOST = process.env.HOST || '192.168.0.227'

app.listen({ port: process.env.PORT || 3002, host: HOST }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`${new Date()}:Server started on ${address}`)
})


