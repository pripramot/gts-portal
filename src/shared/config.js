/**
 * Unicorn Portal - Shared Configuration
 * Centralized configuration for Firebase and API settings
 */

export const firebaseConfig = {
    apiKey: "AIzaSyD1PqVi5kQgmHZFzFpa9GAnOJfwaMZgVJ4",
    authDomain: "rungroj-carrent.firebaseapp.com",
    projectId: "rungroj-carrent",
    storageBucket: "rungroj-carrent.firebasestorage.app",
    messagingSenderId: "63868455430",
    appId: "1:63868455430:web:2eb5e74651c9b887b61187"
};

export const appConfig = {
    name: "Unicorn",
    tagline: "อัจฉริยะ · ซื่อสัตย์ · นวัตกรรม",
    version: "1.0.0",
    organization: "ป.ป.ส.",
    theme: {
        primaryGradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
        primaryColor: "#7c3aed",
        secondaryColor: "#db2777"
    }
};

export const mcpConfig = {
    serverName: "unicorn-mcp-server",
    version: "1.0.0",
    capabilities: {
        tools: true,
        resources: true
    }
};

export const collections = {
    ACCESS_LOGS: "access_logs",
    LOCATION_TRACKS: "location_tracks",
    CASES: "cases",
    REPORTS: "reports"
};
