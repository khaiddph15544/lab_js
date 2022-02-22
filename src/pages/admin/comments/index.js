import { getAll } from "../../../api/comment";
import { getAll as getAllUser } from "../../../api/user";
import { getAll as getAllProduct } from "../../../api/product";
import NavAdmin from "../../../components/admin/NavAdmin";

const CommentShow = {
  async print() {
    const getComment = await getAll()
    const getProduct = await getAllProduct()
    const getUser = await getAllUser()
    let arrComment = []

    const today = new Date()
    let getNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());
    let getTimeCmt = 0;
    getComment.data.forEach((e) => {
        getProduct.data.forEach((pr) => {
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
        
        if(e.product_id == pr.id){
          arrComment.push({  ...e, getTimeCmt, ...pr })
        }  
      })
      // if (e.product_id == id) {
      //   const timeCmt = (getNow - new Date(e.create_at)) / 1000;
      //   getUser.data.forEach((user) => {
      //     if (user.id == e.user_id) {
      //       arrCommentById.push({ ...e, ...user, getTimeCmt })
      //     }
      //   })
      // }
    })
    console.log(getTimeCmt)
    return `
        ${NavAdmin.print()}
        <div class="flex flex-col w-full mt-10">
        <div class="-my-2 overflow-x-auto max-w-9sm m-auto w-full">
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8 w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Comment quantity
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Newest
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Oldest
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  ${arrComment.map((e) => `
                        <tr>
                        <td class="px-6 py-4">
                          ${e.product_name}
                        </td>
                        <td class="px-4 py-4">
                          4
                        </td>
                        <td class="px-4 py-4">
                          ${e.create_at}
                        </td>
                        <td class="px-4 py-4">
                          ${e.create_at}
                        </td>
                        <td class="px-4 py-4 text-sm font-bold">
                          <a href="/admin/comments/product_id=${e.product_id}" class="text-indigo-600 hover:text-indigo-900">Xem chi tiết</a>
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

  // afterRender() {
  //     // const btndel = document.querySelectorAll("#btndel");
  //     // btndel.forEach((btn) => {
  //     //     const delId = btn.dataset.id;
  //     //     btn.addEventListener("click", () => {
  //     //         const confirm = window.confirm("Bạn có muốn xóa không?");
  //     //         if (confirm) {
  //     //             remove(delId).then(reRender(CateShow, "#main"));
  //     //         }
  //     //     });
  //     // });
  // },
};

export default CommentShow;