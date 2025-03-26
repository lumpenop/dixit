import { Check, Edit2, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Player } from '@/config/player'
import useTableStore from '@/store/store'

type PlayerRowProps = {
  player: Player
  isWinner: boolean
}

export function PlayerRow({ player, isWinner }: PlayerRowProps) {
  const { updatePlayerName, updateScore, toggleEditName } = useTableStore()
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <div className={cn('w-3 h-3 rounded-full', player.color)} />
          {player.isEditing ? (
            <div className="flex items-center gap-1">
              <Input
                value={player.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updatePlayerName(player.id, e.target.value)
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
          <div className="h-4 w-4">{isWinner && <Trophy className="h-4 w-4 text-yellow-500" />}</div>
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
      <TableCell className="text-center font-bold">{player.total}</TableCell>
    </TableRow>
  )
}
