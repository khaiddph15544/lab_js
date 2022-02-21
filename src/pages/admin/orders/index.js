import { getAll } from "../../../api/order";
import NavAdmin from "../../../components/admin/NavAdmin";

const OrderShow = {
    async print() {
        const { data } = await getAll();
        return `
        ${NavAdmin.print()}
        <div class="flex flex-col w-full mt-24">
        <div class="-my-2 overflow-x-auto max-w-9sm m-auto w-full">
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8 w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Order id
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Buyer name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Phone number
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
                          ${e.buyer_name}
                        </td>
                        <td class="px-4 py-4">
                          ${e.address}
                        </td>
                        <td class="px-4 py-4">
                          ${e.phone_number}
                        </td>
                        <td class="px-4 py-4 text-sm font-bold">
                          <a href="/admin/order_detail/id=${e.id}" id="btnDelele" class="text-indigo-600 hover:text-indigo-900"><button data-id=${e.id} id="btn_detail">Xem thông tin</button></a>
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
};

export default OrderShow;