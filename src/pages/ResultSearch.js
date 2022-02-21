import { getAll } from "../api/product";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ResultSearch = {
    async print(name) {
        const { data } = await getAll();
        const arrSearch = [];
        data.forEach(async (e) => {
            if ((e.product_name.toLowerCase()).includes(name.toLowerCase())) {
                arrSearch.push(e);
            }
        });
        return `
            ${await Header.print()}
            <div class="w-11/12 m-auto">
                <h3 class="px-5 font-semibold text-emerald-700 text-2xl my-10">Tìm thấy <span class="font-bold text-black"> ${arrSearch.length} </span> sản phẩm với từ khóa "<span class="font-bold text-black">${name}</span>"</h3>
                <div class="grid grid-cols-4">
                ${arrSearch.map((e) => `
                    <div class="p-5">
                        <a href="/products/id=${e.id}">
                            <img src = "${e.image}">
                            <p class="font-bold text-emerald-700 text-lg">${e.product_name}</p>
                        </a>
                        <span class=" font-bold mt-5 inline-block text-lg text-orange-800">${e.price - (e.price * e.discount / 100)} đ</span>
                        <span class="line-through">${(e.price)} đ</span>
                    </div>
                `).join("")}
                </div>
            </div>
            ${Footer.print()}
        `;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default ResultSearch;