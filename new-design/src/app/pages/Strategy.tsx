import { Link } from "react-router";
import { ArrowLeft, Target, Lightbulb, TrendingUp, Users, DollarSign, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

// Mock strategy data
const mockStrategy = {
  vision: "Become the leading SaaS platform for enterprise project management by 2027",
  mission: "Empower teams to collaborate seamlessly and deliver projects with precision and efficiency",
  coreValues: [
    "Innovation First",
    "Customer Success",
    "Data-Driven Decisions",
    "Transparent Communication"
  ],
  strategicPillars: [
    {
      id: "1",
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Scale ARR from $4.5M to $10M through new market expansion and product-led growth",
      keyInitiatives: [
        "Launch in European market by Q3 2026",
        "Increase conversion rate by 25%",
        "Expand enterprise tier features"
      ]
    },
    {
      id: "2",
      icon: Users,
      title: "Team Excellence",
      description: "Build a world-class team of 50+ professionals across engineering, sales, and customer success",
      keyInitiatives: [
        "Hire 15 engineers by Q2 2026",
        "Establish remote-first culture",
        "Implement quarterly training programs"
      ]
    },
    {
      id: "3",
      icon: Lightbulb,
      title: "Product Innovation",
      description: "Deliver cutting-edge features that set new industry standards for collaboration tools",
      keyInitiatives: [
        "Ship AI-powered project insights",
        "Launch mobile app by Q4 2026",
        "Integrate with 20+ third-party tools"
      ]
    }
  ],
  focusAreas: [
    "Market expansion into Europe and Asia",
    "Product-led growth strategy",
    "Enterprise customer acquisition",
    "Team scaling and culture building"
  ]
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
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-primary">Vision</h3>
            </div>
            <p className="text-foreground leading-relaxed">{mockStrategy.vision}</p>
          </Card>
          
          <Card className="p-6 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-primary">Mission</h3>
            </div>
            <p className="text-foreground leading-relaxed">{mockStrategy.mission}</p>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Core Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mockStrategy.coreValues.map((value, index) => (
              <div 
                key={index}
                className="px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-center"
              >
                <span className="font-medium text-sm">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Strategic Pillars */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Strategic Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockStrategy.strategicPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.id} className="p-6 hover:border-primary/50 transition-colors">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Key Initiatives
                    </p>
                    <ul className="space-y-2">
                      {pillar.keyInitiatives.map((initiative, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Focus Areas */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Current Focus Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockStrategy.focusAreas.map((area, index) => (
              <div 
                key={index}
                className="flex gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Strategy Alignment */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Strategy Alignment in Action</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your strategy is actively guiding decision-making across your goals. 
                Use the Action Compatibility Check to ensure every decision aligns with these strategic pillars.
              </p>
              <Link to="/check-action">
                <Button className="gap-2">
                  Check Action Compatibility
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
