import instance from "./config";

export const signin = (user) => {
    const url = "/signin";
    return instance.post(url, user);
};
export const signup = (user) => {
    const url = "/signup";
    return instance.post(url, user);
};

export const getAll = () => {
    const url = "/users";
    return instance.get(url);
};

export const add = () => {
    const url = "/users";
    return instance.post(url);
};

export const remove = (id) => {
    const url = `users/${id}`;
    return instance.delete(url, id);
};

export const getOne = (id) => {
    const url = `users/${id}`;
    return instance.get(url, id);
};

export const update = (data) => {
    const url = `/users/${data.id}`;
    return instance.put(url, data);
};