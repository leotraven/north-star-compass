import { Link } from "react-router";
import { ArrowLeft, Target, Heart, Briefcase, Users, Edit, Plus, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const mockStrategy = {
  vision: "Healthy, fulfilled, and free — doing work that matters, surrounded by people I love, with time and energy to pursue what brings me alive.",
  coreValues: ["Integrity", "Growth", "Family", "Balance"],
  lifePillars: [
    {
      id: "1",
      icon: Heart,
      title: "Health",
      description: "Maintain physical and mental wellbeing as the foundation for everything else",
      focusAreas: [
        "Build a consistent workout routine",
        "Improve sleep quality to 7–8 hours",
        "Practice mindfulness daily",
      ],
    },
    {
      id: "2",
      icon: Briefcase,
      title: "Career",
      description: "Grow professionally and create meaningful work aligned with what matters most",
      focusAreas: [
        "Launch personal project by August 2026",
        "Deepen skills in areas that excite you",
        "Build meaningful professional connections",
      ],
    },
    {
      id: "3",
      icon: Users,
      title: "Relationships",
      description: "Nurture deep connections with family and friends that bring joy and support",
      focusAreas: [
        "Weekly quality time with loved ones",
        "Be fully present in every interaction",
        "Strengthen friendships through regular check-ins",
      ],
    },
  ],
  goals: [
    { id: "1", title: "Run my first marathon", deadline: "Dec 31, 2026" },
    { id: "2", title: "Read 24 books this year", deadline: "Dec 31, 2026" },
    { id: "3", title: "Launch my personal project", deadline: "Aug 15, 2026" },
  ],
};

export function Strategy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Your Strategy</h1>
                <p className="text-sm text-muted-foreground">North Star alignment framework</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Strategy
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Core Values */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Core Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mockStrategy.coreValues.map((value, index) => (
              <div key={index} className="px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
                <span className="font-medium text-sm">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Vision */}
        <Card className="p-6 border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary">Vision</h3>
          </div>
          <p className="text-muted-foreground text-sm italic mb-2">An inspiring picture of your ideal life 3–5 years from now</p>
          <p className="text-foreground leading-relaxed">{mockStrategy.vision}</p>
        </Card>

        {/* Life Pillars */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Life Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockStrategy.lifePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.id} className="p-6 hover:border-primary/50 transition-colors">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{pillar.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Areas</p>
                    <ul className="space-y-2">
                      {pillar.focusAreas.map((area, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Goals */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Goals</h2>
            <Link to="/add-goal">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Goal
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockStrategy.goals.map((goal) => (
              <Card key={goal.id} className="p-5 hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {goal.deadline}
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{goal.title}</h3>
              </Card>
            ))}
          </div>
        </div>

        {/* Alignment CTA */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Check Action Alignment</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use the Action Compatibility Check to evaluate whether your daily decisions align with this strategy.
              </p>
              <Link to="/check-action">
                <Button className="gap-2">Check an Action</Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
