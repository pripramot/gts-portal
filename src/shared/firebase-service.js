/**
 * ACESO Portal - Firebase Service Module
 * Shared Firebase functionality for browser use
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1PqVi5kQgmHZFzFpa9GAnOJfwaMZgVJ4",
    authDomain: "rungroj-carrent.firebaseapp.com",
    projectId: "rungroj-carrent",
    storageBucket: "rungroj-carrent.firebasestorage.app",
    messagingSenderId: "63868455430",
    appId: "1:63868455430:web:2eb5e74651c9b887b61187"
};

// Collection names
export const COLLECTIONS = {
    ACCESS_LOGS: 'access_logs',
    LOCATION_TRACKS: 'location_tracks',
    CASES: 'cases',
    REPORTS: 'reports'
};

// Initialize Firebase
let app = null;
let db = null;

export function initFirebase() {
    if (!app) {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("✅ Firebase initialized successfully");
    }
    return { app, db };
}

// Export Firestore instance
export function getDb() {
    if (!db) initFirebase();
    return db;
}

// ============================================
// ACCESS LOGS
// ============================================

export async function logAccess(userData) {
    const db = getDb();
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.ACCESS_LOGS), {
            ...userData,
            timestamp: serverTimestamp(),
            status: 'SUCCESS',
            userAgent: navigator.userAgent
        });
        console.log("✅ Access log saved:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error saving access log:", error);
        throw error;
    }
}

// ============================================
// LOCATION TRACKS
// ============================================

export async function saveLocationTrack(trackData) {
    const db = getDb();
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.LOCATION_TRACKS), {
            ...trackData,
            savedAt: serverTimestamp()
        });
        console.log("✅ Location track saved:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error saving location track:", error);
        throw error;
    }
}

export async function getLocationTracks(options = {}) {
    const db = getDb();
    const { phone, maxResults = 50 } = options;

    try {
        let q = collection(db, COLLECTIONS.LOCATION_TRACKS);

        if (phone) {
            q = query(q, where('phone', '==', phone));
        }

        q = query(q, orderBy('savedAt', 'desc'), limit(maxResults));

        const snapshot = await getDocs(q);
        const tracks = [];
        snapshot.forEach((doc) => {
            tracks.push({ id: doc.id, ...doc.data() });
        });

        return tracks;
    } catch (error) {
        console.error("❌ Error getting location tracks:", error);
        throw error;
    }
}

// ============================================
// CASES
// ============================================

export async function createCase(caseData) {
    const db = getDb();
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.CASES), {
            ...caseData,
            status: 'open',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log("✅ Case created:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error creating case:", error);
        throw error;
    }
}

export async function getCase(caseId) {
    const db = getDb();
    try {
        const docRef = doc(db, COLLECTIONS.CASES, caseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("❌ Error getting case:", error);
        throw error;
    }
}

export async function updateCase(caseId, updates) {
    const db = getDb();
    try {
        const docRef = doc(db, COLLECTIONS.CASES, caseId);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        console.log("✅ Case updated:", caseId);
    } catch (error) {
        console.error("❌ Error updating case:", error);
        throw error;
    }
}

export async function getCases(options = {}) {
    const db = getDb();
    const { status, maxResults = 50 } = options;

    try {
        let q = collection(db, COLLECTIONS.CASES);

        if (status) {
            q = query(q, where('status', '==', status));
        }

        q = query(q, orderBy('createdAt', 'desc'), limit(maxResults));

        const snapshot = await getDocs(q);
        const cases = [];
        snapshot.forEach((doc) => {
            cases.push({ id: doc.id, ...doc.data() });
        });

        return cases;
    } catch (error) {
        console.error("❌ Error getting cases:", error);
        throw error;
    }
}

// ============================================
// UTILITIES
// ============================================

export { serverTimestamp };

// Make available globally for non-module scripts
if (typeof window !== 'undefined') {
    window.FirebaseService = {
        initFirebase,
        getDb,
        logAccess,
        saveLocationTrack,
        getLocationTracks,
        createCase,
        getCase,
        updateCase,
        getCases,
        COLLECTIONS
    };
}
