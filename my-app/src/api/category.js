import instance from "./config";

export const getAll = () => {
    const url = "/categories";
    return instance.get(url);
};
export const getOne = (id) => {
    const url = `/categories/${id}`;
    return instance.get(url);
};
export const add = (data) => {
    const url = "/categories";
    return instance.post(url, data);
};
export const remove = (id) => {
    const url = `/categories/${id}`;
    return instance.delete(url);
};
export const update = (data) => {
    const url = `/categories/${data.id}`;
    return instance.put(url, data);
};