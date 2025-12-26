// JS/profile.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. 检查是否登录
    const currentUsername = localStorage.getItem('user');
    if (!currentUsername) {
        alert('请先登录');
        window.location.href = './login.html';
        return;
    }

    // 2. 获取用户详细信息 (从 users 数组中查找)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userInfo = users.find(u => u.username === currentUsername) || { username: currentUsername, phone: '未知' };

    // 3. 渲染个人信息
    document.getElementById('aside-username').textContent = userInfo.username;
    document.getElementById('info-username').textContent = userInfo.username;
    // 如果有手机号则显示，否则隐藏中间四位
    if (userInfo.phone) {
        document.getElementById('info-phone').textContent = userInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }

    // 4. 退出登录功能
    document.getElementById('logout-btn').addEventListener('click', () => {
        if(confirm('确定要退出登录吗？')) {
            localStorage.removeItem('user');
            window.location.href = './index.html';
        }
    });

    // 5. 渲染订单列表
    renderOrders();

    function renderOrders() {
        const orderContainer = document.getElementById('order-list');
        const orders = JSON.parse(localStorage.getItem('xtx-orders') || '[]');

        if (orders.length === 0) {
            orderContainer.innerHTML = '<div class="empty-tips">暂无购买记录，快去购物吧~</div>';
            return;
        }

        let html = '';
        orders.forEach(order => {
            let goodsHtml = '';
            // 遍历该订单下的所有商品
            order.goods.forEach(g => {
                goodsHtml += `
                    <div class="goods-item">
                        <img src="${g.src}" alt="">
                        <div class="goods-info">
                            <p>${g.name}</p>
                            <p style="color:#999">x ${g.count}</p>
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="order-item">
                    <div class="order-head">
                        <span>订单号：${order.orderId}</span>
                        <span>下单时间：${order.createTime}</span>
                    </div>
                    <div class="order-body">
                        <div class="goods-list">
                            ${goodsHtml}
                        </div>
                        <div class="order-money">
                            实付：¥${order.totalMoney}
                        </div>
                    </div>
                </div>
            `;
        });

        orderContainer.innerHTML = html;
    }
});