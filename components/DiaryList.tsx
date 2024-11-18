'use client'

import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { DiaryEditModal } from "./DiaryEditModal"
import { cn } from "@/lib/utils"
import { EmotionIcon } from "./EmotionIcon"
import { DiaryDetailModal } from "./DiaryDetailModal"
import { DiaryEntryTable, deleteDiary, updateDiary } from '@/lib/diary-service'

interface DiaryListProps {
  diaries: DiaryEntryTable[]
}

export function DiaryList({ diaries }: DiaryListProps) {
  const [editingEntry, setEditingEntry] = useState<DiaryEntryTable | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntryTable | null>(null)

  const handleEdit = (entry: DiaryEntryTable) => {
    setEditingEntry(entry)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('정말로 이 일기를 삭제하시겠습니까?')) {
      try {
        await deleteDiary(id)
        window.location.reload() // 페이지 새로고침
      } catch (error) {
        console.error('일기 삭제 중 오류 발생:', error)
      }
    }
  }

  const handleSave = async (id: string, content: string, emotion?: EmotionType) => {
    try {
      await updateDiary(id, content, emotion)
      window.location.reload() // 페이지 새로고침
    } catch (error) {
      console.error('일기 수정 중 오류 발생:', error)
    }
  }

  return (
    <>
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {diaries.length === 0 ? (
            <p className="text-center text-muted-foreground">작성된 일기가 없습니다.</p>
          ) : (
            diaries.map((entry) => (
              <Card 
                key={entry.id}
                className={cn(
                  "transition-colors cursor-pointer",
                  entry.emotion && `border-l-4`
                )}
                style={{ borderLeftColor: entry.emotion_color }}
                onClick={() => setSelectedEntry(entry)}
              >
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">
                        {format(parseISO(entry.created_at), 'PPP (EEEE)', { locale: ko })}
                      </div>
                      <div className="flex items-center gap-1">
                        {entry.emotion && <EmotionIcon emotion={entry.emotion} />}
                        <span className="text-sm text-muted-foreground">
                          {entry.emotion}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(entry)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(entry.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-3">
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {editingEntry && (
        <DiaryEditModal
          entry={editingEntry}
          isOpen={!!editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={handleSave}
        />
      )}

      {selectedEntry && (
        <DiaryDetailModal
          entry={selectedEntry}
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onEdit={(entry) => {
            setEditingEntry(entry)
            setSelectedEntry(null)
          }}
          onDelete={handleDelete}
        />
      )}
    </>
  )
} 