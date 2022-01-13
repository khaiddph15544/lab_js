import Navigo from "navigo";
import Header from "./components/header";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import newsDetail from "./pages/newsDetail";
import activitiesDetail from "./pages/activitiesDetail";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminNews from "./admin/pages/AdminNews";
import AdminUser from "./admin/pages/AdminUser";
import AddNews from "./admin/pages/AddNews";
import EditNews from "./admin/pages/EditNews";
import AdminHeader from "./admin/components/AdminHeader";
import Footer from "./components/footer";

const header = document.querySelector("#header");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");

const render = (content, h = Header) => {
    header.innerHTML = h.show();
    main.innerHTML = content;
    footer.innerHTML = Footer.show();
};

const route = new Navigo("/", { linksSelector: "a" });

route.on({
    "/": () => {
        render(HomePage.show());
    },
    "/about": () => {
        render(AboutPage.show());
    },
    "news/post=:id": ({ data }) => {
        const { id } = data;
        render(newsDetail.show(id));
    },
    "activities/post=:id": ({ data }) => {
        const { id } = data;
        render(activitiesDetail.show(id));
    },
    "/signin": () => {
        render(Signin.show());
    },
    "/signup": () => {
        render(Signup.show());
    },
    "/admin/dashboard": () => {
        render(AdminDashboard.show(), AdminHeader);
    },
    "/admin/users": () => {
        render(AdminUser.show(), AdminHeader);
    },
    "/admin/news": () => {
        render(AdminNews.show(), AdminHeader);
    },
    "/admin/news/add": () => {
        render(AddNews.show(), AdminHeader);
    },
    "/admin/news/post=:id/edit": ({ data }) => {
        const { id } = data;
        render(EditNews.show(id), AdminHeader);
    },
});

route.resolve();