# Roblox Auto Registration Tool

โปรแกรมสมัคร ID Roblox อัตโนมัติด้วย JavaScript และ Puppeteer

## คุณสมบัติ

- 🔍 สแกนหาชื่อ input fields อัตโนมัติ
- 📅 สุ่มวันเดือนปีเกิด (ปีเกิดต่ำกว่า 2000)
- ✅ ตรวจสอบ validation สีเขียวก่อนดำเนินการต่อ
- 🔐 สร้าง username และ password อัตโนมัติ
- 📝 ติ๊ก checkbox ยอมรับเงื่อนไขอัตโนมัติ
- 🧩 รองรับ puzzle challenge
- 💾 บันทึกข้อมูลในรูปแบบ username:password:cookie

## การติดตั้ง

```bash
npm install
```

## การใช้งาน

```bash
npm start
```

## โครงสร้างโปรเจค

```
autotestsupergenid/
├── index.js           # ไฟล์หลัก
├── config.js          # การตั้งค่า
├── utils/
│   ├── fieldScanner.js    # สแกนหา input fields
│   ├── formFiller.js      # กรอกฟอร์ม
│   ├── validator.js       # ตรวจสอบ validation
│   └── dataGenerator.js   # สร้างข้อมูลสุ่ม
├── output/
│   └── accounts.txt       # เก็บข้อมูลบัญชีที่สร้างสำเร็จ
├── package.json
└── README.md
```

## หมายเหตุ

- ใช้สำหรับการเรียนรู้และทดสอบเท่านั้น
- ควรใช้งานอย่างมีความรับผิดชอบ

