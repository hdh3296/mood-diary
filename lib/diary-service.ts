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
    console.log('Supabase client not initialized in getAllDiaries')
    return []
  }

  try {
    console.log('Fetching diaries...')
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching diaries:', error)
      throw error
    }

    console.log('Fetched diaries:', data)
    return (data as unknown) as DiaryEntryTable[]
  } catch (error) {
    console.error('Error in getAllDiaries:', error)
    throw error
  }
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
  return (data as unknown) as DiaryEntryTable
}

// 일기 작성
export async function createDiary(content: string, emotion?: EmotionType) {
  if (!supabase) {
    console.error('Supabase client not initialized in createDiary')
    throw new Error('Supabase client not initialized')
  }

  try {
    console.log('Creating diary with:', { content, emotion })
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

    if (error) {
      console.error('Error creating diary:', error)
      throw error
    }

    console.log('Created diary:', data)
    return (data as unknown) as DiaryEntryTable
  } catch (error) {
    console.error('Error in createDiary:', error)
    throw error
  }
}

// 일기 수정
export async function updateDiary(
  id: string,
  content: string,
  emotion?: EmotionType
) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

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
  return (data as unknown) as DiaryEntryTable
}

// 일기 삭제
export async function deleteDiary(id: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { error } = await supabase
    .from('diary_entries')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
} 