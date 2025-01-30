export interface Option {
  id: number
  text: string
  isCorrect: boolean
}

export interface Question {
  id: number
  description: string
  options: Option[]
  explanation: string
}

export interface Quiz {
  id: number
  title: string
  questions: Question[]
}