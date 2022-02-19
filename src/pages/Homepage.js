import { getAll } from "../api/product";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = {

    async print() {
        const { data } = await getAll();
        return `
            ${Header.print()}
            ${Banner.print()}
            <div class="w-11/12 m-auto">
                <h3 class="px-5 font-bold text-emerald-700 text-3xl my-10">DANH SÁCH SẢN PHẨM</h3>
                <div class="grid grid-cols-4">
                ${data.map((e) => `
                    <div class="p-5">
                        <a href="/products/id=${e.id}">
                            <img src = "${e.image}">
                            <p class="font-bold text-emerald-700 text-lg">${e.product_name}</p>
                        </a>
                        <span class=" font-bold mt-5 inline-block text-lg text-orange-800">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price - (e.price * e.discount / 100))}</span>
                        <span class="line-through ml-5">${e.discount > 0 ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price) : ""}</span>
                    </div>
                `).join("")}
                </div>
            </div>
            ${Footer.print()}
        `;
    },
    afterRender(id) {
        Header.afterRender(id);
    },
};

export default HomePage;