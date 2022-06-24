import admin from "firebase-admin"
import config from '../utils/config'

const serviceAccount = config.firebase as admin.ServiceAccount

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const db = admin.firestore();

class ContainerFirebase {
  collection: any;

  constructor(collection) {
    this.collection = db.collection(collection)
  }

  async save(object) {
    const guardado = await this.collection.add(object);
    return { ...object, id: guardado.id }
  }

  async getAll() {
    const result: any[] = []
    const data = await this.collection.get();
    data.forEach(doc => result.push({ id: doc.id, ...doc.data() }))
    return result

  }

  async getById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new Error(`Error al listar por id: no se encontró`)
    } else {
      const data = doc.data();
      return { ...data, id }
    }
  }

  async deleteById(id) {
    return await this.collection.doc(id).delete()

  }

  async updateById(id, newElem) {
    const actualizado = await this.collection.doc(id).update({ items: newElem });
    return actualizado

  }
}

export default ContainerFirebase