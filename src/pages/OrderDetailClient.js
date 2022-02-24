
import { getAll } from "../api/order_detail";
import { getAll as getPr } from "../api/product";
import Footer from "../components/Footer";
import Header from "../components/Header";

const OrderDetailClient = {
    async print(id) {
        const { data } = await getAll();
        const getProduct = await getPr()

        let tongtien = 0;
        let arrPr = []
        data.forEach((e) => {
            if (e.order_id == id) {
                const amount = e.price * e.quantity;
                tongtien += amount
                getProduct.data.forEach((pr) => {
                    if (e.product_id == pr.id) {
                        arrPr.push({ ...pr, ...e })
                    }
                })
            }

        })
        return `
        ${await Header.print()}

        <div class="flex flex-col w-full mt-10">
        <div class="-my-2 overflow-x-auto max-w-9sm m-auto w-full">
        <a href="javascript:void(0)" id="prepage" class="border border-grey-600 m-8 px-5 py-1 inline-block">Quay lại</a>
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8 w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Product_id
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  ${arrPr.map((e) => `
                        <tr>
                        <td class="px-6 py-4">
                          ${e.product_id}
                        </td>
                        <td class="px-4 py-4">
                        <img src="${e.image}" class="w-40"/>
                        </td>
                        <td class="px-4 py-4">
                          ${e.product_name}
                        </td>
                        <td class="px-4 py-4">
                          ${e.quantity}
                        </td>
                        <td class="px-4 py-4">
                          ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price)}
                        </td>
                        <td class="px-4 py-4">
                          ${Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price * e.quantity)}
                        </td>
                      </tr>
                  `).join("")}
                </tbody>
              </table>
              
            </div>
            <h2 class="mb-20 text-right mt-8 font-bold text-2xl">Tổng tiền: ${Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tongtien + 30000)}</h2>
          </div>
        </div>
      </div>
      ${Footer.print()}
        `;
    },
    afterRender(){
      Header.afterRender()
      const prepage = document.querySelector("#prepage")
      prepage.addEventListener("click", () => {
          window.history.go(-1)
      })
    }
};

export default OrderDetailClient;