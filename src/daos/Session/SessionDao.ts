import ContainerMongo from "../../containers/ContainerMongo"
import sessionSchema from "../../models/SessionSchema"

class SessionDao extends ContainerMongo {
    constructor() {
        super('user-sessions', sessionSchema)
    }
}

export default SessionDao