import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScoreTable } from '@/components/ScoreTable'
import { GameRules } from '@/components/GameRules'
import useTableStore from './store/store'
import CardFooterButtons from './components/CardFooterButtons'
import { Button } from './components/ui/button'

const DixitScoreTracker = () => {
  const { players, maxScore, prevTableState, setGoalScore, goalScore } = useTableStore()

  const handleGoalScoreChange = () => {
    const newGoalScore = goalScore === 40 ? 30 : 40
    setGoalScore(newGoalScore)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Dixit 점수판</CardTitle>
          {!prevTableState && (
            <Button onClick={handleGoalScoreChange}>목표 점수 {goalScore === 40 ? 30 : 40}점으로 변경</Button>
          )}
        </CardHeader>
        <CardContent>
          {players.length > 0 ? (
            <ScoreTable />
          ) : (
            <div className="text-center py-8 text-muted-foreground">Loading players...</div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          <CardFooterButtons maxScore={maxScore} />
        </CardFooter>
      </Card>

      <GameRules />
    </div>
  )
}

export default DixitScoreTracker
