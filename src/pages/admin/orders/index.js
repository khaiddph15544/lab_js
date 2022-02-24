import { getAll, getOne, update } from "../../../api/order";
import NavAdmin from "../../../components/admin/NavAdmin";
import toastr from "toastr";
import "toastr/build/toastr.min.css"
import reRender from "../../../utils/reRender";

const OrderShow = {
  async print() {
    const { data } = await getAll();
    let received = []
    let delivering = []
    let confirming = []
    let canceled = []
    data.forEach(element => {
      if (element.status == 0) {
        confirming.push(element)
      } else if (element.status == 1) {
        delivering.push(element)
      } else if (element.status == 2) {
        received.push(element)
      } else if (element.status == 3){
        canceled.push(element)
      }
    });
    console.log(delivering)
    return `
        ${NavAdmin.print()}
        <div class="mt-20 grid grid-cols-4 px-40 text-xl m-25 cursor-pointer my-8 border">
            <p id="received" class="title_action border-x text-semibold py-1 text-center">Đã hoàn tất (${received.length})</p> 
            <p id="delivering" class="title_action border-r text-semibold py-1 text-center">Đang giao hàng (${delivering.length})</p> 
            <p id="confirming" class="title_action border-r text-semibold py-1 text-center">Chờ xác nhận (${confirming.length})</p>
            <p id="canceled" class="title_action border-r text-semibold py-1 text-center">Đã hủy (${canceled.length})</p>
        </div>
        <div class="flex flex-col w-full mt-10">
        <div class="-my-2 overflow-x-auto max-w-9sm m-auto w-full">
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8 w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="table_show received min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Order id
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Create at
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
                      Deliveried at
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class=" bg-white divide-y divide-gray-200">
                    ${received.map((e) => `
                    <tr>
                        <td class="px-6 py-4">
                          ${e.id}
                        </td>
                        <td class="px-6 py-4">
                          ${e.create_at}
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
                        <td class="px-4 py-4">
                          ${e.update_at}
                        </td>
                        <td class="px-4 py-4 text-sm font-bold">
                          <a href="/admin/order_detail/id=${e.id}" id="btnDelele" class="text-indigo-600 hover:text-indigo-900"><button data-id=${e.id} id="btn_detail">Xem thông tin</button></a>
                        </td>
                      </tr>
                  `).join("")}
                  
                </tbody>
              </table>


              <table class="table_show delivering min-w-full divide-y divide-gray-200">
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
                    ${delivering.map((e) => `
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
                          <a href="/admin/order_detail/id=${e.id}" class="text-indigo-600 hover:text-indigo-900"><button data-id=${e.id} id="btn_detail">Xem thông tin</button></a>
                          <span>|</span>
                          <a href="javascript:void(0)" class="text-indigo-600 hover:text-indigo-900"><button data-id=${e.id} class="btnReceived">Đã nhận hàng</button></a>
                          </td>
                      </tr>
                  `).join("")}
                  
                </tbody>
              </table>


              <table class="table_show confirming min-w-full divide-y divide-gray-200">
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
                      Total price
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Create at
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${confirming.map((e) => `
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
                          <td class="px-4 py-4">
                          ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.total_price)}
                        </td>
                        <td class="px-4 py-4">
                          ${e.create_at}
                        </td>
                        <td class="px-4 py-4 text-sm font-bold">
                          <a href="/admin/order_detail/id=${e.id}" id="btnDelele" class="text-indigo-600 hover:text-indigo-900"><button data-id=${e.id} id="btn_detail">Xem chi tiết</button></a>
                          <span> | </span>
                          <a href="javascript:void(0)" id="btnConfirm" class="text-indigo-600 hover:text-indigo-900"><button class="btnConfirm" data-id=${e.id}>Xác nhận</button></a>
                          <span> | </span>
                          <a href="javascript:void(0)" id="btnDelele" class="text-indigo-600 hover:text-indigo-900"><button data-id=${e.id} class="btnCanceled">Hủy đơn</button></a>
                        </td>
                      </tr>
                  `).join("")}
                  
                </tbody>
              </table>

              <table class="table_show canceled min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Order id
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Create at
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
                      Canceled at
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class=" bg-white divide-y divide-gray-200">
                    ${canceled.map((e) => `
                    <tr>
                        <td class="px-6 py-4">
                          ${e.id}
                        </td>
                        <td class="px-6 py-4">
                          ${e.create_at}
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
                        <td class="px-4 py-4">
                          ${e.update_at}
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
  afterRender() {
    const table_show = document.querySelectorAll(".table_show")
    const title_action = document.querySelectorAll(".title_action")
    document.querySelector("#received").style.color = "white"
    document.querySelector("#received").style.background = "red"
    table_show.forEach(e => {
      e.style.visibility = "hidden"
    })
    document.querySelector(".received").style.visibility = "visible"

    const received = document.querySelector("#received")
    received.addEventListener("click", () => {
      received.classList.add("bg-red-500")
      table_show.forEach(e => {
        e.style.visibility = "hidden"
        e.style.position = "absolute"
      })
      title_action.forEach(e => {
        e.style.background = "white"
        e.style.color = "black"
      })
      document.querySelector(".received").style.visibility = "visible"
      document.querySelector("#received").style.color = "white"
      document.querySelector("#received").style.background = "red"
      document.querySelector(".received").style.position = "relative"
    })
    const delivering = document.querySelector("#delivering")
    delivering.addEventListener("click", () => {
      delivering.classList.add("bg-red-500")
      table_show.forEach(e => {
        e.style.visibility = "hidden"
        e.style.position = "absolute"
      })
      title_action.forEach(e => {
        e.style.background = "white"
        e.style.color = "black"
      })
      document.querySelector(".delivering").style.visibility = "visible"
      document.querySelector("#delivering").style.color = "white"
      document.querySelector("#delivering").style.background = "red"
      document.querySelector(".delivering").style.position = "relative"
    })

    const confirming = document.querySelector("#confirming")
    confirming.addEventListener("click", () => {
      table_show.forEach(e => {
        e.style.visibility = "hidden"
        e.style.position = "absolute"
      })
      title_action.forEach(e => {
        e.style.background = "white"
        e.style.color = "black"
      })
      document.querySelector(".confirming").style.visibility = "visible"
      document.querySelector("#confirming").style.color = "white"
      document.querySelector("#confirming").style.background = "red"
      document.querySelector(".confirming").style.position = "relative"
    })

    const canceled = document.querySelector("#canceled")
    canceled.addEventListener("click", () => {
      table_show.forEach(e => {
        e.style.visibility = "hidden"
        e.style.position = "absolute"
      })
      title_action.forEach(e => {
        e.style.background = "white"
        e.style.color = "black"
      })
      canceled.classList.add("bg-red-500")
      document.querySelector(".canceled").style.visibility = "visible"
      document.querySelector("#canceled").style.color = "white"
      document.querySelector("#canceled").style.background = "red"
      document.querySelector(".canceled").style.position = "relative"
    })

    const btnConfirm = document.querySelectorAll(".btnConfirm")
    var newDate = new Date();
    var now = newDate.toLocaleString()
    btnConfirm.forEach(btn => {
      const dataId = btn.dataset.id
      btn.addEventListener("click", async () => {
        const {data} = await getOne(dataId)
        update({
          user_id: data.user_id,
          buyer_name: data.buyer_name,
          address: data.address,
          phone_number: data.phone_number,
          total_price: data.total_price,
          status: 1,
          create_at: data.create_at,
          update_at: now,
          id: dataId
        }).then(() => toastr.success("Cập nhật trạng thái thành công"))
        .then(() => reRender(OrderShow, "#main"))
      })
    })

    //Hủy đơn
    const btnCanceled = document.querySelectorAll(".btnCanceled")
    btnCanceled.forEach(btn => {
      const dataId = btn.dataset.id
      btn.addEventListener("click", async () => {
        const {data} = await getOne(dataId)
        update({
          user_id: data.user_id,
          buyer_name: data.buyer_name,
          address: data.address,
          phone_number: data.phone_number,
          total_price: data.total_price,
          status: 3,
          create_at: data.create_at,
          update_at: now,
          id: dataId
        }).then(() => toastr.success("Hủy đơn hàng thành công"))
        .then(() => reRender(OrderShow, "#main"))
      })
    })

    const btnReceived = document.querySelectorAll(".btnReceived")
    btnReceived.forEach(btn => {
      const dataId = btn.dataset.id
      btn.addEventListener("click", async () => {
        const {data} = await getOne(dataId)
        update({
          user_id: data.user_id,
          buyer_name: data.buyer_name,
          address: data.address,
          phone_number: data.phone_number,
          total_price: data.total_price,
          status: 2,
          update_at: data.create_at,
          update_at: now,
          id: dataId
        }).then(() => toastr.success("Đơn hàng đã xác nhận giao thành công"))
        .then(() => reRender(OrderShow, "#main"))
      })
    })
  }
};

export default OrderShow;