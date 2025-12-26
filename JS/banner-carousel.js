// banner-carousel.js - 首页轮播图实现
// 功能：自动轮播和手动切换图片

(() => { // IIFE
    // 1. 获取轮播图容器
    const wrapper = document.querySelector('.banner .wrapper');
    if (!wrapper) return; // 如果元素不存在则退出

    // 2. 获取所有轮播图相关元素
    const ul = wrapper.querySelector('ul');
    const slides = Array.from(ul.querySelectorAll('li')); // 转换为数组
    const prev = wrapper.querySelector('.prev'); // 上一张按钮
    const next = wrapper.querySelector('.next'); // 下一张按钮
    const ol = wrapper.querySelector('ol');     // 指示器容器

    if (!slides.length) return; // 如果没有轮播图则退出

    // 3. 处理指示器（小圆点）
    let dots = ol ? Array.from(ol.children) : [];
    
    // 如果指示器不存在则创建
    if (!ol) {
        const newOl = document.createElement('ol');
        wrapper.appendChild(newOl);
        dots = [];
    }
    
    // 如果指示器数量与轮播图数量不匹配，重新创建
    if (dots.length !== slides.length) {
        ol.innerHTML = ''; // 清空现有指示器
        for (let i = 0; i < slides.length; i++) {
            const li = document.createElement('li');
            if (i === 0) li.classList.add('current'); // 第一个设为当前
            ol.appendChild(li);
        }
        dots = Array.from(ol.children); // 重新获取指示器数组
    }

    // 4. 确定当前显示的轮播图索引
    let current = dots.findIndex(d => d.classList.contains('current'));
    if (current === -1) current = 0; // 如果没找到，默认显示第一个

    // 5. 显示指定索引的轮播图
    function show(index) {
        index = (index + slides.length) % slides.length; // 循环处理
        
        // 显示当前图片，隐藏其他图片
        slides.forEach((s, i) => {
            s.style.display = i === index ? 'block' : 'none';
        });
        
        // 更新指示器状态
        dots.forEach((d, i) => d.classList.toggle('current', i === index));
        current = index; // 更新当前索引
    }

    // 6. 初始显示
    show(current);

    // 7. 事件绑定
    if (next) {
        next.addEventListener('click', (e) => {
            e.preventDefault(); // 防止链接跳转
            show(current + 1); // 显示下一张
            resetTimer();      // 重置自动轮播计时器
        });
    }
    
    if (prev) {
        prev.addEventListener('click', (e) => {
            e.preventDefault();
            show(current - 1); // 显示上一张
            resetTimer();
        });
    }

    // 8. 指示器点击事件
    dots.forEach((d, i) => {
        d.addEventListener('click', () => {
            show(i); // 点击指示器直接跳转到对应图片
            resetTimer();
        });
    });

    // 9. 自动轮播功能
    let timer = setInterval(() => show(current + 1), 3000); // 3秒切换一次
    
    // 重置计时器的函数
    function resetTimer() {
        clearInterval(timer); // 清除现有计时器
        timer = setInterval(() => show(current + 1), 3000); // 重新开始计时
    }
    
    // 注：此版本移除了鼠标悬停暂停功能
})();