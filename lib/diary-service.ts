import { supabase } from './client'

// 감정 타입 정의
export type EmotionType = '행복' | '슬픔' | '분노' | '평범' | '신남'

// 감정별 색상 매핑
const EMOTION_COLORS: Record<EmotionType, string> = {
  행복: '#FFD700',
  슬픔: '#1E90FF',
  분노: '#FF4500',
  평범: '#A9A9A9',
  신남: '#7FFF00',
}

// Database 타입 정의
export interface DiaryEntry {
  id: string
  content: string
  created_at: string
  emotion: EmotionType | null
  emotion_color: string | null
}

// Database 타입 정의 (별도의 테이블 타입)
export interface DiaryEntryTable {
  id: string
  content: string
  created_at: string
  emotion?: EmotionType
  emotion_color?: string
}

// 모든 일기 조회
export async function getAllDiaries() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as DiaryEntryTable[]
}

// 특정 일기 조회
export async function getDiaryById(id: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as DiaryEntryTable
}

// 일기 작성
export async function createDiary(content: string, emotion?: EmotionType) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('diary_entries')
    .insert([
      {
        content,
        emotion,
        emotion_color: emotion ? EMOTION_COLORS[emotion] : null
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data as DiaryEntryTable
}

// 일기 수정
export async function updateDiary(
  id: string,
  content: string,
  emotion?: EmotionType
) {
  const { data, error } = await supabase
    .from('diary_entries')
    .update({
      content,
      emotion,
      emotion_color: emotion ? EMOTION_COLORS[emotion] : null
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as DiaryEntryTable
}

// 일기 삭제
export async function deleteDiary(id: string) {
  const { error } = await supabase
    .from('diary_entries')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
} 