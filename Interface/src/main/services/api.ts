import axios from "axios";

export const api = axios.create({
	baseURL: "https://listmanager.up.railway.app/",
});
