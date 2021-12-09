/* eslint-disable no-console */
const axios = require('axios');

const apiUrl = `${process.env.VUE_APP_API_ENDPOINT}users`

export default {
    async getAll(){
        return axios.get(apiUrl)
        .then((res) => res.data)
        .catch((err)=> console.error(err))
    },

    async getUser(id){
        return axios.get(apiUrl, id)
        .then((res) => res.data)
        .catch((err)=> console.error(err))
    },

    async postUser(user){
        return axios.post(apiUrl, user)
        .then((res) => res)
        .catch((err)=> (err))
    },

    async putUser(id){
        return axios.put(apiUrl, id)
        .then((res) => res)
        .catch((err)=> (err))
    },

    async disableUser(id){
        return axios.delete(apiUrl, id)
        .then((res) => res)
        .catch((err)=> console.error(err))
    },

}