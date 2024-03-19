export default class FeatureFlagsService {
  private static readonly featuresFlags: Map<string, () => boolean> = new Map<
    string,
    () => boolean
  >()

  static defineFeatureFlag(name: string, isEnabled: () => boolean): void {
    this.featuresFlags.set(name, isEnabled)
  }

  static isFeatureEnabled(name: string): boolean {
    const isEnabled = this.featuresFlags.get(name)
    if (!isEnabled) {
      return false
    }
    return isEnabled()
  }

  static getFeatureFlagsValues(): Record<string, boolean> {
    const featureFlagsValues: Record<string, boolean> = {}
    for (const [name, isEnabled] of this.featuresFlags) {
      featureFlagsValues[name] = isEnabled()
    }
    return featureFlagsValues
  }
}
