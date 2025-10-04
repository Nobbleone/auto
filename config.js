/**
 * ไฟล์การตั้งค่าสำหรับ Roblox Auto Registration
 */

export const config = {
  // URL ของหน้าสมัคร Roblox
  signupUrl: 'https://www.roblox.com/',
  
  // การตั้งค่า Browser
  browser: {
    headless: false, // แสดง browser เพื่อดูการทำงาน
    defaultViewport: {
      width: 1366,
      height: 768
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-web-security'
    ]
  },
  
  // การตั้งค่าเวลา (milliseconds)
  timeout: {
    navigation: 20000,
    element: 5000,
    typing: 50,        // เร็วขึ้น
    validation: 800,   // ลดลง
    puzzleWait: 30000  // ลดลง
  },
  
  // การตั้งค่าข้อมูล
  data: {
    minYear: 1980,
    maxYear: 1999, // ปีเกิดต่ำกว่า 2000
    usernameLength: 12,
    passwordLength: 16
  },

  // ตั้งค่า Captcha Solver (เลือกใช้ได้ หากต้องการให้แก้อัตโนมัติ)
  captcha: {
    enabled: false,           // true = พยายามแก้ FunCaptcha อัตโนมัติ
    provider: '2captcha',     // รองรับ '2captcha' (ปรับได้ภายหลัง)
    apiKey: process.env.CAPTCHA_API_KEY || '',
    solveTimeoutMs: 180000,   // 3 นาที
    pollingIntervalMs: 8000   // เวลารอผลแต่ละรอบ
  },
  
  // Selectors สำหรับ Roblox (จะสแกนอัตโนมัติก่อน)
  selectors: {
    // Birthday selectors - Roblox ใช้ id เหล่านี้
    birthdayMonth: '#MonthDropdown, select[id*="Month"], select[id*="month"]',
    birthdayDay: '#DayDropdown, select[id*="Day"], select[id*="day"]',
    birthdayYear: '#YearDropdown, select[id*="Year"], select[id*="year"]',
    
    // Username และ Password
    username: '#signup-username, input[id*="username"], input[name*="username"]',
    password: '#signup-password, input[id*="password"], input[name*="password"]',
    
    // Gender selection (Roblox ต้องเลือกเพศ)
    genderMale: '#MaleButton, input[value="2"]',
    genderFemale: '#FemaleButton, input[value="1"]',
    
    // Signup button
    signupButton: '#signup-button, button[id*="signup"], button.btn-primary-md',
    
    // Checkbox
    checkbox: 'input[type="checkbox"]',
    
    // Validation
    validationSuccess: '.text-success, .validation-message.success, [class*="success"]',
    
    // Puzzle/Captcha
    puzzleButton: 'button:has-text("Start"), [id*="puzzle"], [id*="captcha"]',
    funCaptcha: '#FunCaptcha, #funcaptcha, .funcaptcha'
  },
  
  // ไฟล์สำหรับเก็บข้อมูล
  outputFile: './output/accounts.txt'
};

export default config;

