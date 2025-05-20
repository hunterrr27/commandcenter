import { FeatureSuggestions } from "@/components/feature-suggestions"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Potential Features</h1>
      <p className="text-gray-400 mb-8">
        These are potential features that could be added to the InsiderLab platform to enhance its functionality and user
        experience.
      </p>
      <FeatureSuggestions />
    </div>
  )
}
