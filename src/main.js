import Navigo from "navigo";
import HomePage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/products/add";
import UpdateProduct from "./pages/admin/products/update";
import ProductShow from "./pages/admin/products";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CartTheme from "./pages/CartTheme";
import Payment from "./pages/Payment";
import UserShow from "./pages/admin/users";
import AddUser from "./pages/admin/users/add";
import CateShow from "./pages/admin/categories";
import AddCate from "./pages/admin/categories/add";
import UpdateCate from "./pages/admin/categories/update";
import UpdateUser from "./pages/admin/users/update";
import ResultSearch from "./pages/ResultSearch";

const route = new Navigo("/", { linksSelector: "a" });

const render = async (content, id = "") => {
    document.querySelector("#main").innerHTML = await content.print(id);
    if (content.afterRender) await content.afterRender(id);
};
route.on("/admin/*/", () => {}, {
    before(done, match) {
        if (localStorage.getItem("account")) {
            const userId = JSON.parse(localStorage.getItem("account")).id;
            if (userId === 1) {
                done();
            } else {
                window.location = "/";
            }
        } else {
            window.location = "/";
        }
    },
});
route.on("/payment/*/", () => {}, {
    before(done, match) {
        if (localStorage.getItem("account")) {
            done();
        } else {
            window.location = "/signin";
        }
    },
});
route.on({
    "/": () => {
        render(HomePage);
    },
    "/products/id=:id": ({ data }) => {
        render(ProductDetail, data.id);
    },
    "/admin": () => {
        render(Dashboard);
    },
    "/admin/products": () => {
        render(ProductShow);
    },
    "/admin/products/add": () => {
        render(AddProduct);
    },
    "/admin/products/update/id=:id": ({ data }) => {
        render(UpdateProduct, data.id);
    },
    "/admin/users": () => {
        render(UserShow);
    },
    "/admin/users/add": () => {
        render(AddUser);
    },
    "/admin/users/update/id=:id": ({ data }) => {
        render(UpdateUser, data.id);
    },
    "/admin/categories": () => {
        render(CateShow);
    },
    "/admin/categories/add": () => {
        render(AddCate);
    },
    "/admin/categories/update/id=:id": ({ data }) => {
        render(UpdateCate, data.id);
    },
    "/signup": () => {
        render(Signup);
    },
    "/signin": () => {
        render(Signin);
    },
    "/cart": () => {
        render(CartTheme);
    },
    "/payment": () => {
        render(Payment);
    },
    "/search/:name": ({ data }) => {
        render(ResultSearch, data.name);
    },
});

route.resolve();