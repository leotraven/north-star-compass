import { Link } from "react-router";
import { Target, Compass, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { GoalCard } from "../components/GoalCard";
import { ActionQuickCheck } from "../components/ActionQuickCheck";

// Mock data
const mockGoals = [
  {
    id: "1",
    title: "Run my first marathon",
    deadline: "2026-12-31",
  },
  {
    id: "2",
    title: "Read 24 books this year",
    deadline: "2026-12-31",
  },
  {
    id: "3",
    title: "Launch my personal project",
    deadline: "2026-08-15",
  },
];

const hasStrategy = true; // Toggle this to test different states

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Compass className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">North Star Compass</h1>
              <p className="text-sm text-muted-foreground">Navigate Your Path to Success</p>
            </div>
          </div>
          
          <Link to={hasStrategy ? "/strategy" : "/create-strategy"}>
            <Button variant="outline" className="gap-2">
              <Target className="w-4 h-4" />
              {hasStrategy ? "View Strategy" : "Create Strategy"}
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Quick Check Section */}
        <section className="mb-10">
          <ActionQuickCheck />
        </section>

        {/* Goals Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Your Goals</h2>
              <p className="text-muted-foreground mt-1">
                Track progress toward your North Star objectives
              </p>
            </div>
            <Link to="/add-goal">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Goal
              </Button>
            </Link>
          </div>

          {mockGoals.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Goals Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start your journey by defining your North Star goals. Each goal brings you closer to your ultimate vision.
              </p>
              <Link to="/add-goal">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Goal
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </section>

        {/* Strategy Notice */}
        {!hasStrategy && mockGoals.length > 0 && (
          <section className="mt-10">
            <Card className="bg-accent/20 border-accent p-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-lg">
                  <Compass className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Create Your Strategy</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You have goals, but no strategy yet. A clear strategy will help you make better decisions and stay aligned with your North Star.
                  </p>
                  <Link to="/create-strategy">
                    <Button className="gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Create Strategy Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}
