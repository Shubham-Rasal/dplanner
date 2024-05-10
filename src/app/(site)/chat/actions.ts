'use server'

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: question
  })

  console.log(text)

  return { text, finishReason, usage }
}