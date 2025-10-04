/**
 * Roblox Auto Registration Tool
 * โปรแกรมสมัคร ID Roblox อัตโนมัติ
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import config from './config.js';
import { 
  scanAllFields, 
  findBirthdayFields, 
  findUsernameField, 
  findPasswordField,
  findSignupButton,
  displayScanResults 
} from './utils/fieldScanner.js';
import { 
  generateBirthday, 
  generateUsername, 
  generatePassword 
} from './utils/dataGenerator.js';
import {
  checkFormReady,
  waitForFieldReady,
  fillBirthday,
  selectGender,
  fillUsername,
  fillPassword,
  clickSignupButton
} from './utils/formFiller.js';
import { 
  validateForm, 
  handleCheckboxes 
} from './utils/validator.js';
import { solveFunCaptchaIfEnabled, clickStartPuzzleIfPresent, waitForStartPuzzleVisible } from './utils/formFiller.js';

/**
 * ฟังก์ชันหลัก
 */
async function main() {
  let browser;
  
  try {
    console.log('🚀 เริ่มต้นโปรแกรม Roblox Auto Registration\n');
    console.log('='.repeat(60));
    
    // เปิด browser
    console.log('\n🌐 กำลังเปิด Browser...');
    browser = await puppeteer.launch(config.browser);
    const page = await browser.newPage();
    
    // ตั้งค่า User Agent เพื่อหลีกเลี่ยงการตรวจจับ bot
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // ไปที่หน้าสมัคร Roblox
    console.log(`📍 กำลังเข้าสู่หน้า Roblox: ${config.signupUrl}`);
    await page.goto(config.signupUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: config.timeout.navigation 
    });
    
    // รอให้หน้าโหลดเสร็จ
    await page.waitForTimeout(3000);

    // ขั้นตอนที่ 1: สแกนหา input fields ทั้งหมด
    console.log('\n' + '='.repeat(60));
    console.log('📋 ขั้นตอนที่ 1: สแกนหา Input Fields');
    console.log('='.repeat(60));

    const scannedFields = await scanAllFields(page);
    displayScanResults(scannedFields);

    // ค้นหา fields ที่ต้องการ
    const birthdayFields = findBirthdayFields(scannedFields);
    const usernameField = findUsernameField(scannedFields);
    const passwordField = findPasswordField(scannedFields);
    const signupButton = findSignupButton(scannedFields);

    console.log(`✓ พบ Fields: Month, Day, Year, Username, Password, Button\n`);

    // ขั้นตอนที่ 1.5: ตรวจสอบความพร้อมของฟอร์ม
    console.log('='.repeat(60));
    console.log('🔍 ขั้นตอนที่ 1.5: ตรวจสอบความพร้อมของฟอร์ม');
    console.log('='.repeat(60));

    const formReady = await checkFormReady(page);
    if (!formReady) {
      console.warn('⚠️ ฟอร์มอาจยังไม่พร้อมกรอกทั้งหมด แต่จะดำเนินการต่อ...\n');
    }
    
    // สร้างข้อมูลสุ่ม
    console.log('='.repeat(60));
    console.log('🎲 ขั้นตอนที่ 2: สร้างข้อมูลสุ่ม');
    console.log('='.repeat(60));
    
    const birthday = generateBirthday();
    const username = generateUsername();
    const password = generatePassword();
    
    console.log(`\n📊 ข้อมูล: ${birthday.day}/${birthday.month}/${birthday.year} | ${username} | ${'*'.repeat(8)}\n`);
    
    // ขั้นตอนที่ 3: กรอกวันเดือนปีเกิด
    console.log('='.repeat(60));
    console.log('📝 ขั้นตอนที่ 3: กรอกวันเดือนปีเกิด');
    console.log('='.repeat(60));

    if (birthdayFields.monthField && birthdayFields.dayField && birthdayFields.yearField) {
      await fillBirthday(page, birthdayFields, birthday);
    } else {
      throw new Error('ไม่พบ birthday fields');
    }

    // ขั้นตอนที่ 3.5: เลือกเพศ (ถ้ามี)
    console.log('='.repeat(60));
    console.log('⚧️ ขั้นตอนที่ 3.5: เลือกเพศ');
    console.log('='.repeat(60));
    await selectGender(page);

    // ขั้นตอนที่ 4: กรอก Username
    console.log('='.repeat(60));
    console.log('📝 ขั้นตอนที่ 4: กรอก Username');
    console.log('='.repeat(60));

    if (usernameField) {
      // รอให้ username field พร้อม
      const usernameReady = await waitForFieldReady(page, usernameField.selector, 'Username field');
      if (usernameReady) {
        await fillUsername(page, usernameField, username);
      } else {
        console.error('❌ Username field ไม่พร้อม');
      }
    } else {
      throw new Error('ไม่พบ username field');
    }

    // ขั้นตอนที่ 5: กรอก Password
    console.log('='.repeat(60));
    console.log('📝 ขั้นตอนที่ 5: กรอก Password');
    console.log('='.repeat(60));

    if (passwordField) {
      // รอให้ password field พร้อม
      const passwordReady = await waitForFieldReady(page, passwordField.selector, 'Password field');
      if (passwordReady) {
        await fillPassword(page, passwordField, password);
      } else {
        console.error('❌ Password field ไม่พร้อม');
      }
    } else {
      throw new Error('ไม่พบ password field');
    }
    
    // ขั้นตอนที่ 6: ตรวจสอบและติ๊ก Checkbox
    console.log('='.repeat(60));
    console.log('☑️  ขั้นตอนที่ 6: ตรวจสอบ Checkbox');
    console.log('='.repeat(60));
    
    await handleCheckboxes(page, scannedFields);
    
    // ขั้นตอนที่ 6.5: ตรวจสอบสถานะการกรอก
    console.log('='.repeat(60));
    console.log('🔍 ขั้นตอนที่ 6.5: ตรวจสอบสถานะการกรอก');
    console.log('='.repeat(60));

    // ตรวจสอบว่ากรอกข้อมูลได้ครบหรือยัง
    const filledStatus = await page.evaluate(() => {
      const monthVal = document.querySelector('#MonthDropdown')?.value;
      const dayVal = document.querySelector('#DayDropdown')?.value;
      const yearVal = document.querySelector('#YearDropdown')?.value;
      const usernameVal = document.querySelector('#signup-username')?.value;
      const passwordVal = document.querySelector('#signup-password')?.value;

      return {
        month: monthVal || 'ไม่ได้กรอก',
        day: dayVal || 'ไม่ได้กรอก',
        year: yearVal || 'ไม่ได้กรอก',
        username: usernameVal || 'ไม่ได้กรอก',
        password: passwordVal ? 'กรอกแล้ว' : 'ไม่ได้กรอก'
      };
    });

    console.log('📊 สถานะการกรอก:');
    console.log(`  • เดือน: ${filledStatus.month}`);
    console.log(`  • วัน: ${filledStatus.day}`);
    console.log(`  • ปี: ${filledStatus.year}`);
    console.log(`  • ชื่อผู้ใช้: ${filledStatus.username}`);
    console.log(`  • รหัสผ่าน: ${filledStatus.password}`);

    // ขั้นตอนที่ 7: ตรวจสอบความครบถ้วนของฟอร์ม
    console.log('='.repeat(60));
    console.log('🔍 ขั้นตอนที่ 7: ตรวจสอบความครบถ้วน');
    console.log('='.repeat(60));

    const formFields = {
      'Birthday': birthdayFields.monthField?.selector,
      'Username': usernameField?.selector,
      'Password': passwordField?.selector
    };

    const isFormComplete = await validateForm(page, formFields);

    if (!isFormComplete) {
      console.warn('⚠️  ฟอร์มอาจยังไม่ครบถ้วน แต่จะลองดำเนินการต่อ...\n');
    }
    
    // ขั้นตอนที่ 8: กดปุ่ม Signup
    console.log('='.repeat(60));
    console.log('🚀 ขั้นตอนที่ 8: กดปุ่ม Signup');
    console.log('='.repeat(60));

    if (signupButton) {
      // รอให้ปุ่มพร้อมใช้งาน
      const buttonReady = await waitForFieldReady(page, signupButton.selector, 'Signup button');
      if (buttonReady) {
        await clickSignupButton(page, signupButton);
      } else {
        console.error('❌ ปุ่ม Signup ไม่พร้อม');
      }
    } else {
      throw new Error('ไม่พบปุ่ม Signup');
    }
    
    // ขั้นตอนที่ 9: รอและจัดการ Puzzle
    console.log('='.repeat(60));
    console.log('🧩 ขั้นตอนที่ 9: ตรวจสอบ Puzzle Challenge');
    console.log('='.repeat(60));
    
    console.log('\n⏳ รอ Start Puzzle ปรากฏขึ้น (จริง) ...');
    
    try {
      // รอดู puzzle button หรือการเข้าสู่ระบบสำเร็จ
      const result = await Promise.race([
        waitForStartPuzzleVisible(page, config.timeout.puzzleWait).then(v => v ? 'puzzle' : 'timeout'),
        page.waitForNavigation({ timeout: config.timeout.puzzleWait }).then(() => 'success'),
        new Promise((resolve) => setTimeout(() => resolve('timeout'), config.timeout.puzzleWait + 2000))
      ]);
      
      if (result === 'puzzle') {
        console.log('🧩 พบ Puzzle Challenge!');
        console.log('⏸️  หากไม่ได้เปิดใช้งานตัวแก้ Captcha อัตโนมัติ จะต้องแก้ด้วยตัวเอง');
        console.log('   (สามารถเปิดใช้งานใน config.captcha.enabled และใส่ CAPTCHA_API_KEY)');

        // พยายามแก้อัตโนมัติ ถ้าผู้ใช้เปิดไว้
        try {
          // พยายามกดปุ่ม Start Puzzle ให้อัตโนมัติทันที
          // พยายามกดปุ่มภายในหลายรอบ เผื่อ iframe โหลดช้า
          let pressed = false;
          for (let i = 0; i < 5; i++) {
            pressed = await clickStartPuzzleIfPresent(page);
            if (pressed) break;
            await page.waitForTimeout(800);
          }
          if (pressed) console.log('✅ กดปุ่ม Start Puzzle ให้อัตโนมัติแล้ว');

          const solved = await solveFunCaptchaIfEnabled(page);
          if (solved) {
            console.log('✅ Captcha ถูกแก้แล้วอย่างอัตโนมัติ (หรือจำลอง)');
          } else {
            console.log('ℹ️  Captcha solver ปิดอยู่ หรือแก้อัตโนมัติไม่สำเร็จ - รอให้ผู้ใช้แก้เอง');
          }
        } catch (e) {
          console.log('ℹ️  ไม่สามารถแก้อัตโนมัติ: ' + e.message);
        }
        
        // รอให้ผู้ใช้แก้ puzzle
        await page.waitForNavigation({ timeout: 120000 });
      }
      
      if (result === 'success' || result === 'puzzle') {
        console.log('✅ การสมัครสำเร็จ!\n');
      }
    } catch (error) {
      console.log('⏭️  ไม่พบ puzzle หรือหมดเวลารอ, ดำเนินการต่อ...\n');
    }
    
    // ขั้นตอนที่ 10: ดึงข้อมูลและบันทึก
    console.log('='.repeat(60));
    console.log('💾 ขั้นตอนที่ 10: ดึงและบันทึกข้อมูล');
    console.log('='.repeat(60));
    
    // ดึง cookies
    const cookies = await page.cookies();
    const cookieString = cookies.map(c => `${c.name}=${c.value}`).join('; ');
    
    // สร้างข้อมูลในรูปแบบ username:password:cookie
    const accountData = `${username}:${password}:${cookieString}`;
    
    console.log('\n✅ ข้อมูลบัญชี:');
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log(`   Cookies: ${cookieString.substring(0, 50)}...\n`);
    
    // บันทึกลงไฟล์
    const outputPath = path.resolve(config.outputFile);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.appendFile(outputPath, accountData + '\n', 'utf-8');
    
    console.log(`💾 บันทึกข้อมูลแล้วที่: ${outputPath}\n`);
    
    console.log('='.repeat(60));
    console.log('🎉 สำเร็จ! โปรแกรมทำงานเสร็จสิ้น');
    console.log('='.repeat(60));
    
    // รอสักครู่ก่อนปิด
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('\n❌ เกิดข้อผิดพลาด:');
    console.error(error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
  } finally {
    if (browser) {
      await browser.close();
      console.log('\n👋 ปิด Browser แล้ว');
    }
  }
}

// เริ่มโปรแกรม
main().catch(console.error);

