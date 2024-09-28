import axios from "axios";

const URL_VOTTING = "http://localhost:8000/api/vote/";
export const createVote = (star, userCode, menuId) => axios.post(URL_VOTTING + "create", { star, userCode, menuId })