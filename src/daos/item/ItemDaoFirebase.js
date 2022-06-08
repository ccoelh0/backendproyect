import ContenedorFirebase from "../../containers/ContenedorFirebase.js"

class ItemsDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('items')
    }
}

export default ItemsDaoFirebase