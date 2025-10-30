# 🚀 快速啟動指南

## 問題診斷

如果看到「無法連上這個網站」錯誤，通常是因為：

1. **尚未安裝依賴套件** ❌
2. **開發伺服器未啟動** ❌
3. **安裝過程有錯誤** ❌

---

## 📋 完整安裝步驟

### 步驟 1：檢查 Node.js 版本

在終端機（PowerShell 或 CMD）執行：

```bash
node --version
```

應該顯示 `v18` 或更高版本。

如果沒有 Node.js，請前往 [nodejs.org](https://nodejs.org/) 下載並安裝。

---

### 步驟 2：安裝依賴套件

在專案目錄中執行：

```bash
npm install
```

這會安裝所有必要的套件，過程可能需要 1-3 分鐘。

**等待直到看到類似這樣的訊息：**
```
added 234 packages, and audited 235 packages in 2m
```

---

### 步驟 3：啟動開發伺服器

執行：

```bash
npm run dev
```

**成功啟動後，應該會看到：**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### 步驟 4：開啟瀏覽器

點擊終端機中的 `http://localhost:5173/` 連結，或手動在瀏覽器中開啟該網址。

---

## ⚠️ 常見問題解決

### 問題 1：`npm: command not found`

**解決方法：** 安裝 Node.js

---

### 問題 2：`Cannot find module 'xxx'`

**解決方法：** 
```bash
npm install
```

---

### 問題 3：端口 5173 已被占用

**解決方法：** Vite 會自動使用下一個可用端口（如 5174），或手動指定：

```bash
npm run dev -- --port 3000
```

---

### 問題 4：TypeScript 錯誤

**解決方法：** 如果遇到類型錯誤，先確認所有檔案都已正確建立，然後重新執行：

```bash
npm install
npm run dev
```

---

## 🔍 驗證專案結構

確認以下檔案都存在：

```
書架APP貳之型/
├── node_modules/          (安裝依賴後會出現)
├── src/
│   ├── components/
│   ├── pages/
│   ├── types/
│   ├── lib/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## ✨ 成功指標

當你看到以下畫面時，表示成功：

- ✅ 瀏覽器顯示「我的書架」標題
- ✅ 有「新增書籍」表單
- ✅ 有「全部 / 正在讀 / 未讀 / 已完成」Tabs
- ✅ 可以輸入書本資訊並新增

---

## 🆘 還是有問題？

1. **清除快取並重新安裝：**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **檢查終端機錯誤訊息**，通常會提示具體問題

3. **確認檔案完整性**，所有程式碼檔案都已正確建立

---

祝您使用愉快！📚

