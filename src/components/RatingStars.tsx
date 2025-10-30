import { Star } from 'lucide-react'

interface RatingStarsProps {
  value: number
  onChange?: (value: number) => void
  size?: number
}

export function RatingStars({ value, onChange, size = 20 }: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5]
  const isInteractive = typeof onChange === 'function'

  return (
    <div className={isInteractive ? 'cursor-pointer flex gap-1' : 'flex gap-1'}>
      {stars.map((star) => {
        const active = value >= star
        return (
          <Star
            key={star}
            size={size}
            className={active ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
            onClick={isInteractive ? () => onChange?.(star) : undefined}
          />
        )
      })}
    </div>
  )
}
