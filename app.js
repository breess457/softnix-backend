require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors')

const dataRoutes = require('./routes/data');
const userRoutes = require('./routes/user');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors())
server.use(cors({ 
  origin:"http://localhost:5173",
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-Type","Authorization"],
  credentials:true
}))

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer:true}));




mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connected successfully'))
.catch(err => console.log(err));

server.use(function(req, res, next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
    next()
})

server.use('/api',dataRoutes)
server.use('/api',userRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})