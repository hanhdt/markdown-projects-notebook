import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const API_URL = process.env.API_URL || 'http://localhost:8080/'

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 3000
})

Vue.use(VueAxios, axios)

export default http
