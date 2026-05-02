import dotenv from 'dotenv'
import app from './src/app.js'

dotenv.config()

const { PORT = 3000 } = process.env

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
