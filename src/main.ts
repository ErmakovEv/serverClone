import express = require('express');
import path = require('path');
import constans from './constans';
import sequelize from './db';
import cors = require('cors');
import fileupload = require('express-fileupload');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('./models/models'); //???
import router from './routes/router';

const PORT = constans.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server run on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

/*
!!! НЕ сделан ErrorHandler 32:36

STOP - 41: 20 DeviceController
*/
