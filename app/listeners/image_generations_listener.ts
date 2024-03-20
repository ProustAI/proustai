import Replicate from 'replicate'
import env from '#start/env'
import ImageGeneration from '#models/image_generation'

export default class ImageGenerationsListener {
  async onStarted(imageGeneration: ImageGeneration) {
    try {
      const replicate = new Replicate({
        auth: env.get('REPLICATE_API_TOKEN'),
      })

      const output = await replicate.run(
        env.get(
          'REPLICATE_MODEL_ID',
          'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4'
        ) as `${string}/${string}`,
        {
          input: {
            width: 512,
            height: 512,
            prompt: `${imageGeneration.prompt}, realistic, photo quality, high quality\n`,
            refine: 'expert_ensemble_refiner',
            scheduler: 'K_EULER_ANCESTRAL',
            lora_scale: 0.6,
            num_outputs: 1,
            guidance_scale: 5,
            apply_watermark: false,
            high_noise_frac: 0.8,
            prompt_strength: 0.8,
            num_inference_steps: 30,
          },
        }
      )

      imageGeneration.status = 'completed'
      imageGeneration.imageLocation = (output as string[])[0]
    } catch {
      imageGeneration.status = 'failed'
    }

    await imageGeneration.save()
  }
}
