export default {
    mongobd: {
        connectionLocalHost: 'mongodb://localhost:27017/mangabd',
        connectionAtlas: process.env.CONNECTION_MONGO_ATLAS,
        persistence: 'MONGO'
    }
}