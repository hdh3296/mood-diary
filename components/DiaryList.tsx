'use client'

import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil, Trash2, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { DiaryEditModal } from "./DiaryEditModal"
import { cn } from "@/lib/utils"
import { EmotionIcon } from "./EmotionIcon"
import { DiaryDetailModal } from "./DiaryDetailModal"
import { DiaryEntryTable, deleteDiary, updateDiary, EmotionType } from '@/lib/diary-service'

interface DiaryListProps {
  diaries: DiaryEntryTable[]
}

export function DiaryList({ diaries }: DiaryListProps) {
  const [editingEntry, setEditingEntry] = useState<DiaryEntryTable | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntryTable | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [emotionFilter, setEmotionFilter] = useState<EmotionType | "전체">("전체")
  
  const filteredDiaries = diaries.filter(diary => {
    const matchesSearch = diary.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEmotion = emotionFilter === "전체" || diary.emotion === emotionFilter
    return matchesSearch && matchesEmotion
  })

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
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Input
            placeholder="일기 내용 검색..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <Select value={emotionFilter} onValueChange={(value) => setEmotionFilter(value as EmotionType | "전체")}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="감정 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            <SelectItem value="행복">행복</SelectItem>
            <SelectItem value="슬픔">슬픔</SelectItem>
            <SelectItem value="분노">분노</SelectItem>
            <SelectItem value="평범">평범</SelectItem>
            <SelectItem value="신남">신남</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {filteredDiaries.length === 0 ? (
            <p className="text-center text-muted-foreground">
              {diaries.length === 0 ? "작성된 일기가 없습니다." : "검색 결과가 없습니다."}
            </p>
          ) : (
            filteredDiaries.map((entry) => (
              <Card 
                key={entry.id}
                className={cn(
                  "transition-colors cursor-pointer",
                  entry.emotion && `border-l-4`
                )}
                style={{ borderLeftColor: entry.emotion_color || undefined }}
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
    </div>
  )
} 