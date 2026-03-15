import { Calendar } from "lucide-react";
import { Card } from "./ui/card";

interface Goal {
  id: string;
  title: string;
  deadline: string;
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
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
        <Calendar className="w-3 h-3" />
        {formattedDeadline}
      </div>
      
      <h3 className="font-semibold group-hover:text-primary transition-colors">
        {goal.title}
      </h3>
    </Card>
  );
}
