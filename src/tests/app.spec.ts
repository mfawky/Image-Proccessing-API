import supertest from 'supertest'
import app from '../index' // importing app that was exported frm index.ts
import sizeOf from 'image-size' //getting the size of the img
import resize from '../img-proccessing/resize'

const req = supertest(app)
//testing the whole endpoint and its params
describe('Testing my endpoint', () => {
  // the goal is try to write a valid credentials so that the img is proccessed
  it('expects valid query strings', async () => {
    const response: any = await req.get(
      '/api/images?fileName=aaa&width=123&height=456'
    )
    expect(response.status).toBe(200)
  })
  // the goal is try to write a parameter without height so that it throws an err
  it('expects query without height', async () => {
    const response: any = await req.get('/api/images?fileName=aaa&width=123')
    expect(response.status).toBe(400)
  })
  // the goal is try to write a parameter without width so that it throws an err
  it('expects query without width', async () => {
    const response: any = await req.get('/api/images?fileName=aaa&height=321')
    expect(response.status).toBe(400)
  })
  // the goal is try to write a parameter without filname so that it throws an err
  it('expects query without fileName', async () => {
    const response: any = await req.get('/api/images?&width=123&height=321')
    expect(response.status).toBe(400)
  })
  // the goal is try to write valid parameters and see if the path is ok or not
  it('check on size and the proccessing of the img', async () => {
    const width = 123
    const height = 321
    const response: any = await req.get(
      `/api/images?fileName=fjord&width=${width}&height=${height}`
    )
    const sizeOfImg = sizeOf(response._body)

    expect(sizeOfImg.height).toBe(height) // expects that the height is the same as proccessed
    expect(sizeOfImg.width).toBe(width) // expects that width is the same as proccessed
    expect(sizeOfImg.type).toBe('jpg') // expects that the extension of the file is .jpg mot any other extension
  })

  it('test resize function', async () => {
    const width = 123
    const height = 321
    const fileName = 'fjord'

    expect(async () => {
      await resize(fileName, width, height)
    }).not.toThrow()
  })
})
