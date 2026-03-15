import { Link } from "react-router";
import { Zap, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function ActionQuickCheck() {
  return (
    <Card className="relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Action Compatibility Check</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Before making a decision, check if it aligns with your North Star goals and strategy. 
              Get an instant compatibility score and AI-powered analysis.
            </p>
          </div>
          
          <Link to="/check-action">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              Check Action
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
