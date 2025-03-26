import { Button } from '@/components/ui/button'
import useTableStore from '@/store/store'

interface CardFooterButtonsProps {
  maxScore: number
}

const CardFooterButtons = ({ maxScore }: CardFooterButtonsProps) => {
  const { setAll, setStoryTeller, storyTeller, addRound, setReset } = useTableStore()

  if (maxScore >= 30) return <Button onClick={setReset}>다시 하기</Button>
  return (
    <>
      <Button onClick={setAll}>All</Button>
      {storyTeller.id !== 4 && <Button onClick={setStoryTeller}>다음 이야기</Button>}
      {storyTeller.id === 4 && <Button onClick={addRound}>라운드 추가</Button>}
    </>
  )
}
export default CardFooterButtons
