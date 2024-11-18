'use client'

import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { EmotionIcon } from "./EmotionIcon"
import { DiaryEntryTable } from "@/lib/diary-service"

interface DiaryDetailModalProps {
  entry: DiaryEntryTable
  isOpen: boolean
  onClose: () => void
  onEdit: (entry: DiaryEntryTable) => void
  onDelete: (id: string) => void
}

export function DiaryDetailModal({
  entry,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: DiaryDetailModalProps) {
  const handleEdit = () => {
    onEdit(entry)
  }

  const handleDelete = () => {
    onDelete(entry.id)
    onClose()
  }

  if (!entry) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="font-medium">
              {format(parseISO(entry.created_at), 'PPP (EEEE)', { locale: ko })}
            </div>
            {entry.emotion && (
              <div className="flex items-center gap-1">
                <EmotionIcon emotion={entry.emotion} />
                <span className="text-sm text-muted-foreground">
                  {entry.emotion}
                </span>
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            일기 상세 내용입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="whitespace-pre-wrap">{entry.content}</p>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
          >
            <Pencil className="mr-2 h-4 w-4" />
            수정
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 