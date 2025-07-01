import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/api';
import db from './utils/database';

const init = async () => {
  try {
    const result = await db();
    console.log(`Database status: ${result}`);

    const app = express();

    const PORT = 3000;

    app.use(bodyParser.json());
    app.use('/api', router);

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
