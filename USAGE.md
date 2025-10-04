# คู่มือการใช้งาน

## การติดตั้ง

1. ติดตั้ง Node.js (เวอร์ชัน 16 ขึ้นไป)
2. เปิด Terminal/Command Prompt ในโฟลเดอร์โปรเจค
3. รันคำสั่ง:

```bash
npm install
```

## การใช้งาน

รันโปรแกรมด้วยคำสั่ง:

```bash
npm start
```

หรือ

```bash
node index.js
```

## ขั้นตอนการทำงาน

โปรแกรมจะทำงานตามลำดับดังนี้:

### 1. เปิด Browser และเข้าสู่หน้า Roblox
- เปิด Puppeteer Browser
- ไปที่หน้า https://www.roblox.com/

### 2. สแกนหา Input Fields
- สแกนหาชื่อของกล่องข้อความทั้งหมดในหน้า
- ระบุว่า field ไหนคือ birthday, username, password

### 3. สร้างข้อมูลสุ่ม
- สุ่มวันเดือนปีเกิด (ปีเกิดต่ำกว่า 2000)
- ถ้าเดือนกุมภาพันธ์ จะสุ่มวันต่ำกว่า 28
- สร้าง username และ password ที่ปลอดภัย

### 4. กรอกวันเดือนปีเกิด
- เลือกเดือน วัน ปี
- รอจนกว่าจะขึ้นสีเขียว (validated)

### 5. กรอก Username
- พิมพ์ username
- รอตรวจสอบว่าขึ้นสีเขียวหรือไม่

### 6. กรอก Password
- พิมพ์ password
- รอตรวจสอบว่าขึ้นสีเขียวหรือไม่

### 7. ติ๊ก Checkbox
- ถ้ามี checkbox ให้ยอมรับเงื่อนไข
- จะติ๊กอัตโนมัติ

### 8. ตรวจสอบความครบถ้วน
- สแกนทั้งหน้าอีกครั้ง
- ตรวจสอบว่าทุกอย่างครบถ้วนหรือไม่

### 9. กดปุ่ม Signup
- กดปุ่มสมัครสมาชิก
- รอการตอบกลับ

### 10. จัดการ Puzzle
- ถ้ามี "Start Puzzle" ปรากฏ: รอให้ผู้ใช้แก้ puzzle
- ถ้าไม่มี puzzle: ดำเนินการต่อ

### 11. บันทึกข้อมูล
- ดึง cookies จาก browser
- บันทึกในรูปแบบ `username:password:cookie`
- เก็บไว้ในไฟล์ `output/accounts.txt`

## การปรับแต่ง

แก้ไขไฟล์ `config.js` เพื่อปรับแต่ง:

- **signupUrl**: URL หน้าสมัคร
- **headless**: `true` = ไม่แสดง browser, `false` = แสดง browser
- **timeout**: เวลารอต่างๆ
- **data**: ช่วงปีเกิด, ความยาว username/password

## ไฟล์ที่สำคัญ

- `index.js` - ไฟล์หลัก
- `config.js` - การตั้งค่า
- `utils/fieldScanner.js` - สแกนหา input fields
- `utils/dataGenerator.js` - สร้างข้อมูลสุ่ม
- `utils/formFiller.js` - กรอกฟอร์ม
- `utils/validator.js` - ตรวจสอบ validation
- `output/accounts.txt` - เก็บข้อมูลบัญชี

## ข้อควรระวัง

1. **Puzzle Challenge**: ถ้าเจอ puzzle ต้องแก้ด้วยตนเอง
2. **Rate Limiting**: อย่าสมัครบ่อยเกินไป อาจโดน rate limit
3. **Validation**: บาง field อาจต้องใช้เวลาในการ validate
4. **Legal**: ใช้เพื่อการเรียนรู้และทดสอบเท่านั้น

## การแก้ไขปัญหา

### ไม่พบ Input Fields
- ตรวจสอบว่าหน้าเว็บโหลดเสร็จแล้ว
- อาจต้องเพิ่มเวลารอใน config

### Username ซ้ำ
- โปรแกรมสร้าง username สุ่ม
- ถ้าซ้ำ ลองรันใหม่

### Timeout
- เพิ่มเวลา timeout ใน config.js
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต

## ตัวอย่างข้อมูลที่บันทึก

```
CoolGamer1234:Abc123!@#$def:_ga=GA1.1.123456789; .ROBLOSECURITY=...
EpicMaster5678:Xyz789!@#$abc:_ga=GA1.1.987654321; .ROBLOSECURITY=...
```

## License

MIT License - ใช้เพื่อการศึกษาและทดสอบเท่านั้น

