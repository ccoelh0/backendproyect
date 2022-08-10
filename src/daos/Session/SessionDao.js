import ContainerMongo from "../../containers/ContainerMongo.js"
import sessionSchema from "../../models/SessionSchema.js"

class SessionDao extends ContainerMongo {
    constructor() {
        super('user-sessions', sessionSchema)
    }
}

export default SessionDao