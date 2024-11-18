'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { createDiary } from "@/lib/diary-service"
import { analyzeEmotion } from "@/app/actions/analyze-emotion"

interface DiaryEditorProps {
  onSubmitSuccess: () => void
}

export function DiaryEditor({ onSubmitSuccess }: DiaryEditorProps) {
  const [content, setContent] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      alert('일기 내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      // 감정 분석
      const emotion = await analyzeEmotion(content)
      
      // Supabase에 저장
      await createDiary(content, emotion)
      
      // 입력 필드 초기화
      setContent('')
      setDate(new Date())
      
      // 성공 콜백 호출
      onSubmitSuccess()
      
      alert('일기가 저장되었습니다.')
    } catch (error) {
      console.error('일기 저장 중 오류 발생:', error)
      alert('일기 저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, 'PPP (EEEE)', { locale: ko })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              locale={ko}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘의 기분은 어떠신가요?"
        className="min-h-[200px]"
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : '저장'}
        </Button>
      </div>
    </form>
  )
} 