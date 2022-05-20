import express, { Application, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const app: Application = express()

app.get('/api/images', (req: Request, res: Response) => {
  const fileName = req.query.fileName
  const width = req.query.width
  const height = req.query.height

  if (!fileName || !width || !height) {
    //throw exception
    console.log('Mandatory input is missing')
    res.send('Mandatory input is missing')
    return
  }

  const thumbPath = path.resolve(
    `./assets/thumb/${fileName}_thumb_${width}_${height}.jpg`
  )
  const fullPath = path.resolve(`./assets/full/${fileName}.jpg`)

  if (fs.existsSync(thumbPath)) {
    console.log('found as thumb')
    res.sendFile(thumbPath)
  } else {
    console.log('resize full image')
    if (!fs.existsSync(fullPath)) {
      console.log('File not found')
      res.send('File not found')
      return
    }
    sharp(fullPath)
      .resize(+width, +height)
      .toFile(thumbPath, function (err) {
        if (!err) res.sendFile(thumbPath)
      })
  }
})

// start express server
app.listen(3000, () => {
  console.log('Server is starting at port: 3000')
})
export default app
