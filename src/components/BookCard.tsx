import { Book } from '@/types/book';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from './RatingStars';
import { Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

const getStatusLabel = (status: Book['status']) => {
  const statusMap = {
    unread: '未讀',
    reading: '正在讀',
    completed: '已完成',
  };
  return statusMap[status];
};

const getStatusColor = (status: Book['status']) => {
  const colorMap = {
    unread: 'bg-gray-500',
    reading: 'bg-blue-500',
    completed: 'bg-green-500',
  };
  return colorMap[status];
};

export const BookCard = ({ book, onClick, onDelete }: BookCardProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`確定要刪除書籍「${book.title}」嗎？`)) {
      onDelete?.(book.id);
    }
  };

  return (
    <Card className="aspect-square overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-2xl flex flex-col" onClick={onClick}>
      <div className="relative overflow-hidden bg-gray-100 flex-1">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450?text=No+Cover';
          }}
        />
      </div>
      <CardContent className="p-3 flex-shrink-0">
        <div className="mb-1 flex items-start justify-between gap-2 relative">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold line-clamp-2 pr-6">{book.title}</h3>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <RatingStars value={book.rating ?? 0} size={14} />
            {onDelete && (
              <button
                className="ml-1 p-1 rounded hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                onClick={handleDeleteClick}
                aria-label="刪除書籍"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${getStatusColor(book.status)}`} />
          <span className="text-xs text-muted-foreground">
            {getStatusLabel(book.status)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
