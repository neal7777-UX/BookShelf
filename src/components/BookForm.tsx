import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from '@/types/book';

interface BookFormProps {
  onAddBook: (book: Omit<Book, 'id'>) => void;
}

export const BookForm = ({ onAddBook }: BookFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !cover.trim()) {
      alert('請填寫所有欄位');
      return;
    }

    onAddBook({
      title: title.trim(),
      author: author.trim(),
      cover: cover.trim(),
      status: 'unread',
    });

    // 重置表單
    setTitle('');
    setAuthor('');
    setCover('');
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>新增書籍</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">書名</Label>
            <Input
              id="title"
              type="text"
              placeholder="請輸入書名"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">作者</Label>
            <Input
              id="author"
              type="text"
              placeholder="請輸入作者"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">封面網址</Label>
            <Input
              id="cover"
              type="url"
              placeholder="https://example.com/cover.jpg"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            加入書架
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
