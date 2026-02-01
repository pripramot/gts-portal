#!/usr/bin/env node
/**
 * ACESO MCP Server
 * Model Context Protocol server for ACESO Forensic Portal
 * Provides tools for location tracking, case management, and file operations
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { mcpConfig } from '../shared/config.js';
import { generateId, formatThaiDate } from '../shared/utils.js';

// Create MCP Server
const server = new Server(
    {
        name: mcpConfig.serverName,
        version: mcpConfig.version
    },
    {
        capabilities: {
            tools: {},
            resources: {}
        }
    }
);

// Mock data store (in production, use Firebase)
const dataStore = {
    locationTracks: [],
    accessLogs: [],
    cases: []
};

// ============================================
// TOOLS DEFINITION
// ============================================

const TOOLS = [
    {
        name: "track_location",
        description: "ติดตามตำแหน่งจากเบอร์โทรศัพท์ (Track location from phone number)",
        inputSchema: {
            type: "object",
            properties: {
                phone: {
                    type: "string",
                    description: "เบอร์โทรศัพท์ที่ต้องการติดตาม (Phone number to track)"
                },
                caseName: {
                    type: "string",
                    description: "ชื่อคดี (Case name)"
                },
                docNumber: {
                    type: "string",
                    description: "เลขที่หนังสือ/คำสั่ง (Document/Order number)"
                }
            },
            required: ["phone", "caseName", "docNumber"]
        }
    },
    {
        name: "verify_user",
        description: "ยืนยันตัวตนผู้ใช้งานระบบ (Verify user identity)",
        inputSchema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "ชื่อ-นามสกุล (Full name)"
                },
                unit: {
                    type: "string",
                    description: "หน่วยงาน (Department/Unit)"
                },
                docNumber: {
                    type: "string",
                    description: "เลขที่หนังสือ/คำสั่ง (Document/Order number)"
                }
            },
            required: ["name", "unit", "docNumber"]
        }
    },
    {
        name: "create_case",
        description: "สร้างคดีใหม่ในระบบ (Create new case)",
        inputSchema: {
            type: "object",
            properties: {
                caseName: {
                    type: "string",
                    description: "ชื่อคดี (Case name)"
                },
                description: {
                    type: "string",
                    description: "รายละเอียดคดี (Case description)"
                },
                suspects: {
                    type: "array",
                    items: { type: "string" },
                    description: "รายชื่อผู้ต้องสงสัย (List of suspects)"
                },
                priority: {
                    type: "string",
                    enum: ["low", "medium", "high", "critical"],
                    description: "ระดับความสำคัญ (Priority level)"
                }
            },
            required: ["caseName", "description"]
        }
    },
    {
        name: "get_location_history",
        description: "ดึงประวัติการติดตามตำแหน่ง (Get location tracking history)",
        inputSchema: {
            type: "object",
            properties: {
                phone: {
                    type: "string",
                    description: "เบอร์โทรศัพท์ (Phone number) - optional"
                },
                limit: {
                    type: "number",
                    description: "จำนวนรายการที่ต้องการ (Number of records)"
                }
            }
        }
    },
    {
        name: "generate_report",
        description: "สร้างรายงานคดี (Generate case report)",
        inputSchema: {
            type: "object",
            properties: {
                caseId: {
                    type: "string",
                    description: "รหัสคดี (Case ID)"
                },
                format: {
                    type: "string",
                    enum: ["pdf", "html", "json"],
                    description: "รูปแบบรายงาน (Report format)"
                }
            },
            required: ["caseId"]
        }
    }
];

// ============================================
// RESOURCES DEFINITION (MCP ext-apps UI)
// ============================================

const RESOURCES = [
    {
        uri: "ui://aceso/location-tracker",
        name: "Location Tracker UI",
        description: "Interactive location tracking interface",
        mimeType: "text/html"
    },
    {
        uri: "ui://aceso/case-dashboard",
        name: "Case Dashboard",
        description: "Case management dashboard",
        mimeType: "text/html"
    },
    {
        uri: "ui://aceso/map-view",
        name: "Map Viewer",
        description: "Interactive map for location display",
        mimeType: "text/html"
    }
];

// ============================================
// TOOL HANDLERS
// ============================================

async function handleTrackLocation(args) {
    const { phone, caseName, docNumber } = args;

    // Mock location data (in production, integrate with actual tracking API)
    const mockLocations = [
        { lat: 18.740717, lng: 99.070290, address: "P3R9+GV5, Ton Pao, San Kamphaeng, Chiang Mai" },
        { lat: 13.7563, lng: 100.5018, address: "Bangkok, Thailand" },
        { lat: 7.8804, lng: 98.3923, address: "Phuket, Thailand" }
    ];

    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];

    const trackResult = {
        id: generateId(),
        phone,
        caseName,
        docNumber,
        timestamp: formatThaiDate(),
        position: randomLocation,
        imsi: "520" + Math.random().toString().slice(2, 15),
        network: ["True", "AIS", "DTAC"][Math.floor(Math.random() * 3)],
        networkType: ["3G", "4G", "5G"][Math.floor(Math.random() * 3)],
        status: "Active",
        accuracy: Math.floor(Math.random() * 50) + 10 + "m"
    };

    dataStore.locationTracks.push(trackResult);

    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(trackResult, null, 2)
            },
            {
                type: "resource",
                resource: {
                    uri: `ui://aceso/map-view?lat=${randomLocation.lat}&lng=${randomLocation.lng}`,
                    mimeType: "text/html",
                    text: generateMapHtml(randomLocation.lat, randomLocation.lng, phone)
                }
            }
        ]
    };
}

async function handleVerifyUser(args) {
    const { name, unit, docNumber } = args;

    const logEntry = {
        id: generateId(),
        name,
        unit,
        docNumber,
        timestamp: formatThaiDate(),
        status: "SUCCESS",
        sessionId: generateId()
    };

    dataStore.accessLogs.push(logEntry);

    return {
        content: [{
            type: "text",
            text: `✅ ยืนยันตัวตนสำเร็จ\n\nชื่อ: ${name}\nหน่วยงาน: ${unit}\nเลขที่: ${docNumber}\nSession ID: ${logEntry.sessionId}\nเวลา: ${logEntry.timestamp}`
        }]
    };
}

async function handleCreateCase(args) {
    const { caseName, description, suspects = [], priority = "medium" } = args;

    const newCase = {
        id: generateId(),
        caseName,
        description,
        suspects,
        priority,
        status: "open",
        createdAt: formatThaiDate(),
        updatedAt: formatThaiDate()
    };

    dataStore.cases.push(newCase);

    return {
        content: [{
            type: "text",
            text: `✅ สร้างคดีสำเร็จ\n\nรหัสคดี: ${newCase.id}\nชื่อคดี: ${caseName}\nระดับความสำคัญ: ${priority}\nสถานะ: เปิด\nสร้างเมื่อ: ${newCase.createdAt}`
        }]
    };
}

async function handleGetLocationHistory(args) {
    const { phone, limit = 10 } = args;

    let results = dataStore.locationTracks;

    if (phone) {
        results = results.filter(t => t.phone.includes(phone));
    }

    results = results.slice(-limit);

    return {
        content: [{
            type: "text",
            text: results.length > 0
                ? JSON.stringify(results, null, 2)
                : "ไม่พบประวัติการติดตาม (No tracking history found)"
        }]
    };
}

async function handleGenerateReport(args) {
    const { caseId, format = "json" } = args;

    const caseData = dataStore.cases.find(c => c.id === caseId);

    if (!caseData) {
        return {
            content: [{
                type: "text",
                text: `❌ ไม่พบคดีรหัส ${caseId}`
            }]
        };
    }

    const relatedTracks = dataStore.locationTracks.filter(
        t => t.caseName === caseData.caseName
    );

    const report = {
        case: caseData,
        locationTracks: relatedTracks,
        generatedAt: formatThaiDate(),
        format
    };

    return {
        content: [{
            type: "text",
            text: JSON.stringify(report, null, 2)
        }]
    };
}

// ============================================
// UI GENERATORS (MCP ext-apps)
// ============================================

function generateMapHtml(lat, lng, phone) {
    return `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Map - ${phone}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; }
        .container { padding: 20px; }
        .info-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 15px;
        }
        .map-frame {
            width: 100%;
            height: 300px;
            border: none;
            border-radius: 12px;
        }
        .coords {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="info-box">
            <h3>📍 ตำแหน่งที่พบ</h3>
            <p>เบอร์: ${phone}</p>
        </div>
        <iframe
            class="map-frame"
            src="https://www.google.com/maps?q=${lat},${lng}&output=embed"
            allowfullscreen>
        </iframe>
        <div class="coords">
            <strong>พิกัด:</strong> ${lat}, ${lng}
        </div>
    </div>
</body>
</html>`;
}

function generateLocationTrackerUI() {
    return `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Tracker - MCP UI</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f5f7fa;
            padding: 20px;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        h2 { color: #667eea; margin-bottom: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: 500; }
        input {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
        }
        input:focus { outline: none; border-color: #667eea; }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        .btn:hover { opacity: 0.9; }
    </style>
</head>
<body>
    <div class="card">
        <h2>📍 Location Tracker</h2>
        <div class="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input type="tel" id="phone" placeholder="066-442-3732">
        </div>
        <div class="form-group">
            <label>ชื่อคดี</label>
            <input type="text" id="caseName" placeholder="ชื่อคดี">
        </div>
        <div class="form-group">
            <label>เลขที่หนังสือ</label>
            <input type="text" id="docNumber" placeholder="ที่ 123/2569">
        </div>
        <button class="btn" onclick="trackLocation()">🔍 ค้นหาตำแหน่ง</button>
    </div>
    <script>
        function trackLocation() {
            const data = {
                phone: document.getElementById('phone').value,
                caseName: document.getElementById('caseName').value,
                docNumber: document.getElementById('docNumber').value
            };
            // Send to MCP host
            window.parent.postMessage({ type: 'mcp-tool-call', tool: 'track_location', args: data }, '*');
        }
    </script>
</body>
</html>`;
}

// ============================================
// REQUEST HANDLERS
// ============================================

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOLS };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
        case "track_location":
            return handleTrackLocation(args);
        case "verify_user":
            return handleVerifyUser(args);
        case "create_case":
            return handleCreateCase(args);
        case "get_location_history":
            return handleGetLocationHistory(args);
        case "generate_report":
            return handleGenerateReport(args);
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return { resources: RESOURCES };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    if (uri === "ui://aceso/location-tracker") {
        return {
            contents: [{
                uri,
                mimeType: "text/html",
                text: generateLocationTrackerUI()
            }]
        };
    }

    if (uri.startsWith("ui://aceso/map-view")) {
        const url = new URL(uri.replace("ui://", "http://"));
        const lat = url.searchParams.get("lat") || "13.7563";
        const lng = url.searchParams.get("lng") || "100.5018";
        return {
            contents: [{
                uri,
                mimeType: "text/html",
                text: generateMapHtml(lat, lng, "N/A")
            }]
        };
    }

    throw new Error(`Resource not found: ${uri}`);
});

// ============================================
// START SERVER
// ============================================

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("ACESO MCP Server running on stdio");
}

main().catch(console.error);
