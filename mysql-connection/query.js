// Importando conexão
import connection from './connection.js';
import {} from 'dotenv/config';

// Capturando todos os itens
const allItens = async () => {
    const [query] = await connection.execute('SELECT * FROM node_table');
    return query;
}

// Capturando um item
const oneItem = async (id) => {
    const [query] = await connection.execute('SELECT * FROM node_table WHERE id = ?', [id]);
    return query;
}

// Inserindo um item
const insertItem = async (item) => {
    const [query] = await connection.execute('INSERT INTO node_table (item) VALUES(?)', [item]);
    return query;
}

// Alterando um item
const alterItem = async (id, item) => {
    const [query] = await connection.execute('UPDATE node_table SET item = ? WHERE id = ?', [item, id]);
    return query;
}

// Deletando um item
const delItem = async (id) => {
    const [query] = await connection.execute('DELETE FROM node_table WHERE id = ?', [id]);
    return query;
}

// Exportando variavel com todos os metodos
export default { allItens, oneItem, insertItem, alterItem, delItem };