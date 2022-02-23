import { getAll } from "../api/category";

const Nav = {
    async print() {
        const { data } = await getAll();
        return `
            <style>
                .sub_menu{
                    box-shadow: 0 0 12px #000;
                    visibility: hidden;
                    opacity:0;
                    margin-top: 18px;
                    transform: translateY(50px);
                    transition: .6s;
                }
                .active-cate:hover ~ .sub_menu{
                    visibility: visible;
                    opacity: 1;
                    transform: translateY(0);
                    transition: .6s;
                }
                .sub_menu:hover{
                    visibility: visible;
                    opacity: 1;
                    transform: translateY(0);
                }
            </style>
            <ul>
                <li class="inline"><a href="/" class="px-5 text-lg font-semibold">Trang chủ</a></li>
                <div class='relative inline'>
                <li id="categories" class="inline"><a href="/" class="px-5 text-lg font-semibold py-16">Danh mục</a></li>
                <ul class="sub_menu absolute left-0 z-50 bg-white">
                ${data.map((e) => `
                    <li class="rounded-md"><a href="/category/id=${e.id}" class="pr-24 py-3 hover:bg-red-500 px-10 py-1 block text-lg font-semibold">${e.cate_name}</a></li>
                `).join("")}
                </ul>
                </div>
                <li class="inline"><a href="/" class="px-5 text-lg font-semibold">Tin tức</a></li>
                <li class="inline"><a href="/order_manage" class="px-5 text-lg font-semibold">Đơn hàng</a></li>
                <li class="inline"><a href="/" class="px-5 text-lg font-semibold">Bảo hành</a></li>
            </ul>
        `;
    },
};
export default Nav;