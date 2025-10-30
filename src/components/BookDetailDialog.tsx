import { useState, useEffect } from 'react'
import { Book, BookStatus } from '@/types/book'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RatingStars } from './RatingStars'

interface BookDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  book: Book | null
  onSave: (book: Book) => void
}

export function BookDetailDialog({ open, onOpenChange, book, onSave }: BookDetailDialogProps) {
  const [local, setLocal] = useState<Book | null>(book)

  useEffect(() => {
    setLocal(book)
  }, [book])

  if (!local) return null

  const handleSave = () => {
    onSave(local)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>書籍詳情</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-[2/3] bg-gray-100 overflow-hidden rounded-xl">
              <img src={local.cover} alt={local.title} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>書名</Label>
              <Input value={local.title} onChange={(e) => setLocal({ ...local, title: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>作者</Label>
              <Input value={local.author} onChange={(e) => setLocal({ ...local, author: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>閱讀狀態</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={local.status}
                onChange={(e) => setLocal({ ...local, status: e.target.value as BookStatus })}
              >
                <option value="unread">未讀</option>
                <option value="reading">正在讀</option>
                <option value="completed">已完成</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label>評分</Label>
              <RatingStars value={local.rating ?? 0} onChange={(v) => setLocal({ ...local, rating: v })} size={24} />
            </div>
            <div className="space-y-1">
              <Label>心得</Label>
              <textarea
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="寫下你的閱讀心得..."
                value={local.notes ?? ''}
                onChange={(e) => setLocal({ ...local, notes: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave}>儲存</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
