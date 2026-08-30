# Hardened Fork Prompt for Any Codex Workspace

Use the prompt below in a new Codex task when the hardened Skill is not yet
installed, or when you are unsure which checkout the task would use. Replace
`<YOUR TASK>` at the bottom with the work you want done.

```text
請使用「Codex with ChatGPT Hardened」處理目前專案，全程自行完成安裝、檢查、
連線、規劃、執行與審核。我不懂技術；除非需要登入 ChatGPT／Cloudflare、驗證碼、
兩步驗證或明確授權畫面，否則不要中斷詢問我，而且一次只告訴我一個動作。

安全來源規則：
1. 唯一允許的程式來源是：
   https://github.com/KiVixx/codex-with-chatgpt-hardened
2. 安裝目錄使用 ~/codex-with-chatgpt-hardened。
3. 禁止從 XiaoDuoYa/codex-with-chatgpt 自動 pull、merge、rebase、安裝或執行。
4. 不得啟用任何自動更新。update-check 只能提示有新版，不能修改檔案。
5. 更新只能在我明確說「更新 hardened fork」後進行，而且只能從上述 fork 的
   origin/main 取得；更新前先顯示 SHA 與 diff 摘要，等我同意。

如果尚未安裝：
1. 自檢 git、Node.js >= 20、corepack 與 cloudflared；macOS 缺少套件用 Homebrew，
   Windows 用 winget，自行安裝。
2. clone hardened fork 到 ~/codex-with-chatgpt-hardened。若目錄已存在，先確認
   origin URL 完全等於上述 hardened fork；不相符就停止更新该目录，改用新的
   hardened 目錄，禁止覆蓋使用者檔案。
3. 執行 corepack pnpm install --frozen-lockfile、corepack pnpm typecheck、
   corepack pnpm test、corepack pnpm build、corepack pnpm audit。
4. 複製 skill/SKILL.md 到 ~/.codex/skills/codex-with-chatgpt/SKILL.md，並把
   "The codex-with-chatgpt checkout lives at:" 與 CLI 路徑改成實際 hardened
   checkout 的絕對路徑。

接著對「目前專案目錄」執行 Skill 的首次設定或 doctor 流程。ChatGPT 相關操作
只能使用 Codex 內置瀏覽器；不得開啟或控制 Chrome、Safari、Edge。每個專案只建立
一個專用連接與一個長期使用的 ChatGPT 對話，先用 workspace_info 驗證名稱與目前
專案一致，再開始工作。

之後嚴格依照 Skill 的 C2C 流程：ChatGPT 網頁端負責規劃與獨立審核，Codex 負責
編輯、命令、測試、修復與 Git。不要把檔案內容、diff 或日誌貼進 ChatGPT；讓它
透過只讀連接自行檢查。每輪執行後記錄測試結果，要求 ChatGPT 審查實際 diff，直到
回覆 DONE；若它提出真實問題，Codex 自行修復再送審。

我的任務：<YOUR TASK>

完成時請回報：hardened checkout 路徑、origin URL、使用的 commit SHA、測試結果、
ChatGPT 最終審核結論，以及確認沒有使用原倉庫自動更新。
```

## Short prompt after installation

Once the Skill is installed on the same machine, a new Codex task only needs:

```text
使用 Codex with ChatGPT Hardened 處理目前專案：<YOUR TASK>。
只使用 KiVixx/codex-with-chatgpt-hardened，禁止原倉庫與任何自動更新。
先驗證 workspace，再讓 ChatGPT 規劃；Codex 執行後交給 ChatGPT 獨立審核，
直到 DONE。除登入、驗證碼、兩步驗證或授權畫面外，全程自動處理。
```

## Scope

The Skill is installed globally for the current operating-system user, so all
Codex tasks on that machine can discover it. Each project still needs its own
first-time secure connection and retains one ChatGPT conversation. A different
computer needs the full installation prompt once.
