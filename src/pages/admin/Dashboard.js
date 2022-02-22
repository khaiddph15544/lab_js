import { getAll } from "../../api/user";
import NavAdmin from "../../components/admin/NavAdmin";

const Dashboard = {
    async print() {
        const {data} = await getAll()
        const arrRevert = data.reverse()
        const arrUser = []
        let stt = 1;
        for (let index = 0; index < 4; index++) {
          arrUser.push(arrRevert[index])
        }
        console.log(arrUser)
        return `
        ${NavAdmin.print()}
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <div class="flex flex-col w-full">
        <h2 class="ml-10 my-10 font-bold text-2xl">Thành viên mới</h2>
        <div class="-my-2 overflow-x-auto max-w-9sm m-auto w-full">
          <div class="py-2 align-middle inline-block sm:px-6 lg:px-8 w-full">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Stt
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      User name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${arrUser.map((e) => `
                        <tr>
                        <td class="px-6 py-4">
                          ${stt}
                        </td>
                        <td class="px-4 py-4">
                          ${e.user_name}
                        </td>
                        <td class="px-4 py-4">
                          ${e.email}
                        </td>
                        <td class="px-4 py-4">
                          ${e.role == 0 ? "Người dùng" : "Quản trị viên"}
                        </td>
                      </tr>
                      <span style="display:none">${stt++}</span>
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

export default Dashboard;