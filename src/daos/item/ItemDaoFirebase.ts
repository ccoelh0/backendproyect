import ContainerFirebase from "../../containers/ContainerFirebase.js"

class ItemsDaoFirebase extends ContainerFirebase {

    constructor() {
        super('items')
    }
}

export default ItemsDaoFirebase