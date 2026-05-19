// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  deleteUser, 
  reauthenticateWithCredential, 
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc,
  collection,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRpbQS2jN_Zp7XzKWYkM0Png4K4yzA9oc",
  authDomain: "familygames-3d0d2.firebaseapp.com",
  databaseURL: "https://familygames-3d0d2-default-rtdb.firebaseio.com",
  projectId: "familygames-3d0d2",
  storageBucket: "familygames-3d0d2.firebasestorage.app",
  messagingSenderId: "326491635543",
  appId: "1:326491635543:web:1ceb365989c448f2c20812",
  measurementId: "G-1LJMLC30GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Ensure local persistence is set for 30-day session caching
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase local persistence set successfully.");
  })
  .catch((err) => {
    console.error("Failed to set Firebase persistence:", err);
  });

// -------------------------------------------------------------
// Custom HTML/CSS Toast Notification System
// -------------------------------------------------------------
export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: '99999',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '380px',
      width: 'calc(100% - 48px)',
      pointerEvents: 'none'
    });
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  
  // Custom styles for modern glassmorphic theme
  Object.assign(toast.style, {
    padding: '14px 20px',
    borderRadius: '14px',
    color: '#f8fafc',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: "'Outfit', 'Inter', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 12px 30px rgba(2, 6, 23, 0.6)',
    backdropFilter: 'blur(16px)',
    transform: 'translateX(120%)',
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease, margin 0.3s ease',
    opacity: '0',
    pointerEvents: 'auto',
    cursor: 'pointer',
    userSelect: 'none'
  });

  let icon = '⚡';
  let bgColor = 'rgba(15, 23, 42, 0.85)';
  let borderColor = 'rgba(139, 92, 246, 0.3)';
  
  if (type === 'success') {
    icon = '✨';
    bgColor = 'rgba(16, 185, 129, 0.15)';
    borderColor = '#10b981';
    toast.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.15)';
  } else if (type === 'error') {
    icon = '💥';
    bgColor = 'rgba(239, 68, 68, 0.15)';
    borderColor = '#ef4444';
    toast.style.boxShadow = '0 12px 30px rgba(239, 68, 68, 0.15)';
  } else if (type === 'warning') {
    icon = '⚠️';
    bgColor = 'rgba(245, 158, 11, 0.15)';
    borderColor = '#f59e0b';
    toast.style.boxShadow = '0 12px 30px rgba(245, 158, 11, 0.15)';
  } else {
    // Info / default
    icon = '⚡';
    bgColor = 'rgba(139, 92, 246, 0.15)';
    borderColor = '#8b5cf6';
    toast.style.boxShadow = '0 12px 30px rgba(139, 92, 246, 0.15)';
  }

  toast.style.background = bgColor;
  toast.style.border = `1px solid ${borderColor}`;

  toast.innerHTML = `
    <span style="font-size: 20px; display: inline-flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">${icon}</span>
    <div style="flex: 1; line-height: 1.4;">${message}</div>
  `;
  
  container.appendChild(toast);

  // Slide-in transition
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 10);

  const dismiss = () => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 450);
  };

  const autoDismiss = setTimeout(dismiss, 4500);

  toast.addEventListener('click', () => {
    clearTimeout(autoDismiss);
    dismiss();
  });
}

// -------------------------------------------------------------
// Export Core Authentication and Database references
// -------------------------------------------------------------
export { 
  auth, 
  db, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  collection,
  getDocs,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  deleteUser, 
  reauthenticateWithCredential, 
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
};
