// JS/detail.js
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 商品数据库 (模拟数据，与 index.html 的内容对应) ---
    const allProducts = [
        // 新鲜好物区域
        { id: 1, name: '睿米无线吸尘器F8', price: 899, src: './实验1_图片/uploads/新鲜好物1.png', desc: '强力吸尘，无线束缚' },
        { id: 2, name: '智能环绕3D空调', price: 1299, src: './实验1_图片/uploads/新鲜好物2.png', desc: '智能控温，舒适生活' },
        { id: 3, name: '广东软软糯米煲仔饭', price: 129, src: './实验1_图片/uploads/新鲜好物3.png', desc: '地道风味，软糯香甜' },
        { id: 4, name: '罗西机械智能手表', price: 3399, src: './实验1_图片/uploads/新鲜好物4.png', desc: '高端商务，智能生活' },

        // 生鲜区域 (示例)
        { id: 5, name: '美威 智利原味三文鱼排', price: 59, src: './实验1_图片/uploads/手抓饼.png', desc: '海鲜年货' },
        { id: 6, name: '红功夫 麻辣小龙虾1.5kg', price: 79, src: './实验1_图片/uploads/馒头.png', desc: '火锅底料' },
        { id: 7, name: '三都港 冷冻无公害黄花鱼', price: 49, src: './实验1_图片/uploads/小圆饼.png', desc:'海鲜年货' },
        { id: 8, name: '渔公码头 大连鲜食入味', price: 899, src: './实验1_图片/uploads/面包.png', desc: '海鲜年货' },
        { id: 9, name: '越南白心火龙果4个装', price: 20, src: './实验1_图片/uploads/大福.png', desc: '新鲜水果' },
        { id: 10, name: '广西沃柑 新鲜水果', price: 20, src: './实验1_图片/uploads/蜂蜜.png', desc: '新鲜水果' },
        { id: 11, name: '进口 牛油果 6个装', price: 50, src: './实验1_图片/uploads/巧克力.png', desc: '新鲜水果' },
        { id: 12, name: '泰国进口山竹5A级', price: 60, src: './实验1_图片/uploads/抹茶蛋糕.png', desc: '新鲜水果' },

        // 服饰区域 (示例)
        { id: 13, name: '舒适百搭运动鞋', price: 299, src: './实验1_图片/uploads/鞋.png', desc: '潮流鞋履' },
        { id: 14, name: '简约纯色针织衫', price: 159, src: './实验1_图片/uploads/jessyline.png', desc: '精美服饰' },
        { id: 15, name: '简约红色针织衫', price: 49, src: './实验1_图片/uploads/打底衫.png', desc:'精美服饰' },
        { id: 16, name: 'ins风格波点袜', price: 29, src: './实验1_图片/uploads/文艺袜子.png', desc: '精美服饰' },
        { id: 17, name: '黑色连衣裙', price: 199, src: './实验1_图片/uploads/裙子.png', desc: '精美服饰' },
        { id: 18, name: '棕色皮带', price: 50, src: './实验1_图片/uploads/皮带.png', desc: '精美服饰' },
        { id: 19, name: '简约高邦布鞋', price: 320, src: './实验1_图片/uploads/帆布鞋.png', desc: '精美服饰' },
        { id: 20, name: '进口运动裤', price: 105, src: './实验1_图片/uploads/裤子.png', desc: '精美服饰' },
        
        //餐具区域 (示例)
        { id: 21, name: '美威 智利原味三文鱼排', price: 59, src: './实验1_图片/uploads/手抓饼.png', desc: '海鲜年货' },
        { id: 22, name: '红功夫 麻辣小龙虾1.5kg', price: 79, src: './实验1_图片/uploads/馒头.png', desc: '火锅底料' },
        { id: 23, name: '三都港 冷冻无公害黄花鱼', price: 49, src: './实验1_图片/uploads/小圆饼.png', desc:'海鲜年货' },
        { id: 24, name: '渔公码头 大连鲜食入味', price: 899, src: './实验1_图片/uploads/面包.png', desc: '海鲜年货' },
        { id: 25, name: '越南白心火龙果4个装', price: 20, src: './实验1_图片/uploads/大福.png', desc: '新鲜水果' },
        { id: 26, name: '广西沃柑 新鲜水果', price: 20, src: './实验1_图片/uploads/蜂蜜.png', desc: '新鲜水果' },
        { id: 27, name: '进口 牛油果 6个装', price: 50, src: './实验1_图片/uploads/巧克力.png', desc: '新鲜水果' },
        { id: 28, name: '泰国进口山竹5A级', price: 60, src: './实验1_图片/uploads/抹茶蛋糕.png', desc: '新鲜水果' },
        
        //居家区域 (示例)
        { id: 29, name: '美威 智利原味三文鱼排', price: 59, src: './实验1_图片/uploads/手抓饼.png', desc: '海鲜年货' },
        { id: 30, name: '红功夫 麻辣小龙虾1.5kg', price: 79, src: './实验1_图片/uploads/馒头.png', desc: '火锅底料' },
        { id: 31, name: '三都港 冷冻无公害黄花鱼', price: 49, src: './实验1_图片/uploads/小圆饼.png', desc:'海鲜年货' },
        { id: 32, name: '渔公码头 大连鲜食入味', price: 899, src: './实验1_图片/uploads/面包.png', desc: '海鲜年货' },
        { id: 33, name: '越南白心火龙果4个装', price: 20, src: './实验1_图片/uploads/大福.png', desc: '新鲜水果' },
        { id: 34, name: '广西沃柑 新鲜水果', price: 20, src: './实验1_图片/uploads/蜂蜜.png', desc: '新鲜水果' },
        { id: 35, name: '进口 牛油果 6个装', price: 50, src: './实验1_图片/uploads/巧克力.png', desc: '新鲜水果' },
        { id: 36, name: '泰国进口山竹5A级', price: 60, src: './实验1_图片/uploads/抹茶蛋糕.png', desc: '新鲜水果' },
    ];

    // --- 2. 获取 URL 中的 id 参数 ---
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    const container = document.getElementById('goods-container');

    // --- 3. 查找商品并渲染 ---
    const product = allProducts.find(item => item.id === productId);

    if (product) {
        // 1. 更新文字
        const breadName = document.getElementById('bread-name');
        if(breadName) breadName.innerText = product.name;

        // 2. 渲染详情主体
        container.innerHTML = `
            <div class="media">
                <img src="${product.src}" alt="${product.name}">
            </div>
            <div class="spec">
                <h3 class="g-name">${product.name}</h3>
                <p class="g-desc">${product.desc} | 官方正品 | 极速退款</p>
                <div class="g-price">
                    <span>¥${product.price}</span>
                    <span class="old-price">¥${(product.price * 1.2).toFixed(0)}</span>
                </div>
                
                <div class="g-service">
                    <dl>
                        <dt>促销</dt>
                        <dd>
                            <span class="tag">限时</span> 12月好物放送，App领券直降
                        </dd>
                    </dl>
                    <dl>
                        <dt>配送</dt>
                        <dd>至 北京市朝阳区 [有货] <br> <span style="color:#999; font-size:12px">预计明天送达</span></dd>
                    </dl>
                    <dl>
                        <dt>服务</dt>
                        <dd>无忧退货 · 快速退款 · 免费包邮</dd>
                    </dl>
                </div>

                <div class="btn-group">
                    <button class="btn-add" id="add-cart-btn">加入购物车</button>
                </div>
            </div>
        `;

        // 绑定点击事件
        document.getElementById('add-cart-btn').addEventListener('click', () => {
            addToCart(product);
        });

    } else {
        // ... 错误处理保持不变 ...
    }

    // --- 4. 加入购物车逻辑 ---
    function addToCart(item) {
        const STORAGE_KEY = 'xtx-cart-list';
        // 读取现有购物车
        let cartList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        // 判断是否已存在
        const existingItem = cartList.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.count++;
        } else {
            // 新增商品，默认选中，数量1
            cartList.unshift({
                id: item.id,
                name: item.name,
                src: item.src,
                price: item.price,
                count: 1,
                checked: true
            });
        }

        // 保存回本地存储
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartList));

        // 更新购物车右上角角标 
        const badge = document.querySelector('.header .car span:last-child');
        if (badge) badge.innerText = cartList.length;

        alert('成功加入购物车！');
    }
});