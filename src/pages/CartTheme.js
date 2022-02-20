import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { minus, plus, removeItemInCart } from "../utils/cart";

const CartTheme = {
    async print() {
        const getCart = JSON.parse(localStorage.getItem("cart"));
        let tam_tinh = 0;
        getCart.forEach((e) => {
            tam_tinh += ((e.price - (e.price * e.discount / 100)) * e.quantity);
        });
        return `
        ${await Header.print()}
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          #summary {
            background-color: #f6f6f6;
          }
        </style>
      </head>
      <form action="" method="POST">
      <body class="bg-gray-100">
        <div class="container mx-auto mt-10 w-11/12 m-auto">
          <div class="flex shadow-md my-10">
            <div class="w-3/4 bg-white px-10 py-10">
              <div class="flex justify-between border-b pb-8">
                <h1 class="font-semibold text-2xl">Giỏ hàng</h1>
                <h2 class="font-semibold text-2xl">${getCart.length} sản phẩm</h2>
              </div>
              <div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Sản phẩm</h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Số lượng</h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Giá</h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Thành tiền</h3>
              </div>
                ${getCart.map((e) => `
                    <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        <div class="flex w-2/5"> <!-- product -->
                        <div class="w-20">
                            <img class="h-24" src="${e.image}" alt="">
                        </div>
                        <div class="flex flex-col justify-between ml-4 flex-grow">
                            <span class="font-bold text-sm">${e.product_name}</span>
                            <a href="#" data-id="${e.id}" class="btn-remove-item font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                        </div>
                        </div>
                        <div class="flex justify-center w-1/5">
                        
                        <button data-id="${e.id}" class="minus">-</button>
                          <input class="mx-2 border text-center w-8" type="text" value="${e.quantity}">
                        <button data-id="${e.id}" class="plus">+</button>
                        
                        </div>
                        <span class="text-center w-1/5 font-semibold text-sm">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price - (e.price * e.discount / 100))}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format((e.price - (e.price * e.discount / 100)) * e.quantity)}</span>
                    </div>
              `).join("")}
      
              <a href="#" class="flex font-semibold text-indigo-600 text-sm mt-10">
            
                <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                Continue Shopping
              </a>
            </div>
      
              <div id="summary" class="w-1/4 px-8 py-10">
                <h1 class="font-semibold text-2xl border-b pb-8">Đơn hàng</h1>
                <div class="flex justify-between mt-10 mb-5">
                  <span class="font-semibold text-sm uppercase">Tạm tính</span>
                  <span class="font-semibold text-sm">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tam_tinh)}</span>
                </div>
                <div>
                  <label class="font-medium inline-block mb-3 text-sm uppercase">Phí giao hàng</label>
                  <select class="block p-2 text-gray-600 w-full text-sm">
                    <option>Phí ship - 30,000 đ</option>
                  </select>
                </div>
                <div class="py-10">
                  <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Mã giảm giá</label>
                  <input type="text" id="promo" placeholder="Nhập mà giảm giá..." class="p-2 text-sm w-full">
                </div>
                <button type="button" class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                <div class="border-t mt-8">
                  <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Tổng tiền</span>
                    <span>${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tam_tinh + 30000)}</span>
                  </div>
                  <div class="w-full">
                      <a href="payment" class="text-center block bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Thanh toán </a>
                  </div>
                 </div>
              </div>
            </form>
          </div>
        </div>
      </body>
        ${Footer.print()}
      `;
    },

    afterRender() {
        Header.afterRender();
        const btnPlus = document.querySelectorAll(".plus");
        const btnMinus = document.querySelectorAll(".minus");
        const btnRemoveItemInCart = document.querySelectorAll(".btn-remove-item");
        btnPlus.forEach((btn) => {
            const currentId = btn.dataset.id;
            btn.addEventListener("click", () => {
                plus(currentId);
            });
        });
        btnMinus.forEach((btn) => {
            const currentId = btn.dataset.id;
            btn.addEventListener("click", () => {
                minus(currentId);
            });
        });

        btnRemoveItemInCart.forEach((btn) => {
            const currentId = btn.dataset.id;
            btn.addEventListener("click", () => {
                removeItemInCart(currentId);
                toastr.success("Đã xóa sản phẩm");
            });
        });
    },
};
export default CartTheme;