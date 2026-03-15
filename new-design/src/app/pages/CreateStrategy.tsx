import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Target, Sparkles, Save, Plus, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

export function CreateStrategy() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vision: "",
    mission: "",
    coreValues: ["", "", "", ""],
    focusAreas: ["", "", ""],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateFromGoals = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormData({
      vision: "Become the leading SaaS platform for enterprise project management by 2027",
      mission: "Empower teams to collaborate seamlessly and deliver projects with precision and efficiency",
      coreValues: [
        "Innovation First",
        "Customer Success",
        "Data-Driven Decisions",
        "Transparent Communication"
      ],
      focusAreas: [
        "Market expansion into Europe and Asia",
        "Product-led growth strategy",
        "Enterprise customer acquisition"
      ],
    });
    
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log("Strategy created:", formData);
    navigate("/strategy");
  };

  const updateCoreValue = (index: number, value: string) => {
    const newValues = [...formData.coreValues];
    newValues[index] = value;
    setFormData({ ...formData, coreValues: newValues });
  };

  const updateFocusArea = (index: number, value: string) => {
    const newAreas = [...formData.focusAreas];
    newAreas[index] = value;
    setFormData({ ...formData, focusAreas: newAreas });
  };

  const addFocusArea = () => {
    setFormData({ ...formData, focusAreas: [...formData.focusAreas, ""] });
  };

  const removeFocusArea = (index: number) => {
    const newAreas = formData.focusAreas.filter((_, i) => i !== index);
    setFormData({ ...formData, focusAreas: newAreas });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
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
              <h1 className="text-xl font-semibold">Create Strategy</h1>
              <p className="text-sm text-muted-foreground">Define your North Star framework</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* AI Generation Option */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">AI-Powered Strategy Generation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let AI analyze your existing goals and generate a strategic framework tailored to your objectives. 
                You can always customize it afterward.
              </p>
              <Button 
                onClick={handleGenerateFromGoals}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating Strategy...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate from Goals
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Strategy Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Vision */}
            <div className="space-y-2">
              <Label htmlFor="vision">Vision Statement *</Label>
              <p className="text-sm text-muted-foreground">
                Where do you want to be in 3-5 years?
              </p>
              <Textarea
                id="vision"
                placeholder="e.g., Become the leading platform in our industry..."
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                rows={3}
                required
                className="bg-background resize-none"
              />
            </div>

            {/* Mission */}
            <div className="space-y-2">
              <Label htmlFor="mission">Mission Statement *</Label>
              <p className="text-sm text-muted-foreground">
                What is your purpose? How do you create value?
              </p>
              <Textarea
                id="mission"
                placeholder="e.g., Empower businesses to achieve their goals through innovative solutions..."
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                rows={3}
                required
                className="bg-background resize-none"
              />
            </div>

            {/* Core Values */}
            <div className="space-y-3">
              <Label>Core Values *</Label>
              <p className="text-sm text-muted-foreground">
                What principles guide your decisions?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.coreValues.map((value, index) => (
                  <Input
                    key={index}
                    placeholder={`Core Value ${index + 1}`}
                    value={value}
                    onChange={(e) => updateCoreValue(index, e.target.value)}
                    required
                    className="bg-background"
                  />
                ))}
              </div>
            </div>

            {/* Focus Areas */}
            <div className="space-y-3">
              <Label>Strategic Focus Areas *</Label>
              <p className="text-sm text-muted-foreground">
                What are your main areas of concentration?
              </p>
              <div className="space-y-2">
                {formData.focusAreas.map((area, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Focus Area ${index + 1}`}
                      value={area}
                      onChange={(e) => updateFocusArea(index, e.target.value)}
                      required={index < 3}
                      className="bg-background flex-1"
                    />
                    {formData.focusAreas.length > 3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFocusArea(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFocusArea}
                  className="gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Focus Area
                </Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Next Steps:</strong> After creating your strategy, 
                you'll be able to define strategic pillars with specific initiatives. This foundational framework 
                will guide all your decision-making and goal-setting.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Link to="/" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4" />
                Save Strategy
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
