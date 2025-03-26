import { create } from 'zustand'
import { Player, players } from '@/config/player'

const calculateTotalScore = (player: Player) => {
  return player.scores.reduce((sum, score) => sum + score, 0)
}

interface TableStore {
  players: Player[]
  currentRound: number
  storyTeller: Player
  winnerIds: number[] | null
  maxScore: number

  setWinnerIds: () => void
  setStoryTeller: (playerId: number) => void
  updateScore: (playerId: number, round: number, score: number) => void
  addRound: () => void
  toggleEditName: (playerId: number) => void
  updatePlayerName: (playerId: number, newName: string) => void
}

const useTableStore = create<TableStore>()(set => ({
  players: players,
  currentRound: 1,
  storyTeller: players[0],
  winnerIds: null,
  maxScore: 0,

  setWinnerIds: () =>
    set(state => {
      const allTotal = state.players.reduce((sum, player) => sum + player.total, 0)
      if (!allTotal) return { winnerIds: null }

      const totals = state.players.map(player => player.total)
      const maxScore = Math.max(...totals)

      return {
        winnerIds: state.players.filter(player => player.total === maxScore).map(player => player.id),
        maxScore,
      }
    }),

  setStoryTeller: (playerId: number) =>
    set(state => ({
      storyTeller: state.players.find(player => player.id === playerId) || state.players[0],
    })),

  updateScore: (playerId: number, round: number, score: number) =>
    set(state => ({
      players: state.players.map(player => {
        if (player.id !== playerId) return player

        const scores = [...player.scores]
        scores[round] = score

        return {
          ...player,
          scores,
          total: calculateTotalScore({ ...player, scores }),
        }
      }),
    })),

  addRound: () =>
    set(state => ({
      currentRound: state.currentRound + 1,
      players: state.players.map(player => ({
        ...player,
        scores: [...player.scores, 0],
      })),
    })),

  toggleEditName: (playerId: number) =>
    set(state => ({
      players: state.players.map(player => ({
        ...player,
        isEditing: player.id === playerId ? !player.isEditing : false,
      })),
    })),

  updatePlayerName: (playerId: number, newName: string) =>
    set(state => ({
      players: state.players.map(player => {
        if (player.id !== playerId) return player

        return {
          ...player,
          name: newName || `Player ${player.id}`,
          isEditing: false,
        }
      }),
    })),
}))

export default useTableStore
