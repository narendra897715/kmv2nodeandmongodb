const sql = require('mssql');
let conn;
const config = {
    user: 'sa',
    password: 'Password23',
    server: '172.16.10.51',
    port: 1433, // You can use 'localhost\\instance' to connect to named instance
    database: 'META',

    options: {
        encrypt: false,
        useUTC:false // Use this if you're on Windows Azure
    }
}
// const config = {
//     user: 'sa',
//     password: 'Meritus@123',
//     server: '172.17.0.2',
//     port: '1433', // You can use 'localhost\\instance' to connect to named instance
//     database: 'IntranetPortal',

//     // options: {
//     //     encrypt: true // Use this if you're on Windows Azure
//     // }
// }
//creating conn pool using callback functions
const poolPromise =new  sql.ConnectionPool(config,(err)=>{
    if(err){
        console.log(err);
    }
})
// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then(pool => {
//     console.log('Connected to MSSQL')
//     return pool
//   })
//   .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}