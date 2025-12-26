// auth.js - 用户登录状态验证
// 功能：根据登录状态更新页面显示

(() => { // IIFE
    // 1. 获取登录和注册链接元素
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    
    if (!loginLink) return; // 如果没有登录链接则退出

    // 2. 从本地存储获取当前用户（使用try-catch防止异常）
    const user = (function(){ 
        try { 
            return localStorage.getItem('user'); 
        } catch(e){ 
            return null; // 如果出错返回null
        } 
    })();
    
    // 3. 如果用户已登录
    if (user) {
        // 3.1 修改登录链接显示用户名
        loginLink.textContent = '欢迎，' + user;
        loginLink.href = './profile.html'; // 跳转到个人中心
        loginLink.title = '进入个人中心';
        
        // 3.2 隐藏注册链接
        if (registerLink) {
            registerLink.style.display = 'none';
        }
    }
    // 如果未登录，保持原有链接不变
})();