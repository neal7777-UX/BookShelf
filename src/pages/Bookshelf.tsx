import { useState } from 'react';
import { Book } from '@/types/book';
import { BookForm } from '@/components/BookForm';
import { TabsFilter } from '@/components/TabsFilter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookDetailDialog } from '@/components/BookDetailDialog';

export const Bookshelf = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Book | null>(null);

  const handleAddBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
    };
    setBooks([...books, newBook]);
  };

  const handleSelectBook = (book: Book) => {
    setSelected(book);
    setDetailOpen(true);
  };

  const handleSaveBook = (updated: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleDeleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (selected?.id === id) {
      setSelected(null);
      setDetailOpen(false);
    }
  };

  return (
    <div className="min-h-screen bookshelf-bg py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">我的書架</h1>
          <Dialog>
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
