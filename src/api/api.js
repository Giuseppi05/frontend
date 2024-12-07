import axios from 'axios'

const api = axios.create({
    baseURL: 
        "https://backendmdw.onrender.com/api",
        // "http://localhost:3000/api",
    withCredentials: true
})

//LOGIN, REGISTER Y LOGOUT
export const registerApi = user => api.post('/auth/register', user)
export const loginApi = user => api.post('/auth/login', user)
export const logoutApi = () => api.post('/auth/logout')
export const checkSession = () => api.get('/auth/session')

//RESTAURANTES
export const readAllRestaurants = () => api.get('/restaurant/restaurant')
export const readOneRestaurant = (id) => api.get(`/restaurant/restaurant/${id}`)
export const createRestaurant = (restaurant) => api.post('/restaurant/restaurant', restaurant)
export const updateRestaurant = (id, restaurant) => api.put(`/restaurant/restaurant/${id}`, restaurant)
export const deleteRestaurant = (id) => api.delete(`/restaurant/restaurant/${id}`)

//USUARIOS
export const readAllUsers = () => api.get('/user/user')
export const readOneUser = (id) => api.get(`/user/user/${id}`)
export const createUser = (user) => api.post('/user/user', user)
export const updateUser = (id, user) => api.put(`/user/user/${id}`, user)
export const deleteUser = (id) => api.delete(`/user/user/${id}`)

//OFERTAS
export const readAllOffers = () => api.get('/offer/offer')
export const readOneOffer = (id) => api.get(`/offer/offer/${id}`)
export const createOffer = (offer) => api.post('/offer/offer', offer)
export const updateOffer = (id, offer) => api.put(`/offer/offer/${id}`, offer)
export const deleteOffer = (id) => api.delete(`/offer/offer/${id}`)

//INCIDENTAS
export const readAllIncidents = () => api.get('/incident/incident')
export const readOneIncident = (id) => api.get(`/incident/incident/${id}`)
export const createIncident = (incident) => api.post('/incident/incident', incident)
export const updateIncident = (id, incident) => api.put(`/incident/incident/${id}`, incident)
export const deleteIncident = (id) => api.delete(`/incident/incident/${id}`)

//GRAFICOS
export const readStats = () => api.get(`/graphic/stats`)
export const graphicLine = () => api.get(`/graphic/graphicLine`)
export const graphicBar = () => api.get(`/graphic/graphicBar`)
export const graphicArea = () => api.get(`/graphic/graphicArea`)
export const graphicPie = () => api.get(`/graphic/graphicPie`)

//MATCHES
export const readAllMatchs = () => api.get('/match/match')
export const readOneMatch = (id) => api.get(`/match/match/${id}`)
export const createMatch = (match) => api.post('/match/match', match)
export const updateMatch = (id, match) => api.put(`/match/match/${id}`, match)
export const deleteMatch = (id) => api.delete(`/match/match/${id}`)