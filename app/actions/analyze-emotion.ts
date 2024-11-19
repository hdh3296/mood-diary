'use server'

import OpenAI from 'openai'
import { Emotion } from '@/lib/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const GPT_MODEL = "gpt-4-0125-preview"

export async function analyzeEmotion(content: string): Promise<Emotion> {
  try {
    console.log('=== 감정 분석 시작 ===')
    console.log('사용 모델:', GPT_MODEL)
    console.log('일기 내용:', content)

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "너는 일기 내용을 분석하여 감정을 분류하는 AI 어시스턴트야. 반드시 다음 감정 중 하나만 답변해야 해: '행복', '슬픔', '분노', '평범', '신남'. 다른 말은 하지 말고 오직 이 다섯 감정 중 하나만 답변해줘."
      },
      {
        role: "user",
        content: content
      }
    ]

    console.log('OpenAI API 요청:', {
      model: GPT_MODEL,
      messages,
      temperature: 0.3,
      max_tokens: 10,
    })

    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages,
      temperature: 0.3,
      max_tokens: 10,
    })

    console.log('OpenAI API 응답 (전체):', JSON.stringify(response, null, 2))
    console.log('GPT 응답 메시지:', JSON.stringify(response.choices[0].message, null, 2))

    const rawEmotion = response.choices[0].message.content?.trim() || '평범'
    console.log('GPT 응답 내용:', rawEmotion)

    const validEmotions: Emotion[] = ['행복', '슬픔', '분노', '평범', '신남']
    const emotion = validEmotions.find(e => rawEmotion.includes(e)) || '평범'
    
    console.log('최종 감정 분류:', emotion)
    console.log('=== 감정 분석 완료 ===')
    
    return emotion as Emotion

  } catch (error) {
    console.error('=== 감정 분석 오류 ===')
    console.error('오류 내용:', error)
    return '평범'
  }
} 