// register.js - 用户注册流程
// 功能：分三步完成用户注册（手机验证->信息填写->注册成功）

document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取第一步表单元素
    const phoneInput = document.getElementById('phone');
    const verifyBtn = document.getElementById('verifyBtn');
    const agreementCheckbox = document.getElementById('agreement');
    
    // 2. 从本地存储获取已注册用户列表
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : []; // 返回数组
    }

    // 3. 手机号格式验证
    function validatePhone(phone) {
        return /^1[3-9]\d{9}$/.test(phone); // 中国手机号正则
    }

    // 4. 更新验证按钮状态
    function updateButtonState() {
        const isPhoneValid = validatePhone(phoneInput.value);
        const isAgreed = agreementCheckbox.checked;
        // 只有手机号合法且同意协议，按钮才可用
        verifyBtn.disabled = !(isPhoneValid && isAgreed);
        verifyBtn.className = verifyBtn.disabled ? 'btn btn-disabled' : 'btn btn-primary';
    }

    // 5. 实时监听输入变化
    phoneInput.addEventListener('input', updateButtonState);
    agreementCheckbox.addEventListener('change', updateButtonState);

    // 6. 初始按钮状态
    updateButtonState();

    // 7. 点击验证按钮（进入第二步）
    verifyBtn.addEventListener('click', function() {
        const phone = phoneInput.value;
        const users = getUsers();
        
        // 7.1 查重：检查手机号是否已注册
        if (users.some(u => u.phone === phone)) {
            alert('该手机号已注册，请直接登录');
            return;
        }

        // 7.2 更新步骤指示器
        const steps = document.querySelectorAll('.step');
        steps[0].classList.add('completed'); // 第一步完成
        steps[1].classList.add('active');    // 第二步激活
        
        // 7.3 渲染第二步表单
        renderStepTwo(phone);
    });

    // 8. 第二步：填写账号信息
    function renderStepTwo(phone) {
        const form = document.getElementById('registerForm');
        document.querySelector('.form-title').textContent = '填写账号信息';
        
        // 8.1 生成第二步HTML内容
        form.innerHTML = `
            <div class="form-group">
                <label class="form-label">用户名</label>
                <input type="text" id="username" class="phone-input" style="border:1px solid #ddd" placeholder="4-16位字符">
            </div>
            <div class="form-group">
                <label class="form-label">设置密码</label>
                <input type="password" id="password" class="phone-input" style="border:1px solid #ddd" placeholder="至少6位字母或数字">
            </div>
            <div class="form-group">
                <label class="form-label">确认密码</label>
                <input type="password" id="confirmPassword" class="phone-input" style="border:1px solid #ddd" placeholder="请再次输入密码">
            </div>
            <div id="regErr" style="color:red; font-size:12px; margin-bottom:10px;"></div>
            <button type="button" class="btn btn-primary" id="finalRegBtn">完成注册</button>
        `;

        // 8.2 完成注册按钮事件
        document.getElementById('finalRegBtn').addEventListener('click', async () => {
            const userVal = document.getElementById('username').value.trim();
            const passVal = document.getElementById('password').value;
            const confirmVal = document.getElementById('confirmPassword').value;
            const errBox = document.getElementById('regErr');

            // 8.3 输入验证
            if (userVal.length < 4) { 
                errBox.textContent = '用户名太短了'; 
                return; 
            }
            if (passVal.length < 6) { 
                errBox.textContent = '密码至少需要6位'; 
                return; 
            }
            if (passVal !== confirmVal) { 
                errBox.textContent = '两次密码输入不一致'; 
                return; 
            }

            // 8.4 用户名查重
            const users = getUsers();
            if (users.some(u => u.username === userVal)) {
                errBox.textContent = '用户名已被占用';
                return;
            }

            // 8.5 密码哈希加密
            const hashedPassword = await window.passwordHash(passVal);

            // 8.6 保存用户数据
            const newUser = { 
                phone, 
                username: userVal, 
                password: hashedPassword 
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // 8.7 更新步骤指示器
            const steps = document.querySelectorAll('.step');
            steps[1].classList.add('completed'); // 第二步完成
            steps[2].classList.add('active');    // 第三步激活
            
            // 8.8 进入第三步
            renderStepThree();
        });
    }

    // 9. 第三步：注册成功
    function renderStepThree() {
        document.querySelectorAll('.step')[1].classList.remove('active');
        document.querySelectorAll('.step')[2].classList.add('active');
        
        const form = document.getElementById('registerForm');
        form.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <h3 style="color: #27ba9b;">√ 注册成功</h3>
                <p>欢迎加入小兔鲜儿！</p>
                <a href="./login.html" class="btn btn-primary" style="display:inline-block; margin-top:20px; text-decoration:none">立即去登录</a>
            </div>
        `;
    }
});