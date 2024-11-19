'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { analyzeEmotion } from '@/app/actions/analyze-emotion'
import { createDiary } from '@/lib/diary-service'

interface DiaryEditorProps {
  onSubmitSuccess: () => void
}

export function DiaryEditor({ onSubmitSuccess }: DiaryEditorProps) {
  const [content, setContent] = useState('')
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

      // 일기 저장
      console.log('일기 저장 중...')
      const savedDiary = await createDiary(content, emotion)
      console.log('저장된 일기:', savedDiary)

      // 입력 필드 초기화
      setContent('')
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
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘의 기분은 어떠신가요?"
        className="min-h-[200px]"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </form>
  )
} 