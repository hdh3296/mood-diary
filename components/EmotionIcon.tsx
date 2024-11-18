'use client'

import { Smile, Frown, AlertCircle, Meh, Star } from 'lucide-react'
import { Emotion } from '@/lib/types'

interface EmotionIconProps {
  emotion?: Emotion
}

export function EmotionIcon({ emotion }: EmotionIconProps) {
  if (!emotion) return null

  switch (emotion) {
    case '행복':
      return <Smile className="h-5 w-5" style={{ color: '#FFD700' }} />
    case '슬픔':
      return <Frown className="h-5 w-5" style={{ color: '#1E90FF' }} />
    case '분노':
      return <AlertCircle className="h-5 w-5" style={{ color: '#FF4500' }} />
    case '평범':
      return <Meh className="h-5 w-5" style={{ color: '#A9A9A9' }} />
    case '신남':
      return <Star className="h-5 w-5" style={{ color: '#7FFF00' }} />
    default:
      return null
  }
} 