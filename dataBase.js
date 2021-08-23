const sequence = {
    _id: 1,
    get id() {
        return this._id++
    }
}

const pokemons = []

function salvarPokemon(pokemon) {
    if (!pokemon.id) pokemon.id = sequence.id
    pokemons[pokemon.id] = pokemon
    return pokemon
}

function mostrarPokemon(id) {
    return pokemons[id] || "id não definido"
}

function mostrarPokemons() {
    return Object.values(pokemons) || "Nenhum pokemon cadastrado"
}

function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id) {
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if (pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado || "Não existe pokemon cadastrado com este id"
}

function batalhaPokemon(id1, id2) {

    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if (pokemon1.hp != 0 && pokemon2.hp != 0) {
        if (pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        } else if (pokemon1.tipo == pokemon2.resistencia) {
            pokemon2.hp = pokemon2.hp - naoEfetivo
        } else {
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }

    if (pokemon1.hp != 0 && pokemon2.hp != 0) {
        if (pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if (pokemon2.tipo == pokemon1.resistencia) {
            pokemon1.hp = pokemon1.hp - naoEfetivo
        } else {
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

    if (pokemon1.hp < 0) pokemon1.hp = 0
    if (pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

function curarPokemon(id) {

    const pokemon = pokemons[id]

    if (pokemon) {
        if (pokemon.hp < 100) {
            pokemon.hp = pokemon.hp + 20
        } else if (pokemon.hp > 100) {
            pokemon.hp = 100
        }
        return pokemon
    } else {
        return "Pokemon não encontrado"
    }
}

module.exports = {
    salvarPokemon,
    mostrarPokemon,
    mostrarPokemons,
    atualizarPokemon,
    deletarPokemon,
    batalhaPokemon,
    curarPokemon
}

