import { JournalFinder } from "@/components/JournalFinder";
import { Activity } from "lucide-react";

export default function JournalFinderPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Activity className="w-8 h-8" />
          Journal Finder
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Find the perfect medical journal for your research. Compare impact factors, review speeds, and submission requirements to make informed decisions.
        </p>
      </div>
      
      <JournalFinder />
    </div>
  );
}
