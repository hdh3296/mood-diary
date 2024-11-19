'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { analyzeEmotion } from "@/app/actions/analyze-emotion"
import { emotionColors } from "@/lib/types"

interface DiaryEditorProps {
  onSubmitSuccess: () => void
}

export function DiaryEditor({ onSubmitSuccess }: DiaryEditorProps) {
  const [content, setContent] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      alert('일기 내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      console.log('=== 일기 저장 시작 ===')
      console.log('일기 내용:', content)
      
      // 감정 분석
      console.log('감정 분석 요청 중...')
      const emotion = await analyzeEmotion(content)
      console.log('분석된 감정:', emotion)

      const entry = {
        id: Date.now().toString(),
        content,
        createdAt: date.toISOString(),
        emotion,
        emotionColor: emotionColors[emotion]
      }
      console.log('저장할 일기 데이터:', entry)

      // 로컬 스토리지에 저장
      const existingEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]')
      localStorage.setItem('diaryEntries', JSON.stringify([entry, ...existingEntries]))
      console.log('로컬 스토리지 저장 완료')

      // 입력 필드 초기화
      setContent('')
      setDate(new Date())
      alert('일기가 저장되었습니다.')
      onSubmitSuccess()
      console.log('=== 일기 저장 완료 ===')
    } catch (error) {
      console.error('=== 일기 저장 오류 ===')
      console.error('오류 내용:', error)
      alert('일기 저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP (EEEE)', { locale: ko }) : <span>날짜 선택</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate || date)
                setIsCalendarOpen(false)
              }}
              initialFocus
              locale={ko}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Textarea
        placeholder="오늘의 일기를 작성해주세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[200px]"
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? '분석 중...' : '저장하기'}
      </Button>
    </form>
  )
} 