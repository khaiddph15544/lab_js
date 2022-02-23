import Footer from "../components/Footer"
import Header from "../components/Header"

const Order_manage = {
    async print(){
        return `
            ${await Header.print()}
                <h1 class="font-bold text-3xl text-center my-10">Thông tin đơn hàng đã đặt</h1>
                <div class="mt-20 grid grid-cols-4 px-40 text-xl m-25 cursor-pointer my-8 border">
                    <a href="" class="border-x text-semibold py-1 text-white bg-red-500 text-center">Chờ xác nhận</a> 
                    <a href="" class="border-r text-semibold py-1 text-center">Đang giao</a> 
                    <a href="" class="border-r text-semibold py-1 text-center">Đã giao</a>
                    <a href="" class="border-r text-semibold py-1 text-center">Đơn đã hủy</a>
                </div>
            ${Footer.print()}
        `
    }
}
export default Order_manage