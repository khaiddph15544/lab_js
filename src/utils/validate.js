$().ready(() => {
    $("#form-add-cate").validate({
        // onfocusout(element) { $(element).valid(); },
        rules: {
            cate_name: {
                required: true,
            },
        },
        messages: {
            cate_name: {
                required: "Bạn phải nhập tên danh mục",
            },
        },
    });

    $("#form-add-product").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            product_name: {
                required: true,
            },
            image: {
                required: true,
            },
            desc: {
                required: true,
            },
            price: {
                required: true,
            },
            quantity: {
                required: true,
            },
            discount: {
                required: true,
            },
            cate_name: {
                required: true,
            },
        },
        messages: {
            product_name: {
                required: "Bạn phải nhập tên sản phẩm!",
            },
            image: {
                required: "Bạn phải tải lên ảnh sản phẩm!",
            },
            desc: {
                required: "Bạn phải nhập mô tả sản phẩm!",
            },
            price: {
                required: "Bạn phải nhập giá sản phẩm!",
            },
            quantity: {
                required: "Bạn phải nhập số lượng sản phẩm trong kho!",
            },
            discount: {
                required: "Bạn phải nhập giảm giá sản phẩm!",
            },
            cate_name: {
                required: "Bạn phải chọn danh mục của sản phẩm!",
            },
        },
    });

    $("#form-add-user").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            email: {
                required: true,
                email: true,
            },
            image: {
                required: true,
            },
            user_name: {
                required: true,
                minlength: 6,
            },
            role: {
                required: true,
            },
            password: {
                required: true,
                minlength: 8,
            },
            rePassword: {
                required: true,
                equalTo: "#password",
            },
        },
        messages: {
            email: {
                required: "Bạn phải nhập email!",
                email: "Email không đúng định dạng!",
            },
            image: {
                required: "Bạn chưa chọn ảnh đại diện!",
            },
            user_name: {
                required: "Bạn phải nhập tên tài khoản!",
                minlength: "Tên tài khoản phải lớn hơn 6 kí tự!",
            },
            role: {
                required: "Bạn phải chọn vai trò!",
            },
            password: {
                required: "Bạn phải nhập mật khẩu!",
                minlength: "Mật khẩu phải lớn hơn 8 kí tự",
            },
            rePassword: {
                required: "Bạn phải nhập lại mật khẩu!",
                equalTo: "Nhập lại mật khẩu không khớp",
            },
        },
    });
});