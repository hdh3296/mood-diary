'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { DiaryEntry } from "@/lib/types"
import { EmotionIcon } from "./EmotionIcon"
import { Pencil, Trash2, X } from "lucide-react"

interface DiaryDetailModalProps {
  entry: DiaryEntry
  isOpen: boolean
  onClose: () => void
  onEdit: (entry: DiaryEntry) => void
  onDelete: (id: string) => void
}

export function DiaryDetailModal({ 
  entry, 
  isOpen, 
  onClose, 
  onEdit,
  onDelete 
}: DiaryDetailModalProps) {
  const handleDelete = () => {
    if (window.confirm('정말로 이 일기를 삭제하시겠습니까?')) {
      onDelete(entry.id)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[600px] [&>button]:hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="absolute -right-3 -top-3">
          <DialogClose asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full border bg-white shadow-md hover:bg-gray-100 block flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DialogTitle>
                {format(parseISO(entry.createdAt), 'PPP (EEEE)', { locale: ko })}
              </DialogTitle>
              {entry.emotion && (
                <span className="flex items-center gap-1">
                  <EmotionIcon emotion={entry.emotion} />
                  <span className="text-sm text-muted-foreground">
                    {entry.emotion}
                  </span>
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  onEdit(entry)
                  onClose()
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="sr-only">
          {entry.emotion} 감정의 일기 내입니다.
        </DialogDescription>
        <div className="mt-4">
          <p className="whitespace-pre-wrap text-lg leading-relaxed">
            {entry.content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 