// 隨意約 攻略中心 - 所有 SEO 文章資料
// 每篇文章 body 用 JSX，可放心使用 Tailwind 與任何 React 元件

import type { ReactNode } from "react";
import { createElement as h, Fragment as F } from "react";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: "新手" | "安全" | "玩法" | "攻略" | "禮儀";
  tags: string[];
  publishedAt: string; // YYYY-MM-DD
  updatedAt?: string;
  readMinutes: number;
  hero: { emoji: string; gradient: string };
  body: () => ReactNode;
}

// -------- 第 1 篇：新手入門 --------
const gettingStarted: ArticleMeta = {
  slug: "getting-started",
  title: "隨意約新手入門：從打開網頁到第一個對話只要 3 分鐘",
  description:
    "完整教學帶你 3 分鐘上手隨意約。匿名情境配對是什麼？怎麼選性別、想做的事、暗號？配對成功後該怎麼聊？一篇看懂。",
  category: "新手",
  tags: ["新手", "教學", "上手"],
  publishedAt: "2026-06-28",
  readMinutes: 4,
  hero: {
    emoji: "🚀",
    gradient: "from-brand-100 to-brand-50",
  },
  body: () =>
    h(
      F,
      null,
      h("p", null, "「隨意約」是台灣的匿名情境配對平台。和以往的匿名聊天最大的不同是：你不是隨機被丟到一個房間和陌生人「亂聊」，而是依照你想做的事情（吃飯、看夜景、唱 KTV ⋯⋯）找到也想做同樣事情的人，先聊得來，再決定要不要見面。"),

      h("h2", null, "Step 1：選擇你的性別與想找的對象"),
      h("p", null, "性別有三個選項——男、女、不公開。「不公開」適合不想讓性別影響對話、純粹想找個人聊聊的使用者。「想找的對象」可以選男、女、或不限。系統會雙向過濾，只有你想要的對象 + 對方也想要你的性別，才會配對。"),

      h("h2", null, "Step 2：選你想做的事（核心）"),
      h("p", null, "這是隨意約最特別的地方。從 16 種情境裡挑最多 8 個："),
      h(
        "ul",
        null,
        h("li", null, "🍱 一起吃飯、🥩 吃燒肉、☕ 喝咖啡"),
        h("li", null, "🌃 看夜景、🎬 看電影、🎤 唱 KTV"),
        h("li", null, "🛍️ 逛街、💪 運動健身、🖼️ 看展覽"),
        h("li", null, "🎆 一起跨年、💒 參加婚禮、🏮 回家過年"),
        h("li", null, "📺 在家追劇、🎵 看演唱會、💬 純聊天、🌳 心情樹洞")
      ),
      h("p", null, "系統會優先媒合「重疊情境最多」的人，這樣聊起來就有具體共同話題，不會卡住。"),

      h("h2", null, "Step 3：暗號（選填）"),
      h("p", null, "輸入暗號後，凡是輸入相同暗號的人會被「優先配對」。常見玩法："),
      h(
        "ul",
        null,
        h("li", null, "和朋友約好暗號，瞬間互相配對"),
        h("li", null, "在 IG 限動發暗號，請追蹤者來敲"),
        h("li", null, "用暗號當告白小遊戲，跟對方確認彼此心意")
      ),

      h("h2", null, "Step 4：開始隨意約"),
      h("p", null, "按下按鈕，通常 5 秒內配對成功（離峰時段可能 1~2 分鐘）。配對成功會自動跳到聊天室，雙方都是匿名的，不會看到對方任何個資。"),

      h("h2", null, "Step 5：聊天 → 決定要不要見面"),
      h("p", null, "建議先聊 10~20 分鐘確認頻率對了，再決定要不要交換 LINE 或實際碰面。如果不舒服，右上角隨時可以離開或舉報，雙方就會立刻斷線。"),

      h("h2", null, "下一步看這篇"),
      h(
        "ul",
        null,
        h("li", null, "👉 ", h("a", { href: "/guide/safety-for-women" }, "【女生必看】跟陌生人見面前一定要做的 12 件事")),
        h("li", null, "👉 ", h("a", { href: "/guide/passcode-ideas" }, "10 個暗號玩法：閨蜜聚會、告白都好用")),
        h("li", null, "👉 ", h("a", { href: "/guide/dinner-icebreakers" }, "找飯局伴的 6 個破冰金句"))
      )
    ),
};

// -------- 第 2 篇：女性安全 12 守則 --------
const safetyForWomen: ArticleMeta = {
  slug: "safety-for-women",
  title: "【女生必看】跟陌生人見面前一定要做的 12 件事",
  description:
    "隨意約整理給女性使用者的安全守則：見面地點怎麼選、訊息怎麼留底、緊急聯絡人怎麼設、遇到危險怎麼脫身。線下見面前讀完這篇。",
  category: "安全",
  tags: ["女生", "安全", "見面", "防身"],
  publishedAt: "2026-06-28",
  readMinutes: 6,
  hero: { emoji: "🛡️", gradient: "from-pink-50 to-rose-50" },
  body: () =>
    h(
      F,
      null,
      h("p", null, "隨意約強調「先聊得來，再決定要不要見面」。如果你決定真的踏出見面這一步，請花 5 分鐘把這 12 件事做完。多花的時間，是給未來的自己保險。"),

      h("h2", null, "🟢 見面前要做的 6 件事"),

      h("h3", null, "1. 至少先聊滿 3 天"),
      h("p", null, "對話時間越長，騙子越難維持人設。觀察對方在不同時段、不同情緒下的反應，比看一張自拍可靠 100 倍。"),

      h("h3", null, "2. 視訊 5 分鐘確認真實樣貌"),
      h("p", null, "見面前一定要視訊。重點不是看臉，而是看：表情自然嗎？口音對嗎？背景合理嗎？對方拒絕視訊就是紅旗，直接停止。"),

      h("h3", null, "3. 反向搜圖確認對方頭像"),
      h("p", null, "如果對方丟過自己的照片，把照片存下來，用 Google 圖片搜尋反查。能找到網路上其他人臉的，多半是盜圖。"),

      h("h3", null, "4. 約在「公共、白天、人多」的地方"),
      h("p", null, "第一次見面三個關鍵字：公共、白天、人多。例如熱鬧捷運站旁的連鎖咖啡店、百貨公司一樓。絕對不要對方家、車裡、KTV 包廂、住宿空間。"),

      h("h3", null, "5. 跟至少一位閨蜜 / 家人報備"),
      h("p", null, "告訴信任的人三件事：地點、時間、對方在隨意約聊過的截圖。約定一個「safe word」，例如「我貓今天怪怪的」= 快來找我。"),

      h("h3", null, "6. 打開 iPhone 即時定位分享"),
      h("p", null, "把位置分享給信任的人，至少持續到回家為止。Android 也可以用 Google Maps 的「分享我的位置」。"),

      h("h2", null, "🟡 見面當下要做的 4 件事"),

      h("h3", null, "7. 自己交通工具、自己埋單"),
      h("p", null, "去和回都用自己的交通方式（公車、捷運、Uber），不上對方的車。第一次飲料咖啡自己付，不欠人情，也不留把柄。"),

      h("h3", null, "8. 飲料離開視線就不喝"),
      h("p", null, "去廁所、接電話、拿東西⋯⋯只要飲料離開視線哪怕 30 秒，就別再喝那杯。重新點過，店家也不會在意這 100 塊。"),

      h("h3", null, "9. 觀察「被操控感」"),
      h("p", null, "正常人不會在第一次見面就要求換場所、加 LINE 給你留私訊額度、貶低你的朋友、強迫你做不想做的事。任何一條中了，就是紅旗。"),

      h("h3", null, "10. 設定「30 分鐘安全電話」"),
      h("p", null, "見面前請朋友 30 分鐘後打電話來，你可以用這通電話「臨時有事」自然離開，不用解釋。"),

      h("h2", null, "🔴 遇到狀況的 2 件事"),

      h("h3", null, "11. 立即報警 110，不要客氣"),
      h("p", null, "感到不對勁就喊「警察叔叔」、按手機 SOS 鍵（iPhone 連按 5 下電源鍵）。你寧可錯怪一個人，也不要傷到自己。"),

      h("h3", null, "12. 回到隨意約立刻舉報"),
      h("p", null, "聊天室右上角的「舉報」按鈕一鍵送出，我們的客服 24 小時內會審核。請保留對方訊息截圖、見面地點、時間。"),

      h("h2", null, "我們在做什麼讓你更安全"),
      h(
        "ul",
        null,
        h("li", null, "✅ 全匿名 - 沒有人能知道你的真實身分，除非你自己說"),
        h("li", null, "✅ 一鍵舉報 - 24 小時內人工審核處理"),
        h("li", null, "✅ 敏感詞過濾 - 自動遮蔽不當言論"),
        h("li", null, "✅ 隨時可離開 - 對方一秒就被斷線"),
        h("li", null, "🟢 規劃中：女性優先配對徽章、線下見面前安全 checklist 推播")
      ),

      h("h2", null, "延伸閱讀"),
      h(
        "ul",
        null,
        h("li", null, "👉 ", h("a", { href: "/guide/chat-etiquette" }, "匿名聊天禮儀 7 條：讓對方願意繼續聊下去")),
        h("li", null, "👉 ", h("a", { href: "/guide/dinner-icebreakers" }, "找飯局伴的 6 個破冰金句"))
      )
    ),
};

// -------- 第 3 篇：暗號 10 種玩法 --------
const passcodeIdeas: ArticleMeta = {
  slug: "passcode-ideas",
  title: "10 個暗號玩法：閨蜜聚會、告白、探對方心意都好用",
  description:
    "隨意約的「暗號」功能可以讓相同暗號的人優先配對。除了找朋友，還能玩告白、團體活動、IG 限動互動⋯⋯10 種創意玩法整理。",
  category: "玩法",
  tags: ["暗號", "玩法", "創意", "告白"],
  publishedAt: "2026-06-28",
  readMinutes: 5,
  hero: { emoji: "🤝", gradient: "from-brand-50 to-yellow-50" },
  body: () =>
    h(
      F,
      null,
      h("p", null, "暗號是隨意約最容易被低估的功能。它不只是「找朋友」工具，而是一個能延伸出無數玩法的小機關。整理 10 種我們看過或聽過的暗號使用情境，給你靈感。"),

      h("h2", null, "🤝 友誼類"),

      h("h3", null, "1. 閨蜜深夜聊天局"),
      h("p", null, "和好友約好「今晚 11 點，暗號 sleepless」，瞬間配對成功。比 LINE 群組更有儀式感。"),

      h("h3", null, "2. 找團體出遊伴"),
      h("p", null, "辦野餐 / 桌遊 / 路跑活動，給每位參加者一組相同暗號（例如活動名稱 + 日期），用隨意約做事前破冰。"),

      h("h2", null, "❤️ 戀愛類"),

      h("h3", null, "3. 告白前的試水溫"),
      h("p", null, "想知道對方有沒有意思，又不敢直接問？跟他說：「今晚 10 點隨意約，暗號 candy」。如果他真的上線，代表心思至少在你身上一些。"),

      h("h3", null, "4. 異地戀夜聊儀式"),
      h("p", null, "情侶分隔兩地，每晚固定時間用同一個暗號上線，重新「重逢」對話。比視訊更有趣，也比文字更有溫度。"),

      h("h3", null, "5. 紀念日小遊戲"),
      h("p", null, "週年紀念日當天暗號設成你們在一起的日期（例如 0214），看誰先在隨意約找到對方，輸的人付飯錢。"),

      h("h2", null, "📣 社群類"),

      h("h3", null, "6. IG 限動投票後的「神秘聚會」"),
      h("p", null, "在 IG 限動發投票「今晚要不要一起匿名聊？」按愛心的人一律上 randate.tw 用暗號 ig，互不知道是誰，但都是你的粉絲。"),

      h("h3", null, "7. Threads / Dcard 發起話題"),
      h("p", null, "在 Threads 發「測試一下，凌晨 1 點 randate.tw 暗號 threads，看看有多少人真的睡不著」，引發跟風與好奇。"),

      h("h3", null, "8. KOL / 直播主互動"),
      h("p", null, "直播主在 OBS 上開隨意約，用暗號邀請觀眾上線，觀眾可以匿名跟主播 1 對 1 聊 3 分鐘。"),

      h("h2", null, "🏢 活動類"),

      h("h3", null, "9. 公司聚會匿名 360 反饋"),
      h("p", null, "團隊聚會時，主管設定暗號讓組員上線匿名提問，比 Slido 還有趣，也更有人情味（請務必尊重每個發言者）。"),

      h("h3", null, "10. 同學會破冰"),
      h("p", null, "10 年同學會，事前一週發暗號（例如 class2015），讓大家先在隨意約閒聊認識更新版的彼此，現場就不會尷尬。"),

      h("h2", null, "暗號要怎麼設才好？"),
      h(
        "ul",
        null,
        h("li", null, h("strong", null, "簡短好記："), "建議 4-8 個字元，太長對方容易打錯"),
        h("li", null, h("strong", null, "獨特性："), "不要設 abc、1234 這種，會撞到其他人"),
        h("li", null, h("strong", null, "情境連結："), "例如要找夜貓族就用 nightowl，找跨年伴就用 nye2026")
      ),

      h("h2", null, "延伸閱讀"),
      h(
        "ul",
        null,
        h("li", null, "👉 ", h("a", { href: "/guide/getting-started" }, "隨意約新手入門：3 分鐘上手")),
        h("li", null, "👉 ", h("a", { href: "/guide/solo-scenarios" }, "一個人也好玩：6 個自己約自己的好點子"))
      )
    ),
};

// -------- 第 4 篇：飯局破冰金句 --------
const dinnerIcebreakers: ArticleMeta = {
  slug: "dinner-icebreakers",
  title: "找飯局伴的 6 個破冰金句（附 3 個 NG 示範）",
  description:
    "在隨意約配對成功後第一句該怎麼開？6 個讓對方願意繼續聊下去的破冰金句，加上 3 個會直接被封鎖的 NG 示範。",
  category: "禮儀",
  tags: ["破冰", "開場", "飯局", "對話"],
  publishedAt: "2026-06-28",
  readMinutes: 4,
  hero: { emoji: "💬", gradient: "from-blue-50 to-brand-50" },
  body: () =>
    h(
      F,
      null,
      h("p", null, "配對成功的第一個 10 秒，決定對方願不願意繼續聊。第一句話太「業配感」或太強勢，對方就會直接關掉視窗。整理 6 個有效的開場 + 3 個千萬別用的 NG 示範。"),

      h("h2", null, "✅ 6 個讓對方想接話的開場"),

      h("h3", null, "金句 1：呼應共同情境"),
      h("p", null, "「嗨～看你也選了『一起吃飯』，你最近最想吃什麼類型的？」"),
      h("p", null, h("em", null, "為什麼有效：直接命中你們的共同情境，給對方一個具體又輕鬆的話題。")),

      h("h3", null, "金句 2：分享 + 反問"),
      h("p", null, "「我最近一直想吃信義區那間隱藏版麻辣鍋，但一個人吃實在太狠了 😂 你有想試試的店嗎？」"),
      h("p", null, h("em", null, "為什麼有效：先給對方資訊，再把話題交回去，對方不會感覺被「審問」。")),

      h("h3", null, "金句 3：誠實表達期待值"),
      h("p", null, "「不一定要見面，先聊聊看頻率對不對。你今天怎麼樣？」"),
      h("p", null, h("em", null, "為什麼有效：降低對方的戒心，讓他覺得這是「沒壓力的聊天」。")),

      h("h3", null, "金句 4：使用情境延伸"),
      h("p", null, "「我看你選了『看夜景』，是台北人嗎？我最常去的是象山，你呢？」"),
      h("p", null, h("em", null, "為什麼有效：自然帶出地理話題，對方很容易接話。")),

      h("h3", null, "金句 5：小幽默"),
      h("p", null, "「等等，我先聲明：我不是 AI 也不是賣保險的 🙋 你呢，今天為什麼上來？」"),
      h("p", null, h("em", null, "為什麼有效：用自嘲消除尷尬，順勢引導對方分享。")),

      h("h3", null, "金句 6：話題炸彈"),
      h("p", null, "「快速問你一個——燒肉一定要配 melon soda 還是可樂？這是嚴肅議題。」"),
      h("p", null, h("em", null, "為什麼有效：荒謬有趣，對方會笑著回答，破冰完成。")),

      h("h2", null, "❌ 3 個保證被秒封鎖的 NG"),

      h("h3", null, "NG 1：「在嗎？」 / 「有人嗎？」"),
      h("p", null, "感覺像詐騙簡訊。對方會直接離開。"),

      h("h3", null, "NG 2：「你長怎樣？傳張照片」"),
      h("p", null, "第一句就要照片＝沒禮貌。匿名平台你不該預期會拿到對方的臉。"),

      h("h3", null, "NG 3：「我覺得你應該⋯⋯」"),
      h("p", null, "任何「應該」開頭的句子都會讓對方覺得被指導，馬上想關掉。"),

      h("h2", null, "黃金原則"),
      h(
        "ul",
        null,
        h("li", null, h("strong", null, "輕、短、有問句"), "：第一句 30 字以內，結尾留一個問題"),
        h("li", null, h("strong", null, "呼應共同點"), "：永遠從你們都選的情境出發"),
        h("li", null, h("strong", null, "誠實期待值"), "：直說「想交朋友」或「想找飯局伴」，不用迂迴")
      ),

      h("h2", null, "延伸閱讀"),
      h(
        "ul",
        null,
        h("li", null, "👉 ", h("a", { href: "/guide/chat-etiquette" }, "匿名聊天禮儀 7 條")),
        h("li", null, "👉 ", h("a", { href: "/guide/safety-for-women" }, "【女生必看】跟陌生人見面前一定要做的 12 件事"))
      )
    ),
};

// -------- 第 5 篇：solo scenarios --------
const soloScenarios: ArticleMeta = {
  slug: "solo-scenarios",
  title: "一個人也好玩：6 個「自己約自己」的好點子",
  description:
    "不一定要找人配對才能享受隨意約。整理 6 個獨自一人也很適合的情境用法，從心情樹洞、深夜聊聊到匿名分享。",
  category: "玩法",
  tags: ["一個人", "獨處", "心情", "樹洞"],
  publishedAt: "2026-06-28",
  readMinutes: 3,
  hero: { emoji: "🧘", gradient: "from-purple-50 to-brand-50" },
  body: () =>
    h(
      F,
      null,
      h("p", null, "隨意約不只是找人見面的工具，它也可以是一個安靜、屬於你自己的空間。6 個我們看到使用者最常用的「一個人玩法」。"),

      h("h2", null, "1. 凌晨睡不著的樹洞"),
      h("p", null, "選「心情樹洞」+「純聊天」，找一個同樣睡不著的人。不一定要解決誰的問題，有人在線上陪你打字，就夠了。"),

      h("h2", null, "2. 練習說出心事的安全空間"),
      h("p", null, "有些話對朋友家人說不出口（家裡的問題、工作的委屈、不能說的喜歡）。對陌生人說，你會發現自己其實有很多話要講。"),

      h("h2", null, "3. 旅遊前的「在地人問路」"),
      h("p", null, "去陌生城市旅遊前，選「樹洞」+「純聊天」+ 暗號設成城市名（例如 kyoto），運氣好會配到當地人給你內行人推薦。"),

      h("h2", null, "4. 分手後的「無人在意期」"),
      h("p", null, "剛分手不想看到熟人臉、但一個人又孤單。隨意約幫你建立一段「短期但深入」的對話，療癒效果比追劇強。"),

      h("h2", null, "5. 練習主動的訓練場"),
      h("p", null, "現實中不太會主動破冰？隨意約就是最低成本的練習場。聊不下去也沒關係，下一個 Match 重新來過。"),

      h("h2", null, "6. 觀察台灣不同人怎麼想"),
      h("p", null, "想知道現在年輕人在意什麼、過年話題大家怎麼回？匿名讓對方更願意分享真實想法。"),

      h("h2", null, "一個人使用的建議"),
      h(
        "ul",
        null,
        h("li", null, "想被陪伴 → 選「純聊天」+「心情樹洞」"),
        h("li", null, "想練習表達 → 主動先問問題，逼自己練主導"),
        h("li", null, "不想被約見面 → 直接寫在第一句：「我今天只想聊聊，不見面也不交聯絡方式」")
      ),

      h("h2", null, "延伸閱讀"),
      h(
        "ul",
        null,
        h("li", null, "👉 ", h("a", { href: "/guide/chat-etiquette" }, "匿名聊天禮儀 7 條")),
        h("li", null, "👉 ", h("a", { href: "/guide/getting-started" }, "新手入門：3 分鐘上手"))
      )
    ),
};

// -------- 第 6 篇：聊天禮儀 --------
const chatEtiquette: ArticleMeta = {
  slug: "chat-etiquette",
  title: "匿名聊天禮儀 7 條：讓對方願意繼續聊下去的訣竅",
  description:
    "匿名不代表沒禮貌。整理 7 條在隨意約聊天時的小細節，讓你成為對方願意一直聊下去、甚至想加 LINE 的人。",
  category: "禮儀",
  tags: ["禮儀", "對話", "技巧"],
  publishedAt: "2026-06-28",
  readMinutes: 4,
  hero: { emoji: "🤝", gradient: "from-brand-50 to-emerald-50" },
  body: () =>
    h(
      F,
      null,
      h("p", null, "匿名聊天很像在咖啡廳跟陌生人共桌——氣質、節奏、禮貌，全都看在對方眼裡。整理 7 條小細節，看似微不足道，但會讓對方對你印象大躍進。"),

      h("h2", null, "1. 回訊息保持節奏感"),
      h("p", null, "對方傳完，你 30 秒內回 = 太急；超過 5 分鐘 = 對方會覺得你在敷衍。理想節奏是 30 秒~2 分鐘。"),

      h("h2", null, "2. 不要連續傳超過 3 則訊息"),
      h("p", null, "對方還沒回，你就連發 4、5 則，會讓人有壓力。等對方回完一輪再繼續。"),

      h("h2", null, "3. 善用問句把球丟回去"),
      h("p", null, "每 2-3 句之內結尾留一個問句，對話才會有來有回。「我今天去 7-11」這種沒問句的，對方不知道要回什麼。"),

      h("h2", null, "4. 表情符號適量、別錯用"),
      h("p", null, "🤣 / 😂 在台灣是 OK 的，但 ❤️ 第一句就丟，會嚇到對方。emoji 是調味料，不是主菜。"),

      h("h2", null, "5. 不要太快進入「個資攻防戰」"),
      h("p", null, "不要 5 分鐘內就問對方：「你住哪？幾歲？做什麼工作？」這像填表，不像聊天。順其自然帶出來。"),

      h("h2", null, "6. 不舒服的話題練習說「我不太想聊這個」"),
      h("p", null, "對方問你不想回的，直接說「這個我不太想聊，換個」。不需要解釋，也不用敷衍。"),

      h("h2", null, "7. 離開時請說一聲"),
      h("p", null, "突然消失是最大的 NG。哪怕只是「我先去洗澡，半小時後回來」或「今天聊得很開心，要睡了～」，都會讓對方感謝你。"),

      h("h2", null, "獎勵小提醒"),
      h(
        "ul",
        null,
        h("li", null, "✨ 如果你覺得對方很聊得來，不要害羞，主動說「想加 LINE」"),
        h("li", null, "✨ 不想繼續但又不知道怎麼結束 → 「不好意思我有點累了，謝謝今天聊天 ❤️」"),
        h("li", null, "✨ 對方一直跳針騷擾 → 直接舉報，不需要回應")
      ),

      h("h2", null, "延伸閱讀"),
      h(
        "ul",
        null,
        h("li", null, "👉 ", h("a", { href: "/guide/dinner-icebreakers" }, "找飯局伴的 6 個破冰金句")),
        h("li", null, "👉 ", h("a", { href: "/guide/safety-for-women" }, "【女生必看】跟陌生人見面前一定要做的 12 件事"))
      )
    ),
};

// -------- export --------
export const ARTICLES: ArticleMeta[] = [
  gettingStarted,
  safetyForWomen,
  passcodeIdeas,
  dinnerIcebreakers,
  soloScenarios,
  chatEtiquette,
];

export function findArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, take = 3): ArticleMeta[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, take);
}
