import axios from "axios";
import { getAll, remove } from "../../../api/product";
import NavAdmin from "../../../components/admin/NavAdmin";
import reRender from "../../../utils/reRender";

const ProductShow = {
    async print() {
        const { data } = await getAll();
        return `
        ${NavAdmin.print()}
        <a href="/admin/products/add" class="border border-grey-600 m-8 px-5 py-1 inline-block">Thêm mới</a>
        <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto max-w-9sm m-auto">
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Discription
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  ${data.map((e) => `
                        <tr>
                        <td class="px-6 py-4">
                          ${e.id}
                        </td>
                        <td class="px-4 py-4">
                          ${e.product_name}
                        </td>
                        <td class="px-4 py-4 w-1/12">
                          <img src="${e.image}" />
                        </td>
                        <td class="px-4 py-4">
                          ${(e.price)} đ
                        </td>
                        <td class="px-4 py-4">
                          ${e.quantity}
                        </td>
                        <td class="px-4 py-4">
                          ${e.discount} %
                        </td>
                        <td class="px-4 py-4">
                          ${e.desc}
                        </td>
                        <td class="px-4 py-4 text-sm font-bold">
                          <a href="/admin/products/update/id=${e.id}" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                          <span class="text-indigo-600 hover:text-indigo-900">|</span>
                          <a href="javascript:void(0)" id="btnDelele" class="text-indigo-600 hover:text-indigo-900"><button data-id=${e.id} id="btndel">Xóa</button></a>
                        </td>
                      </tr>
                  `).join("")}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        `;
    },

    afterRender() {
        const btndel = document.querySelectorAll("#btndel");
        btndel.forEach((btn) => {
            const delId = btn.dataset.id;
            btn.addEventListener("click", () => {
                const confirm = window.confirm("Bạn có muốn xóa không?");
                if (confirm) {
                    remove(delId).then(reRender(ProductShow, "#main"));
                }
            });
        });
    },
};

export default ProductShow;