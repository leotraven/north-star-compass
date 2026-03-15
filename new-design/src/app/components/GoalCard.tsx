import { Calendar, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface Goal {
  id: string;
  title: string;
  category: string;
  deadline: string;
  progress: number;
}

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const deadlineDate = new Date(goal.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Card className="p-5 hover:border-primary/50 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
          {goal.category}
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {formattedDeadline}
        </div>
      </div>
      
      <h3 className="font-semibold mb-4 group-hover:text-primary transition-colors">
        {goal.title}
      </h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono font-semibold text-primary">{goal.progress}%</span>
        </div>
        <Progress value={goal.progress} className="h-2" />
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
        <TrendingUp className="w-3 h-3" />
        <span>On track</span>
      </div>
    </Card>
  );
}
