import sharp from 'sharp' // responsible for resizing and operating the resized imgs
import path from 'path'

async function resize(fileName: string, width: number, height: number) {
  const thumbPath: string = path.resolve(
    `./assets/thumb/${fileName}_thumb_${width}_${height}.jpg`
  )
  const fullPath: string = path.resolve(`./assets/full/${fileName}.jpg`)
  await sharp(fullPath).resize(width, height).toFile(thumbPath)
}

//handles the overwriting of the img resizing and sending the new file to the thumb folder

export default resize
