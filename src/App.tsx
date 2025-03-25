'use client'

import { Check, Edit2, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { players as initialPlayers, Player } from './config/player'

export default function DixitScoreTracker() {
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRound, setCurrentRound] = useState(1)

  useEffect(() => {
    if (players.length === 0) {
      setPlayers(initialPlayers)
    }
  }, [players.length])

  const updateScore = (playerId: string, round: number, score: number) => {
    setPlayers(
      players.map(player => {
        if (player.id === playerId) {
          const newScores = [...player.scores]
          newScores[round] = score
          return { ...player, scores: newScores }
        }
        return player
      })
    )
  }

  const addRound = () => {
    setPlayers(
      players.map(player => ({
        ...player,
        scores: [...player.scores, 0],
      }))
    )
    setCurrentRound(currentRound + 1)
  }

  const getTotalScore = (player: Player) => {
    return player.scores.reduce((sum, score) => sum + score, 0)
  }

  const getWinner = () => {
    if (players.length === 0) return null

    return players.reduce((highest, player) => {
      const totalScore = getTotalScore(player)
      const highestScore = getTotalScore(highest)

      return totalScore > highestScore ? player : highest
    }, players[0])
  }

  const toggleEditName = (playerId: string) => {
    setPlayers(
      players.map(player => ({
        ...player,
        isEditing: player.id === playerId ? !player.isEditing : false,
      }))
    )
  }

  const updatePlayerName = (playerId: string, newName: string) => {
    setPlayers(
      players.map(player => {
        if (player.id === playerId) {
          return { ...player, name: newName || `Player ${player.id}`, isEditing: false }
        }
        return player
      })
    )
  }

  const winner = getWinner()

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Dixit 점수판</CardTitle>
        </CardHeader>
        <CardContent>
          {players.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Player</TableHead>
                    {Array.from({ length: currentRound }, (_, i) => (
                      <TableHead key={i} className="text-center">
                        Round {i + 1}
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map(player => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className={cn('w-3 h-3 rounded-full', player.color)} />
                          {player.isEditing ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={player.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setPlayers(
                                    players.map(p => (p.id === player.id ? { ...p, name: e.target.value } : p))
                                  )
                                }}
                                className="h-8 w-24"
                                maxLength={15}
                                autoFocus
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updatePlayerName(player.id, player.name)}>
                                <Check className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <span>{player.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-50 hover:opacity-100"
                                onClick={() => toggleEditName(player.id)}>
                                <Edit2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                          {winner && winner.id === player.id && <Trophy className="h-4 w-4 text-yellow-500" />}
                        </div>
                      </TableCell>
                      {player.scores.map((score, index) => (
                        <TableCell key={index} className="text-center">
                          <Input
                            type="number"
                            value={score}
                            onChange={e => {
                              const value = Number.parseInt(e.target.value) || 0
                              updateScore(player.id, index, value)
                            }}
                            className="w-16 text-center mx-auto"
                            min={0}
                          />
                        </TableCell>
                      ))}
                      <TableCell className="text-center font-bold">{getTotalScore(player)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Loading players...</div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={addRound}>라운드 추가</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dixit 점수 규칙</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>모든 플레이어가 이야기꾼의 카드를 맞히면: 이야기꾼을 제외한 모든 사람이 2점 획득</li>
            <li>아무도 이야기꾼의 카드를 맞히지 못하면: 이야기꾼을 제외한 모든 사람이 2점 획득</li>
            <li>일부 플레이어가 정답을 맞히면: 이야기꾼과 정답을 맞힌 사람이 모두 3점 획득</li>
            <li>카드 득표 시: 이야기꾼을 제외한 플레이어는 자신의 카드가 받은 투표 수마다 1점씩 획득</li>
            <li>Total 점수가 30점 이상인 플레이어가 있다면 게임 종료</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
