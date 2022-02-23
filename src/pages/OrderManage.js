import Footer from "../components/Footer"
import Header from "../components/Header"
import { getAll } from "../api/order"
import { getAll as getAllOd } from "../api/order_detail"
import { getAll as getAllPr } from "../api/product"
const Order_manage = {
    async print() {
        const { data } = await getAll()
        const getOrderDetail = await getAllOd()
        const getPr = await getAllPr()
        const arrOrderById = []
        data.forEach((e) => {
            if (e.user_id == JSON.parse(localStorage.getItem("account")).id) {
                arrOrderById.push(e)
            }
        })

        const arrOrderWait = []
        arrOrderById.forEach(e => {
            if (e.status == 0) {
                arrOrderWait.push(e)
            }
        })
        const arrOd = []

        return `
            ${await Header.print()}
                <h1 class="font-bold text-3xl text-center my-10">Thông tin đơn hàng đã đặt</h1>
                <div class="mt-20 grid grid-cols-4 px-40 text-xl m-25 cursor-pointer my-8 border">
                    <a href="" class="border-x text-semibold py-1 text-white bg-red-500 text-center">Chờ xác nhận</a> 
                    <a href="" class="border-r text-semibold py-1 text-center">Đang giao</a> 
                    <a href="" class="border-r text-semibold py-1 text-center">Đã giao</a>
                    <a href="" class="border-r text-semibold py-1 text-center">Đơn đã hủy</a>
                </div>
                    ${arrOrderWait.map(e => `
                    <div>
                        <h3>Mã đơn hàng: ${e.id}</h3>
                        <div>
                            <img class="w-96 px-24" src="" />
                            <div>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div>
                        
                        </div>
                        <a href="">Hủy đơn</a>
                    </div>
                `).join("")}
            ${Footer.print()}
        `
    }
}
export default Order_manage