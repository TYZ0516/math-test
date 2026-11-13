// ============================================================
//  示範模式：config.js 還沒填 Firebase 時自動使用
//  資料存在這台電腦的瀏覽器裡，同一台電腦開多個分頁可以模擬學生＋老師
// ============================================================
(function () {
  const KEY = 'mockdb';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  let data = load();
  const listeners = [];
  const parts = p => String(p).split('/').filter(Boolean);
  const clone = v => v == null ? null : JSON.parse(JSON.stringify(v));
  const getAt = p => { let d = data; for (const k of parts(p)) { if (d == null || typeof d !== 'object') return null; d = d[k]; } return d === undefined ? null : d; };
  const resolve = v => {
    if (v && typeof v === 'object') {
      if (v['.sv'] === 'timestamp') return Date.now();
      if (v['.sv'] && v['.sv'].increment !== undefined) return v;
      const o = {}; for (const k in v) o[k] = resolve(v[k]); return o;
    } return v;
  };
  const setAt = (p, v) => {
    const ks = parts(p); if (!ks.length) { data = v || {}; return; }
    let d = data;
    for (let i = 0; i < ks.length - 1; i++) { if (typeof d[ks[i]] !== 'object' || d[ks[i]] === null) d[ks[i]] = {}; d = d[ks[i]]; }
    if (v === null || v === undefined) delete d[ks[ks.length - 1]]; else d[ks[ks.length - 1]] = v;
  };
  const snap = p => { const v = clone(getAt(p)); return { val: () => v, exists: () => v != null }; };
  const fire = () => listeners.forEach(l => l.fn(snap(l.path)));
  const save = () => { localStorage.setItem(KEY, JSON.stringify(data)); fire(); };
  window.addEventListener('storage', e => { if (e.key === KEY) { data = load(); fire(); } });

  function ref(p = '') {
    p = parts(p).join('/');
    return {
      child: c => ref(p + '/' + c),
      on: (ev, fn) => { if (p === '.info/serverTimeOffset') { fn({ val: () => 0 }); return; } listeners.push({ path: p, fn }); fn(snap(p)); },
      off: () => { for (let i = listeners.length - 1; i >= 0; i--) if (listeners[i].path === p) listeners.splice(i, 1); },
      get: async () => snap(p),
      set: async v => { setAt(p, resolve(v)); save(); },
      update: async o => { for (const k in o) setAt(p + '/' + k, resolve(o[k])); save(); },
      remove: async () => { setAt(p, null); save(); }
    };
  }

  let uid = sessionStorage.getItem('mockuid');
  let user = null; const authCbs = [];
  const setUser = u => { user = u; authCbs.forEach(cb => cb(u)); };
  const authObj = {
    get currentUser() { return user; },
    onAuthStateChanged: cb => { authCbs.push(cb); setTimeout(() => cb(user), 0); },
    signInAnonymously: async () => {
      if (!uid) { uid = 'demo-' + Math.random().toString(36).slice(2, 8); sessionStorage.setItem('mockuid', uid); }
      setUser({ uid, isAnonymous: true });
    },
    signInWithPopup: async () => setUser({ uid: 'teacher', email: TEACHER_EMAIL, displayName: '老師（示範）' }),
    signOut: async () => setUser(null)
  };

  const fb = {
    initializeApp: () => {},
    auth: () => authObj,
    database: () => ({ ref })
  };
  fb.auth.GoogleAuthProvider = function () {};
  fb.database.ServerValue = { TIMESTAMP: { '.sv': 'timestamp' } };
  window.firebase = fb;
  window.DEMO_MODE = true;
})();
