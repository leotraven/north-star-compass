import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Zap, TrendingUp, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";

interface AnalysisResult {
  score: number;
  verdict: "highly-aligned" | "aligned" | "neutral" | "misaligned" | "highly-misaligned";
  insights: string[];
  goalImpact: Array<{
    goalTitle: string;
    impact: "positive" | "negative" | "neutral";
    reason: string;
  }>;
}

export function CheckAction() {
  const [actionDescription, setActionDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock analysis result
    const mockResult: AnalysisResult = {
      score: 78,
      verdict: "aligned",
      insights: [
        "This action aligns with your financial growth objectives",
        "May require additional resources from operations budget",
        "Supports long-term market expansion strategy",
        "Consider timeline impact on Q3 deliverables"
      ],
      goalImpact: [
        {
          goalTitle: "Increase Annual Revenue to $10M",
          impact: "positive",
          reason: "Directly contributes to revenue growth through new market opportunities"
        },
        {
          goalTitle: "Launch Product in 3 New Markets",
          impact: "positive",
          reason: "Enables faster market entry with strategic partnerships"
        },
        {
          goalTitle: "Build Team of 50+ Employees",
          impact: "neutral",
          reason: "No direct impact on hiring goals, but may create future needs"
        }
      ]
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case "highly-aligned":
        return { color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", label: "Highly Aligned", icon: CheckCircle2 };
      case "aligned":
        return { color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", label: "Aligned", icon: TrendingUp };
      case "neutral":
        return { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", label: "Neutral", icon: AlertTriangle };
      case "misaligned":
        return { color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30", label: "Misaligned", icon: AlertTriangle };
      case "highly-misaligned":
        return { color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30", label: "Highly Misaligned", icon: XCircle };
      default:
        return { color: "text-muted-foreground", bg: "bg-muted/10", border: "border-muted/30", label: "Unknown", icon: AlertTriangle };
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "negative":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Action Compatibility Check</h1>
              <p className="text-sm text-muted-foreground">Analyze alignment with your North Star</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Input Section */}
        <Card className="p-8 mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="action">Describe the Action or Decision</Label>
              <Textarea
                id="action"
                placeholder="e.g., Partner with Company X to expand into the European market, requiring $500K investment and 6 months of development time..."
                value={actionDescription}
                onChange={(e) => setActionDescription(e.target.value)}
                rows={6}
                className="bg-background resize-none"
              />
            </div>
            
            <Button 
              onClick={handleAnalyze}
              disabled={!actionDescription.trim() || isAnalyzing}
              className="w-full gap-2 bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Analyze Compatibility
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-4">
                  <span className="font-mono text-5xl font-bold text-primary">{result.score}</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getVerdictConfig(result.verdict).bg} ${getVerdictConfig(result.verdict).border} border`}>
                  {(() => {
                    const Icon = getVerdictConfig(result.verdict).icon;
                    return <Icon className={`w-4 h-4 ${getVerdictConfig(result.verdict).color}`} />;
                  })()}
                  <span className={`font-semibold ${getVerdictConfig(result.verdict).color}`}>
                    {getVerdictConfig(result.verdict).label}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Compatibility Score</span>
                  <span className="font-mono font-semibold">{result.score}/100</span>
                </div>
                <Progress value={result.score} className="h-3" />
              </div>
            </Card>

            {/* Key Insights */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Key Insights</h3>
              <ul className="space-y-3">
                {result.insights.map((insight, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Goal Impact Analysis */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Impact on Your Goals</h3>
              <div className="space-y-4">
                {result.goalImpact.map((impact, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-card border border-border/50">
                    <div className="mt-1">
                      {getImpactIcon(impact.impact)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{impact.goalTitle}</h4>
                      <p className="text-sm text-muted-foreground">{impact.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setActionDescription("");
                  setResult(null);
                }}
              >
                Check Another Action
              </Button>
              <Link to="/" className="flex-1">
                <Button className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
