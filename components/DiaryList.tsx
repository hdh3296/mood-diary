'use client'

import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { DiaryEditModal } from "./DiaryEditModal"
import { DiaryEntry } from '@/lib/types'
import { cn } from "@/lib/utils"
import { EmotionIcon } from "./EmotionIcon"
import { DiaryDetailModal } from "./DiaryDetailModal"

export function DiaryList() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)

  useEffect(() => {
    const storedEntries = localStorage.getItem('diaryEntries')
    setEntries(storedEntries ? JSON.parse(storedEntries) : [])
  }, [])

  const handleEdit = (entry: DiaryEntry) => {
    setEditingEntry(entry)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 이 일기를 삭제하시겠습니까?')) {
      const updatedEntries = entries.filter(entry => entry.id !== id)
      localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries))
      setEntries(updatedEntries)
    }
  }

  const handleSave = (id: string, content: string, createdAt: string) => {
    const updatedEntries = entries.map(entry =>
      entry.id === id ? { ...entry, content, createdAt } : entry
    )
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries))
    setEntries(updatedEntries)
  }

  return (
    <>
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {entries.length === 0 ? (
            <p className="text-center text-muted-foreground">작성된 일기가 없습니다.</p>
          ) : (
            entries.map((entry) => (
              <Card 
                key={entry.id}
                className={cn(
                  "transition-colors cursor-pointer",
                  entry.emotion && `border-l-4`
                )}
                style={{ borderLeftColor: entry.emotionColor }}
                onClick={() => setSelectedEntry(entry)}
              >
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">
                        {format(parseISO(entry.createdAt), 'PPP (EEEE)', { locale: ko })}
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
                        onClick={() => handleEdit(entry)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(entry.id)}
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