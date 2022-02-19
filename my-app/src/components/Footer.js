const Footer = {
    print() {
        return `
            <div class="bg-zinc-700">
                <div class="w-11/12 m-auto">
                    <div class="text-white flex flex-col justify-center items-center py-10">
                        <h3 class="text-center my-3 text-bold text-2xl">Tham gia cùng chúng tôi</h3>
                        <input type="text" class="text-black w-1/3 m-auto py-1 indent-2" placeholder="Nhập email tại đây..."/>
                        <button class="border border-black w-1/3 m-auto my-3 py-1 bg-black">ĐĂNG KÝ</button>
                    </div>
                    <div class="text-white grid grid-cols-4">
                        <div class="w-10/12">
                            <h4 class="font-bold text-xl text-white">Liên hệ</h4>
                            <ul>
                                <li class="mt-5">CÔNG TY CỔ PHẦN TRỰC TUYẾN GERME</li>
                                <li class="mt-5">VPGD: 80/47 Xuân phương - Nam Từ Liêm - Hà Nội</li>
                                <li class="mt-5">Hotline: 1800 6005</li>
                                <li class="mt-5">youthwatchs@gmail.com</li>
                            </ul>
                        </div>
                        <div class="w-10/12">
                            <h4 class="font-bold text-xl text-white">Hỗ trợ</h4>
                            <ol>
                                <li class="mt-5"><a href="">1: Chính sách bảo hành</a></li>
                                <li class="mt-5"><a href="">2: Chính sách đổi trả</a></li>
                                <li class="mt-5"><a href="">3: Chính sách bảo mật</a></li>
                                <li class="mt-5"><a href="">4: Chính sách vận chuyển</a></li>
                                <li class="mt-5"><a href="">5: Chính sách thanh toán</a></li>
                            </ol>
                        </div>
                        <div class="w-10/12">
                            <h4 class="font-bold text-xl text-white">Về chúng tôi</h4>
                            <ul>
                                <li class="mt-5">
                                Với hơn 20 cửa hàng trải dài cả nước, Youth hy vọng sẽ mang đến sự phục vụ chu đáo cho tất cả các khách hàng. Hệ thống cửa hàng thời trang Youth luôn luôn lắng nghe những ý kiến đóng góp từ các khách hàng với mục tiêu đẩy mạnh dịch vụ, mở rộng hệ thống và làm hài lòng những vị khách đến trên toàn quốc.</li>
                            </ul>
                        </div>
                        <div class="w-10/12 mb-10">
                            <h4 class="font-bold text-xl text-white">Theo dõi chúng tôi</h4>
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FYOUTH-100990415587834&tabs=timeline&width=340&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="300" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};

export default Footer;