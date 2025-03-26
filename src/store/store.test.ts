import { describe, it, expect, beforeEach } from 'vitest'
import useTableStore from './store'
import { Player } from '@/config/player'

// 테스트에 필요한 mock player 생성 함수
const createMockPlayer = (id: number, name: string): Player => ({
  id,
  name,
  scores: [0],
  color: 'bg-red-500',
  isEditing: false,
  total: 0,
})

describe('useTableStore', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 상태 리셋
    useTableStore.setState({
      players: [createMockPlayer(1, 'Player 1'), createMockPlayer(2, 'Player 2'), createMockPlayer(3, 'Player 3')],
      currentRound: 1,
      storyTeller: createMockPlayer(1, 'Player 1'),
      winnerIds: null,
      maxScore: 0,
      prevTableState: null,
    })
  })

  describe('상태 저장 기능', () => {
    it('players가 변경될 때 이전 상태를 저장해야 함', () => {
      // 현재 상태 저장
      const initialState = useTableStore.getState()

      // players 변경 - setPlayer 대신 기존에 있는 updatePlayerName 사용
      useTableStore.getState().updatePlayerName(1, 'Changed Player 1')

      // 이전 상태가 올바르게 저장되었는지 확인
      const newState = useTableStore.getState()
      expect(newState.prevTableState).toEqual({
        players: initialState.players,
        currentRound: initialState.currentRound,
        storyTeller: initialState.storyTeller,
        winnerIds: initialState.winnerIds,
        maxScore: initialState.maxScore,
      })
    })

    it('currentRound가 변경될 때 이전 상태를 저장해야 함', () => {
      // 현재 상태 저장
      const initialState = useTableStore.getState()

      // currentRound 변경
      useTableStore.getState().addRound()

      // 이전 상태가 올바르게 저장되었는지 확인
      const newState = useTableStore.getState()
      expect(newState.prevTableState).toEqual({
        players: initialState.players,
        currentRound: initialState.currentRound,
        storyTeller: initialState.storyTeller,
        winnerIds: initialState.winnerIds,
        maxScore: initialState.maxScore,
      })
      expect(newState.currentRound).toBe(initialState.currentRound + 1)
    })

    it('storyTeller가 변경될 때 이전 상태를 저장해야 함', () => {
      // 현재 상태 저장
      const initialState = useTableStore.getState()

      // storyTeller 변경 (act 함수 제거)
      useTableStore.getState().setStoryTeller()

      // 이전 상태가 올바르게 저장되었는지 확인
      const newState = useTableStore.getState()
      expect(newState.prevTableState).toEqual({
        players: initialState.players,
        currentRound: initialState.currentRound,
        storyTeller: initialState.storyTeller,
        winnerIds: initialState.winnerIds,
        maxScore: initialState.maxScore,
      })
      expect(newState.storyTeller.id).toBe(2)
    })
  })

  describe('점수 관련 기능', () => {
    it('updateScore 함수가 점수를 올바르게 업데이트해야 함', () => {
      // 점수 업데이트
      useTableStore.getState().updateScore(1, 0, 3)

      // 점수가 올바르게 업데이트되었는지 확인
      const players = useTableStore.getState().players
      expect(players.find(p => p.id === 1)?.scores[0]).toBe(3)
      expect(players.find(p => p.id === 1)?.total).toBe(3)
    })

    it('setScorePlus3 함수가 점수를 +3 올려야 함', () => {
      // 현재 라운드의 점수 설정 (act 함수 제거)
      useTableStore.getState().updateScore(1, 0, 2)

      // +3 점수 추가 (act 함수 제거)
      useTableStore.getState().setScorePlus3(1)

      // 점수가 +3 올라갔는지 확인
      const players = useTableStore.getState().players
      expect(players.find(p => p.id === 1)?.scores[0]).toBe(5) // 2 + 3 = 5
      expect(players.find(p => p.id === 1)?.total).toBe(5)
    })
  })

  describe('상태 복원 기능', () => {
    it('undo 함수가 이전 상태로 복원해야 함', () => {
      // 초기 상태 저장
      const initialState = useTableStore.getState()

      // 상태 변경 (act 함수 제거)
      useTableStore.getState().updateScore(1, 0, 10)
      useTableStore.getState().addRound()

      // 상태가 변경되었는지 확인
      let currentState = useTableStore.getState()
      expect(currentState.players.find(p => p.id === 1)?.scores[0]).toBe(10)
      expect(currentState.currentRound).toBe(2)

      // Undo 실행 (act 함수 제거)
      useTableStore.getState().undo()

      // 이전 상태로 복원되었는지 확인
      currentState = useTableStore.getState()
      expect(currentState.players).toEqual(initialState.players)
      expect(currentState.currentRound).toBe(initialState.currentRound)
      expect(currentState.storyTeller).toEqual(initialState.storyTeller)
      expect(currentState.winnerIds).toEqual(initialState.winnerIds)
      expect(currentState.maxScore).toBe(initialState.maxScore)
    })
  })
})
