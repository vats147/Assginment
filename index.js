const express=require('express');
const app=express();


app.use(express.json());

const apiRoutes = require('./apiRoutes');

app.use('/v1', apiRoutes);




app.listen(3000);
