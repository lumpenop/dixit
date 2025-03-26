// import React from 'react'
// import { Check, Edit2 } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

const EditInput = () => {
  return (
    <>
      {/* {player.isEditing ? (
        <div className="flex items-center gap-1">
          <Input
            value={player.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onUpdateName(player.id, e.target.value)
            }}
            className="h-8 w-24"
            maxLength={15}
            autoFocus
          />
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onUpdateName(player.id, player.name)}>
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
            onClick={() => onToggleEdit(player.id)}>
            <Edit2 className="h-3 w-3" />
          </Button>
        </div>
      )} */}
    </>
  )
}

export default EditInput
