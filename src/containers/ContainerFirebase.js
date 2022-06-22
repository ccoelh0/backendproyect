import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContainerFirebase {

  constructor(collection) {
    this.collection = db.collection(collection)
  }

  async save(object) {
    try {
      const guardado = await this.collection.add(object);
      return { ...object, id: guardado.id }
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async getAll() {
    try {
      const result = []
      const data = await this.collection.get();
      data.forEach(doc => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById(id) {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`)
      } else {
        const data = doc.data();
        return { ...data, id }
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById(id) {
    try {
      return await this.collection.doc(id).delete()
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateById(id, newElem) {
    try {
      const actualizado = await this.collection.doc(id).update({ items: newElem });
      return actualizado
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default ContainerFirebase