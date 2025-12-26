// cart-badge.js - 购物车数量徽章更新及点击拦截
// 功能：在非购物车页面显示数量，并拦截未登录用户的点击

(function() { // IIFE隔离作用域
    // 1. 定义本地存储键名
    const CART_KEY = 'xtx-cart-list';
    const USER_KEY = 'user'; // 登录信息的 key (与 login.js 保持一致)

    // 2. 获取DOM元素
    // 徽章数字元素
    const badge = document.querySelector('.header .car span:last-child');
    // 购物车跳转链接 (包裹在 .car div 下的 a 标签)
    const cartLink = document.querySelector('.header .car a');

    // --- 核心功能 1：判断是否登录 ---
    function isLogin() {
        // 检查 localStorage 中是否有 'user' 数据
        return !!localStorage.getItem(USER_KEY);
    }

    // --- 核心功能 2：更新徽章数量 ---
    function updateBadge() {
        if (!badge) return; 

        // 【新增逻辑】如果未登录，强制显示为 0
        if (!isLogin()) {
            badge.innerText = '0';
            return;
        }

        // 已登录，正常读取购物车数据
        const dataStr = localStorage.getItem(CART_KEY);
        if (dataStr) {
            const cartData = JSON.parse(dataStr);
            badge.innerText = cartData.length; // 显示商品种类数
        } else {
            badge.innerText = '0';
        }
    }

    // --- 核心功能 3：拦截点击事件 ---
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            // 如果未登录
            if (!isLogin()) {
                e.preventDefault(); // 阻止原本跳转到 car.html 的行为
                alert('亲，请先登录账号后再查看购物车哦~'); // 提示信息
                window.location.href = './login.html'; // 跳转到登录页
            }
            // 如果已登录，不执行任何操作，默认允许跳转
        });
    }

    // 4. 页面加载时立即执行更新
    updateBadge();

    // 5. 监听跨标签页同步 (当用户在其他页面登录或退出时，本页面角标自动更新)
    window.addEventListener('storage', (e) => {
        // 监听购物车数据变化 或 用户登录状态变化
        if (e.key === CART_KEY || e.key === USER_KEY) {
            updateBadge();
        }
    });
})();