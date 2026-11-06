/* 絵カードのデータ（絵はすべてこのファイルで描いた自作のSVG）
   st＝段階（1:0〜3か月 2:4〜7か月 3:8〜12か月）、w＝ことば、on＝読み上げる音、tip＝おとなの声かけ
   id は学習記録・書き込みの保存名なので変えないこと */
const K = "#1a1a1a", R = "#e0302b", W = "#ffffff", BG = "#fff8ec";
const rng = n => Array.from({ length: n }, (_, i) => i);
const S = (inner, bg) => `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">${bg ? `<rect width="400" height="400" fill="${bg}"/>` : ""}${inner}</svg>`;
const C = (x, y, r, f, ex = "") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${ex}/>`;
const E = (x, y, rx, ry, f, ex = "") => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const L = (d, c, w) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const RC = (x, y, w, h, r, f, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${ex}/>`;
const star = (cx, cy, ro, ri, f, ex = "") => {
  const p = rng(10).map(i => { const a = Math.PI / 5 * i - Math.PI / 2, r = i % 2 ? ri : ro; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; });
  return `<polygon points="${p.join(" ")}" fill="${f}" ${ex}/>`;
};
const eyes = (y = 200, dx = 50, r = 16) => C(200 - dx, y, r, K) + C(200 + dx, y, r, K) + C(200 - dx + 5, y - 5, r / 3, W) + C(200 + dx + 5, y - 5, r / 3, W);
const cheeks = (y = 258, dx = 82) => E(200 - dx, y, 24, 15, "#f7a1a8", 'opacity=".8"') + E(200 + dx, y, 24, 15, "#f7a1a8", 'opacity=".8"');
const HEART = "M200 345 C 60 255 35 150 105 100 C 155 65 195 92 200 132 C 205 92 245 65 295 100 C 365 150 340 255 200 345Z";

/* ---------- 段階1：しろくろ・あか（0〜3か月） ---------- */
const spiral = (() => { let d = ""; for (let t = 0; t <= 6 * Math.PI; t += 0.12) { const r = 8 + 182 * t / (6 * Math.PI); d += (d ? "L" : "M") + (200 + r * Math.cos(t)).toFixed(1) + " " + (200 + r * Math.sin(t)).toFixed(1); } return d; })();
const ST1 = [
  ["s1-tate", "たてしま", "しましま", S(rng(8).map(i => RC(i * 50, 0, 25, 400, 0, K)).join(""), W)],
  ["s1-yoko", "よこしま", "しましま", S(rng(8).map(i => RC(0, i * 50, 400, 25, 0, K)).join(""), W)],
  ["s1-ichimatsu", "いちまつ", "しかく しかく", S(rng(25).map(i => (i % 5 + Math.floor(i / 5)) % 2 ? "" : RC(i % 5 * 80, Math.floor(i / 5) * 80, 80, 80, 0, K)).join(""), W)],
  ["s1-mato", "まと", "まる まる まる", S([190, 150, 110, 70, 30].map((r, i) => C(200, 200, r, i % 2 ? W : K)).join(""), W)],
  ["s1-mizutama", "みずたま", "ぽつぽつ", S(rng(16).map(i => C(50 + i % 4 * 100 + (Math.floor(i / 4) % 2) * 0, 50 + Math.floor(i / 4) * 100, 30, K)).join(""), W)],
  ["s1-uzumaki", "うずまき", "ぐるぐる", S(L(spiral, K, 24), W)],
  ["s1-kao", "おかお", "こんにちは", S(C(200, 200, 165, "none", `stroke="${K}" stroke-width="24"`) + C(140, 165, 28, K) + C(260, 165, 28, K) + L("M120 250 Q200 320 280 250", K, 24), W)],
  ["s1-giza", "ぎざぎざ", "ぎざぎざ", S(rng(5).map(i => L("M-10 " + (60 + i * 75) + rng(9).map(j => ` L${j * 50 + 25} ${60 + i * 75 + (j % 2 ? -28 : 28)}`).join(""), K, 20)).join(""), W)],
  ["s1-hoshi", "ほし", "きらきら", S(star(200, 215, 185, 75, K), W)],
  ["s1-heart", "ハート", "どきどき", S(P(HEART, K), W)],
  ["s1-sakana", "さかな", "すいすい", S(P("M300 200 L385 120 L385 280Z", K) + E(185, 200, 145, 95, K) + L("M175 120 Q150 200 175 280", W, 16) + L("M235 125 Q210 200 235 275", W, 16) + C(100, 180, 22, W) + C(100, 180, 10, K), W)],
  ["s1-chou", "ちょうちょ", "ひらひら", S(E(125, 140, 95, 80, K, 'transform="rotate(-25 125 140)"') + E(275, 140, 95, 80, K, 'transform="rotate(25 275 140)"') + E(140, 275, 70, 60, K, 'transform="rotate(25 140 275)"') + E(260, 275, 70, 60, K, 'transform="rotate(-25 260 275)"') + C(120, 140, 26, W) + C(280, 140, 26, W) + C(145, 275, 18, W) + C(255, 275, 18, W) + RC(186, 105, 28, 230, 14, K) + L("M195 110 Q175 50 150 40 M205 110 Q225 50 250 40", K, 8), W)],
  ["s1-kuma", "くまさん", "くまさん", S(C(105, 105, 58, K) + C(295, 105, 58, K) + C(105, 105, 26, W) + C(295, 105, 26, W) + C(200, 225, 150, K) + E(200, 285, 75, 55, W) + E(200, 262, 26, 18, K) + C(140, 200, 24, W) + C(260, 200, 24, W) + C(140, 200, 11, K) + C(260, 200, 11, K), W)],
  ["s1-taiyou", "おひさま", "ぽかぽか", S(C(200, 200, 90, K) + rng(12).map(i => { const a = Math.PI / 6 * i; return L(`M${(200 + 115 * Math.cos(a)).toFixed(1)} ${(200 + 115 * Math.sin(a)).toFixed(1)} L${(200 + 180 * Math.cos(a)).toFixed(1)} ${(200 + 180 * Math.sin(a)).toFixed(1)}`, K, 22); }).join(""), W)],
  ["s1-akamato", "あかい まと", "まる まる", S([190, 150, 110, 70, 30].map((r, i) => C(200, 200, r, i % 2 ? W : R)).join(""), W)],
  ["s1-akashima", "あかと くろ", "しましま", S(rng(8).map(i => RC(0, i * 50, 400, 50, 0, i % 2 ? R : K)).join(""), W)],
  ["s1-akamaru", "あかい まる", "まーる", S(C(200, 200, 160, R, `stroke="${K}" stroke-width="20"`), W)],
  ["s1-koushi", "こうし", "ます ます", S(rng(7).map(i => RC(i * 66 - 8, 0, 16, 400, 0, K) + RC(0, i * 66 - 8, 400, 16, 0, K)).join(""), W)],
  ["s1-naname", "ななめ", "しゅっ しゅっ", S(`<g transform="rotate(45 200 200)">${rng(10).map(i => RC(-150 + i * 80, -150, 40, 700, 0, K)).join("")}</g>`, W)],
  ["s1-sankaku", "さんかく", "とんがり", S(rng(9).map(i => { const x = i % 3 * 133 + 66, y = Math.floor(i / 3) * 133 + 66; return P(`M${x} ${y - 52} L${x + 58} ${y + 48} L${x - 58} ${y + 48}Z`, K); }).join(""), W)],
  ["s1-kuruma", "くるま", "ぶーぶー", S(P("M30 270 L30 205 Q35 180 70 175 L120 170 L160 105 Q170 92 190 92 L280 92 Q300 92 312 108 L350 170 Q375 175 375 205 L375 270Z", K) + P("M178 112 L210 112 L210 165 L142 165Z", W) + P("M230 112 L272 112 Q285 112 292 122 L322 165 L230 165Z", W) + C(110, 280, 46, K, `stroke="${W}" stroke-width="10"`) + C(300, 280, 46, K, `stroke="${W}" stroke-width="10"`) + C(110, 280, 16, W) + C(300, 280, 16, W), W)],
  ["s1-hana", "おはな", "さいた さいた", S(rng(6).map(i => { const a = Math.PI / 3 * i; return C(200 + 105 * Math.cos(a), 200 + 105 * Math.sin(a), 70, K); }).join("") + C(200, 200, 62, W) + C(200, 200, 30, K), W)],
];
const TIP1 = "顔から20〜30cmはなして見せます。ゆっくり右・左に動かして、目で追うか見てみましょう。目をそらしたら、その日はおしまいでOK。";

/* ---------- 段階2：かお・いろ・みのまわり（4〜7か月） ---------- */
const SKIN = "#fde0c5", HAIR = "#5b3a24";
const faceBase = () => C(200, 215, 150, SKIN) + P("M60 185 Q70 60 200 58 Q330 60 340 185 Q300 120 200 118 Q100 120 60 185Z", HAIR) + C(52, 225, 26, SKIN) + C(348, 225, 26, SKIN);
const hand = (x, y, s = 1, rot = 0, col = SKIN) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${[-36, -12, 12, 36].map((fx, i) => RC(fx - 11, -95 + Math.abs(i - 1.5) * 10, 22, 70, 11, col, 'stroke="#d9a983" stroke-width="3"')).join("")}${RC(-55, -10, 34, 64, 17, col, 'stroke="#d9a983" stroke-width="3" transform="rotate(-40 -38 22)"')}${E(0, 10, 50, 46, col, 'stroke="#d9a983" stroke-width="3"')}</g>`;
const KAO = [
  ["s2-niko", "にこにこ", "にこにこ", S(faceBase() + L("M120 205 Q150 175 180 205 M220 205 Q250 175 280 205", K, 11) + cheeks(255, 95) + P("M140 265 Q200 345 260 265Z", "#c0392b") + P("M165 300 Q200 330 235 300 Q200 310 165 300Z", "#f28b82"), BG), "「にこにこ、うれしいね」と、おとなも笑って見せましょう。"],
  ["s2-een", "えーんえーん", "えーん えーん", S(faceBase() + L("M120 200 L175 210 M280 200 L225 210", K, 11) + L("M125 175 L170 190 M275 175 L230 190", K, 7) + P("M150 225 Q140 255 150 270 Q162 255 150 225Z", "#5aa9e6") + P("M250 225 Q240 255 250 270 Q262 255 250 225Z", "#5aa9e6") + P("M150 310 Q200 255 250 310Z", "#c0392b"), BG), "「かなしいね、えーんえーん」。気持ちのことばを添えると、ことばのもとになります。"],
  ["s2-bikkuri", "びっくり", "びっくり！", S(faceBase() + C(145, 205, 26, W, `stroke="${K}" stroke-width="6"`) + C(255, 205, 26, W, `stroke="${K}" stroke-width="6"`) + C(145, 208, 12, K) + C(255, 208, 12, K) + L("M115 160 Q145 140 175 160 M225 160 Q255 140 285 160", K, 8) + E(200, 295, 28, 36, "#c0392b"), BG), "「わっ、びっくり！」と少し大げさに。表情をまねっこするかも。"],
  ["s2-inai", "いないいない", "いないいない…", S(faceBase() + hand(140, 230, 1, 0) + hand(260, 230, 1, 0) + P("M165 300 Q200 320 235 300", "none", `stroke="${K}" stroke-width="8" stroke-linecap="round"`), BG), "「いないいない…」で少し待ってから、次のカードで「ばあ！」。6か月ごろから楽しめることが多いです。"],
  ["s2-baa", "ばあ！", "ばあ！", S(faceBase() + C(150, 200, 18, K) + C(250, 200, 18, K) + C(155, 194, 6, W) + C(255, 194, 6, W) + cheeks(250, 95) + E(200, 290, 45, 40, "#c0392b") + E(200, 305, 28, 18, "#f28b82") + hand(48, 210, .8, -25) + hand(352, 210, .8, 25), BG), "「ばあ！」で笑顔。くり返すほど楽しみに待つようになります。"],
];
const blob = (f, faceCol = K) => S(P("M200 50 C300 45 360 120 355 205 C350 300 285 355 200 352 C110 350 45 290 48 200 C50 115 110 55 200 50Z", f) + E(150, 130, 40, 22, W, 'opacity=".35" transform="rotate(-30 150 130)"') + C(160, 200, 14, faceCol) + C(240, 200, 14, faceCol) + L("M165 250 Q200 280 235 250", faceCol, 9), BG);
const IRO = [
  ["s2-aka", "あか", "あか", blob("#e53935"), "「あかい りんご」「あかい いちご」。まわりの赤いものも指さしてみましょう。"],
  ["s2-ao", "あお", "あお", blob("#1e63d6"), "「あおい おそら」。ことばと色を何度もセットで。"],
  ["s2-kiiro", "きいろ", "きいろ", blob("#fbc02d"), "「きいろい バナナ」。"],
  ["s2-midori", "みどり", "みどり", blob("#2e9d4a"), "「みどりの はっぱ」。おさんぽで本物も見せましょう。"],
  ["s2-pink", "ピンク", "ピンク", blob("#f06292"), "「ピンクの おはな」。"],
  ["s2-orange", "オレンジ", "オレンジ", blob("#fb8c00"), "「オレンジの みかん」。"],
  ["s2-murasaki", "むらさき", "むらさき", blob("#8e44ad", W), "「むらさきの ぶどう」。"],
  ["s2-chairo", "ちゃいろ", "ちゃいろ", blob("#8d5a3b", W), "「ちゃいろの くまさん」。"],
];
const MIJIKA = [
  ["s2-ball", "ボール", "ころころ", S(C(200, 210, 150, "#e53935") + P("M62 160 Q200 230 338 160 L345 200 Q200 280 55 200Z", "#fbc02d") + P("M80 280 Q200 330 320 280 L300 310 Q200 350 100 310Z", "#1e63d6") + E(140, 120, 40, 22, W, 'opacity=".45" transform="rotate(-30 140 120)"'), BG), "「ころころ〜」と転がして見せると、目で追います。"],
  ["s2-cup", "コップ", "ごくごく", S(P("M110 90 L290 90 L265 340 Q262 355 245 355 L155 355 Q138 355 135 340Z", "#5aa9e6") + P("M122 160 L278 160 L265 340 Q262 355 245 355 L155 355 Q138 355 135 340Z", "#bfe3fb") + L("M290 140 Q350 150 345 210 Q340 260 280 265", "#5aa9e6", 22) + E(200, 92, 90, 12, "#3b82c4"), BG), "「ごくごく、おいしいね」。飲むまねをして見せましょう。"],
  ["s2-spoon", "スプーン", "あーん", S(E(200, 120, 70, 90, "#c9ced6") + E(200, 120, 50, 68, "#e7ebf0") + RC(184, 195, 32, 175, 16, "#c9ced6"), BG), "「あーん」と口をあけて見せましょう。離乳食の前にも。"],
  ["s2-kutsu", "くつ", "とことこ", S(P("M60 260 L60 150 Q60 120 95 120 L150 120 Q170 120 175 150 Q190 220 300 230 Q350 235 350 275 L350 300 L60 300Z", "#e53935") + RC(50, 295, 310, 30, 15, W, `stroke="#ccc" stroke-width="4"`) + L("M120 170 L165 160 M125 200 L172 190", W, 10), BG), "「くつ はいて、とことこ おさんぽ」。"],
  ["s2-boushi", "ぼうし", "ぽん", S(P("M80 260 Q80 110 200 105 Q320 110 320 260Z", "#fbc02d") + E(200, 265, 175, 38, "#f39c12") + RC(80, 215, 240, 32, 6, "#e53935") + C(200, 98, 22, "#e53935"), BG), "「ぼうし、ぽん」と頭にのせるまねを。"],
  ["s2-haburashi", "はぶらし", "しゃかしゃか", S(`<g transform="rotate(-35 200 200)">${RC(40, 180, 230, 40, 20, "#4caf50")}${RC(255, 150, 110, 40, 8, "#e7ebf0")}${rng(7).map(i => RC(262 + i * 14, 110, 8, 42, 4, "#5aa9e6")).join("")}</g>`, BG), "「しゃかしゃか、きれいきれい」。歯みがきの前に見せると流れがわかってきます。"],
  ["s2-hon", "えほん", "ぱらぱら", S(P("M200 110 Q130 80 50 95 L50 320 Q130 305 200 335Z", "#f06292") + P("M200 110 Q270 80 350 95 L350 320 Q270 305 200 335Z", "#1e63d6") + P("M200 125 Q135 100 70 110 L70 305 Q135 295 200 318Z", W) + P("M200 125 Q265 100 330 110 L330 305 Q265 295 200 318Z", W) + C(135, 200, 30, "#fbc02d") + star(265, 205, 35, 15, "#e53935"), BG), "「えほん、ぱらぱら」。めくる音も楽しめます。"],
  ["s2-garagara", "がらがら", "がらがら", S(RC(185, 210, 30, 150, 15, "#fbc02d") + C(200, 145, 85, "#f06292") + C(200, 145, 55, "#fde4ec") + C(180, 130, 12, "#e53935") + C(220, 150, 12, "#1e63d6") + C(195, 170, 12, "#2e9d4a") + C(200, 365, 22, "#fbc02d") + L("M90 70 Q70 90 75 115 M310 70 Q330 90 325 115", "#999", 7), BG), "「がらがら〜」と鳴らすまねを。本物を振って音と合わせても。"],
  ["s2-ofuro", "おふろ", "じゃぶじゃぶ", S(rng(6).map(i => C(90 + i * 45, 135 - (i % 2) * 30, 18 + (i % 3) * 6, "#d6efff", `stroke="#8cc8f0" stroke-width="4"`)).join("") + P("M40 190 L360 190 L330 320 Q325 340 300 340 L100 340 Q75 340 70 320Z", "#5aa9e6") + RC(30, 180, 340, 26, 13, "#3b82c4") + RC(95, 340, 22, 30, 8, "#3b82c4") + RC(283, 340, 22, 30, 8, "#3b82c4") + C(250, 215, 28, "#fbc02d") + P("M270 210 L292 205 L272 222Z", "#f39c12") + C(258, 207, 5, K), BG), "「じゃぶじゃぶ、あったかいね」。"],
  ["s2-fuusen", "ふうせん", "ふわふわ", S(L("M140 255 Q130 310 160 380 M260 240 Q275 300 240 380", "#888", 5) + E(140, 165, 80, 95, "#e53935") + E(262, 150, 75, 90, "#fbc02d") + P("M130 255 L150 255 L140 270Z", "#e53935") + P("M252 238 L272 238 L262 252Z", "#fbc02d") + E(115, 125, 18, 30, W, 'opacity=".5"') + E(240, 112, 16, 28, W, 'opacity=".5"'), BG), "「ふわふわ〜」と上に動かして見せましょう。"],
];

/* ---------- 段階3：どうぶつ・たべもの・のりもの・からだ・ことば（8〜12か月） ---------- */
const head = (f, st = "") => C(200, 220, 135, f, st);
const DOUBUTSU = [
  ["s3-inu", "いぬ", "わんわん", S(E(85, 205, 42, 88, "#8d5a3b", 'transform="rotate(18 85 205)"') + E(315, 205, 42, 88, "#8d5a3b", 'transform="rotate(-18 315 205)"') + head("#d29b62") + eyes(195) + E(200, 268, 72, 54, "#f3dcc2") + E(200, 245, 24, 17, K) + L("M200 262 Q200 285 176 285 M200 262 Q200 285 224 285", K, 6) + E(200, 300, 13, 15, "#f28b82"), BG), "「わんわん」。絵本や散歩の犬にも「わんわん、いたね」。"],
  ["s3-neko", "ねこ", "にゃーにゃー", S(P("M78 165 L105 45 L175 115Z", "#f0a050") + P("M322 165 L295 45 L225 115Z", "#f0a050") + P("M98 140 L110 80 L148 118Z", "#f7b8c4") + P("M302 140 L290 80 L252 118Z", "#f7b8c4") + head("#f0a050") + L("M180 110 L185 140 M200 105 L200 140 M220 110 L215 140", "#c06a20", 8) + eyes(205) + P("M188 245 L212 245 L200 258Z", "#f28b82") + L("M200 258 Q190 280 172 272 M200 258 Q210 280 228 272", K, 6) + L("M120 250 L50 240 M120 265 L50 275 M280 250 L350 240 M280 265 L350 275", K, 5), BG), "「にゃーにゃー」。鳴きまねをすると喜ぶ子が多いです。"],
  ["s3-ushi", "うし", "もーもー", S(P("M110 115 Q85 60 110 40 Q120 85 145 100Z", "#e8d7b0") + P("M290 115 Q315 60 290 40 Q280 85 255 100Z", "#e8d7b0") + E(58, 180, 50, 25, W, `stroke="#999" stroke-width="4" transform="rotate(-20 58 180)"`) + E(342, 180, 50, 25, W, `stroke="#999" stroke-width="4" transform="rotate(20 342 180)"`) + head(W, `stroke="#999" stroke-width="4"`) + E(130, 150, 45, 38, K) + E(285, 175, 30, 40, K) + eyes(185) + E(200, 285, 92, 58, "#f7b8c4") + E(165, 285, 14, 20, "#c76b80") + E(235, 285, 14, 20, "#c76b80"), BG), "「もーもー」。低い声でまねしてみましょう。"],
  ["s3-buta", "ぶた", "ぶーぶー", S(P("M90 150 L95 70 L160 110Z", "#ee8ea4") + P("M310 150 L305 70 L240 110Z", "#ee8ea4") + head("#f6b3c3") + eyes(185) + E(200, 255, 55, 40, "#ee8ea4") + E(180, 255, 10, 16, "#b8546d") + E(220, 255, 10, 16, "#b8546d") + cheeks(265, 100), BG), "「ぶーぶー」。くるまの「ぶーぶー」とも聞きくらべ。"],
  ["s3-hiyoko", "ひよこ", "ぴよぴよ", S(L("M200 80 Q190 50 205 40 M200 80 Q215 55 230 60", "#f5b800", 9) + C(200, 220, 140, "#ffd84d") + P("M70 230 Q40 270 90 290 Q100 260 85 235Z", "#f5c400") + P("M330 230 Q360 270 310 290 Q300 260 315 235Z", "#f5c400") + eyes(195, 45, 14) + P("M175 225 L225 225 L200 255Z", "#f39c12") + cheeks(240, 85) + L("M165 360 L165 385 M150 390 L180 390 M235 360 L235 385 M220 390 L250 390", "#f39c12", 8), BG), "「ぴよぴよ」。高い声で小さく鳴きまね。"],
  ["s3-kaeru", "かえる", "けろけろ", S(C(130, 140, 58, "#5cbf5c") + C(270, 140, 58, "#5cbf5c") + E(200, 250, 165, 115, "#5cbf5c") + C(130, 140, 36, W) + C(270, 140, 36, W) + C(135, 145, 18, K) + C(265, 145, 18, K) + L("M95 255 Q200 335 305 255", K, 9) + cheeks(270, 120) + E(170, 200, 5, 4, "#2f7d2f") + E(230, 200, 5, 4, "#2f7d2f"), BG), "「けろけろ、ぴょーん」。"],
  ["s3-zou", "ぞう", "ぱおーん", S(E(78, 215, 80, 105, "#b9c4cf") + E(322, 215, 80, 105, "#b9c4cf") + E(85, 215, 50, 72, "#e8b4bf") + E(315, 215, 50, 72, "#e8b4bf") + head("#9aa7b5") + eyes(190, 55) + L("M200 230 Q200 330 255 345", "#9aa7b5", 52) + L("M180 265 Q200 280 220 265", "#7d8a98", 4) + cheeks(250, 95), BG), "「ぱおーん」と腕をはなに見立てて動かしてみましょう。"],
  ["s3-lion", "らいおん", "がおー", S(rng(16).map(i => { const a = Math.PI / 8 * i; return C(200 + 150 * Math.cos(a), 215 + 150 * Math.sin(a), 48, "#d9822b"); }).join("") + C(200, 215, 150, "#d9822b") + C(125, 110, 30, "#f6c453") + C(275, 110, 30, "#f6c453") + C(200, 220, 118, "#f6c453") + eyes(195, 45) + P("M180 238 L220 238 L200 258Z", "#7a4a1e") + L("M200 258 Q190 285 170 278 M200 258 Q210 285 230 278", K, 6) + cheeks(262, 80), BG), "「がおー」。こわくない声で、やさしく。"],
  ["s3-usagi", "うさぎ", "ぴょんぴょん", S(E(150, 95, 32, 92, W, `stroke="#c9c9c9" stroke-width="5" transform="rotate(-8 150 95)"`) + E(250, 95, 32, 92, W, `stroke="#c9c9c9" stroke-width="5" transform="rotate(8 250 95)"`) + E(150, 100, 15, 70, "#f7b8c4", 'transform="rotate(-8 150 100)"') + E(250, 100, 15, 70, "#f7b8c4", 'transform="rotate(8 250 100)"') + C(200, 245, 125, W, `stroke="#c9c9c9" stroke-width="5"`) + eyes(230, 48) + P("M188 262 L212 262 L200 275Z", "#f28b82") + L("M200 275 Q190 295 175 290 M200 275 Q210 295 225 290", K, 6) + cheeks(285, 80), BG), "「ぴょんぴょん」とひざの上でゆらしても。"],
  ["s3-saru", "さる", "うっきっき", S(C(68, 215, 42, "#8d5a3b") + C(332, 215, 42, "#8d5a3b") + C(68, 215, 24, "#f1c9a0") + C(332, 215, 24, "#f1c9a0") + head("#8d5a3b") + C(160, 200, 58, "#f1c9a0") + C(240, 200, 58, "#f1c9a0") + E(200, 270, 92, 65, "#f1c9a0") + eyes(195, 40) + E(188, 245, 5, 7, K) + E(212, 245, 5, 7, K) + L("M160 280 Q200 310 240 280", K, 7), BG), "「うっきっき」。"],
  ["s3-kuma", "くま", "のっしのっし", S(C(95, 105, 52, "#a0683a") + C(305, 105, 52, "#a0683a") + C(95, 105, 26, "#e8c39e") + C(305, 105, 26, "#e8c39e") + head("#a0683a") + eyes(195) + E(200, 268, 68, 50, "#e8c39e") + E(200, 248, 24, 17, K) + L("M200 262 Q200 285 178 285 M200 262 Q200 285 222 285", K, 6), BG), "「くまさん、のっしのっし」。"],
  ["s3-panda", "パンダ", "ころころ", S(C(95, 105, 52, K) + C(305, 105, 52, K) + head(W, `stroke="#c9c9c9" stroke-width="5"`) + E(145, 205, 40, 52, K, 'transform="rotate(30 145 205)"') + E(255, 205, 40, 52, K, 'transform="rotate(-30 255 205)"') + C(150, 200, 16, W) + C(250, 200, 16, W) + C(152, 202, 8, K) + C(248, 202, 8, K) + E(200, 258, 22, 15, K) + L("M200 270 Q200 290 180 290 M200 270 Q200 290 220 290", K, 6), BG), "「パンダさん、ころころ」。"],
  ["s3-sakana", "さかな", "すいすい", S(P("M295 205 L375 130 L360 205 L375 280Z", "#3b82c4") + E(185, 205, 140, 95, "#5aa9e6") + P("M160 115 Q200 70 240 118Z", "#3b82c4") + L("M165 135 Q140 205 165 275", "#3b82c4", 10) + C(105, 190, 20, W) + C(100, 190, 10, K) + L("M60 230 Q72 240 85 232", K, 5) + C(70, 90, 12, "none", `stroke="#8cc8f0" stroke-width="5"`) + C(45, 55, 8, "none", `stroke="#8cc8f0" stroke-width="5"`), BG), "「すいすい〜」と手をおさかなにして泳がせて。"],
  ["s3-kotori", "ことり", "ちゅんちゅん", S(L("M40 330 L370 330", "#8d5a3b", 18) + E(210, 225, 120, 95, "#5aa9e6") + C(130, 160, 70, "#5aa9e6") + P("M65 155 L20 172 L68 180Z", "#f39c12") + C(120, 148, 13, K) + C(124, 144, 4, W) + E(230, 225, 75, 50, "#3b82c4", 'transform="rotate(-15 230 225)"') + P("M320 210 L385 175 L375 240Z", "#3b82c4") + E(200, 265, 70, 45, "#d6efff") + L("M190 310 L185 335 M230 310 L235 335", "#f39c12", 8), BG), "「ちゅんちゅん」。外で鳥の声がしたら「ちゅんちゅん、いたね」。"],
];
const TABEMONO = [
  ["s3-ringo", "りんご", "しゃりしゃり", S(P("M200 110 C140 70 50 100 55 200 C60 300 130 360 200 335 C270 360 340 300 345 200 C350 100 260 70 200 110Z", "#e53935") + L("M200 115 Q205 75 225 50", "#6d4c2f", 12) + P("M215 85 Q260 40 300 70 Q260 100 215 85Z", "#4caf50") + E(120, 170, 25, 45, W, 'opacity=".35" transform="rotate(20 120 170)"'), BG), "「あかい りんご、しゃりしゃり」。"],
  ["s3-banana", "バナナ", "もぐもぐ", S(P("M90 90 Q60 280 230 335 Q330 360 350 300 Q260 310 190 240 Q130 175 120 90Z", "#ffd84d", `stroke="#e0b400" stroke-width="6"`) + L("M110 120 Q110 240 210 300", "#e0b400", 5) + RC(88, 60, 28, 40, 6, "#6d4c2f"), BG), "「バナナ、もぐもぐ」。"],
  ["s3-ichigo", "いちご", "あまーい", S(P("M200 360 C110 300 55 200 90 135 Q130 90 200 110 Q270 90 310 135 C345 200 290 300 200 360Z", "#e53935") + rng(14).map(i => E(120 + (i % 4) * 52 + (Math.floor(i / 4) % 2) * 26, 160 + Math.floor(i / 4) * 45, 5, 8, "#ffe082")).join("") + P("M200 115 L150 85 L175 120 L120 120 L185 135 L200 160 L215 135 L280 120 L225 120 L250 85Z", "#2e9d4a") + RC(193, 50, 14, 50, 7, "#2e9d4a"), BG), "「いちご、あまーい」。"],
  ["s3-mikan", "みかん", "むきむき", S(E(200, 220, 150, 130, "#fb8c00") + rng(12).map(i => C(120 + (i % 4) * 55, 180 + Math.floor(i / 4) * 45, 4, "#e07000")).join("") + C(200, 95, 12, "#6d4c2f") + P("M205 92 Q250 40 295 70 Q250 105 205 92Z", "#4caf50") + E(130, 160, 30, 18, W, 'opacity=".35" transform="rotate(-30 130 160)"'), BG), "「みかん、むきむき」。"],
  ["s3-budou", "ぶどう", "つぶつぶ", S(L("M200 95 Q205 60 230 45", "#6d4c2f", 12) + P("M210 80 Q250 50 290 75 Q250 100 210 80Z", "#4caf50") + [[150, 130], [200, 125], [250, 130], [125, 180], [175, 180], [225, 180], [275, 180], [150, 230], [200, 230], [250, 230], [175, 280], [225, 280], [200, 330]].map(([x, y]) => C(x, y, 30, "#8e44ad") + C(x - 9, y - 9, 7, W, 'opacity=".4"')).join(""), BG), "「ぶどう、つぶつぶ」。"],
  ["s3-gohan", "ごはん", "もぐもぐ", S(P("M90 190 Q200 100 310 190Z", W, `stroke="#ddd" stroke-width="4"`) + rng(10).map(i => E(120 + i * 18, 175 - Math.sin(i / 9 * Math.PI) * 45, 7, 4, "#eee")).join("") + P("M60 190 L340 190 Q330 330 200 335 Q70 330 60 190Z", "#d9534f") + P("M80 220 Q200 250 320 220", "none", `stroke="#f6c453" stroke-width="10"`) + RC(150, 330, 100, 22, 8, "#a33b37"), BG), "「ごはん、もぐもぐ」。食事の前に見せても。"],
  ["s3-pan", "パン", "ふわふわ", S(P("M80 360 L80 170 Q40 160 45 120 Q55 60 200 60 Q345 60 355 120 Q360 160 320 170 L320 360Z", "#c8823e") + P("M105 340 L105 155 Q72 148 75 122 Q85 85 200 85 Q315 85 325 122 Q328 148 295 155 L295 340Z", "#fbe7c6"), BG), "「パン、ふわふわ」。"],
  ["s3-tamago", "たまご", "ころん", S(P("M200 55 C110 55 70 200 80 260 C90 330 150 360 200 360 C250 360 310 330 320 260 C330 200 290 55 200 55Z", W, `stroke="#e3d6c2" stroke-width="8"`) + E(155, 150, 22, 40, "#f5ece0", 'transform="rotate(20 155 150)"'), BG), "「たまご、ころん」。"],
  ["s3-ninjin", "にんじん", "ぽりぽり", S(P("M200 90 Q140 140 135 220 Q140 300 200 380 Q260 300 265 220 Q260 140 200 90Z", "#fb8c00", 'transform="rotate(-25 200 230)"') + L("M180 165 L205 160 M170 225 L200 220 M185 285 L210 280", "#e07000", 7) + P("M190 100 Q150 30 120 55 Q160 75 175 110Z M205 95 Q215 20 245 35 Q225 70 215 105Z M220 105 Q280 50 300 80 Q255 95 228 118Z", "#4caf50"), BG), "「にんじん、ぽりぽり」。"],
  ["s3-tomato", "トマト", "まっか", S(E(200, 225, 150, 135, "#e53935") + P("M200 100 L160 80 L170 115 L120 120 L175 135 L200 165 L225 135 L280 120 L230 115 L240 80Z", "#2e9d4a") + RC(194, 60, 12, 45, 6, "#2e9d4a") + E(130, 180, 28, 45, W, 'opacity=".3" transform="rotate(25 130 180)"'), BG), "「まっかな トマト」。"],
  ["s3-gyuunyuu", "ぎゅうにゅう", "ごくごく", S(P("M110 150 L200 70 L290 150 L290 360 L110 360Z", W, `stroke="#5aa9e6" stroke-width="8" stroke-linejoin="round"`) + P("M110 150 L290 150 L200 70Z", "#d6efff", `stroke="#5aa9e6" stroke-width="8" stroke-linejoin="round"`) + RC(130, 200, 140, 120, 20, "#5aa9e6") + C(170, 250, 14, W) + C(230, 250, 14, W) + E(200, 285, 30, 16, "#f7b8c4"), BG), "「ぎゅうにゅう、ごくごく」。"],
  ["s3-onigiri", "おにぎり", "にぎにぎ", S(P("M200 60 Q230 60 250 95 L345 270 Q365 330 300 340 L100 340 Q35 330 55 270 L150 95 Q170 60 200 60Z", W, `stroke="#ddd" stroke-width="5"`) + RC(130, 240, 140, 100, 8, "#1f3b2c"), BG), "「おにぎり、にぎにぎ」と手でにぎるまねを。"],
];
const car = (body, win, ex = "", top = "") => S(top + RC(30, 175, 340, 120, 30, body) + P("M90 180 L135 105 Q145 92 165 92 L265 92 Q285 92 295 105 L330 180Z", body) + P("M145 165 L170 112 L210 112 L210 165Z", win) + P("M230 112 L265 112 Q275 112 282 122 L310 165 L230 165Z", win) + ex + C(105, 295, 42, "#333") + C(295, 295, 42, "#333") + C(105, 295, 17, "#bbb") + C(295, 295, 17, "#bbb") + RC(345, 205, 22, 18, 6, "#ffd84d"), BG);
const NORIMONO = [
  ["s3-kuruma", "くるま", "ぶーぶー", car("#1e63d6", "#d6efff"), "「くるま、ぶーぶー」。外で見かけたら指さして。"],
  ["s3-bus", "バス", "ぶっぶー", S(RC(25, 100, 350, 200, 30, "#fbc02d") + rng(4).map(i => RC(50 + i * 75, 125, 60, 60, 8, "#d6efff")).join("") + RC(330, 125, 30, 120, 6, "#d6efff") + RC(25, 215, 350, 18, 0, "#e53935") + C(100, 300, 40, "#333") + C(300, 300, 40, "#333") + C(100, 300, 15, "#bbb") + C(300, 300, 15, "#bbb"), BG), "「バス、ぶっぶー」。"],
  ["s3-densha", "でんしゃ", "がたんごとん", S(L("M10 350 L390 350", "#777", 10) + rng(8).map(i => RC(20 + i * 48, 345, 14, 22, 2, "#8d5a3b")).join("") + P("M30 315 L30 130 Q30 95 65 95 L290 95 Q350 95 370 180 L380 315Z", "#2e9d4a") + RC(30, 240, 350, 22, 0, W) + rng(3).map(i => RC(55 + i * 80, 120, 62, 70, 8, "#d6efff")).join("") + P("M300 120 L335 120 Q350 150 356 190 L300 190Z", "#d6efff") + C(90, 325, 25, "#333") + C(300, 325, 25, "#333") + RC(160, 60, 80, 35, 0, "none", `stroke="#555" stroke-width="7"`), BG), "「がたん ごとん、がたん ごとん」。リズムをつけてゆっくり。"],
  ["s3-shoubousha", "しょうぼうしゃ", "うーうー", car("#e53935", "#d6efff", RC(40, 230, 320, 14, 0, W), RC(70, 55, 250, 18, 6, "#bbb") + rng(6).map(i => RC(85 + i * 40, 50, 8, 30, 2, "#bbb")).join("") + RC(160, 80, 26, 20, 6, "#ffd84d")), "「しょうぼうしゃ、うーうー」。"],
  ["s3-kyuukyuusha", "きゅうきゅうしゃ", "ぴーぽーぴーぽー", car("#f4f4f4", "#d6efff", RC(30, 225, 340, 22, 0, "#e53935") + `<rect x="30" y="175" width="340" height="120" rx="30" fill="none" stroke="#ccc" stroke-width="5"/>`, RC(175, 70, 50, 26, 8, "#e53935")), "「きゅうきゅうしゃ、ぴーぽー ぴーぽー」。"],
  ["s3-patoka", "パトカー", "うーうー", car(K, "#d6efff", RC(30, 225, 340, 70, 0, W) + C(105, 295, 42, "#333") + C(295, 295, 42, "#333") + C(105, 295, 17, "#bbb") + C(295, 295, 17, "#bbb"), RC(175, 70, 50, 26, 8, "#e53935")), "「パトカー、うーうー」。"],
  ["s3-hikouki", "ひこうき", "ぶーん", S(P("M175 190 L60 110 L95 100 L235 165Z", "#3b82c4") + RC(40, 170, 320, 60, 30, W, `stroke="#5aa9e6" stroke-width="6"`) + P("M175 215 L60 300 L95 310 L235 230Z", "#3b82c4") + P("M60 175 L35 105 L70 105 L105 175Z", "#e53935") + rng(5).map(i => C(150 + i * 35, 195, 9, "#5aa9e6")).join("") + P("M330 180 Q358 185 358 200 L320 200Z", "#5aa9e6") + C(80, 350, 0, W), "#e3f3ff"), "「ひこうき、ぶーん」と腕を広げて。空に見えたら指さして。"],
  ["s3-fune", "ふね", "ぽっぽー", S(P("M0 320 Q50 300 100 320 T200 320 T300 320 T400 320 L400 400 L0 400Z", "#5aa9e6") + P("M40 230 L360 230 L310 320 L90 320Z", "#e53935") + RC(110, 165, 180, 65, 8, W) + rng(4).map(i => C(140 + i * 40, 197, 11, "#5aa9e6")).join("") + RC(225, 100, 40, 65, 4, "#fbc02d") + C(255, 70, 18, "#ddd") + C(285, 45, 14, "#ddd"), "#e3f3ff"), "「ふね、ぽっぽー」。おふろで浮かぶおもちゃとつなげても。"],
  ["s3-jitensha", "じてんしゃ", "りんりん", S(C(100, 270, 75, "none", `stroke="#333" stroke-width="14"`) + C(300, 270, 75, "none", `stroke="#333" stroke-width="14"`) + C(100, 270, 8, "#333") + C(300, 270, 8, "#333") + L("M100 270 L170 160 L270 160 L300 270 M170 160 L200 270 L270 160 M200 270 L100 270", "#e53935", 12) + L("M150 140 L195 140 M270 160 L255 115 L290 105", "#333", 12) + C(298, 100, 10, "#fbc02d"), BG), "「じてんしゃ、りんりん」。"],
];
const kid = (ex = "") => S(faceBase() + eyes(200, 55) + E(200, 248, 14, 10, "#e8a98a") + L("M165 285 Q200 310 235 285", "#c0392b", 9) + cheeks(260, 95) + ex, BG);
const ring = (x, y, r) => C(x, y, r, "none", `stroke="${R}" stroke-width="9" stroke-dasharray="18 10"`);
const KARADA = [
  ["s3-me", "め", "おめめ", kid(ring(145, 200, 40) + ring(255, 200, 40)), "「おめめ、ぱっちり」。おとなの目も指さして、あかちゃんの目にもそっとふれて。"],
  ["s3-hana", "はな", "おはな", kid(ring(200, 248, 36)), "「おはな」。おとなの鼻も指さして見せましょう。"],
  ["s3-kuchi", "くち", "おくち", kid(ring(200, 292, 50)), "「おくち、あーん」。"],
  ["s3-mimi", "みみ", "おみみ", kid(ring(52, 225, 42) + ring(348, 225, 42)), "「おみみ」。耳たぶにそっとふれて。"],
  ["s3-te", "て", "おてて", S(hand(200, 250, 1.9), BG), "「おてて、ぱっ」。手のひらを合わせてあそびましょう。"],
  ["s3-ashi", "あし", "あんよ", S(`<g transform="translate(200 220)">${E(0, 30, 85, 120, SKIN, 'stroke="#d9a983" stroke-width="4"')}${[[-62, -100, 30], [-22, -120, 24], [14, -122, 21], [46, -112, 18], [72, -92, 15]].map(([x, y, r]) => C(x, y, r, SKIN, 'stroke="#d9a983" stroke-width="4"')).join("")}</g>`, BG), "「あんよ」。足の裏をくすぐると喜ぶかも。"],
  ["s3-onaka", "おなか", "ぽんぽん", S(C(200, 95, 70, SKIN) + P("M140 55 Q200 15 260 55 Q230 45 200 48 Q170 45 140 55Z", HAIR) + C(178, 95, 8, K) + C(222, 95, 8, K) + L("M185 120 Q200 130 215 120", "#c0392b", 6) + E(200, 255, 105, 110, SKIN) + L("M110 200 L50 150 M290 200 L350 150", SKIN, 36) + C(200, 270, 7, "#d9a983") + ring(200, 260, 80), BG), "「おなか、ぽんぽん」と、やさしくなでて。"],
  ["s3-atama", "あたま", "いいこいいこ", kid(`<path d="M55 160 Q80 25 200 25 Q320 25 345 160" fill="none" stroke="${R}" stroke-width="9" stroke-dasharray="18 10"/>`), "「あたま、いいこいいこ」。なでながら言いましょう。"],
];
const KOTOBA = [
  ["s3-baibai", "ばいばい", "ばいばい", S(hand(200, 240, 1.7, -15) + L("M70 120 Q50 160 70 200 M330 120 Q350 160 330 200 M40 100 Q15 160 40 220 M360 100 Q385 160 360 220", "#999", 8), BG), "「ばいばい」と手をふって見せましょう。まねっこが始まるのは9〜12か月ごろが多いです。"],
  ["s3-pachipachi", "ぱちぱち", "ぱちぱち", S(hand(160, 250, 1.3, 20) + hand(240, 250, 1.3, -20) + L("M200 40 L200 85 M120 60 L145 100 M280 60 L255 100", "#fbc02d", 10), BG), "「ぱちぱち〜」。できたら、いっしょに手をたたいてほめましょう。"],
  ["s3-itadakimasu", "いただきます", "いただきます", S(hand(178, 260, 1.4, 8) + hand(222, 260, 1.4, -8), BG), "食事の前に手を合わせて「いただきます」。毎日同じことばをくり返します。"],
  ["s3-douzo", "どうぞ", "どうぞ", S(C(200, 150, 70, "#e53935") + E(170, 120, 18, 10, W, 'opacity=".4"') + hand(120, 270, 1.2, 70) + hand(280, 270, 1.2, -70), BG), "「どうぞ」と物を渡し、「ありがとう」と受け取るやりとりを。"],
  ["s3-choudai", "ちょうだい", "ちょうだい", S(P("M70 200 Q80 330 200 330 Q320 330 330 200 L300 195 Q290 290 200 292 Q110 290 100 195Z", SKIN, 'stroke="#d9a983" stroke-width="4"') + rng(4).map(i => RC(80 + i * 22, 150, 20, 60, 10, SKIN, 'stroke="#d9a983" stroke-width="3"')).join("") + rng(4).map(i => RC(234 + i * 22, 150, 20, 60, 10, SKIN, 'stroke="#d9a983" stroke-width="3"')).join(""), BG), "両手を合わせて「ちょうだい」。おもちゃのやりとりで。"],
  ["s3-nenne", "ねんね", "ねんね", S(P("M240 70 A130 130 0 1 0 330 270 A105 105 0 1 1 240 70Z", "#fbc02d") + star(90, 90, 26, 11, "#fff3b0") + star(330, 90, 20, 8, "#fff3b0") + star(110, 320, 16, 7, "#fff3b0") + `<text x="270" y="190" font-size="54" font-weight="700" fill="#fff3b0" font-family="sans-serif">Z</text><text x="310" y="145" font-size="38" font-weight="700" fill="#fff3b0" font-family="sans-serif">z</text>`, "#2d3561"), "「ねんねしようね」。寝る前に毎日同じカードを見せると、眠る合図になります。"],
  ["s3-dakko", "だっこ", "だっこ", S(C(200, 120, 72, SKIN) + P("M138 85 Q200 35 262 85 Q230 72 200 75 Q170 72 138 85Z", HAIR) + L("M175 112 Q182 104 189 112 M211 112 Q218 104 225 112", K, 6) + L("M180 145 Q200 160 220 145", "#c0392b", 6) + RC(130, 190, 140, 150, 50, "#f6c453") + L("M140 215 L70 110 M260 215 L330 110", "#f6c453", 40) + C(70, 105, 24, SKIN) + C(330, 105, 24, SKIN), BG), "両手を広げて「だっこ」。だっこしながら「だっこ、うれしいね」。"],
];

const CATS = [
  { id: "kontra", st: 1, name: "しろくろ・あか", ic: "◐" },
  { id: "kao", st: 2, name: "おかお", ic: "☺" },
  { id: "iro", st: 2, name: "いろ", ic: "●" },
  { id: "mijika", st: 2, name: "みのまわり", ic: "◇" },
  { id: "doubutsu", st: 3, name: "どうぶつ", ic: "🐾" },
  { id: "tabemono", st: 3, name: "たべもの", ic: "🍎" },
  { id: "norimono", st: 3, name: "のりもの", ic: "🚗" },
  { id: "karada", st: 3, name: "からだ", ic: "✋" },
  { id: "kotoba", st: 3, name: "あいさつ・ことば", ic: "💬" },
];
const STAGES = [
  { st: 1, name: "0〜3か月", sub: "しろくろ・あか", from: 0, to: 3 },
  { st: 2, name: "4〜7か月", sub: "かお・いろ・みのまわり", from: 4, to: 7 },
  { st: 3, name: "8〜12か月", sub: "なまえ・指さし", from: 8, to: 12 },
];
const CARDS = [];
ST1.forEach(([id, w, on, svg]) => CARDS.push({ id, st: 1, cat: "kontra", w, on, svg, tip: TIP1 }));
[["kao", KAO], ["iro", IRO], ["mijika", MIJIKA]].forEach(([cat, a]) => a.forEach(([id, w, on, svg, tip]) => CARDS.push({ id, st: 2, cat, w, on, svg, tip })));
[["doubutsu", DOUBUTSU], ["tabemono", TABEMONO], ["norimono", NORIMONO], ["karada", KARADA], ["kotoba", KOTOBA]].forEach(([cat, a]) => a.forEach(([id, w, on, svg, tip]) => CARDS.push({ id, st: 3, cat, w, on, svg, tip })));

/* 英語（en＝表示と読み上げに使う）。声かけとして自然な言い方にしている */
const EN = {
  "s1-tate":"stripes","s1-yoko":"stripes","s1-ichimatsu":"checkers","s1-mato":"circles","s1-mizutama":"dots","s1-uzumaki":"spiral","s1-kao":"face","s1-giza":"zigzag","s1-hoshi":"star","s1-heart":"heart","s1-sakana":"fish","s1-chou":"butterfly","s1-kuma":"bear","s1-taiyou":"sun","s1-akamato":"red circles","s1-akashima":"red and black","s1-akamaru":"red circle","s1-koushi":"grid","s1-naname":"slanted lines","s1-sankaku":"triangles","s1-kuruma":"car","s1-hana":"flower",
  "s2-niko":"happy","s2-een":"crying","s2-bikkuri":"surprised","s2-inai":"peekaboo","s2-baa":"boo!","s2-aka":"red","s2-ao":"blue","s2-kiiro":"yellow","s2-midori":"green","s2-pink":"pink","s2-orange":"orange","s2-murasaki":"purple","s2-chairo":"brown","s2-ball":"ball","s2-cup":"cup","s2-spoon":"spoon","s2-kutsu":"shoe","s2-boushi":"hat","s2-haburashi":"toothbrush","s2-hon":"book","s2-garagara":"rattle","s2-ofuro":"bath","s2-fuusen":"balloon",
  "s3-inu":"dog","s3-neko":"cat","s3-ushi":"cow","s3-buta":"pig","s3-hiyoko":"chick","s3-kaeru":"frog","s3-zou":"elephant","s3-lion":"lion","s3-usagi":"rabbit","s3-saru":"monkey","s3-kuma":"bear","s3-panda":"panda","s3-sakana":"fish","s3-kotori":"bird",
  "s3-ringo":"apple","s3-banana":"banana","s3-ichigo":"strawberry","s3-mikan":"tangerine","s3-budou":"grapes","s3-gohan":"rice","s3-pan":"bread","s3-tamago":"egg","s3-ninjin":"carrot","s3-tomato":"tomato","s3-gyuunyuu":"milk","s3-onigiri":"rice ball",
  "s3-kuruma":"car","s3-bus":"bus","s3-densha":"train","s3-shoubousha":"fire truck","s3-kyuukyuusha":"ambulance","s3-patoka":"police car","s3-hikouki":"airplane","s3-fune":"boat","s3-jitensha":"bicycle",
  "s3-me":"eyes","s3-hana":"nose","s3-kuchi":"mouth","s3-mimi":"ears","s3-te":"hand","s3-ashi":"foot","s3-onaka":"tummy","s3-atama":"head",
  "s3-baibai":"bye-bye","s3-pachipachi":"clap, clap","s3-itadakimasu":"let's eat","s3-douzo":"here you go","s3-choudai":"give me, please","s3-nenne":"night-night","s3-dakko":"up, up"
};
CARDS.forEach(c => { c.en = EN[c.id]; });

/* 英語の声かけ文（ph＝[英語, 日本語の意味]）。おとなが赤ちゃんに話しかける文 */
const PH = {
  "s1-tate":["Look at the stripes.","しましまを見てごらん。"],"s1-yoko":["Stripes, stripes, stripes.","しましま、しましま。"],"s1-ichimatsu":["Black and white squares.","黒と白の四角だね。"],"s1-mato":["Round and round.","ぐるぐる、まるいね。"],"s1-mizutama":["So many dots!","点がいっぱい！"],"s1-uzumaki":["Round and round it goes.","ぐるぐる回るよ。"],"s1-kao":["Hello! I see a face.","こんにちは！お顔だね。"],"s1-giza":["Zig, zag, zig, zag.","ジグ、ザグ。"],"s1-hoshi":["Look, a star!","見て、お星さま！"],"s1-heart":["A heart. I love you.","ハートだよ。大好き。"],"s1-sakana":["The fish goes swish, swish.","お魚がすいすい。"],"s1-chou":["The butterfly goes flutter, flutter.","ちょうちょがひらひら。"],"s1-kuma":["Hello, little bear.","こんにちは、くまさん。"],"s1-taiyou":["The sun is warm.","お日さまはあたたかいね。"],"s1-akamato":["Red circles, round and round.","赤いまる、ぐるぐる。"],"s1-akashima":["Red and black stripes.","赤と黒のしましま。"],"s1-akamaru":["A big red circle.","大きな赤いまる。"],"s1-koushi":["Little squares, everywhere.","小さな四角がいっぱい。"],"s1-naname":["Lines going up and down.","線が上に下に。"],"s1-sankaku":["Pointy triangles.","とんがった三角。"],"s1-kuruma":["The car goes vroom!","車がぶーん！"],"s1-hana":["A pretty flower.","きれいなお花。"],
  "s2-niko":["You're so happy! Big smile!","うれしいね！にっこり！"],"s2-een":["Oh, you're crying. It's okay.","あら、泣いてるね。大丈夫だよ。"],"s2-bikkuri":["Oh! What a surprise!","わあ！びっくり！"],"s2-inai":["Where's Mommy? Where's Daddy?","ママはどこ？パパはどこ？"],"s2-baa":["Peekaboo! I see you!","いないいないばあ！見つけた！"],"s2-aka":["This is red.","これは赤だよ。"],"s2-ao":["This is blue.","これは青だよ。"],"s2-kiiro":["This is yellow.","これは黄色だよ。"],"s2-midori":["This is green.","これは緑だよ。"],"s2-pink":["This is pink.","これはピンクだよ。"],"s2-orange":["This is orange.","これはオレンジ色だよ。"],"s2-murasaki":["This is purple.","これはむらさきだよ。"],"s2-chairo":["This is brown.","これは茶色だよ。"],"s2-ball":["Roll the ball. Here it comes!","ボールをころころ。来たよ！"],"s2-cup":["Drink from your cup.","コップで飲もうね。"],"s2-spoon":["Here's your spoon. Open wide!","スプーンだよ。お口あーん！"],"s2-kutsu":["Let's put on your shoes.","くつをはこうね。"],"s2-boushi":["Hat on! Hat off!","ぼうしをかぶって！ぬいで！"],"s2-haburashi":["Brush, brush, brush your teeth.","しゃかしゃか、歯みがき。"],"s2-hon":["Let's read a book.","絵本を読もうね。"],"s2-garagara":["Shake, shake, shake the rattle.","がらがらを振って。"],"s2-ofuro":["Time for your bath. Splash, splash!","おふろの時間。じゃぶじゃぶ！"],"s2-fuusen":["The balloon goes up, up, up!","風船が上へ、上へ！"],
  "s3-inu":["The dog says woof, woof.","犬はワンワン。"],"s3-neko":["The cat says meow.","猫はニャー。"],"s3-ushi":["The cow says moo.","牛はモー。"],"s3-buta":["The pig says oink, oink.","豚はブーブー。"],"s3-hiyoko":["The chick says peep, peep.","ひよこはピヨピヨ。"],"s3-kaeru":["The frog says ribbit.","カエルはケロケロ。"],"s3-zou":["The elephant has a long trunk.","ゾウの鼻は長いね。"],"s3-lion":["The lion says roar!","ライオンはガオー！"],"s3-usagi":["The rabbit goes hop, hop, hop.","うさぎがぴょんぴょん。"],"s3-saru":["The monkey says ooh, ooh, ah, ah.","おさるさんはウッキッキ。"],"s3-kuma":["The bear is big and furry.","くまは大きくてふわふわ。"],"s3-panda":["The panda is black and white.","パンダは黒と白だね。"],"s3-sakana":["The fish can swim.","お魚は泳げるよ。"],"s3-kotori":["The bird says tweet, tweet.","小鳥はチュンチュン。"],
  "s3-ringo":["A red apple. Yum, yum!","赤いりんご。おいしいね！"],"s3-banana":["Let's peel the banana.","バナナをむこうね。"],"s3-ichigo":["The strawberry is sweet.","いちごは甘いね。"],"s3-mikan":["A little orange tangerine.","小さなオレンジ色のみかん。"],"s3-budou":["So many little grapes.","小さなぶどうがいっぱい。"],"s3-gohan":["Do you want some rice?","ごはん食べる？"],"s3-pan":["Soft bread. Mmm!","ふわふわのパン。おいしい！"],"s3-tamago":["This is an egg.","これはたまごだよ。"],"s3-ninjin":["The carrot is orange.","にんじんはオレンジ色。"],"s3-tomato":["A round red tomato.","まるくて赤いトマト。"],"s3-gyuunyuu":["Do you want some milk?","牛乳飲む？"],"s3-onigiri":["A yummy rice ball.","おいしいおにぎり。"],
  "s3-kuruma":["The car goes beep, beep!","車がブーブー！"],"s3-bus":["We can ride the bus.","バスに乗れるよ。"],"s3-densha":["The train goes choo, choo!","電車がガタンゴトン！"],"s3-shoubousha":["The fire truck goes fast!","消防車は速いね！"],"s3-kyuukyuusha":["The ambulance helps people.","救急車はみんなを助けるよ。"],"s3-patoka":["The police car goes wee-oo, wee-oo!","パトカーがウーウー！"],"s3-hikouki":["The airplane flies in the sky.","飛行機は空を飛ぶよ。"],"s3-fune":["The boat floats on the water.","船は水に浮かぶよ。"],"s3-jitensha":["Ring, ring! Here comes the bicycle.","リンリン！自転車が来たよ。"],
  "s3-me":["Where are your eyes?","おめめはどこ？"],"s3-hana":["Where is your nose?","おはなはどこ？"],"s3-kuchi":["Where is your mouth?","おくちはどこ？"],"s3-mimi":["Where are your ears?","おみみはどこ？"],"s3-te":["Where is your hand? Wave your hand!","おててはどこ？手を振って！"],"s3-ashi":["Where is your foot? Kick, kick!","あんよはどこ？キック、キック！"],"s3-onaka":["Where is your tummy? Tickle, tickle!","おなかはどこ？こちょこちょ！"],"s3-atama":["Where is your head? Good baby.","あたまはどこ？いいこいいこ。"],
  "s3-baibai":["Wave bye-bye!","バイバイしよう！"],"s3-pachipachi":["Clap your hands! Good job!","ぱちぱち！上手！"],"s3-itadakimasu":["Time to eat. Let's eat!","ごはんの時間。いただきます！"],"s3-douzo":["Here you go. This is for you.","どうぞ。あなたにだよ。"],"s3-choudai":["Can I have it, please? Thank you!","ちょうだい。ありがとう！"],"s3-nenne":["Time for bed. Night-night.","もう寝る時間。おやすみ。"],"s3-dakko":["Up, up! Do you want a hug?","だっこ！ぎゅーする？"]
};
CARDS.forEach(c => { if (PH[c.id]) { c.ph = PH[c.id][0]; c.phj = PH[c.id][1]; } });
