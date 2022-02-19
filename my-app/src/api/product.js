import instance from "./config";

export const getAll = () => {
    const url = "/products";
    return instance.get(url);
};
export const getOne = (id) => {
    const url = `/products/${id}`;
    return instance.get(url);
};
export const add = (data) => {
    const url = "/products";
    return instance.post(url, data);
};
export const remove = (id) => {
    const url = `/products/${id}`;
    return instance.delete(url);
};
export const update = (data) => {
    const url = `/products/${data.id}`;
    return instance.put(url, data);
};