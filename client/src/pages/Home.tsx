import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fullPrompts } from "@/lib/prompts-full";
import { Search, Activity, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return fullPrompts.filter((prompt) => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? prompt.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Array.from(new Set(fullPrompts.map((p) => p.category)));

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>New: 100+ Professional Medical Prompts Added</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Clinical Clarity <br />
            <span className="text-primary">AI Prompt Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of high-quality AI prompts designed for healthcare professionals.
            Enhance your clinical workflow, documentation, and research with precision.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Learn More
            </Button>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search prompts (e.g., 'diagnosis', 'referral', 'research')..."
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer px-4 py-1.5 text-sm hover:bg-primary/90"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer capitalize px-4 py-1.5 text-sm hover:bg-primary/90"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompt/${prompt.id}`}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-transparent hover:border-primary/20 bg-card/50 backdrop-blur-sm group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="capitalize text-xs">
                        {prompt.category}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {prompt.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {prompt.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredPrompts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No prompts found matching your criteria.
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 py-12 border-t border-border/50">
          <div className="text-center space-y-4 p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl">Clinically Verified</h3>
            <p className="text-muted-foreground">
              Prompts structured to follow standard medical guidelines and documentation formats.
            </p>
          </div>
          <div className="text-center space-y-4 p-6">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl">Efficiency Boost</h3>
            <p className="text-muted-foreground">
              Reduce documentation time by up to 50% with ready-to-use templates.
            </p>
          </div>
          <div className="text-center space-y-4 p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl">Research Ready</h3>
            <p className="text-muted-foreground">
              Advanced prompts for literature review, statistical analysis, and academic writing.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
