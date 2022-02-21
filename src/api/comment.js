import instance from "./config";

export const getAll = () => {
    const url = "/comments";
    return instance.get(url);
};
export const getOne = (id) => {
    const url = `/comments/${id}`;
    return instance.get(url);
};
export const add = (data) => {
    const url = "/comments";
    return instance.post(url, data);
};
export const remove = (id) => {
    const url = `/comments/${id}`;
    return instance.delete(url);
};
export const update = (data) => {
    const url = `/comments/${data.id}`;
    return instance.put(url, data);
};