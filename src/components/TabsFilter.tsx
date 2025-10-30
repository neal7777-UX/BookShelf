import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Book } from '@/types/book';
import { BookCard } from './BookCard';

interface TabsFilterProps {
  books: Book[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onSelectBook?: (book: Book) => void;
  onDeleteBook?: (id: string) => void;
}

const renderBooksList = (books: Book[], onSelect?: (book: Book) => void, onDelete?: (id: string) => void) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">目前沒有書籍</p>
        <p className="text-sm mt-2">嘗試新增一本書吧！</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onClick={() => onSelect?.(book)} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export const TabsFilter = ({ books, activeTab, onTabChange, onSelectBook, onDeleteBook }: TabsFilterProps) => {
  const allBooks = books;
  const readingBooks = books.filter((book) => book.status === 'reading');
  const unreadBooks = books.filter((book) => book.status === 'unread');
  const completedBooks = books.filter((book) => book.status === 'completed');

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="all">全部</TabsTrigger>
        <TabsTrigger value="reading">正在讀</TabsTrigger>
        <TabsTrigger value="unread">未讀</TabsTrigger>
        <TabsTrigger value="completed">已完成</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        {renderBooksList(allBooks, onSelectBook, onDeleteBook)}
      </TabsContent>
      
      <TabsContent value="reading" className="mt-0">
        {renderBooksList(readingBooks, onSelectBook, onDeleteBook)}
      </TabsContent>
      
      <TabsContent value="unread" className="mt-0">
        {renderBooksList(unreadBooks, onSelectBook, onDeleteBook)}
      </TabsContent>
      
      <TabsContent value="completed" className="mt-0">
        {renderBooksList(completedBooks, onSelectBook, onDeleteBook)}
      </TabsContent>
    </Tabs>
  );
};
