import ContainerFirebase from "../../containers/ContainerFirebase"

class ItemsDaoFirebase extends ContainerFirebase {

    constructor() {
        super('items')
    }
}

export default ItemsDaoFirebase