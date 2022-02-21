import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import NavAdmin from "../../../components/admin/NavAdmin";
import {
    getAll, getOne, signup, update,
} from "../../../api/user";

const UpdateUser = {
    async print(id) {
        const { data } = await getOne(id);
        const { role } = data;
        let currentRole; let nextRole; let currenValue; let nextValue;
        if (role == 1) {
            currentRole = "Quản trị viên";
            nextRole = "Người dùng";
            currenValue = 1;
            nextValue = 0;
        } else {
            currentRole = "Người dùng";
            nextRole = "Quản trị viên";
            currenValue = 0;
            nextValue = 1;
        }
        return `
            ${NavAdmin.print()}
            <h2 class="font-bold text-2xl my-5 text-center">Cập nhật thông tin người dùng</h2>
            <form class="w-full max-w-4xl m-auto" method="POST" id="form-update-user">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="w-full block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Image
                    </label>
                    <img src="${data.image}" />
                    <input type="text" id="old_image" value="${data.image}" hidden />
                    <input class="my-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="image" type="file" placeholder="Doe">
                    </div>
                    
                    <div class="w-full bottom-0 md:w-1/2 px-3">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        User name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="user_name" name="user_name" type="text" value="${data.user_name}">

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Email
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" name="email" type="text" value="${data.email}">

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Password
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" name="password" type="text" value="${data.password}">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Role
                    </label>
                    <select id="role" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="${currenValue}">${currentRole}</option>
                        <option value="${nextValue}">${nextRole}</option>
                    </select>
                    </div>
                </div>
                <div class="flex items-center border-b border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Bấm thêm mới để tạo mới người dùng" readonly aria-label="Full name">
                <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                    Cập nhật
                </button>
                <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded">
                    Cancel
                </button>
            </div>
                </form>
        `;
    },

    afterRender(updateId) {
        $("#form-update-user").validate({
            onfocusout: false,
            onkeyup: false,
            onclick: false,
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                image: {
                    required: true,
                },
                user_name: {
                    required: true,
                    minlength: 6,
                },
                role: {
                    required: true,
                },
                password: {
                    required: true,
                    minlength: 8,
                },
                rePassword: {
                    required: true,
                    equalTo: "#password",
                },
            },
            messages: {
                email: {
                    required: "Bạn phải nhập email!",
                    email: "Email không đúng định dạng!",
                },
                image: {
                    required: "Bạn chưa chọn ảnh đại diện!",
                },
                user_name: {
                    required: "Bạn phải nhập tên tài khoản!",
                    minlength: "Tên tài khoản phải lớn hơn 6 kí tự!",
                },
                role: {
                    required: "Bạn phải chọn vai trò!",
                },
                password: {
                    required: "Bạn phải nhập mật khẩu!",
                    minlength: "Mật khẩu phải lớn hơn 8 kí tự",
                },
                rePassword: {
                    required: "Bạn phải nhập lại mật khẩu!",
                    equalTo: "Nhập lại mật khẩu không khớp",
                },
            },
            async submitHandler() {
                const CLOUDINARY_PRESET_KEY = "phczuaaq";
                const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dcalzi23m/image/upload";

                const file = document.querySelector("#image").files[0];
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET_KEY);

                let img = "";
                if (file !== undefined) {
                    const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                        headers: {
                            "Content-Type": "application/form-data",
                        },
                    });
                    img = data.url;
                } else {
                    img = document.querySelector("#old_image").value;
                }

                // call api để post dữ liệu
                update({
                    email: document.querySelector("#email").value,
                    password: document.querySelector("#password").value,
                    image: img,
                    user_name: document.querySelector("#user_name").value,
                    role: document.querySelector("#role").value,
                    id: updateId,
                }).then(() => toastr.success("Cập nhật người dùng thành công"))
                .then(setTimeout(() => window.location = "../", 2000));
            }
        });

    },
};

export default UpdateUser;