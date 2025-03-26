import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScoreTable } from '@/components/ScoreTable'
import { GameRules } from '@/components/GameRules'
import useTableStore from './store/store'

export default function DixitScoreTracker() {
  const { players, addRound, setAll, setStoryTeller, storyTeller, maxScore, setReset } = useTableStore()

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Dixit 점수판</CardTitle>
        </CardHeader>
        <CardContent>
          {players.length > 0 ? (
            <ScoreTable />
          ) : (
            <div className="text-center py-8 text-muted-foreground">Loading players...</div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          {maxScore >= 30 && <Button onClick={setReset}>다시 하기</Button>}
          {maxScore < 30 && (
            <>
              <Button onClick={setAll}>All</Button>
              <Button onClick={setStoryTeller}>다음 이야기</Button>
              {storyTeller.id === 4 && <Button onClick={addRound}>라운드 추가</Button>}
            </>
          )}
        </CardFooter>
      </Card>

      <GameRules />
    </div>
  )
}
