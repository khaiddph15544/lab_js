import instance from "./config";

export const getAll = () => {
    const url = "/order_detail";
    return instance.get(url);
};
export const getOne = (id) => {
    const url = `/order_detail/${id}`;
    return instance.get(url);
};
export const add = (data) => {
    const url = "/order_detail";
    return instance.post(url, data);
};
export const remove = (id) => {
    const url = `/order_detail/${id}`;
    return instance.delete(url);
};
export const update = (data) => {
    const url = `/order_detail/${data.id}`;
    return instance.put(url, data);
};