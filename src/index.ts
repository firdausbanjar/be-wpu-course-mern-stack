import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/api';

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
