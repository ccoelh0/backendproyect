import { session } from '../daos/index'
import bcrypt from 'bcrypt'

export const getSessions = async (res) => {
  try {
    return res.send(await session.getAll())
  } catch (err) {
    return res.send({ err })
  }
}

export const createUser = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  bcrypt.hash(password, 10, async (err, hash) => {
    try {
      const userSession = {email, password: hash}
      await session.save(userSession)
      res.send({data: {user: email, save: true}})
    } catch (error) {
      return res.send({err: error || err })
    }
  })
}

export const validateSession = async (req, res) => {
  const email = req.body.email
  const passwordPlanned = req.body.password
  const dataSessions = await session.getAll()
  const userData = dataSessions.find(x => x.email === email)
  
  if (userData !== undefined) {
    const passwordHash = userData.password
    bcrypt.compare(passwordPlanned, passwordHash, async (err, result) => {
      if (err) return err
      return res.send({data: {loginEnabled: result}})
    })
  } else {
    return res.send({data: 'user or password are incorrect'})
  }
}

