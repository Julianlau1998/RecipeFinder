import axios from 'axios'

let host = 'https://api.recipe-search.com'
if (process.env.VUE_APP_ENV === "DEV") {
    host = ''
}

export function getRandom ({ commit }) {
    commit('GET_RECIPE')
    axios
        .get(`${host}/api/recipes/random`)
        .then(response => {
            commit('RECEIVE_RECIPE', response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

export async function getAll ({ commit, state }, {offset = '0', random = '0', fulltext = ''}) {
    if (parseInt(offset) === 0 || offset === undefined) {
        state.recipes.data = []
    }
    return new Promise((resolve, reject) => {
        commit('GET_RECIPES')
        axios
            .get(`${host}/api/recipes?offset=${offset}&randomisation=${random}&fulltext=${fulltext}`)
            .then(response => {
                commit('RECEIVE_RECIPES', { recipes: response.data, offset: offset })
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject()
            })
    })
}

export function getByCategory ({ commit, state }, { category, offset, random, fulltext = '' }) {
    if (offset === 0 || offset === undefined) {
        state.recipes.data = []
    }
    commit('GET_RECIPES')
    axios
        .get(`${host}/api/recipes/category/${category}?offset=${offset}&randomisation=${random}&fulltext=${fulltext}`)
        .then(response => {
            commit('RECEIVE_RECIPES', {recipes: response.data, offset: offset})
        })
        .catch(err => {
            console.log(err)
        })
}

export function getById ({ commit }, id) {
    commit('GET_RECIPE')
    axios
        .get(`${host}/api/recipes/${id}`)
        .then(response => {
            commit('RECEIVE_RECIPE', response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

export async function post ({ commit }, recipe) {
    return new Promise((resolve, reject) => {
        commit('POST_RECIPE')
        axios
            .post(`${host}/api/recipes`, recipe)
            .then(response => {
                commit('RECIPE_POSTED', response.data)
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject()
            })
    })
}
