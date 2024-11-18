import { supabase } from './client'
import { DiaryEntry, Emotion } from './types'

// 모든 일기 조회
export async function getAllDiaries() {
  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as DiaryEntry[]
}

// 특정 일기 조회
export async function getDiaryById(id: string) {
  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as DiaryEntry
}

// 일기 작성
export async function createDiary(content: string, emotion?: Emotion) {
  const { data, error } = await supabase
    .from('diary_entries')
    .insert([
      {
        content,
        emotion,
        emotion_color: emotion ? emotionColors[emotion] : null
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data as DiaryEntry
}

// 일기 수정
export async function updateDiary(
  id: string,
  content: string,
  emotion?: Emotion
) {
  const { data, error } = await supabase
    .from('diary_entries')
    .update({
      content,
      emotion,
      emotion_color: emotion ? emotionColors[emotion] : null
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as DiaryEntry
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