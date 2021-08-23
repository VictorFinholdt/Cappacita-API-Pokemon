const express = require("express")
const app = express()
const dataBase = require("./dataBase")

app.use(express.urlencoded({extended: true}))

app.post("/pokemons", (req, res) => {
    const pokemon = dataBase.salvarPokemon({
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100
    })
    res.send(pokemon)
})

app.get("/pokemons", (req, res) => {
    res.send(dataBase.mostrarPokemons())
})

app.get("/pokemons/:id", (req, res) => {
    res.send(dataBase.mostrarPokemon(req.params.id))
})

app.put("/pokemons/:id", (req, res) => {
    const pokemon = {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        id: parseInt(req.params.id)
    }
    res.send(dataBase.atualizarPokemon(req.params.id, pokemon))
})

app.delete("/pokemons/:id", (req, res) => {
    res.send(dataBase.deletarPokemon(req.params.id))
})

app.post('/batalha', (req, res) => {
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

app.get('/curar/:id', (req, res) => {
    res.send(dataBase.curarPokemon(req.params.id))
})

app.listen(3003)
