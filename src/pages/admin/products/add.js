import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import { getAll } from "../../../api/category";
import NavAdmin from "../../../components/admin/NavAdmin";
import { add } from "../../../api/product";

const AddProduct = {
    async print() {
        const { data } = await getAll();
        return `
            ${NavAdmin.print()}
            <h2 class="font-bold text-2xl my-5 text-center">Thêm mới sản phẩm</h2>
            <form class="w-full max-w-4xl m-auto" method="POST" id="form-add-product">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Product name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="product_name" name="product_name" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Image
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="image" name="image" type="file" placeholder="Doe">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Description
                    </label>
                    <textarea name="desc" id="desc" cols="30" rows="10" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"></textarea>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        Price
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="price" type="text" placeholder="15000">
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Quantity
                    </label>
                    <input name="quantity" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="quantity" type="text" placeholder="10">
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Discount
                    </label>
                    <input name="discount" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="discount" type="text" placeholder="10">
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Category name
                    </label>
                    <select name="cate_name" id="cate_name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Choose category</option>
                        ${data.map((e) => `
                            <option value="${e.id}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">${e.cate_name}</option>
                        `).join("")}
                    </select>
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
        $("#form-add-product").validate({
            rules: {
                product_name: {
                    required: true,
                },
                image: {
                    required: true,
                },
                desc: {
                    required: true,
                },
                price: {
                    required: true,
                    digits: true,
                },
                quantity: {
                    required: true,
                    digits: true,
                },
                discount: {
                    required: true,
                    digits: true,
                },
                cate_name: {
                    required: true,
                },
            },
            messages: {
                product_name: {
                    required: "Bạn phải nhập tên sản phẩm!",
                },
                image: {
                    required: "Bạn phải tải lên ảnh sản phẩm!",
                },
                desc: {
                    required: "Bạn phải nhập mô tả sản phẩm!",
                },
                price: {
                    required: "Bạn phải nhập giá sản phẩm!",
                    digits: "Giá phải là số dương!",
                },
                quantity: {
                    required: "Bạn phải nhập số lượng sản phẩm trong kho!",
                    digits: "Số lượng phải là số dương!",
                },
                discount: {
                    required: "Bạn phải nhập giảm giá sản phẩm!",
                    digits: "Trường giảm giá phải là số dương!",
                },
                cate_name: {
                    required: "Bạn phải chọn danh mục của sản phẩm!",
                },
            },
            async submitHandler() {
                const CLOUDINARY_PRESET_KEY = "phczuaaq";
                const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dcalzi23m/image/upload";

                const file = document.querySelector("#image").files[0];
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET_KEY);

                // call api để đẩy ảnh lên cloudinary
                // Cloudinary sẽ trả về một object chứa đường link lưu trữ ảnh online
                const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                    headers: {
                        "Content-Type": "application/form-data",
                    },
                });
                // call api để post dữ liệu
                add({
                    product_name: document.querySelector("#product_name").value,
                    image: data.url,
                    price: document.querySelector("#price").value,
                    quantity: document.querySelector("#quantity").value,
                    discount: document.querySelector("#discount").value,
                    cate_name: document.querySelector("#cate_name").value,
                    desc: document.querySelector("#desc").value,
                })
                    .then(() => toastr.success("Thêm mới sản phẩm thành công"))
                    .then(setTimeout(() => window.location = "./", 2000));
            },
        });
    },
};

export default AddProduct;