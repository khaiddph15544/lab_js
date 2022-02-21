import instance from "./config";

export const getAll = () => {
    const url = "/orders";
    return instance.get(url);
};
export const getOne = (id) => {
    const url = `/orders/${id}`;
    return instance.get(url);
};
export const add = (data) => {
    const url = "/orders";
    return instance.post(url, data);
};
export const remove = (id) => {
    const url = `/orders/${id}`;
    return instance.delete(url);
};
export const update = (data) => {
    const url = `/orders/${data.id}`;
    return instance.put(url, data);
};