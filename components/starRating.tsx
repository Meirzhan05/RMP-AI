import { Star } from 'lucide-react'
const StarRating = ({ rating }: { rating?: number }) => {
    const displayRating = rating ?? 0;

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={16}
                    className={`${
                        star <= displayRating ? 'text-yellow-400' : 'text-gray-400'
                    } ${star <= Math.floor(displayRating) ? 'fill-current' : ''}`}
                />
            ))}
            <span className="ml-2 text-gray-300">{displayRating.toFixed(1)}</span>
        </div>
    )
}

export default StarRating;