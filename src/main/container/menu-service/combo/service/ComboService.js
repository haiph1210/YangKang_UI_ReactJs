import axios from "../../../../../enviroments/enviroment-dev"
const findAllCombo = (page) => {
    return axios.get(`combo/findPage?page=${page}`);
}

const findAllListCombo = () => {
    return axios.get(`combo/findAll`);
}

const findAllListCombo2 = () => {
    return axios.get(`combo/findAllList`);
} 

const loadListImagesCombo = (id) => {
    return axios.get(`combo/fileName/${id}`)
}
const findFormCombo = (minPrice, maxPrice) => {
    return axios.post(`combo/search-form`, { minPrice, maxPrice })
}

const createCombo = (name, description, imgUrls,menuIds) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    for (let i = 0; i < imgUrls.length; i++) {
        formData.append("imgUrl", imgUrls[i]);
    }
    formData.append("menuIds",menuIds)
    return axios.post(`combo/create`, formData, {
        headers: {
            "Content-Type": "form-data",
        },
    })
}

const updateCombo = (id, name, description, imgUrls,menuIds) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    for (let i = 0; i < imgUrls.length; i++) {
        formData.append("imgUrl", imgUrls[i]);
    }
    formData.append("menuIds",menuIds)
    return axios.put(`combo/update/${id}`, formData, {
        headers: {
            "Content-Type": "form-data",
        }
    })
}

const deleteCombo = (id) => {
    return axios.delete(`combo/delete/${id}`);
}


export { findAllCombo,findAllListCombo,findAllListCombo2,loadListImagesCombo, findFormCombo, createCombo, updateCombo, deleteCombo }