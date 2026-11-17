import { useEffect, useState } from 'react'

const images = [
  { id: 1, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_1.jpg' },
  { id: 2, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_2.jpg' },
  { id: 3, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_3.jpg' },
  { id: 4, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_4.jpg' },
  { id: 5, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_5.jpg' },
  { id: 6, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_6.jpg' },
  { id: 7, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_7.jpg' },
  { id: 8, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_8.jpg' },
  { id: 9, url: 'https://ihavetickets.nl/IHT_70_img/IHT_home_bgnd_9.jpg' }
]

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextImage()
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentImageIndex])

  return (
    <section>
      <div className='image-container'>
        {images.map((image, index) => (
          <img
            src={image.url}
            alt='images'
            className={currentImageIndex === index ? 'block' : 'hidden'}
            key={image.id}
          />
        ))}
      </div>
    </section>
  )
}

export default ImageCarousel
