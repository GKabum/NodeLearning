// Import no padrão ECMAScript, é possivel que em alguns tutoriais apareça como
// "const express = require('express')" e no padrão ECMAScript "import express from 'express'".
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {} from 'dotenv/config';
import bp from 'body-parser';
import query from './mysql-connection/query.js';
import upload from './upload-imagem/upload.js';
import enviarEmail from './mail-sender/mail.js';
import fs from 'fs';

// Inicia express
var app = express();

// Define diretorio principal
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura express com ejs, e o body parser para captura de variaveis com body
app.set('view engine', 'ejs');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Define diretorio static para captura de arquivos dentro do index.ejs e para renderizar com render
app.use(express.static(path.join(__dirname, 'app')));

// Request get com rota princiapl '/'
app.get('/', (req, res) => {
    res.render('../app/index', {VARIAVEL_GLOBAL : process.env.VARIAVEL_GLOBAL, AMBIENTE : process.env.HTTP_ENVIRONMENT});
});

// Request get com rota '/api/get'
app.get('/api/get', (req, res) => {
    res.status(200).json({method:req.method, query : req.query, body : req.body});
});

// Request post com rota '/api/post'
app.post('/api/post', (req, res) => {
    const teste = req.body.teste;
    res.status(200).json({method:req.method, query : req.query, body : req.body, teste : teste});
});

// Request put com rota '/api/put'
app.put('/api/put', (req, res) => {
    res.status(200).json({method:req.method, query : req.query, body : req.body});
});

// Request delete com rota '/api/delete'
app.delete('/api/delete', (req, res) => {
    res.status(200).json({method:req.method, query : req.query, body : req.body});
});

// Request get banco
app.get('/itens', async (req, res) => {
    const itens = await query.allItens();
    res.status(200).json(itens);
});

// Request get banco com ID
app.get('/itens/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).json({return : false});
    }
    const itens = await query.oneItem(req.params.id);
    res.status(200).json(itens);
});

// Request post banco
app.post('/itens', async (req, res) => {
    if(!req.body.nome){
        res.status(400).json({return : false});
    }
    const itens = await query.insertItem(req.body.nome);
    res.status(201).json(itens);
});

// Request put banco
app.put('/itens/:id', async (req, res) => {
    if(!req.body.nome || !req.params.id){
        res.status(400).json({return : false})
    }
    const itens = await query.alterItem(req.params.id, req.body.nome);
    res.status(200).json(itens)
});

// Request delete banco
app.delete('/itens/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).json({return : false});
    }
    const itens = await query.delItem(req.params.id);
    res.status(200).json(itens);
});

// Request para envio de email
app.get('/enviarEmail/:email/:nome', async (req, res) => {
    enviarEmail(req.params.email, req.params.nome);
    res.status(200).json({status : true});
});

// Porta que acessa a aplicação
app.listen(3333);


app.post('/img_upload', upload.array('file[]', 2), (req, res) => {
    res.status(200).json({status : true});
});
app.get('/video', (req, res) => {
    res.render('../app/video');
});

app.get('/videoRender', (req, res) => {
    const tamanho = req.headers.range;
    if(!tamanho){
        res.status(400).send('Error');
    }
    const videoPath = './app/uploads/video.mp4';
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(tamanho.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        'Content-Range' : `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges' : 'bytes',
        'Content-Length' : contentLength,
        'Content-Type' : 'video/mp4'
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
})
