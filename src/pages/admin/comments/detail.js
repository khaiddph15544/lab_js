import CommentShow from ".";
import { getAll, remove } from "../../../api/comment";
import { getAll as getAllUser } from "../../../api/user";
import NavAdmin from "../../../components/admin/NavAdmin";

const CommentDetail = {
    async print(id) {
        const { data } = await getAll()
        const getUser = await getAllUser()
        let arrCommentDetail = []

        const today = new Date()
        let getNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());
        let getTimeCmt = 0;
        data.forEach((e) => {
            if (e.product_id == id) {
                getUser.data.forEach((u) => {
                    if (u.id == e.user_id) {
                        arrCommentDetail.push({ ...e, ...u })
                    }
                })
           

        //     const timeCmt = (getNow - new Date(e.create_at)) / 1000;
        // if (timeCmt < 60) {
        //   getTimeCmt = "Vừa xong"
        // } 
        // else if (timeCmt >= 60 && timeCmt <= 60 * 60) {
        //   getTimeCmt = Math.floor(timeCmt / 60) + " phút trước"
        // } 
        // else if (timeCmt >= 60 * 60 && timeCmt <= 60 * 60 * 24) {
        //   getTimeCmt = Math.floor(timeCmt / 3600) + " giờ trước"
        // }
        // else if (timeCmt >= 60 * 60 * 24 && timeCmt <= 60 * 60 * 24 * 30) {
        //   getTimeCmt = Math.floor(timeCmt / (60 * 60 * 24)) + " ngày trước"
        // }
        // else if (timeCmt >= 60 * 60 * 24 * 30 && timeCmt <= 60 * 60 * 24 * 30 * 12) {
        //   getTimeCmt = Math.floor(timeCmt / (60 * 60 * 24 * 30)) + " tháng trước"
        // }
        // else {
        //   getTimeCmt = Math.floor(timeCmt / (60 * 60 * 24 * 30 * 12)) + " năm trước"
        // }

        // if(e.product_id == pr.id){
        //   arrComment.push({  ...e, getTimeCmt, ...pr })
        // }  

        // if (e.product_id == id) {
        //   const timeCmt = (getNow - new Date(e.create_at)) / 1000;
        //   getUser.data.forEach((user) => {
        //     if (user.id == e.user_id) {
        //       arrCommentById.push({ ...e, ...user, getTimeCmt })
        //     }
        //   })
        // }
    }
})
        return `
        ${NavAdmin.print()}
        <a href="/admin/categories/add" class="border border-grey-600 m-8 px-5 py-1 inline-block">Thêm mới</a>
        <div class="flex flex-col w-full">
        <div class="-my-2 overflow-x-auto max-w-9sm m-auto w-full">
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8 w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Nội dung
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Ngày bình luận
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Người bình luận
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  ${arrCommentDetail.map((e) => `
                        <tr>
                        <td class="px-6 py-4">
                          ${e.content}
                        </td>
                        <td class="px-4 py-4">
                          ${e.create_at}
                        </td>
                        <td class="px-4 py-4">
                          ${e.user_name}
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

    // afterRender(id) {
    //     const btndel = document.querySelectorAll("#btndel");
    //     btndel.forEach((btn) => {
    //         const delId = btn.dataset.id;
            
    //         btn.addEventListener("click", () => {
    //             const confirm = window.confirm("Bạn có muốn xóa không?");
    //             if (confirm) {
    //                 remove(delId).then(window.location = `/admin/comments/product_id=${id}`);
    //             }
    //         });
    //     });
    // },
};

export default CommentDetail;