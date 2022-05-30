$(function () {
    // 登录和注册切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 引入form
    const form = layui.form;
    const layer = layui.layer;
    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: value => {
            const pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) return "两次密码不一致";
        },
    });

    // 注册功能
    $('#form_reg').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 发出ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name = username]').val(),
                password: $('#form_reg [name = password]').val(),
            },
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功！');
                // 通过调用登录按钮点击事件实现跳转
                $("#link_login").click();
            },
        });
    })

    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('登录成功！');
                // 存入token至sessionStorage
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    })
})