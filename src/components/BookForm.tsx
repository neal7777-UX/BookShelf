import { useState, FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from '@/types/book';
import { supabase } from '@/lib/supabase';
import { ImagePlus } from 'lucide-react';

interface BookFormProps {
  onAddBook: (book: Omit<Book, 'id'>) => void;
}

export const BookForm = ({ onAddBook }: BookFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert('請填寫必填欄位');
      return;
    }
    let coverUrl = cover.trim();

    // 若選擇了檔案，優先上傳到 Supabase Storage，並以公開網址作為封面
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt ?? 'jpg'}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('covers')
        .upload(filePath, selectedFile, {
          contentType: selectedFile.type || 'image/jpeg',
          upsert: false,
        });

      if (!uploadError) {
        const { data } = supabase.storage.from('covers').getPublicUrl(filePath);
        if (data?.publicUrl) {
          coverUrl = data.publicUrl;
        }
      } else {
        // 上傳失敗時，改為使用輸入框的網址或 base64 預覽，不阻擋新增
        console.warn('封面上傳失敗，改用網址欄位內容', uploadError);
      }
    }

    onAddBook({
      title: title.trim(),
      author: author.trim(),
      cover: coverUrl,
      status: 'unread',
    });

    // 重置表單
    setTitle('');
    setAuthor('');
    setCover('');
    setSelectedFile(null);
  };

  const handlePickFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0];
    if (!f) return;
    setSelectedFile(f);
    const dataUrl = await readFileAsDataUrl(f);
    setCover(dataUrl);
    ev.target.value = '';
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>新增書籍</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title"><span className="text-red-500 mr-1">*</span>書名</Label>
            <Input
              id="title"
              type="text"
              placeholder="請輸入書名"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author"><span className="text-red-500 mr-1">*</span>作者</Label>
            <Input
              id="author"
              type="text"
              placeholder="請輸入作者"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">封面（非必填）</Label>
            <div className="flex items-center gap-2">
              <Input
                id="cover"
                type="url"
                placeholder="https://example.com/cover.jpg"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                className="flex-1"
              />
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePickFile} />
              <Button type="button" variant="secondary" size="icon" aria-label="上傳圖片" onClick={() => fileInputRef.current?.click()}>
                <ImagePlus size={18} />
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            加入書架
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
