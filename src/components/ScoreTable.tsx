import { useEffect } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { PlayerRow } from './PlayerRow'
import useTableStore from '@/store/store'

import { toast, Toaster } from 'react-hot-toast'

export function ScoreTable() {
  const { players, currentRound, winnerIds, setWinnerIds, maxScore } = useTableStore()

  useEffect(() => {
    setWinnerIds()
  }, [players, setWinnerIds])

  useEffect(() => {
    if (maxScore < 30) return
    const winner = players.filter(player => player.total === maxScore)
    if (winner.length === 0) return

    toast.success(`🎉 ${winner[0].name}님이 최종 승리하셨습니다! 🎉`, {
      duration: 5000,
      style: {
        fontSize: '1.2rem',
        padding: '16px',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxScore])
  return (
    <div className="overflow-x-auto">
      <Toaster toastOptions={{ position: 'top-center' }} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Player</TableHead>
            {Array.from({ length: currentRound }, (_, i) => (
              <TableHead key={i} className="text-center">
                Round {i + 1}
              </TableHead>
            ))}
            <TableHead className="text-center">Some</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map(player => (
            <PlayerRow key={player.id} player={player} isWinner={winnerIds?.includes(player.id) || false} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
