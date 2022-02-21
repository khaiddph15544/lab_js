import toastr from "toastr";
import "toastr/build/toastr.min.css";
import CartTheme from "../pages/CartTheme";
import reRender from "./reRender";

let cart = [];
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

export const addToCart = (newProduct) => {
    const existProduct = cart.find((item) => item.id === newProduct.id);
    if (!existProduct) {
        cart.push(newProduct);
    } else {
        existProduct.quantity += newProduct.quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const plus = (id) => {
    cart.find((item) => item.id == id).quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    reRender(CartTheme, "#main");
};
export const minus = (id) => {
    const currentQuantity = cart.find((item) => item.id == id).quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    if (currentQuantity < 1) {
        removeItemInCart(id);
    }
    reRender(CartTheme, "#main");
};

export const removeItemInCart = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không?");
    if (confirm) {
        cart = cart.filter((item) => item.id != id);
        localStorage.setItem("cart", JSON.stringify(cart));
        toastr.success("Đã xóa sản phẩm");
        reRender(CartTheme, "#main");
    } else {
        cart.find((item) => item.id == id).quantity = 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        reRender(CartTheme, "#main");
    }
};