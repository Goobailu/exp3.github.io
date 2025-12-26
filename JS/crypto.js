// 密码加密模块
// crypto.js - 密码加密模块
// 功能：提供SHA-256哈希函数用于密码加密
async function passwordHash(password) {
    if (!password) return ''; // 空密码返回空字符串
    
    // 1. 将字符串转换为Uint8Array
    const enc = new TextEncoder();
    const data = enc.encode(password);
    
    // 2. 使用Web Crypto API计算SHA-256哈希
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // 3. 将ArrayBuffer转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => 
        b.toString(16)      // 转换为16进制
         .padStart(2, '0') // 确保两位长度
    ).join(''); // 连接所有十六进制字符
    
    return hashHex;
}

// 4. 将函数暴露到全局作用域，以便其他文件调用
window.passwordHash = passwordHash;
