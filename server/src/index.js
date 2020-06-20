const server = require('./server')

// /posts
require('./posts')

// Start Server
server.listen(3000, () => {
  console.log('Server is running')
})
