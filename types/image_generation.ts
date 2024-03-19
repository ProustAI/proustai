export default interface ImageGeneration {
  id: string
  status: 'pending' | 'completed'
  imageLocation?: string
}
