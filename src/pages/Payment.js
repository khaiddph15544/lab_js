import toastr from "toastr";
import "toastr/build/toastr.min.css"
import { add } from "../api/order";
import { add as addDetail } from "../api/order_detail";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Payment = {
    async print() {
        const getUser = JSON.parse(localStorage.getItem("account"));
        const dataCart = JSON.parse(localStorage.getItem("cart"));
        let tam_tinh = 0;
        dataCart.forEach((e) => {
            tam_tinh += (e.price - (e.price * e.discount / 100)) * e.quantity;
        });
        return `
            <style>
                 font-family:roboto
            </style>
            ${await Header.print()}
                <div class="grid grid-cols-2 w-11/12 m-auto my-10">
                    <div class="m-auto w-3/4">
                        <h2 class="block border-b border-gray-600 outline-none text-3xl py-3 mt-10">Thông tin thanh toán</h2>
                        <input type="text" id="fullname" name="fullname" placeholder="Nhập họ và tên..." class="block border-b border-gray-600 outline-none py-3 mt-10 text-xl w-full"> 
                        <input type="text" class="outline-none block border-b border-gray-600 outline-none py-3 mt-10 text-xl w-full" value="Email: ${getUser.email}" readonly>
                        <input type="text" id="address" name="address" placeholder="Địa chỉ nhận hàng..."  class="block border-b border-gray-600 outline-none py-3 mt-10 text-xl w-full">
                        <input type="text" id="phone_number" name="phone_number" placeholder="Số điện thoại..." class="block border-b border-gray-600 outline-none py-3 mt-10 text-xl w-full">
                        <select name="choose_payment" id="choose_payment" class="my-5 w-full py-3 mt-10 text-xl">
                            <option value="">Chọn phương thức thanh toán</option> 
                            <option value="1">Thanh toán khi nhận hàng</option>
                        </select>
                    </div>
                    <div class="border-2 border-blue-500">
                        <div class="w-3/4 m-auto">
                            <h2 class="block outline-none text-3xl text-center py-3 mt-10">HÓA ĐƠN</h2>
                            <div class="flex justify-between font-semibold border-b border-gray-600 outline-none py-3 mt-10 text-xl">
                                <span>Sản phẩm</span>
                                <span>Đơn giá</span>
                            </div>
                            ${dataCart.map((e) => `
                                <div class="flex justify-between font-semibold border-b border-gray-600 outline-none py-3 mt-10 text-xl">
                                    <span>${e.product_name}</span>
                                    <div>
                                       <span>x</span> <span> ${e.quantity}</span>
                                    </div>
                                    <span>${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price - (e.price * e.discount / 100))}</span>
                                </div>
                            `).join("")}
                            <div class="flex justify-between font-semibold border-b border-gray-600 outline-none py-3 mt-10 text-xl">
                                <span>Tạm tính</span>
                                <input type="text" id="tam_tinh" value="${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tam_tinh)}" class="outline-none text-right text-red-600 font-semibold" readonly />
                            </div>
                            
                            <div class="flex justify-between font-semibold border-b border-gray-600 outline-none py-3 mt-10 text-xl">
                                <span>Phí vận chuyển (toàn quốc)</span>
                                <span class="">30,000 đ</span>
                            </div>
                            <div class="flex justify-between font-semibold border-b border-gray-600 outline-none py-3 mt-10 text-xl">
                                <span>Tổng tiền</span>
                                <input type="text" id="tong_tien" value="${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tam_tinh + 30000)}" class="outline-none text-red-600 font-semibold text-right" readonly />
                            </div>
                            <button id="btn_payment" class="my-10 border border-white m-auto block px-20 py-2 bg-orange-600 font-semibold text-white">ĐẶT HÀNG</button>
                        </div>
                    </div>
                </div>
            ${Footer.print()}
        `;
    },
    afterRender() {
        Header.afterRender();
        // $("#payment_form").validate({
        //     rules: {
        //         fullname: {
        //             require: true,
        //             minlength: 6
        //         },
        //         address: {
        //             require: true,
        //         },
        //         phone_number: {
        //             require: true,
        //             minlength: 10,
        //             maxlength: 11,
        //             digits: true
        //         },
        //         choose_payment: {
        //             require: true
        //         }
        //     },
        //     messages: {
        //         fullname: {
        //             require: "Bạn phải nhập họ tên!",
        //             minlength: "Họ tên phải lớn hơn 6 kí tự!"
        //         },
        //         address: {
        //             require: "Địa chỉ không được để trống!",
        //         },
        //         phone_number: {
        //             require: "Bạn phải điền số điện thoại!",
        //             minlength: "Số điệnt thoại phải lớn hơn 10 kí tự!",
        //             maxlength: "Số điện thoại phải nhỏ hơn 11 kí tự!",
        //             digits: "Số điện thoại phải là một dãy số lớn hơn 0!"
        //         },
        //         choose_payment: {
        //             require: "Bạn cần chọn phương thức thanh toán!"
        //         }
        //     }
        // })
        const btn_payment = document.querySelector("#btn_payment");
        btn_payment.addEventListener("click", () => {
            const fullname = document.querySelector("#fullname").value
            const address = document.querySelector("#address").value
            const phone_number = document.querySelector("#phone_number").value
            const dataCart = JSON.parse(localStorage.getItem("cart"));
            // let tam_tinh = 0;
            add({
                user_id: localStorage.getItem("account").user_id,
                address: address,
                phone_number: phone_number,
                total_price: document.querySelector("#tong_tien").value.replace(/\D/g,'')
            }).then((res) => {
                dataCart.forEach((e) => {
                    // tam_tinh += (e.price - (e.price * e.discount / 100)) * e.quantity;
                   addDetail({
                       order_id: res.data.id,
                       product_id: e.product_id,
                       price: e.price - (e.price * e.discount / 100),
                       quantity: e.quantity,
                   })
    
                });    
            }).then(() => toastr.success("Đặt hàng thành công!"))
            

        })
    },
};
export default Payment;