export default interface ImageGeneration {
  id: string
  status: 'pending' | 'completed' | 'failed'
  imageLocation?: string
}
