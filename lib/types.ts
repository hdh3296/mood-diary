export type Emotion = '행복' | '슬픔' | '분노' | '평범' | '신남'

export interface DiaryEntry {
  id: string
  content: string
  createdAt: string
  emotion?: Emotion
  emotionColor?: string
}

export const emotionColors: Record<Emotion, string> = {
  행복: '#FFD700',
  슬픔: '#1E90FF',
  분노: '#FF4500',
  평범: '#A9A9A9',
  신남: '#7FFF00',
} 