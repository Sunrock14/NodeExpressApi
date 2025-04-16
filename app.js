const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Veritabanı bağlantısı
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message)
  }
})

// Kullanıcı tablosunu oluştur
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`)
})

// Kullanıcı ekleme (Create)
app.post('/adduser', (req, res) => {
  const { name, email } = req.body
  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.status(201).json({ id: this.lastID, name, email })
  })
})

// Tüm kullanıcıları listeleme (Read)
app.get('/users', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
})

// Kullanıcı güncelleme (Update)
app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.json({ id, name, email })
  })
})

// Kullanıcı silme (Delete)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  db.run(`DELETE FROM users WHERE id = ?`, id, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.status(204).send()
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about',(req,res) => {
    res.send('Hakkımızıda')
})

app.listen(port, () => {
  console.log(`Uygulama ${port} portunda çalışıyor`)
})