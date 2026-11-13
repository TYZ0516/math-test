// ============================================================
//  設定檔：只需要改這個檔案
// ============================================================

// ① 把 Firebase「專案設定 → 您的應用程式」裡的 firebaseConfig 整段貼上，取代下面的範例
const firebaseConfig = {
  apiKey: "請貼上",
  authDomain: "請貼上",
  databaseURL: "請貼上",
  projectId: "請貼上",
  storageBucket: "請貼上",
  messagingSenderId: "請貼上",
  appId: "請貼上"
};

// ② 老師的 Google 帳號（後台登入用，要和安全規則裡填的一樣）
const TEACHER_EMAIL = "請填你的gmail@gmail.com";

// ③ 測驗代號：不同次測驗用不同代號，資料就不會混在一起（只能用英文、數字、- ）
const TEST_ID = "pretest-1202";

// ④ 測驗時間（分鐘）
const DURATION_MIN = 30;
