import { useEffect, useState } from 'react';
import { Book } from '@/types/book';
import { BookForm } from '@/components/BookForm';
import { TabsFilter } from '@/components/TabsFilter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookDetailDialog } from '@/components/BookDetailDialog';
import { supabase } from '@/lib/supabase';
import { Toast } from '@/components/Toast';

export const Bookshelf = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Book | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setBooks(data as Book[]);
      }
    };
    fetchBooks();
  }, []);

  const handleAddBook = async (bookData: Omit<Book, 'id'>) => {
    const { data, error } = await supabase
      .from('books')
      .insert(bookData)
      .select()
      .single();
    if (!error && data) {
      setBooks((prev) => [data as Book, ...prev]);
      setAddOpen(false);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    }
  };

  const handleSelectBook = (book: Book) => {
    setSelected(book);
    setDetailOpen(true);
  };

  const handleSaveBook = async (updated: Book) => {
    const { data, error } = await supabase
      .from('books')
      .update({
        title: updated.title,
        author: updated.author,
        cover: updated.cover,
        status: updated.status,
        rating: updated.rating ?? 0,
        notes: updated.notes ?? null,
      })
      .eq('id', updated.id)
      .select()
      .single();
    if (!error && data) {
      setBooks((prev) => prev.map((b) => (b.id === updated.id ? (data as Book) : b)));
      // 若更動狀態分類，直接切換到該頁籤
      if (activeTab !== data.status && ['reading', 'unread', 'completed'].includes(data.status)) {
        setActiveTab(data.status);
      }
    }
  };

  const handleDeleteBook = async (id: string) => {
    await supabase.from('books').delete().eq('id', id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (selected?.id === id) {
      setSelected(null);
      setDetailOpen(false);
    }
  };

  const handleRatingChange = async (book: Book, rating: number) => {
    const { data, error } = await supabase.from('books').update({ rating }).eq('id', book.id).select().single();
    if (!error && data) {
      setBooks((prev) => prev.map((b) => (b.id === book.id ? { ...b, rating } : b)));
    }
  };

  return (
    <div className="min-h-screen bookshelf-bg py-8">
      <Toast message="新增成功" visible={toastVisible} />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">我的書架</h1>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">新增書籍</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增書籍</DialogTitle>
              </DialogHeader>
              <BookForm onAddBook={handleAddBook} />
            </DialogContent>
          </Dialog>
        </div>

        <TabsFilter
          books={books}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSelectBook={handleSelectBook}
          onDeleteBook={handleDeleteBook}
          onRatingChange={handleRatingChange}
        />

        <BookDetailDialog
          open={detailOpen}
          onOpenChange={setDetailOpen}
          book={selected}
          onSave={handleSaveBook}
        />
      </div>
    </div>
  );
};
