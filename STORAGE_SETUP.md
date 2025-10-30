# Supabase Storage 設定（封面上傳）

1. 建立 bucket：
   - 進入 Supabase 專案 → Storage → Create new bucket
   - Bucket name：`covers`
   - Public bucket：勾選（公開讀取）

2. 權限（若未勾公開，改用政策開放讀取）：
   - Storage → Policies → 對 `objects` 建立政策：
   ```sql
   -- 允許匿名讀取 public bucket 內的檔案
   create policy "Public read for covers"
     on storage.objects for select
     using ( bucket_id = 'covers' );

   -- 允許匿名上傳（若需要，否則僅透過服務端上傳）
   create policy "Anon upload to covers"
     on storage.objects for insert
     with check ( bucket_id = 'covers' );
   ```

3. 用途：
   - 表單選擇相簿或拍照時，上傳圖片到 `covers`，並將公開網址寫入 `books.cover` 欄位。
