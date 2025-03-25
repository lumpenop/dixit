type PlayerColor = {
  [key in 'red' | 'blue' | 'green' | 'yellow']: string
}

export type Player = {
  id: string
  name: string
  scores: number[]
  color: PlayerColor[keyof PlayerColor] | null
  isEditing: boolean
}

const playerColor: PlayerColor = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
}

export const players: Player[] = [
  { id: '1', name: 'Player 1', scores: [0], color: playerColor['red'], isEditing: false },
  { id: '2', name: 'Player 2', scores: [0], color: playerColor['blue'], isEditing: false },
  { id: '3', name: 'Player 3', scores: [0], color: playerColor['green'], isEditing: false },
  { id: '4', name: 'Player 4', scores: [0], color: playerColor['yellow'], isEditing: false },
]
