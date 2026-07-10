'use client'

import React, { useState, useEffect } from 'react'

// Maasai-inspired color pairs
const COLOR_PAIRS = [
  { id: 1, color: '#e63946', name: 'Red' },
  { id: 2, color: '#1d3557', name: 'Blue' },
  { id: 3, color: '#f1faee', name: 'White' },
  { id: 4, color: '#457b9d', name: 'Sky Blue' },
  { id: 5, color: '#a8dadc', name: 'Turquoise' },
  { id: 6, color: '#ff9e00', name: 'Orange' },
  { id: 7, color: '#d62828', name: 'Deep Red' },
  { id: 8, color: '#003049', name: 'Dark Blue' },
]

// Create shuffled cards with pairs
const createCards = () => {
  const cards = COLOR_PAIRS.flatMap((pair, index) => [
    { id: `${index}-a`, pairId: pair.id, color: pair.color, isFlipped: false, isMatched: false },
    { id: `${index}-b`, pairId: pair.id, color: pair.color, isFlipped: false, isMatched: false },
  ])
  return cards.sort(() => Math.random() - 0.5)
}

export default function KenyanGame() {
  const [cards, setCards] = useState(createCards())
  const [selectedCards, setSelectedCards] = useState<typeof cards>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  // Check for matches
  useEffect(() => {
    if (selectedCards.length === 2) {
      setMoves(m => m + 1)
      const [first, second] = selectedCards
      
      if (first.pairId === second.pairId) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.pairId === first.pairId ? { ...card, isMatched: true } : card
          )
        )
        setMatches(m => m + 1)
        setSelectedCards([])
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === first.id || card.id === second.id ? { ...card, isFlipped: false } : card
            )
          )
          setSelectedCards([])
        }, 1000)
      }
    }

    // Check game over
    if (matches === COLOR_PAIRS.length) {
      setIsGameOver(true)
    }
  }, [selectedCards, matches])

  const handleCardClick = (card: typeof cards[0]) => {
    if (
      card.isMatched ||
      card.isFlipped ||
      selectedCards.length >= 2 ||
      isGameOver
    ) {
      return
    }

    // Flip the card
    const updatedCards = cards.map(c =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    )
    setCards(updatedCards)
    setSelectedCards([...selectedCards, card])
  }

  const restartGame = () => {
    setCards(createCards())
    setSelectedCards([])
    setMoves(0)
    setMatches(0)
    setIsGameOver(false)
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Maasai Bead Memory Game
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Match the Maasai-inspired colors – test your memory!
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm font-semibold">
            <div className="text-primary-600 dark:text-primary-400">
              Moves: {moves}
            </div>
            <div className="text-secondary-600 dark:text-secondary-400">
              Matches: {matches}/{COLOR_PAIRS.length}
            </div>
          </div>
        </div>

        {isGameOver ? (
          <div className="text-center py-12 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-primary-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              Congratulations!
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You matched all colors in {moves} moves!
            </p>
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="aspect-square cursor-pointer"
                onClick={() => handleCardClick(card)}
              >
                <div
                  className={`w-full h-full rounded-lg relative transition-all duration-500 transform-style-3d ${
                    card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of card (pattern) */}
                  <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center border-2 border-primary-200 dark:border-gray-600">
                    <div className="text-4xl">🦁</div>
                  </div>
                  {/* Back of card (color) */}
                  <div
                    className="absolute w-full h-full backface-hidden rounded-lg rotate-y-180 flex items-center justify-center border-2"
                    style={{ backgroundColor: card.color, borderColor: card.color }}
                  >
                    {card.isMatched && <div className="text-3xl">✅</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors"
          >
            Restart Game
          </button>
        </div>

        <style>{`
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </section>
  )
}
