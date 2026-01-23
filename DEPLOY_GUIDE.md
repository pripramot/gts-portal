# 🚀 คู่มือ Deploy ACESO Web Portal

## วิธีที่ 1: Deploy อัตโนมัติ (ง่ายที่สุด!)

### ขั้นตอน:

1. **Double-click ไฟล์นี้:**
   ```
   deploy.bat
   ```

2. **ทำตามขั้นตอนบนหน้าจอ:**
   - Login Google Account
   - รอ Deploy เสร็จ (~30 วินาที)
   - ได้ URL ทันที!

3. **เสร็จแล้ว! เปิดได้ที่:**
   ```
   https://rungroj-carrent.web.app
   ```

---

## วิธีที่ 2: Deploy ด้วยตัวเอง (Manual)

### ขั้นตอนที่ 1: Login Firebase

```bash
cd C:\Users\usEr\Project\ACESO_Web
firebase login
```

จะเปิด Browser ให้ Login Google Account

### ขั้นตอนที่ 2: Deploy

```bash
firebase deploy --only hosting
```

รอ 30-60 วินาที

### ขั้นตอนที่ 3: เสร็จแล้ว!

จะได้ URL 2 ลิงก์:
- `https://rungroj-carrent.web.app`
- `https://rungroj-carrent.firebaseapp.com`

---

## 🔄 อัปเดตเว็บไซต์

เมื่อแก้ไขไฟล์ HTML แล้วต้องการอัปเดต:

```bash
firebase deploy --only hosting
```

หรือ Double-click `deploy.bat` อีกครั้ง

---

## 🌐 แชร์ลิงก์ให้หน่วยงาน

หลัง Deploy แล้ว ส่งลิงก์นี้ให้หน่วยงาน:

```
https://rungroj-carrent.web.app
```

**ใช้งานได้:**
- 📱 มือถือ (Android + iOS)
- 💻 คอมพิวเตอร์
- 🖥️ แท็บเล็ต
- ทุก Browser (Chrome, Safari, Firefox, Edge)

---

## 📊 ตรวจสอบสถิติการใช้งาน

ไปที่: https://console.firebase.google.com

1. เลือก Project: `rungroj-carrent`
2. คลิก **Hosting** ทางซ้าย
3. ดูสถิติ:
   - จำนวนผู้เข้าชม
   - Bandwidth ที่ใช้
   - ประเทศที่เข้าชม

---

## 🔧 Troubleshooting

### ปัญหา: "firebase: command not found"

แก้ไข:
```bash
npm install -g firebase-tools
```

### ปัญหา: "Login failed"

แก้ไข:
```bash
firebase login --reauth
```

### ปัญหา: "Permission denied"

แก้ไข:
1. ตรวจสอบว่า Login ด้วย Google Account ที่ถูกต้อง
2. ตรวจสอบว่ามีสิทธิ์ใน Project `rungroj-carrent`

### ปัญหา: "Deploy failed"

แก้ไข:
```bash
firebase logout
firebase login
firebase deploy --only hosting
```

---

## 💡 Tips

### 1. ตั้งค่า Custom Domain (ถ้าต้องการ)

ไปที่ Firebase Console → Hosting → Add custom domain

ตัวอย่าง: `aceso.opsc.go.th`

### 2. เปิด HTTPS อัตโนมัติ

Firebase Hosting เปิด HTTPS ให้อัตโนมัติแล้ว ✅

### 3. ลบ Old Versions

```bash
firebase hosting:channel:list
firebase hosting:channel:delete <channel-id>
```

---

## 📈 Upgrade Plan (ถ้าจำเป็น)

### Firebase Spark (Free) - ปัจจุบัน
- ✅ Hosting: 10 GB
- ✅ Firestore: 1 GB
- ✅ Bandwidth: 360 MB/วัน
- ✅ เพียงพอสำหรับ 100+ users/วัน

### Firebase Blaze (Pay as you go)
- ถ้าใช้เกิน Quota ฟรี
- ค่าใช้จ่ายเริ่มต้น ~$25/เดือน
- **ไม่จำเป็นในตอนนี้!**

---

## ✅ Checklist หลัง Deploy

- [ ] เข้า URL ได้
- [ ] Login ทำงาน
- [ ] Firebase บันทึก Log
- [ ] Location Tracker ทำงาน
- [ ] Google Maps แสดงผล
- [ ] ใช้งานบนมือถือได้
- [ ] แชร์ URL ให้เพื่อนทดสอบ

---

## 🎉 สำเร็จแล้ว!

เว็บไซต์ของคุณพร้อมใช้งานแล้วที่:

**🌐 https://rungroj-carrent.web.app**

แชร์ให้หน่วยงานได้เลย! 🚀
