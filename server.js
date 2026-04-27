import express from 'express'
import db from './db.js'

const app = express()
app.use(express.json())

// Home
app.get('/', (req, res) => {
  res.send('Hello World')
})

// GET all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

// CREATE user
app.post('/users', (req, res) => {
  const { name } = req.body
  db.query(
    'INSERT INTO users (name) VALUES (?)',
    [name],
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(201).json({ id: result.insertId, name })
    }
  )
})

// UPDATE user
app.put('/users/:id', (req, res) => {
  const id = req.params.id
  const { name } = req.body

  db.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [name, id],
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.json({ id, name })
    }
  )
})

// DELETE user
app.delete('/users/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM users WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.json({ message: 'User deleted' })
    }
  )
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
