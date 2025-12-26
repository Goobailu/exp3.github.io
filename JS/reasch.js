//功能：根据输入的关键词滚动到对应的页面模块
document.addEventListener('DOMContentLoaded', () => {
    // 获取搜索输入框和搜索按钮
    const searchInput = document.querySelector('.header .search input');
    const searchBtn = document.querySelector('.search-btn');

    // 1. 定义关键词与页面模块类名的映射关系
    // 键(Key)是用户可能输入的词，值(Value)是对应的 CSS 选择器
    const keywordMap = {
        '生鲜': '.fresh_produce',
        '水果': '.fresh_produce',
        '蔬菜': '.fresh_produce',
        '肉': '.fresh_produce',
        
        '服饰': '.clothes_goods',
        '衣服': '.clothes_goods',
        '男装': '.clothes_goods',
        '女装': '.clothes_goods',
        '裤': '.clothes_goods',
        
        '餐厨': '.kitchen_goods',
        '厨具': '.kitchen_goods',
        '锅': '.kitchen_goods',
        '碗': '.kitchen_goods',
        
        '居家': '.home_goods',
        '家具': '.home_goods',
        '床': '.home_goods',
        
        '专题': '.topic_goods',
        '推荐': '.popularity',
        '人气': '.popularity',
        '新鲜': '.goods',
        '新品': '.goods'
    };
    // 执行搜索的核心函数
    const performSearch = () => {
        const query = searchInput.value.trim(); // 去除首尾空格
        if (!query) return;// 空查询直接返回

        console.log('正在搜索:', query);
        
        let targetSelector = null;

        // 2. 遍历映射表，查找匹配的关键词
        for (const key in keywordMap) {
            // 如果用户输入的文字包含关键词（例如输入“买生鲜”包含“生鲜”）
            if (query.includes(key)) {
                targetSelector = keywordMap[key];
                break; // 找到一个匹配项后停止，避免冲突
            }
        }

        // 3. 执行跳转逻辑
        if (targetSelector) {
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                // 平滑滚动到对应模块
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',  // 平滑滚动效果
                    block: 'start'   // 滚动到元素顶部
                });
                // 可选：为了提示用户，可以清空输入框
                // searchInput.value = ''; 
            }
        } else {
            // 如果没有匹配到任何模块，提示用户
            // 在实际电商项目中，这里会跳转到 search.html?q=xxx 结果页
            alert(`未完善“${query}”区域。\n请尝试搜索：生鲜、服饰、餐厨、居家、人气、新品等关键词。`);
        }
    };
    // 4. 绑定事件监听器
    // 点击搜索按钮触发
    searchBtn.addEventListener('click', performSearch);

    // 按下回车键触发
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // 阻止默认的回车换行或表单提交行为
            e.preventDefault(); 
            performSearch();
        }
    });
});