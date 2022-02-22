import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { add, getAll } from "../api/comment";
import { getAll as getAllUser, getOne as getOneUser } from "../api/user";
import { getAll as getAllProduct} from "../api/product";
import { getOne } from "../api/product";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { addToCart } from "../utils/cart";
import reRender from "../utils/reRender";

const ProductDetail = {
  async print(id) {
    const { data } = await getOne(id);
    const getComment = await getAll()
    const getUser = await getAllUser()
    let arrCommentById = []
    const today = new Date()
    let getNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());
    let getTimeCmt = 0;

    getComment.data.forEach((e) => {
      if (e.product_id == id) {
        const timeCmt = (getNow - new Date(e.create_at)) / 1000;
        if (timeCmt < 60) {
          getTimeCmt = "Vừa xong"
        } 
        else if (timeCmt >= 60 && timeCmt <= 60 * 60) {
          getTimeCmt = Math.floor(timeCmt / 60) + " phút trước"
        } 
        else if (timeCmt >= 60 * 60 && timeCmt <= 60 * 60 * 24) {
          getTimeCmt = Math.floor(timeCmt / 3600) + " giờ trước"
        }
        else if (timeCmt >= 60 * 60 * 24 && timeCmt <= 60 * 60 * 24 * 30) {
          getTimeCmt = Math.floor(timeCmt / (60 * 60 * 24)) + " ngày trước"
        }
        else if (timeCmt >= 60 * 60 * 24 * 30 && timeCmt <= 60 * 60 * 24 * 30 * 12) {
          getTimeCmt = Math.floor(timeCmt / (60 * 60 * 24 * 30)) + " tháng trước"
        }
        else {
          getTimeCmt = Math.floor(timeCmt / (60 * 60 * 24 * 30 * 12)) + " năm trước"
        }
        getUser.data.forEach((user) => {
          if (user.id == e.user_id) {
            arrCommentById.push({ ...e, ...user, getTimeCmt })
          }
        })
      }
    })

    const getProduct = await getAllProduct()
    let arrPrInvolve = []
    getProduct.data.forEach((e) => {
      if(e.cate_id == data.cate_id){
        arrPrInvolve.push(e)
      }
    })
    arrPrInvolve = arrPrInvolve.filter((item) => item.id != id)

    return `
            ${await Header.print()}
            <section class="text-gray-700 body-font overflow-hidden bg-white">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="${data.image}">
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">${data.product_name}</h1>
        <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-2 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-2 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p class="leading-relaxed">${data.desc}</p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div class="flex">
            <span class="mr-3">Color</span>
            <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div class="flex ml-6 items-center">
            <span class="mr-3">Số lượng</span>
            <input type="number" id="quantity" value="1" class="border border-black" />
          </div>
        </div>
        <div class="flex">
        <span class="title-font text-dashed font-semibold text-2xl text-red-900">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(data.price - (data.price * data.discount / 100))}</span>
          <span class="title-font ml-10 font-medium text-lg  mt-1 line-through text-gray-900">${data.discount > 0 ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(data.price) : ""}</span>
          <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" id="addtocart">Thêm vào giỏ hàng</button>
          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    
    <div class="flex mx-auto items-center justify-center shadow-lg mt-24 mx-8 mb-4 ">
        <div class="w-full flex flex-wrap -mx-3 mb-6">
          <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg font-bold">Thêm bình luận mới</h2>
          <div class="w-full md:w-full px-3 mb-2 mt-2">
             <textarea id="comment_content" class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-40 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Nhập nội dung...' required></textarea>
          </div>
          <div class="w-full md:w-full flex items-start md:w-full px-3">
             <div class="flex items-start w-full text-gray-700 px-2 mr-auto">
             </div>
             <div class="-mr-1">
                <input type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100 cursor-pointer" id="btn_comment" name="btn_comment" value='Gửi bình luận'>
             </div>
        </div>
    </div>

    

 </div>
 <div class="main_content_comment shadow-lg mt-24 mx-8 mb-4 ">
      <h2 class="font-bold text-xl">Bình luận (${arrCommentById.length})</h2>
      ${arrCommentById.reverse().map((cmt) => `
          <div class="flex mt-5 ml-10 block border-b-2 border-zinc-200 py-5">
          <div>
              <img src="${cmt.image}" class="w-14" />
          </div>
          <div class="ml-5">
              <span class="font-bold">${cmt.user_name}</span> <span class="">- ${cmt.getTimeCmt}</span>
              <span class="block mt-5 font-medium">${cmt.content}</span>
          </div>
        </div>
      `).join("")}
    
 </div>

  </div>
  <div class="w-full m-auto ml-8">
                <h3 class="px-5 font-bold text-emerald-700 text-3xl my-10">Sản phẩm liên quan</h3>
                <div class="grid grid-cols-4">
                ${arrPrInvolve.map((e) => `
                <div class="p-5">
                    <a href="/products/id=${e.id}">
                        <img src = "${e.image}">
                        <p class="font-bold text-emerald-700 text-lg">${e.product_name}</p>
                    </a>
                    <span class=" font-bold mt-5 inline-block text-lg text-orange-800">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price - (e.price * e.discount / 100))}</span>
                    <span class="line-through ml-5">${e.discount > 0 ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(e.price) : ""}</span>
                </div>
            `).join("")}
                </div>
            </div>
</section>


            ${Footer.print()}
        `;
  },
  afterRender(id) {
    Header.afterRender();
    const addtocart = document.querySelector("#addtocart");
    const btn_comment = document.querySelector("#btn_comment")
    addtocart.addEventListener("click", async () => {
      const { data } = await getOne(id);
      addToCart({ ...data, quantity: Number(document.querySelector("#quantity").value) });
      toastr.success("Đã thêm sản phẩm vào giỏ hàng");
      reRender(Header, "#main_header");
    });
    if (btn_comment) {
      const today = new Date()
      btn_comment.addEventListener("click", function () {
        if (localStorage.getItem("account")) {
          const commentContent = document.querySelector("#comment_content").value;
          add({
            content: commentContent,
            create_at: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), 0),
            user_id: JSON.parse(localStorage.getItem("account")).id,
            product_id: id
          }).then(() => toastr.success("Gửi bình luận thành công"))
            .then(() => window.location = `/products/id=${id}`)
        } else {
          window.location = "/signin"
        }
      })
    }

  },
};
export default ProductDetail;