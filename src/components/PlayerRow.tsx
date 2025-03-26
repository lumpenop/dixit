import { Trophy, Smile } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Player } from '@/config/player'
import useTableStore from '@/store/store'
import EditInput from './EditInput'
import { Button } from './ui/button'

type PlayerRowProps = {
  player: Player
  isWinner: boolean
}

export function PlayerRow({ player, isWinner }: PlayerRowProps) {
  const { updateScore, storyTeller, setScorePlus3 } = useTableStore()

  const handleSomeButton = () => setScorePlus3(player.id)
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            <div className={cn('w-3 h-3 rounded-full', player.color)} />
            <EditInput player={player} />
            <div className="h-4 w-4">
              {storyTeller.id === player.id && <Smile className="h-4 w-4 text-purple-500" />}
            </div>
            <div className="h-4 w-4">{isWinner && <Trophy className="h-4 w-4 text-yellow-500" />}</div>
          </div>
        </TableCell>

        {player.scores.map((score, index) => (
          <TableCell className="text-center" key={index}>
            <Input
              type="number"
              value={score}
              onChange={e => {
                const value = Number.parseInt(e.target.value) || 0
                updateScore(player.id, index, value)
              }}
              className="w-16 text-center mx-auto [&::-webkit-outer-spin-button]:h-8 [&::-webkit-inner-spin-button]:h-8"
              min={0}
            />
          </TableCell>
        ))}
        <TableCell className="text-center">
          {player.id !== storyTeller.id && <Button onClick={handleSomeButton}>+3</Button>}
        </TableCell>

        <TableCell className="text-center font-bold">{player.total}</TableCell>
      </TableRow>
    </>
  )
}
