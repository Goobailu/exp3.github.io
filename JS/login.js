// 功能：处理登录表单提交，验证用户信息
(() => {
    // 1. 获取DOM元素
    const form = document.getElementById('loginForm');
    const errBox = document.getElementById('err');

    // 2. 添加表单提交事件监听
    form.addEventListener('submit', async (e) => {
        e.preventDefault();   // 阻止表单默认提交

         // 3. 获取输入值
        const account = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value;

        // 4. 基础校验
        if (!account || !pass) {
            errBox.textContent = '请输入账号和密码';
            return;
        }

         // 5. 从本地存储获取用户数据
        // localStorage.getItem('users') 获取存储的用户数据
        // JSON.parse() 将JSON字符串转换为对象
        // || '[]' 如果没有数据则使用空数组
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // 6. 查找用户 (支持手机号或用户名登录)
        const user = users.find(u => u.username === account || u.phone === account);

        if (!user) {
            errBox.textContent = '账号不存在';
            return;
        }

        // 7.校验密码哈希
        const hashedInput = await window.passwordHash(pass);// 调用crypto.js中的哈希函数
        if (user.password === hashedInput) {
            // 登录成功，存入当前会话
            // 8. 保存当前用户信息到localStorage
            localStorage.setItem('user', user.username);

            // 9. 显示成功信息并跳转
            errBox.style.color = 'green';
            errBox.textContent = '登录成功，正在跳转...';
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);
        } else {
            errBox.textContent = '密码错误，请重试';
        }
    });
})();
