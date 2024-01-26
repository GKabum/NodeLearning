// Import do mysql module
import mysql from 'mysql2/promise';

// Configuração da conexão com banco
const connection = mysql.createPool({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PSWRD,
    database : process.env.DB_DATABASE
});

// Exportando conexão
export default connection;