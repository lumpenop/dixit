import { Button } from '@/components/ui/button'
import useTableStore from '@/store/store'

interface CardFooterButtonsProps {
  maxScore: number
}

const CardFooterButtons = ({ maxScore }: CardFooterButtonsProps) => {
  const { setAll, setStoryTeller, storyTeller, addRound, undo, setReset, prevTableState } = useTableStore()
  console.log(prevTableState)

  if (maxScore >= 30) return <Button onClick={setReset}>다시 하기</Button>
  return (
    <>
      <Button onClick={setAll}>All</Button>
      {storyTeller.id !== 4 && <Button onClick={setStoryTeller}>다음 이야기</Button>}
      {storyTeller.id === 4 && <Button onClick={addRound}>라운드 추가</Button>}
      <Button onClick={undo} className={prevTableState ? '' : 'opacity-50'}>
        Undo
      </Button>
    </>
  )
}
export default CardFooterButtons
