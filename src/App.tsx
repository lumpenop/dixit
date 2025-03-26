import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScoreTable } from '@/components/ScoreTable'
import { GameRules } from '@/components/GameRules'
import useTableStore from './store/store'
import CardFooterButtons from './components/CardFooterButtons'

const DixitScoreTracker = () => {
  const { players, maxScore } = useTableStore()

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
          <CardFooterButtons maxScore={maxScore} />
        </CardFooter>
      </Card>

      <GameRules />
    </div>
  )
}

export default DixitScoreTracker
