export interface PhotoCard {
  id: string
  image: string
  tag: string
  size: 'sm' | 'md' | 'lg'
  position: { x: string; y: string }
  rotation: number
}

const photoCards: PhotoCard[] = [
  {
    id: '1',
    image: '/photos/photo1.jpg',
    tag: 'Where ideas begin ✏️',
    size: 'md',
    position: { x: '5%', y: '8%' },
    rotation: -6,
  },
  {
    id: '2',
    image: '/photos/photo2.jpg',
    tag: 'Team offsite vibes 🏕️',
    size: 'lg',
    position: { x: '22%', y: '15%' },
    rotation: 3,
  },
  {
    id: '3',
    image: '/photos/photo3.jpg',
    tag: 'Shipping day 🚀',
    size: 'sm',
    position: { x: '45%', y: '5%' },
    rotation: -4,
  },
  {
    id: '4',
    image: '/photos/photo4.jpg',
    tag: 'Design review mode 🖥️',
    size: 'md',
    position: { x: '62%', y: '20%' },
    rotation: 7,
  },
  {
    id: '5',
    image: '/photos/photo5.jpg',
    tag: 'Late night coffee ☕',
    size: 'sm',
    position: { x: '78%', y: '8%' },
    rotation: -3,
  },
  {
    id: '6',
    image: '/photos/photo6.jpg',
    tag: 'Sketching it out 📐',
    size: 'lg',
    position: { x: '12%', y: '48%' },
    rotation: 5,
  },
  {
    id: '7',
    image: '/photos/photo7.jpg',
    tag: 'Conference talk 🎤',
    size: 'md',
    position: { x: '38%', y: '52%' },
    rotation: -7,
  },
  {
    id: '8',
    image: '/photos/photo8.jpg',
    tag: 'Figma flows 🎯',
    size: 'sm',
    position: { x: '60%', y: '58%' },
    rotation: 4,
  },
  {
    id: '9',
    image: '/photos/photo9.jpg',
    tag: 'Weekend inspiration 🌿',
    size: 'md',
    position: { x: '80%', y: '45%' },
    rotation: -5,
  },
]

export default photoCards
