import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BeraManga",
      description: 'In progress'
    },
  },
  apis: ['./docs/schema/**/*.yaml', './docs/path/**/*.yaml']
}

const specs = swaggerJsdoc(options)

export default {serve: swaggerUi.serve , setup: swaggerUi.setup(specs)}