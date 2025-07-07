import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointFiles = ['../routes/api.ts'];
const doc = {
  info: {
    version: 'v0.0.1',
    title: 'Dokumentasi API Back-end WPU Course MERN Stack',
    description: 'Dokumentasi API',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local Server',
    },
    {
      url: 'https://be-wpu-course-mern-stack.vercel.app/api',
      description: 'Deploy Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      loginRequest: {
        identifier: 'agambanjar',
        password: 'agambanjar123123',
      },
    },
  },
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc);

// penulisan swaggerAutogen sama seperti dibawah ini
// const generateSwagger = swaggerAutogen({ openapi: '3.0.0' })
// generateSwagger(outputFile, endpointFiles, doc)
