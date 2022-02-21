import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { signup } from '../api/user';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Signup = {
  print() {
    return `
        ${Header.print()}
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ĐĂNG KÝ
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          hoặc
          <a href="/signin" class="font-medium text-indigo-600 hover:text-indigo-500">
            đã có tài khoản
          </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST" id="signup-form">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="">Địa chỉ Email</label>
            <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2">
          </div>
          <div class="pt-5">
            <label for="user_name" class="">Tên tài khoản</label>
            <input id="user_name" type="text" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2">
          </div>
          <div class="pt-5">
            <label for="password" class="">Mật khẩu</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2">
          </div>
          <div class="pt-5">
            <label for="re_password" class="">Nhập lại mật khẩu</label>
            <input id="re_password" name="password" type="password" autocomplete="current-password" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2">
          </div>
        </div>
  
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  </div>
  ${Footer.print()}
  `;
  },
  afterRender() {
    const signupForm = document.querySelector('#signup-form');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        signup({
          id,
          email: document.querySelector('#email').value,
          user_name: document.querySelector('#user_name').value,
          password: document.querySelector('#password').value,
          role: 0,
        });
        toastr.success('Đăng ký thành công!');
        setTimeout(() => {
          window.location = '/signin';
        }, 3000);
      } catch (error) {
        toastr.error('Có lỗi xảy ra, Vui lòng thử lại!');
      }
    });
  },
};

export default Signup;
