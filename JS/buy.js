document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'xtx-cart-list'; 
    const BUY_KEY = 'xtx-buy-list';
    const ORDER_KEY = 'xtx-orders'; // 订单存储Key

    // --- 2. 获取结算清单数据 ---
    // 从localStorage读取购物车中选中的商品列表
    const buyList = JSON.parse(localStorage.getItem(BUY_KEY));

    // --- 3. 检查结算清单是否为空 ---
    if (!buyList || buyList.length === 0) {
        alert('没有待结算的商品，即将返回购物车');
        window.location.href = './car.html';
        return;
    }

    // --- 4. 获取DOM元素 ---
    const tbody = document.getElementById('buy-list');
    const totalCountSpan = document.getElementById('total-count');
    const totalPriceSpan = document.getElementById('total-price');
    const finalPriceSpan = document.getElementById('final-price');

    // --- 5. 计算总计并渲染列表 ---
    let totalCount = 0;
    let totalPrice = 0;

    let html = '';
    // 5.1 遍历结算商品，生成HTML并计算总计
    buyList.forEach(item => {
        const itemTotal = item.price * item.count;
        totalCount += item.count;
        totalPrice += itemTotal;

        html += `
        <tr>
            <td>
                <div class="info">
                    <img src="${item.src}" alt="">
                    <div>
                        <p>${item.name}</p>
                        <p style="color:#999;font-size:12px;">规格：默认</p>
                    </div>
                </div>
            </td>
            <td>¥${item.price}</td>
            <td>${item.count}</td>
            <td style="color:#cf4444">¥${itemTotal.toFixed(2)}</td>
        </tr>
        `;
    });

    tbody.innerHTML = html;
    totalCountSpan.innerText = totalCount;
    const finalMoney = totalPrice.toFixed(2);
    totalPriceSpan.innerText = finalMoney;
    finalPriceSpan.innerText = finalMoney;

    // --- 6. 地址选择功能 ---
    const addressItems = document.querySelectorAll('.address-item');
    addressItems.forEach(item => {
        item.addEventListener('click', () => {
            addressItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 确认支付
    const submitBtn = document.getElementById('submit-order');
    submitBtn.addEventListener('click', () => {
        if(confirm(`确认支付 ¥${finalMoney} 吗？`)) {
            
            // --- 1. 保存订单记录 ---
            const newOrder = {
                orderId: Date.now(), // 生成唯一订单号
                createTime: new Date().toLocaleString(),
                goods: buyList,
                totalMoney: finalMoney
            };
            
            // 读取旧订单并追加
            const myOrders = JSON.parse(localStorage.getItem(ORDER_KEY) || '[]');
            myOrders.unshift(newOrder); // 最新订单排前面
            localStorage.setItem(ORDER_KEY, JSON.stringify(myOrders));

            // --- 2. 清理购物车 ---
            let fullCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
            const newCart = fullCart.filter(cartItem => {
                const isBought = buyList.some(buyItem => buyItem.id === cartItem.id);
                return !isBought;
            });
            localStorage.setItem(CART_KEY, JSON.stringify(newCart));

            // --- 3. 清理结算清单 ---
            localStorage.removeItem(BUY_KEY);

            alert('支付成功！您可以在个人中心查看订单。');
            window.location.href = './profile.html'; // 支付成功去个人中心
        }
    });
});