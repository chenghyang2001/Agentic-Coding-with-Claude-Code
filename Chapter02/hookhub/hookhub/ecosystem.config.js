/**
 * PM2 Ecosystem 設定檔 — HookHub（Next.js 15）
 *
 * 使用 __dirname 動態推算 cwd，確保跨機器可移植（不硬編碼 /home/claude/）。
 * 在 VPS 執行：pm2 start ecosystem.config.js --env production
 */

"use strict";

const path = require("path");

module.exports = {
  apps: [
    {
      // 應用名稱，pm2 reload/stop/delete 都用此名稱識別
      name: "hookhub",

      // 直接呼叫 Next.js CLI 的 start 子命令（等同 npm run start）
      // 用 next 的二進位路徑而非 npm，讓 PM2 訊號傳遞更精準
      script: "node_modules/.bin/next",
      args: "start",

      // 以 ecosystem.config.js 所在目錄為工作目錄
      // 這樣 .next/、public/ 等路徑都相對正確
      cwd: __dirname,

      // 單一實例（Next.js standalone 模式不需要 cluster）
      instances: 1,

      // 記憶體超過 512MB 時自動重啟，防止記憶體洩漏讓 VPS 癱瘓
      max_memory_restart: "512M",

      // 進程崩潰時自動重啟（PM2 預設行為，明確列出方便審閱）
      autorestart: true,

      // 關閉 watch 模式——生產環境不應因檔案變動重啟
      // 變更應走 CI/CD 流程，而非 watch
      watch: false,

      // 生產環境變數區塊（pm2 start --env production 時套用）
      env_production: {
        NODE_ENV: "production",
        // Next.js 監聽 port；3001 與本地開發 3000 錯開，避免測試衝突
        PORT: 3001,
      },

      // 開發環境變數（本地 pm2 測試用）
      env_development: {
        NODE_ENV: "development",
        PORT: 3001,
      },

      // Log 路徑：相對於 cwd，集中在 logs/ 目錄方便查閱
      out_file: path.join(__dirname, "logs", "hookhub-out.log"),
      error_file: path.join(__dirname, "logs", "hookhub-err.log"),

      // 合併 stdout 和 stderr 到同一個 log 檔（可改為 false 分開）
      merge_logs: false,

      // Log 時間戳記格式
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
