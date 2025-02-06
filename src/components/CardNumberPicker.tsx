type CardNumberPickerProps = {
  value: number
  onValueChange: React.Dispatch<React.SetStateAction<number>>
}

const CardNumberPicker = ({ value, onValueChange }: CardNumberPickerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center text-2xl">Pick the number of cards :</h1>
      <p className="text-center">{value} Cards</p>
      <input type="range" min={6} max="30" step={2} value={value} onChange={(e) => onValueChange(parseInt(e.target.value))} className="range" />
      <div className="flex w-full justify-between px-2 text-xs">
      {[...Array(12)].map((_, index) => (
        <span key={index}>|</span>
      ))}
      </div>
    </div>
  )
}

export default CardNumberPicker
