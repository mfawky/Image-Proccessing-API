import express, { Application, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import resize from './img-proccessing/resize'
const app: Application = express()
// here im crearing the endpoint
app.get('/api/images', async (req: Request, res: Response): Promise<void> => {
  const fileName = req.query.fileName
  const width = req.query.width
  const height = req.query.height

  // this if checks if any one of the params are not existed
  if (!fileName || !width || !height) {
    console.log('Mandatory input is missing')
    res.status(400).send('Mandatory input is missing')
    return
  }

  if (isNaN(+width) || +width < 1) {
    console.log('invalid width')
    res.status(400).send('invalid width')
    return
  }

  if (isNaN(+height) || +height < 1) {
    console.log('invalid height')
    res.status(400).send('invalid height')
    return
  }

  //redirecting the path to thumb folder instead of full folder and creating the new resized img
  const thumbPath: string = path.resolve(
    `./assets/thumb/${fileName}_thumb_${width}_${height}.jpg`
  )
  const fullPath: string = path.resolve(`./assets/full/${fileName}.jpg`)

  if (fs.existsSync(thumbPath)) {
    // checks if the resized img existed in thumb so that its served instead of that in the full folder
    console.log('found as thumb')
    res.sendFile(thumbPath)
  } else {
    console.log('resize full image')
    if (!fs.existsSync(fullPath)) {
      console.log('File not found')
      res.send('File not found')
      return
    }
    await resize(fileName as string, +width, +height)
    res.sendFile(thumbPath)
  }
})

// start express server
app.listen(3000, (): void => {
  console.log('Server is starting at port: 3000')
})
// exporting app so that i can use it in the app.spec.ts
export default app
