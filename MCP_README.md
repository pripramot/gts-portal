# ACESO MCP Server

MCP (Model Context Protocol) Server สำหรับ ACESO Forensic Portal

## การติดตั้ง

```bash
# ติดตั้ง dependencies
npm install

# รันเซิร์ฟเวอร์
npm start
```

## การใช้งานกับ Claude Desktop / VS Code

เพิ่มการตั้งค่าใน `claude_desktop_config.json` หรือ `.vscode/settings.json`:

```json
{
  "mcpServers": {
    "aceso-portal": {
      "command": "node",
      "args": ["src/mcp-server/index.js"],
      "cwd": "/path/to/gts-portal"
    }
  }
}
```

## Tools ที่มี

### 1. track_location
ติดตามตำแหน่งจากเบอร์โทรศัพท์

**Parameters:**
- `phone` (required): เบอร์โทรศัพท์
- `caseName` (required): ชื่อคดี
- `docNumber` (required): เลขที่หนังสือ

**ตัวอย่าง:**
```json
{
  "phone": "066-442-3732",
  "caseName": "คดีค้นเมทแอมเฟตามีน",
  "docNumber": "ที่ 123/2569"
}
```

### 2. verify_user
ยืนยันตัวตนผู้ใช้งาน

**Parameters:**
- `name` (required): ชื่อ-นามสกุล
- `unit` (required): หน่วยงาน
- `docNumber` (required): เลขที่หนังสือ

### 3. create_case
สร้างคดีใหม่

**Parameters:**
- `caseName` (required): ชื่อคดี
- `description` (required): รายละเอียด
- `suspects` (optional): รายชื่อผู้ต้องสงสัย
- `priority` (optional): low, medium, high, critical

### 4. get_location_history
ดึงประวัติการติดตาม

**Parameters:**
- `phone` (optional): กรองตามเบอร์
- `limit` (optional): จำนวนรายการ (default: 10)

### 5. generate_report
สร้างรายงานคดี

**Parameters:**
- `caseId` (required): รหัสคดี
- `format` (optional): pdf, html, json

## Resources (UI Apps)

MCP Server นี้รองรับ ext-apps สำหรับแสดง UI:

- `ui://aceso/location-tracker` - หน้าติดตามตำแหน่ง
- `ui://aceso/case-dashboard` - Dashboard คดี
- `ui://aceso/map-view` - แผนที่แสดงตำแหน่ง

## โครงสร้างไฟล์

```
gts-portal/
├── src/
│   ├── mcp-server/
│   │   └── index.js          # MCP Server หลัก
│   ├── shared/
│   │   ├── config.js         # การตั้งค่าส่วนกลาง
│   │   ├── utils.js          # Utility functions
│   │   ├── styles.css        # CSS ส่วนกลาง
│   │   └── firebase-service.js # Firebase service
│   └── ui-apps/
│       └── location-tracker-app.html # MCP UI App
├── package.json
├── mcp-config.json           # การตั้งค่า MCP
└── firebase.json
```

## การพัฒนา

```bash
# รันในโหมด development (auto-reload)
npm run dev

# รัน local web server
npm run serve

# Deploy ไป Firebase
npm run deploy
```

## API Reference

ดูรายละเอียด API ได้ที่: https://modelcontextprotocol.github.io/ext-apps/api/
