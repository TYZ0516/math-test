// ============================================================
//  題庫：opts[0] 一律是正解（學生畫面會自動打亂順序）
//  why[] 是每個選項對應的錯誤觀念，檢討時顯示
// ============================================================
const F = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const R = x => `<span class="rad">√<span class="rt">${x}</span></span>`;
const SYS = (...rows) => `<span class="sys">${rows.map(r => `<span>${r}</span>`).join('')}</span>`;
const SQ = '<sup>2</sup>';

const ROOMS = [
  { name: '入口大廳', monster: 'slime' },
  { name: '迴廊', monster: 'bat' },
  { name: '地下室', monster: 'skeleton' },
  { name: '深淵', monster: 'ghost' },
  { name: '魔王房', monster: 'dragon' }
];

const QUESTIONS = [
  { id: 'q1', room: 0, topic: '正負數',
    stem: '(−18) + 7 − (−25) − 9 + (−3) = ?',
    opts: ['2', '−48', '−2', '12'],
    why: ['', '把 −(−25) 當成 −25', '計算過程正負號錯', '漏算其中一項'] },
  { id: 'q2', room: 0, topic: '一元一次',
    stem: `${F('2x − 1', '3')} − ${F('x + 2', '4')} = 1，x = ?`,
    opts: [F('22', '5'), '2', F('11', '5'), F('18', '5')],
    why: ['', '減號沒有分配進括號', '右邊的 1 忘了乘 12', '分配律只乘到第一項'] },
  { id: 'q3', room: 0, topic: '根式',
    stem: `${R('6')} × ${R('15')} 化為最簡根式 = ?`,
    opts: [`3${R('10')}`, R('21'), `9${R('10')}`, `10${R('3')}`],
    why: ['', '根號內直接相加', '移到根號外時沒有開根號', '因數拆錯'] },

  { id: 'q4', room: 1, topic: '正負數',
    stem: '[(−2)<sup>3</sup> − (−4)<sup>2</sup>] ÷ (−6) × 3 − (−5) = ?',
    opts: ['17', '7', '9', F('19', '3')],
    why: ['', '最後的 −(−5) 變號錯', '以為 (−2)³ = 8', '先算 (−6)×3 再除（運算順序錯）'] },
  { id: 'q5', room: 1, topic: '一元一次',
    stem: '3(2x − 5) − 4(x − 3) = 7，x = ?',
    opts: ['5', '17', '2', F('25', '2')],
    why: ['', '−4×(−3) 算成 −12', '移項時 −3 沒有變號', '−4 只乘到 x'] },
  { id: 'q6', room: 1, topic: '線型函數',
    stem: 'f(x) = −3x + 7，則 f(−4) − f(2) = ?',
    opts: ['18', '−6', '20', '−18'],
    why: ['', '−3×(−4) 算成 −12', '把減法看成加法', '前後相減的順序弄反'] },

  { id: 'q7', room: 2, topic: '畢氏定理',
    stem: '直角三角形的斜邊長為 25，一股長為 7，另一股長 = ?',
    opts: ['24', '18', R('674'), '32'],
    why: ['', '邊長直接相減', '平方相加而不是相減', '邊長直接相加'] },
  { id: 'q8', room: 2, topic: '二元一次',
    stem: `${SYS('3x + 2y = −4', '5x − 2y = 20')}　(x, y) = ?`,
    opts: ['(2, −5)', '(2, 5)', '(−5, 2)', '(4, 0)'],
    why: ['', '求 y 時正負號錯', 'x、y 對調', '只滿足第二式'] },
  { id: 'q9', room: 2, topic: '一元二次',
    stem: `2x${SQ} + 5x − 12 = 0，x = ?`,
    opts: [`${F('3', '2')} 或 −4`, `−${F('3', '2')} 或 4`, '3 或 −4', `${F('2', '3')} 或 −4`],
    why: ['', '根的正負號錯', '忘了除以 2', '分子分母顛倒'] },

  { id: 'q10', room: 3, topic: '根式',
    stem: `${R('48')} − ${R('27')} + 2${R('75')} = ?`,
    opts: [`11${R('3')}`, R('96'), `6${R('3')}`, `17${R('3')}`],
    why: ['', '根號內直接加減', '2√75 的 2 漏乘', '正負號錯'] },
  { id: 'q11', room: 3, topic: '畢氏定理',
    stem: '坐標平面上 A(−3, 5)、B(5, −1)，<span class="ov">AB</span> 的長 = ?',
    opts: ['10', '14', `2${R('5')}`, '100'],
    why: ['', '水平距離加垂直距離', '距離算成 5−3、5−1（正負號錯）', '忘了開根號'] },
  { id: 'q12', room: 3, topic: '線型函數',
    stem: '一直線通過 (−2, 9) 與 (4, −3)，此線型函數為？',
    opts: ['y = −2x + 5', 'y = 2x + 13', `y = −${F('1', '2')}x + 8`, 'y = −2x + 13'],
    why: ['', '斜率正負號錯', '斜率分子分母顛倒', '代入求 b 時正負號錯'] },

  { id: 'q13', room: 4, topic: '二元一次',
    stem: `${SYS(`${F('x', '2')} + ${F('y', '3')} = 4`, '3x − 2y = 0')}　(x, y) = ?`,
    opts: ['(4, 6)', '(6, 4)', '(2, 9)', '(−4, −6)'],
    why: ['', 'x、y 對調', '只滿足第一式', '只滿足第二式'] },
  { id: 'q14', room: 4, topic: '配方法',
    stem: `將 x${SQ} − 8x + 3 = 0 配方成 (x − h)${SQ} = k 的形式，結果為？`,
    opts: [`(x − 4)${SQ} = 13`, `(x − 4)${SQ} = 19`, `(x − 4)${SQ} = −13`, `(x − 8)${SQ} = 61`],
    why: ['', '常數項移項沒有變號', '補的 16 沒有加到右邊', '一次項係數沒有除以 2'] },
  { id: 'q15', room: 4, topic: '一元二次',
    stem: `3x${SQ} + 4x − 2 = 0，x = ?`,
    opts: [F(`−2 ± ${R('10')}`, '3'), F(`2 ± ${R('10')}`, '3'), F(`−4 ± 2${R('10')}`, '3'), F(`−2 ± ${R('10')}`, '6')],
    why: ['', '−b 的正負號錯', '分母用 a 而不是 2a', '只約了分子'] }
];

const TOPICS = ['正負數', '一元一次', '根式', '線型函數', '畢氏定理', '二元一次', '一元二次', '配方法'];

// ---------- 像素怪物 ----------
const MONSTERS = {
  slime: { pal: { g: '#5ad17a', d: '#2f8a4a', w: '#ffffff', k: '#1b1430', r: '#e8575a' }, map: [
    '....gggg....',
    '..gggggggg..',
    '.gggggggggg.',
    '.ggwkggwkgg.',
    'gggwkggwkggg',
    'gggggggggggg',
    'ggggkkkkgggg',
    'dggggggggggd',
    '.dddddddddd.'] },
  bat: { pal: { p: '#9b6ce8', d: '#5b3a99', w: '#ffffff', k: '#1b1430', r: '#e8575a' }, map: [
    'd..........d',
    'dd...pp...dd',
    'ddd.pppp.ddd',
    'dddpwkkwpddd',
    'ddppppppppdd',
    'd.pprwwrpp.d',
    '...pppppp...',
    '....p..p....'] },
  skeleton: { pal: { w: '#f2efe6', g: '#b9b4a6', k: '#1b1430', r: '#e8575a' }, map: [
    '...wwwwww...',
    '..wwwwwwww..',
    '..wkkwwkkw..',
    '..wkrwwrkw..',
    '..wwwkkwww..',
    '...wkwkwk...',
    '....gggg....',
    '..wgwwwwgw..',
    '....gwwg....',
    '...ww..ww...'] },
  ghost: { pal: { b: '#9fd8ff', d: '#5aa9de', k: '#1b1430', w: '#ffffff' }, map: [
    '....bbbb....',
    '..bbbbbbbb..',
    '.bbbbbbbbbb.',
    '.bbkwbbkwbb.',
    '.bbkkbbkkbb.',
    '.bbbbbbbbbb.',
    '.bbbbkkbbbb.',
    '.bbbbbbbbbb.',
    '.dbbdbbdbbd.',
    '.d..d..d..d.'] },
  dragon: { pal: { r: '#e8575a', d: '#9c2f3c', y: '#ffd166', k: '#1b1430', w: '#ffffff' }, map: [
    '.d.......d......',
    '.dd.....dd......',
    '..rrrrrrr.......',
    '.rrwkrrwkr...dd.',
    '.rrrrrrrrrr.ddd.',
    'rrrkrkrkrrrrdd..',
    'rrwrwrwrrrrrr...',
    '.rrrrrrrryyrr...',
    '..rrrrrryyyrrr..',
    '..rr.rryyyyrrrr.',
    '..rr..rrrrrr.rr.',
    '.rrr..rrr.rrr...'] }
};

function pixelSVG(name, px = 10) {
  const m = MONSTERS[name]; const w = m.map[0].length, h = m.map.length;
  let s = `<svg viewBox="0 0 ${w} ${h}" width="${w * px}" height="${h * px}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">`;
  m.map.forEach((row, y) => [...row].forEach((c, x) => {
    if (m.pal[c]) s += `<rect x="${x}" y="${y}" width="1" height="1" fill="${m.pal[c]}"/>`;
  }));
  return s + '</svg>';
}

// ---------- 數學排版 CSS（兩個頁面共用） ----------
(function () {
  const css = `
  .fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.82em;margin:0 .12em;line-height:1.15}
  .fr>span:first-child{border-bottom:2px solid currentColor;padding:0 .2em .05em}
  .fr>span:last-child{padding:.05em .2em 0}
  .rad{white-space:nowrap}.rt{border-top:2px solid currentColor;padding:0 .12em;margin-left:.02em}
  .sys{display:inline-flex;flex-direction:column;vertical-align:middle;border-left:3px solid currentColor;padding:.1em .5em;text-align:left;line-height:1.6}
  .ov{text-decoration:overline}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();
