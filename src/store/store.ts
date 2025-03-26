import { create } from 'zustand'
import { Player, initialPlayers } from '@/config/player'

const calculateTotalScore = (player: Player) => {
  return player.scores.reduce((sum, score) => sum + score, 0)
}

interface TableState {
  players: Player[]
  currentRound: number
  storyTeller: Player
  winnerIds: number[] | null
  maxScore: number
}

type PrevTableState = TableState

interface TableStore extends TableState {
  prevTableState: PrevTableState | null
  setAll: () => void
  setReset: () => void
  setScorePlus3: (playerId: number) => void
  setWinnerIds: () => void
  setStoryTeller: () => void
  updateScore: (playerId: number, round: number, score: number) => void
  addRound: () => void
  toggleEditName: (playerId: number) => void
  updatePlayerName: (playerId: number, newName: string) => void
  undo: () => void
}

const useTableStore = create<TableStore>()(set => ({
  players: initialPlayers,
  currentRound: 1,
  storyTeller: initialPlayers[0],
  winnerIds: null,
  maxScore: 0,
  prevTableState: null,

  setReset: () => set({ players: initialPlayers }),

  setScorePlus3: (playerId: number) =>
    set(state => ({
      players: state.players.map(player => {
        if (player.id === playerId) {
          const scores = [...player.scores]
          scores[state.currentRound - 1] = scores[state.currentRound - 1] + 3

          return {
            ...player,
            scores,
            total: player.total + 3,
          }
        }

        return player
      }),
    })),

  setAll: () =>
    set(state => {
      return {
        players: state.players.map(player => {
          if (player.id === state.storyTeller.id) return player

          const scores = [...player.scores]
          scores[state.currentRound - 1] = scores[state.currentRound - 1] + 2

          return {
            ...player,
            scores,
            total: player.total + 2,
          }
        }),
      }
    }),

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

  setStoryTeller: () =>
    set(state => ({
      storyTeller: state.storyTeller.id === 4 ? state.players[0] : state.players[state.storyTeller.id],
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
      storyTeller: initialPlayers[0],
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

  undo: () =>
    set(state => {
      if (!state.prevTableState) return state

      return {
        ...state.prevTableState,
        prevTableState: null,
      }
    }),
}))

useTableStore.subscribe((state, prevState) => {
  if (
    JSON.stringify(prevState.players) !== JSON.stringify(state.players) ||
    prevState.currentRound !== state.currentRound ||
    prevState.storyTeller.id !== state.storyTeller.id
  ) {
    useTableStore.setState({
      prevTableState: {
        players: prevState.players,
        currentRound: prevState.currentRound,
        storyTeller: prevState.storyTeller,
        winnerIds: prevState.winnerIds,
        maxScore: prevState.maxScore,
      },
    })
  }
})

export default useTableStore
