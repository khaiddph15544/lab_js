import NavAdmin from "../../../components/admin/NavAdmin";
import { add } from "../../../api/category";

const AddCate = {
    print() {
        return `
            ${NavAdmin.print()}
            <h2 class="font-bold text-2xl my-5 text-center">Thêm mới danh mục sản phẩm</h2>
            <form class="w-full max-w-4xl m-auto" method="POST" id="form-add-cate">
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        Category name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cate_name" type="text">
                    </div>
                </div>
                <div class="flex items-center border-b border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Bấm thêm mới để thêm mới sản phẩm" readonly aria-label="Full name">
                <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                    Thêm mới
                </button>
                <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded">
                    Cancel
                </button>
            </div>
                </form>
        `;
    },

    afterRender() {
        const formAdd = document.querySelector("#form-add-cate");

        formAdd.addEventListener("submit", async (e) => {
            e.preventDefault();
            add({
                cate_name: document.querySelector("#cate_name").value,
            }).then(() => window.location = "./");
        });
    },
};

export default AddCate;