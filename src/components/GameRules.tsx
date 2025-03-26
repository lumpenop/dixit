import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import rules from '@/config/rules.json'

export function GameRules() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dixit 점수 규칙</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {rules.map((rule, index) => (
            <li key={index}>
              <span className="font-bold">{rule.condition}</span>
              {rule.result && `: ${rule.result}`}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
