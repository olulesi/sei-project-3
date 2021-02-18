import axios from 'axios'
import { getToken, getUserId } from './auth'
const baseUrl = '/api'

export function headers() {
  return {
    headers: { authorization: `Bearer ${getToken()}` }
  }
}

//* SPACES Requests

export function getAllSpaces() {
  return axios.get(`${baseUrl}/spaces`)
}

export function createSpace(formdata) {
  return axios.post(`${baseUrl}/spaces`, formdata, headers())
}

export function editSpace(id, formdata) {
  return axios.put(`${baseUrl}/spaces/${id}`, formdata, headers())
}

export function deleteSpace(id) {
  return axios.delete(`${baseUrl}/spaces/${id}`, headers())
}

// Show Single Space 

export function getSingleSpace(id) {
  return axios.get(`${baseUrl}/spaces/${id}`)
}

// Add to favourites

export function addToFavourites(id) {
  // console.log(headers())
  return axios.post(`${baseUrl}/spaces/${id}/favourite`, null, headers())
}

//* Remove From Favourites

export function removeFromFavourites(id) {
  // console.log(headers())
  return axios.delete(`${baseUrl}/spaces/${id}/favourite`, headers())
}

export function addComment(id, formdata) {
  console.log(headers())
  return axios.post(`${baseUrl}/spaces/${id}/comments`, formdata, headers())
}

export function deleteComment(id, commentId) {
  console.log(headers())
  return axios.delete(`${baseUrl}/spaces/${id}/comments/${commentId}`, headers())
}


// Get Current User Profile

export function getUserProfile() {
  // console.log(headers())
  return axios.get(`${baseUrl}/profile/${getUserId()}`, headers())
}

export function getOtherUserProfile(id) {
  // console.log(headers())
  return axios.get(`${baseUrl}/users/${id}`, headers())
}

//* AUTH Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}

// //* POST CODE Request

export function getLongLatData(postcode) {
  return axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
}

export function getPostcodeData(longitude, latitude) {
  return axios.get(`https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`)
}


export default getAllSpaces
