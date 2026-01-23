# 🌐 ACESO Web Portal

ระบบ ACESO Forensic แบบ Web สำหรับ ป.ป.ส.

---

## ✨ Features

- ✅ ใช้งานผ่าน Browser (ทุกแพลตฟอร์ม)
- ✅ รองรับมือถือ (Android + iOS)
- ✅ AI Chatbot ยืนยันตัวตน (Gemini)
- ✅ Firebase Backend
- ✅ Location Tracker
- ✅ Remote ACESO Access (ในอนาคต)
- ✅ Case Management (ในอนาคต)

---

## 📦 ไฟล์ที่มี

```
ACESO_Web/
├── index.html                 ← หน้าหลัก (Login + Dashboard)
├── location-tracker.html      ← Location Tracker
├── README.md                  ← คู่มือนี้
└── (เพิ่มหน้าอื่นๆ ในอนาคต)
```

---

## 🚀 วิธีใช้งาน

### **1. ทดสอบในเครื่อง (Local)**

```bash
# เปิดไฟล์ index.html ด้วย Browser
cd C:\Users\usEr\Project\ACESO_Web
start index.html
```

หรือ Double-click ไฟล์ `index.html`

---

### **2. Deploy ขึ้น Firebase Hosting (แนะนำ!)**

#### **ขั้นตอนที่ 1: ติดตั้ง Firebase CLI**

```bash
npm install -g firebase-tools
```

#### **ขั้นตอนที่ 2: Login Firebase**

```bash
firebase login
```

#### **ขั้นตอนที่ 3: Init Firebase Project**

```bash
cd C:\Users\usEr\Project\ACESO_Web
firebase init hosting
```

เลือก:
- **Project:** rungroj-carrent
- **Public directory:** . (current directory)
- **Single-page app:** Yes
- **Overwrite index.html:** No

#### **ขั้นตอนที่ 4: Deploy!**

```bash
firebase deploy --only hosting
```

จะได้ URL: `https://rungroj-carrent.web.app`

---

### **3. Deploy ด้วย GitHub Pages (ฟรี!)**

1. สร้าง GitHub Repository
2. Push code ขึ้น GitHub
3. ไปที่ Settings → Pages
4. เลือก Branch: main
5. เลือก Folder: / (root)
6. Save

จะได้ URL: `https://[username].github.io/[repo-name]`

---

### **4. Deploy ด้วย Netlify (ฟรี! ง่ายที่สุด)**

1. ไปที่ https://netlify.com
2. Sign up (ฟรี)
3. Drag & Drop โฟลเดอร์ ACESO_Web
4. เสร็จ! ได้ URL ทันที

---

## 🔧 การตั้งค่า

### **Firebase Configuration**

ไฟล์ทั้งสองใช้ Firebase config เดียวกัน:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyD1PqVi5kQgmHZFzFpa9GAnOJfwaMZgVJ4",
    authDomain: "rungroj-carrent.firebaseapp.com",
    projectId: "rungroj-carrent",
    storageBucket: "rungroj-carrent.firebasestorage.app",
    messagingSenderId: "63868455430",
    appId: "1:63868455430:web:2eb5e74651c9b887b61187"
};
```

---

## 📱 การใช้งานบนมือถือ

1. เปิด Browser บนมือถือ (Chrome/Safari)
2. ไปที่ URL ของ Web Portal
3. Login ด้วยข้อมูล
4. ใช้งานเหมือนบน PC

---

## 🎯 Features ที่ใช้งานได้

### ✅ **หน้า Login**
- กรอกข้อมูลยืนยันตัวตน
- AI Chatbot แสดงการสนทนา
- บันทึก Log ลง Firebase

### ✅ **Dashboard**
- แสดงข้อมูลผู้ใช้
- เมนูหลัก 4 เมนู
- ออกจากระบบ

### ✅ **Location Tracker**
- กรอกเบอร์โทรศัพท์
- แสดงพิกัดบน Google Maps
- บันทึกข้อมูลลง Firebase
- (Export PDF - กำลังพัฒนา)

### 🔄 **กำลังพัฒนา**
- Remote ACESO Access
- Case Management
- Report Viewer
- Mobile App

---

## 🔒 Security

- ✅ Firebase Authentication (เตรียมไว้)
- ✅ บันทึก Log ทุกการเข้าใช้
- ✅ ตรวจสอบสิทธิ์ผ่าน AI
- ⚠️ ยังไม่มี HTTPS (ถ้า deploy แล้วจะมีอัตโนมัติ)

---

## 💰 ค่าใช้จ่าย

| Service | Plan | ราคา/เดือน |
|---------|------|------------|
| Firebase Hosting | Spark (Free) | **ฟรี!** |
| Firebase Firestore | Spark (Free) | **ฟรี!** |
| Gemini API | Free Tier | **ฟรี!** |
| **รวม** | | **0 บาท!** |

---

## 📊 Firebase Firestore Collections

### **access_logs**
```json
{
  "name": "นาย สมชาย ใจดี",
  "unit": "สน.บช.น. ป.ป.ส.ภ.5",
  "document": "ที่ 123/2569",
  "timestamp": "2026-01-23T17:00:00Z",
  "status": "SUCCESS",
  "userAgent": "Mozilla/5.0..."
}
```

### **location_tracks**
```json
{
  "phone": "066-442-3732",
  "caseName": "คดีค้นเมทแอมเฟตามีน",
  "docNumber": "ที่ 123/2569",
  "position": {
    "lat": 18.740717,
    "lng": 99.070290
  },
  "address": "Ton Pao, San Kamphaeng...",
  "imsi": "520044725152238",
  "network": "True",
  "savedAt": "2026-01-23T17:05:00Z"
}
```

---

## 🎨 Customization

### **เปลี่ยนสี**

แก้ไขใน `<style>`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

เปลี่ยนเป็นสีอื่น:
- ฟ้า-เขียว: `#667eea` → `#11998e`, `#764ba2` → `#38ef7d`
- แดง-ส้ม: `#667eea` → `#f12711`, `#764ba2` → `#f5af19`

### **เปลี่ยนโลโก้**

แก้ไขใน HTML:

```html
<h1>🔍 ACESO Forensic</h1>
```

เปลี่ยน emoji หรือใส่ `<img>` แทน

---

## 🐛 Troubleshooting

### **ปัญหา: ไม่สามารถบันทึก Firebase ได้**

ตรวจสอบ:
1. Internet connection
2. Firebase config ถูกต้องหรือไม่
3. เปิด Console (F12) ดู error

### **ปัญหา: แสดงแผนที่ไม่ได้**

ตรวจสอบ:
1. Internet connection
2. พิกัดถูกต้องหรือไม่
3. Google Maps iframe โหลดได้หรือไม่

---

## 📞 Support

หากมีปัญหา ติดต่อ:
- Email: [your-email]
- Line: [your-line-id]

---

## 🎉 Next Steps

หลังจาก Deploy แล้ว:

1. ✅ Test บนมือถือ
2. ✅ แจก URL ให้หน่วยงานทดสอบ
3. ✅ รวบรวม Feedback
4. 🔄 พัฒนาฟีเจอร์เพิ่ม:
   - Remote Desktop Integration
   - Case Management
   - Report Generator
   - Mobile App

---

## 📄 License

สร้างโดย: Claude Code Assistant
สำหรับ: สำนักงาน ป.ป.ส.
วันที่: 23 มกราคม 2026

---

**🚀 พร้อม Deploy แล้ว!**
