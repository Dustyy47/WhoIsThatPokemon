import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/";

export const $host = axios.create({
  baseURL: API_URL,
});
