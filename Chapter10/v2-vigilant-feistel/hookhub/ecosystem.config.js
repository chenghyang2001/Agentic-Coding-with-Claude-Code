/**
 * PM2 Ecosystem 設定檔 — HookHub Ch10-v2（Next.js）
 *
 * 使用 __dirname 動態推算 cwd，確保跨機器可移植（不硬編碼 /home/<user>/）。
 * 在 VPS 執行：pm2 start ecosystem.config.js --env production
 *
 * Chapter10 v2 獨立 PM2 app name 為 "hookhub-v2"，
 * PORT 3003，與 Chapter02 "hookhub"（PORT 3001）、Ch10-v1 "hookhub-ch10"（PORT 3002）隔離，避免衝突。
 */

"use strict";

const path = require("path");

module.exports = {
  apps: [
    {
      // 應用名稱；Chapter10 v2 加 "-v2" 後綴，與 v1 "hookhub-ch10" 和 Chapter02 "hookhub" 區分
      // pm2 reload/stop/delete 都以此名稱識別，確保操作不互相干擾
      name: "hookhub-v2",

      // 直接呼叫 Next.js CLI 的 start 子命令（等同 npm run start）
      // 用 next 的二進位路徑而非 npm，讓 PM2 訊號傳遞更精準（SIGINT/SIGTERM）
      script: "node_modules/.bin/next",
      args: "start",

      // 以 ecosystem.config.js 所在目錄為工作目錄
      // 這樣 .next/、public/ 等路徑都相對正確，不受 VPS 執行路徑影響
      cwd: __dirname,

      // 單一實例（Next.js standalone 模式不需要 cluster）
      // cluster 模式需要無狀態架構，此處保守選擇 fork 模式
      instances: 1,

      // 記憶體超過 512MB 時自動重啟，防止記憶體洩漏讓低規 VPS 癱瘓
      max_memory_restart: "512M",

      // 進程崩潰時自動重啟（PM2 預設行為，明確列出方便審閱與日後調整）
      autorestart: true,

      // 關閉 watch 模式——生產環境不應因檔案變動重啟
      // 變更應走 CI/CD 流程（GitHub Actions），而非依賴 watch 機制
      watch: false,

      // 生產環境變數區塊（pm2 start --env production 時套用）
      env_production: {
        NODE_ENV: "production",
        // PORT 以字串型別傳入，避免 PM2 將 Number 3003 傳給 Next.js 時發生隱式轉換歧義
        // Chapter02 用 3001，Ch10-v1 用 3002，Ch10-v2 用 3003，避免同台 VPS 上 port 衝突
        PORT: "3003",
        // 強制 Next.js 只監聽 loopback（127.0.0.1），確保外部流量一定經過 nginx
        // 若不設此項，Next.js 預設監聽 0.0.0.0，port 3003 對外裸露可繞過 nginx 安全標頭
        HOSTNAME: "127.0.0.1",
      },

      // 開發環境變數（本地 pm2 測試用，pm2 start --env development）
      env_development: {
        NODE_ENV: "development",
        // PORT 以字串型別傳入，與 env_production 保持一致，避免型別歧義
        PORT: "3003",
        // 開發環境同樣限制監聽 loopback，讓本地行為與生產一致，減少「本地過、VPS 壞」的調試盲區
        HOSTNAME: "127.0.0.1",
      },

      // Log 路徑：相對於 cwd，集中在 logs/ 目錄方便查閱與 logrotate
      // 加 -v2 後綴確保不與 Chapter02 及 v1 的 log 檔混淆
      out_file: path.join(__dirname, "logs", "hookhub-v2-out.log"),
      error_file: path.join(__dirname, "logs", "hookhub-v2-err.log"),

      // stdout 與 stderr 分開存放，方便分別搜尋正常輸出與錯誤訊息
      merge_logs: false,

      // Log 時間戳記格式，方便關聯 VPS 系統 log 排查問題
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
