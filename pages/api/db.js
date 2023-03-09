const { createPool } = require('mysql');

const pool = createPool({
    //정보 db 
    host: process.env.NEXT_PUBLIC_HOST,
    port: process.env.NEXT_PUBLIC_PORT,
    user: process.env.NEXT_PUBLIC_USER, 
    password: process.env.NEXT_PUBLIC_PASS,  
    database: process.env.NEXT_PUBLIC_DATABASE,  
})

pool.getConnection(() => {
    console.log('success')
});
const executeQuery = async (query, arraParms) => {
    return await new Promise((resolve) => {
        pool.query(query, arraParms, (err, data) => {
            resolve(data)   
        });
    })
}
module.exports = { executeQuery };