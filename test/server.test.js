import { expect } from 'chai';
import supertest from 'supertest';
import { describe, it } from 'mocha';
import {newItem, update} from './utils.js'

const request = supertest('http://localhost:8080/')

describe('REST API TEST:', () => {
  describe('Get items:', () => {
    it('Res equals to 200', async () => {
      const res = await request.get('api/items/')
      expect(res.status).to.eql(200)
    })
    it ('Res should be an array of items', async () => {
      const res = await request.get('api/items/')
      expect(res.body.data).to.be.a('array')
    })
  })

  describe('Save item:', () => {
    it('Res equals to 200', async () => {
      const res = await request.post('api/items/', newItem)
      expect(res.status).to.eql(200)
    })
  })

  describe('Delete item', () => {
    it('Res equals to 200', async () => {
      const res = await request.delete('api/items/632b9cfcad85d50a9a02bcbc')
      expect(res.status).to.eql(200)
    })
  })

  describe('Update item', () => {
    it('Res equals to 200', async () => {
      const res = await request.put('api/items/632b9cf8ad85d50a9a02bcba', {update})
      expect(res.body).to.eql({data: true})
      expect(res.status).to.eql(200)
    })
  })
})