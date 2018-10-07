import express from 'express'
import { h } from 'preact'
import render from 'preact-render-to-string'
import path from 'path' 

import App from './src/components/App'

const app = express()
const port = 4000

const HTMLShell = (html) => `
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title> SSR Preact App </title>
      </head>
      <body>
          <div id="app">${html}</div>
          <script src="./app.js"></script>
      </body>
  </html>`

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  let html = render(
    <App />
  )

  res.send(HTMLShell(html))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
