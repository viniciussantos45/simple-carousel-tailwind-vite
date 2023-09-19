import { Circle } from '@phosphor-icons/react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Item = {
  title: string
  description: string
  image: string
}

const items: Item[] = [
  {
    title: 'Ferrari',
    description: 'Símbolo italiano, a Ferrari mescla arte e velocidade com seu emblemático vermelho e "cavallino rampante".',
    image: 'https://images.pexels.com/photos/5759866/pexels-photo-5759866.jpeg?auto=compress&cs=tinysrgb'
  },
  {
    title: 'Lamborghini',
    description: 'Com design audacioso, a Lamborghini proporciona uma combinação inigualável de adrenalina e elegância.',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'
  },
  {
    title: 'MC Laren',
    description: 'Nascida da Fórmula 1, a McLaren é a quintessência da precisão britânica e inovação aerodinâmica.',
    image: 'https://images.pexels.com/photos/6650819/pexels-photo-6650819.jpeg?auto=compress&cs=tinysrgb'
  }
]

function App() {
  const [currentItem, setCurrentItem] = useState(0)

  const snapRef = useRef<HTMLDivElement>(null)

  const handleItemChange = useCallback(() => {
    const sizeContainer = snapRef.current?.scrollWidth ?? 0
    const sizeItem = (sizeContainer ?? 0) / items.length

    if (currentItem >= items.length - 1) {
      snapRef.current?.scrollBy({ left: -sizeContainer, behavior: 'smooth' })
      setCurrentItem(0)
    } else {
      snapRef.current?.scrollBy({ left: sizeItem, behavior: 'smooth' })
      setCurrentItem((currentItem) => currentItem + 1)
    }
  }, [currentItem])

  useEffect(() => {
    const interval = setInterval(handleItemChange, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [currentItem])

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-200'>
      <div className='relative pb-8 w-1/2 drop-shadow-lg'>
        <div className='absolute flex gap-2 backdrop-blur-sm bottom-10 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full'>
          {items.map((item) =>
            currentItem === items.indexOf(item) ? (
              <Circle key={item.title} size={10} color='#222222' weight='fill' />
            ) : (
              <Circle key={item.title} size={10} color='#222222' weight='regular' />
            )
          )}
        </div>
        <div ref={snapRef} className='snap-x snap-mandatory flex overflow-x-hidden relative rounded-2xl'>
          {items.map((item) => (
            <div
              key={item.title}
              className='snap-center flex justify-center min-w-full gap-2 bg-cover bg-center bg-no-repeat rounded-2xl p-3'
              style={{
                backgroundImage: `url(${item.image})`,
                height: '400px'
              }}
            >
              <div className='w-full  backdrop-blur-sm bg-white/50 h-fit px-5 py-2 rounded-lg'>
                <p className='text-gray-900 text-lg font-bold'>{item.title}</p>
                <p className='text-gray-900 text-sm'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
