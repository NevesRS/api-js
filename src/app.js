import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json()); //Da parse para json
let uuid = 0;

const pessoas = [
    {
        id: uuidv4(),
        apelido: "neves",
        nome: "Bruno",
        nascimento: "2004/01/14",
        stack: ["JavaScript", "Java", "Rust"]
    },
    {
        id: uuidv4(),
        apelido: "rob",
        nome: "Roberto",
        nascimento: "1999/03/21",
        stack: ["Java", "C#"]
    }
];

function existeApelido(apelidoParam){
        for (let i = 0; i < pessoas.length; i++) {
            if (apelidoParam == pessoas[i].apelido) {
                return true;
            }
        }
        return false;
}

function buscaPessoa(idParam){
    for (let i = 0; i < pessoas.length; i++) {
        if (idParam == pessoas[i].id) {
            return pessoas[i];
        }
    }
    return null;
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/pessoas", (req, res) => {
    if (pessoas.length != 0) {
        res.status(200).json(pessoas);
    } else {
        res.status(200).send("Não há ninguém aqui :(");
    }
});

app.get("/pessoas/:id", (req, res) => {
    const pessoaEncontrada = buscaPessoa(req.params.id);
    if (pessoaEncontrada) {
        res.status(200).json(pessoaEncontrada);
    } else {
        res.status(404).send("Pessoa não encontrada");
    }
});

app.post("/pessoas", (req, res) => {
    if (req.body.apelido === "" || req.body.nome === "") {
        res.status(422).send("Apelido e nome devem ser fornecidos.");
    } else if (existeApelido(req.body.apelido)) {
        res.status(422).send("O apelido já existe. Por favor, escolha outro.");
    } else {
        const novaPessoa = { id: uuidv4(), ...req.body };
        pessoas.push(novaPessoa);
        res.status(201).json(novaPessoa);  
    }
});


app.put("/pessoas/:id", (req, res) => {
    const pessoaEncontrada = buscaPessoa(req.params.id);
    if (pessoaEncontrada) {
        pessoaEncontrada.apelido = req.body.apelido;
        pessoaEncontrada.nome = req.body.nome;
        pessoaEncontrada.nascimento = req.body.nascimento;
        pessoaEncontrada.stack = req.body.stack;

        res.status(200).json(pessoaEncontrada);
    } else {
        res.status(404).send("Pessoa não encontrada");
    }
});

export default app;