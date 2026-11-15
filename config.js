// ============================================================
//  設定檔
// ============================================================

// Firebase 連線設定
const firebaseConfig = {
  apiKey: "AIzaSyDU8wrq5Qu2ZumBP4qxefuiel7nx3ljahA",
  authDomain: "math-after-class.firebaseapp.com",
  databaseURL: "https://math-after-class-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "math-after-class",
  storageBucket: "math-after-class.firebasestorage.app",
  messagingSenderId: "557345425793",
  appId: "1:557345425793:web:af7bfe629a1d00771a4080"
};

// 測驗代號：不同次測驗用不同代號，資料就不會混在一起（只能用英文、數字、- ）
const TEST_ID = "pretest-1202";

// 測驗時間（分鐘）
const DURATION_MIN = 30;

// 老師帳號只寫在 Firebase 的安全規則裡（不放在這裡，避免公開在網路上）
