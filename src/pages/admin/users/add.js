import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import NavAdmin from "../../../components/admin/NavAdmin";
import { getAll, signup } from "../../../api/user";

const AddUser = {
    print() {
        return `
            ${NavAdmin.print()}
            <h2 class="font-bold text-2xl my-5 text-center">Thêm mới người dùng</h2>
            <form class="w-full max-w-4xl m-auto" method="POST" id="form-add-product">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Email
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="text" placeholder="Jane">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Image
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="image" type="file" placeholder="Doe">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        User name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="user_name" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Role
                    </label>
                    <select id="role" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="0">Người dùng</option>
                        <option value="1">Quản trị viên</option>
                    </select>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Password
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" type="password">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        RePassword
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rePassword" type="password">
                    </div>
                </div>
                <div class="flex items-center border-b border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Bấm thêm mới để tạo mới người dùng" readonly aria-label="Full name">
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
        const formAdd = document.querySelector("#form-add-product");
        const CLOUDINARY_PRESET_KEY = "phczuaaq";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dcalzi23m/image/upload";

        formAdd.addEventListener("submit", async (e) => {
            e.preventDefault();
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
            const email = document.querySelector("#email").value;
            const getData = await getAll();
            const checkExist = getData.data.find((element) => element.email == email);
            if (!checkExist) {
                signup({
                    email: document.querySelector("#email").value,
                    image: data.url,
                    user_name: document.querySelector("#user_name").value,
                    password: document.querySelector("#password").value,
                    role: document.querySelector("#role").value,
                }).then(() => window.location = "./");
            } else {
                toastr.error("Email đã tồn tại");
            }
        });
    },
};

export default AddUser;