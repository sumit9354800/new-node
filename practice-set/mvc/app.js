const express = require('express');
const app = express();

app.use((req,res)=>{
console.log('New request made:');
})

app.listen(3000,()=>{
    console.log('Server listening on port http://localhost:3000');
});