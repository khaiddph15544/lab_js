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
            <form action="" method="POST" id="payment_form"  />
                <div class="grid grid-cols-2 w-11/12 m-auto my-10">
                    <div class="m-auto w-3/4">
                        <h2 class="block border-b border-gray-600 outline-none text-3xl py-3">Thông tin thanh toán</h2>
                        <input type="text" id="fullname" name="fullname" placeholder="Nhập họ và tên..." class="indent-2 block border-b border-gray-600 outline-none py-3 mt-10 text-xl w-full"> 
                        <input type="text" class="outline-none block border-b border-gray-600 outline-none indent-2 py-3 mt-10 text-xl w-full" value="Email: ${getUser.email}" readonly>
                        <input type="text" id="address" name="address" placeholder="Địa chỉ nhận hàng..."  class="indent-2 block border-b border-gray-600 outline-none py-3 mt-10 text-xl w-full">
                        <input type="text" id="phone_number" name="phone_number" placeholder="Số điện thoại..." class="indent-2 block border-b border-gray-600 outline-none py-3 mt-10 text-xl w-full">
                        <select name="payment_method" id="choose_payment" class="my-2 w-full py-3 mt-10 text-xl border-b border-gray-600 outline-none">
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
        $("#payment_form").validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 6
                },
                address: {
                    required: true,
                },
                phone_number: {
                    required: true,
                    minlength: 10,
                    maxlength: 11,
                    digits: true
                },
                payment_method: {
                    required: true,
                },
            },
            messages: {
                fullname: {
                    required: "Bạn phải nhập họ và tên!",
                    minlength: "Họ tên phải lớn hơn 6 kí tự!" 
                },
                address: {
                    required: "Bạn phải điền địa chỉ nhận hàng",
                },
                phone_number: {
                    required: "Bạn phải nhập số điện thoại!",
                    minlength: "Số điện thoại phải lớn hơn 10 kí tự!",
                    maxlength: "Số điện thoại phải nhỏ hơn 11 kí tự!",
                    digits: "Số điện thoại phải là một dãy số lớn hơn 0!"
                },
                payment_method: {
                    required: "Bạn chưa chọn phương thức thanh toán!",
                },
            },
            submitHandler() {
                const fullname = document.querySelector("#fullname").value
                const address = document.querySelector("#address").value
                const phone_number = document.querySelector("#phone_number").value
                const dataCart = JSON.parse(localStorage.getItem("cart"));
                // let tam_tinh = 0;
                var newDate = new Date();
                var now = newDate.toLocaleString()
                add({
                    user_id: JSON.parse(localStorage.getItem("account")).id,
                    buyer_name: fullname,
                    address: address,
                    phone_number: phone_number,
                    total_price: document.querySelector("#tong_tien").value.replace(/\D/g, ''),
                    status: 0,
                    create_at: now,
                    update_at: now
                }).then((res) => {
                    dataCart.forEach((e) => {
                        // tam_tinh += (e.price - (e.price * e.discount / 100)) * e.quantity;
                        addDetail({
                            product_id: e.id,
                            order_id: res.data.id,
                            price: e.price - (e.price * e.discount / 100),
                            quantity: e.quantity,
                        })
                    });
                }).then(() => toastr.success("Đặt hàng thành công!"))
                    .then(setTimeout(() => window.location = "/", 2000))

            }
        })

    },
};
export default Payment;