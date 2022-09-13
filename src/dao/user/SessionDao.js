import Container from "../../containers/Container.js"
import sessionSchema from "../../models/SessionSchema.js"

class SessionDao extends Container {
    constructor() {
        super('user-sessions', sessionSchema)
    }
}

export default SessionDao