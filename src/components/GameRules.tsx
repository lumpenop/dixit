import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import rules from '@/config/rules.json'
import useTableStore from '@/store/store'

export function GameRules() {
  const { goalScore } = useTableStore()
  const scoringRules = rules.filter((_, index) => index !== rules.length - 1)
  const totalRule = rules[rules.length - 1]
  const totalRuleResult = totalRule.condition.replace('30', goalScore.toString())
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dixit 점수 규칙</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {scoringRules.map((rule, index) => (
            <li key={index}>
              <span className="font-bold">{rule.condition}</span>
              {rule.result && `: ${rule.result}`}
            </li>
          ))}
          <li>
            <span className="font-bold">{totalRuleResult}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
