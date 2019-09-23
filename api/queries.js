const Pool = require('pg').Pool

const dbConfig = {
	host: '127.0.0.1',
	port: 5432,
	database: 'postgres',
	user:'gitpod',
}

const pool = new Pool(dbConfig)

const getPosts = (request, response) => {
  pool.query('SELECT * FROM talk.post ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getPosts,
}