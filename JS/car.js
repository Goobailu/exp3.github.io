// JS/car.js
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 定义本地存储的 Key
    const STORAGE_KEY = 'xtx-cart-list';
    // 定义结算清单的 Key
    const BUY_KEY = 'xtx-buy-list';

    // 2. 初始化数据
    const defaultData = [
        { id: 1, name: '睿米无线吸尘器F8', src: './实验1_图片/uploads/新鲜好物1.png', price: 899, count: 1, checked: true },
        { id: 2, name: '智能环绕3D空调', src: './实验1_图片/uploads/新鲜好物2.png', price: 1299, count: 1, checked: false },
        { id: 3, name: '广东软软糯米煲仔饭', src: './实验1_图片/uploads/新鲜好物3.png', price: 129, count: 2, checked: true }
    ];

    // 从localStorage读取购物车数据，如果没有则使用默认数据
    let cartData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!cartData) {
        cartData = defaultData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
    }

     // --- 3. 获取DOM元素 --
    const tbody = document.querySelector('#cart-list');
    const totalCountSpan = document.querySelector('#total-count');
    const totalPriceSpan = document.querySelector('#total-price');
    const checkAllInputs = document.querySelectorAll('.check-all');
    const headerCartCount = document.querySelector('.header .car span:last-child');// 头部购物车角标

    // --- 4. 辅助函数：保存数据到localStorage ---
    function saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
        if(headerCartCount) headerCartCount.innerText = cartData.length;
    }

     // --- 5. 渲染函数：生成购物车列表HTML ---
    function render() {
        let html = '';
        // 5.1 如果购物车为空，显示提示信息
        if (cartData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="padding:30px; text-align:center">购物车空空如也，快去逛逛吧~</td></tr>';
            updateTotal();
            return;
        }

        // 5.2 遍历购物车数据生成HTML
        cartData.forEach(item => {
            html += `
            <tr data-id="${item.id}">
                <td>
                    <input type="checkbox" class="s-check" ${item.checked ? 'checked' : ''}>
                </td>
                <td>
                    <div class="goods">
                        <a href="#"><img src="${item.src}" alt=""></a>
                        <div class="info">
                            <p class="name">${item.name}</p>
                            <p class="attr">规格：默认</p>
                        </div>
                    </div>
                </td>
                <td class="price">¥${item.price}</td>
                <td>
                    <div class="count-box">
                        <a href="javascript:;" class="reduce">-</a>
                        <input type="text" readonly value="${item.count}">
                        <a href="javascript:;" class="add">+</a>
                    </div>
                </td>
                <td class="sub-total">¥${(item.price * item.count).toFixed(2)}</td>
                <td>
                    <a href="javascript:;" class="del">删除</a>
                </td>
            </tr>
            `;
        });
        // 5.3 更新DOM
        tbody.innerHTML = html;
        updateTotal();  // 更新总计
    }

    // --- 6. 计算总价和总数量 ---
    function updateTotal() {
        let totalCount = 0;
        let totalPrice = 0;
        
        // 6.1 计算全选状态
        const allChecked = cartData.length > 0 && cartData.every(item => item.checked);
        checkAllInputs.forEach(input => input.checked = allChecked);

        // 6.2 计算选中商品的总数量和总价格
        cartData.forEach(item => {
            if (item.checked) {
                totalCount += item.count;
                totalPrice += item.price * item.count;
            }
        });

        // 6.2 计算选中商品的总数量和总价格
        if(totalCountSpan) totalCountSpan.innerText = totalCount;
        if(totalPriceSpan) totalPriceSpan.innerText = '¥' + totalPrice.toFixed(2);
        
        // 6.4 保存到localStorage
        saveToStorage();
    }

    // --- 7. 事件委托处理购物车操作 ---
    // 使用事件委托，统一处理tbody内的点击事件
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const tr = target.closest('tr');
        if (!tr) return;
        
        const id = parseInt(tr.dataset.id);  // 从data-id获取商品ID
        const item = cartData.find(obj => obj.id === id); // 找到对应的商品对象

        if (target.classList.contains('del')) {
            if (confirm('确认删除该商品吗？')) {
                cartData = cartData.filter(obj => obj.id !== id);
                render(); 
            }
        }
        
        if (target.classList.contains('add')) {
            item.count++;
            render();
        }

        if (target.classList.contains('reduce')) {
            if (item.count > 1) {
                item.count--;
                render();
            } else {
                alert('商品数量最少为1');
            }
        }

        if (target.classList.contains('s-check')) {
            item.checked = target.checked;
            updateTotal();
        }
    });

    // 6. 全选
    checkAllInputs.forEach(input => {
        input.addEventListener('click', () => {
            const status = input.checked;
            checkAllInputs.forEach(ck => ck.checked = status);
            cartData.forEach(item => item.checked = status);
            render(); 
        });
    });

    // 7. 删除选中
    const delSelectBtn = document.querySelector('.del-select');
    if (delSelectBtn) {
        delSelectBtn.addEventListener('click', () => {
            if (cartData.some(item => item.checked)) {
                if (confirm('确定删除选中商品吗？')) {
                    cartData = cartData.filter(item => !item.checked);
                    render();
                }
            } else {
                alert('请选择要删除的商品');
            }
        });
    }

    // 8. 清空购物车
    const clearCartBtn = document.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (cartData.length > 0) {
                if (confirm('确定清空购物车吗？')) {
                    cartData = [];
                    render();
                }
            }
        });
    }

    // --- 9. 关键逻辑：去结算 ---
    const buyBtn = document.querySelector('.btn-buy');
    if (buyBtn) {
        // 清除 HTML 中可能写的 onclick="alert(...)"
        buyBtn.onclick = null; 
        
        buyBtn.addEventListener('click', () => {
            // 1. 获取所有被勾选的商品
            const selectedItems = cartData.filter(item => item.checked);

            if (selectedItems.length === 0) {
                alert('请至少勾选一件商品进行结算');
                return;
            }

            // 2. 存入结算清单 localStorage
            localStorage.setItem(BUY_KEY, JSON.stringify(selectedItems));

            // 3. 跳转到结算页
            window.location.href = './buy.html';
        });
    }

    render();
});