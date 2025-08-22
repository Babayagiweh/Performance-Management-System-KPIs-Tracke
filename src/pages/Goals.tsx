import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CalendarDays, Target, Plus, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "not-started" | "in-progress" | "completed" | "overdue";
  progress: number;
  targetDate: string;
  createdDate: string;
  assignee?: string;
}

interface GoalsProps {
  userRole: string;
  userName: string;
}

export default function Goals({ userRole, userName }: GoalsProps) {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Complete Q4 Performance Reviews",
      description: "Conduct comprehensive performance reviews for all team members",
      category: "Management",
      priority: "high",
      status: "in-progress",
      progress: 65,
      targetDate: "2024-12-31",
      createdDate: "2024-10-01",
      assignee: userRole === "staff" ? undefined : "Team Lead"
    },
    {
      id: "2",
      title: "Implement New KPI Tracking System",
      description: "Deploy and train team on new performance tracking tools",
      category: "Technology",
      priority: "medium",
      status: "in-progress",
      progress: 40,
      targetDate: "2024-11-30",
      createdDate: "2024-09-15"
    },
    {
      id: "3",
      title: "Professional Development Certification",
      description: "Complete project management certification course",
      category: "Personal Development",
      priority: "medium",
      status: "not-started",
      progress: 0,
      targetDate: "2025-02-28",
      createdDate: "2024-11-01"
    }
  ]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium" as const,
    targetDate: ""
  });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      priority: newGoal.priority,
      status: "not-started",
      progress: 0,
      targetDate: newGoal.targetDate,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: "", description: "", category: "", priority: "medium", targetDate: "" });
    setIsAddingGoal(false);
    
    toast({
      title: "Success",
      description: "Goal created successfully!"
    });
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            progress: newProgress,
            status: newProgress === 100 ? "completed" : newProgress > 0 ? "in-progress" : "not-started"
          }
        : goal
    ));
    
    toast({
      title: "Progress Updated",
      description: `Goal progress updated to ${newProgress}%`
    });
  };

  const getStatusColor = (status: Goal["status"]) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-primary text-primary-foreground";
      case "overdue": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: Goal["priority"]) => {
    switch (priority) {
      case "high": return "border-l-destructive";
      case "medium": return "border-l-warning";
      default: return "border-l-success";
    }
  };

  const filteredGoals = userRole === "staff" 
    ? goals.filter(goal => !goal.assignee || goal.assignee === userName)
    : goals;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Goals Management</h1>
          <p className="text-muted-foreground">
            Track and manage {userRole === "staff" ? "your personal" : "team"} goals and objectives
          </p>
        </div>
        
        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new goal with clear objectives and timeline
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title *</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Enter goal title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Describe the goal in detail"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Personal Development">Personal Development</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Team">Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value: any) => setNewGoal({ ...newGoal, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="targetDate">Target Date *</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddGoal} className="flex-1">
                  Create Goal
                </Button>
                <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{filteredGoals.length}</div>
                <div className="text-sm text-muted-foreground">Total Goals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">
                  {filteredGoals.filter(g => g.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">
                  {filteredGoals.filter(g => g.status === "in-progress").length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-primary"></div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(filteredGoals.reduce((acc, goal) => acc + goal.progress, 0) / filteredGoals.length || 0)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <Card key={goal.id} className={`border-l-4 ${getPriorityColor(goal.priority)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline">{goal.priority}</Badge>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Category: {goal.category}</span>
                    <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    {goal.assignee && <span>Assignee: {goal.assignee}</span>}
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                
                <div className="flex gap-2">
                  {[25, 50, 75, 100].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, value)}
                      className="text-xs"
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}