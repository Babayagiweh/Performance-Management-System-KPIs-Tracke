import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Target, Plus, BarChart3, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KPI {
  id: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  currentValue: number;
  targetValue: number;
  previousValue: number;
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  status: "exceeded" | "on-track" | "at-risk" | "critical";
  lastUpdated: string;
  owner: string;
}

interface KPIsProps {
  userRole: string;
  userName: string;
}

export default function KPIs({ userRole, userName }: KPIsProps) {
  const { toast } = useToast();
  
  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: "1",
      name: "Customer Satisfaction Score",
      description: "Average customer satisfaction rating from surveys",
      category: "Customer Service",
      unit: "/10",
      currentValue: 8.7,
      targetValue: 8.5,
      previousValue: 8.4,
      frequency: "monthly",
      status: "exceeded",
      lastUpdated: "2024-11-15",
      owner: userName
    },
    {
      id: "2", 
      name: "Project Completion Rate",
      description: "Percentage of projects completed on time",
      category: "Operations",
      unit: "%",
      currentValue: 82,
      targetValue: 90,
      previousValue: 79,
      frequency: "monthly",
      status: "at-risk",
      lastUpdated: "2024-11-14",
      owner: userName
    },
    {
      id: "3",
      name: "Training Hours per Employee",
      description: "Average training hours completed per employee",
      category: "Development",
      unit: "hours",
      currentValue: 24,
      targetValue: 20,
      previousValue: 18,
      frequency: "quarterly",
      status: "exceeded",
      lastUpdated: "2024-11-10",
      owner: userName
    },
    {
      id: "4",
      name: "Employee Engagement Score",
      description: "Quarterly employee engagement survey results",
      category: "HR",
      unit: "%",
      currentValue: 76,
      targetValue: 80,
      previousValue: 74,
      frequency: "quarterly",
      status: "on-track",
      lastUpdated: "2024-11-01",
      owner: userName
    }
  ]);

  const [isAddingKPI, setIsAddingKPI] = useState(false);
  const [newKPI, setNewKPI] = useState({
    name: "",
    description: "",
    category: "",
    unit: "",
    targetValue: 0,
    frequency: "monthly" as const
  });

  const handleAddKPI = () => {
    if (!newKPI.name || !newKPI.targetValue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const kpi: KPI = {
      id: Date.now().toString(),
      name: newKPI.name,
      description: newKPI.description,
      category: newKPI.category,
      unit: newKPI.unit,
      currentValue: 0,
      targetValue: newKPI.targetValue,
      previousValue: 0,
      frequency: newKPI.frequency,
      status: "on-track",
      lastUpdated: new Date().toISOString().split('T')[0],
      owner: userName
    };

    setKpis([...kpis, kpi]);
    setNewKPI({ name: "", description: "", category: "", unit: "", targetValue: 0, frequency: "monthly" });
    setIsAddingKPI(false);
    
    toast({
      title: "Success",
      description: "KPI created successfully!"
    });
  };

  const updateKPIValue = (kpiId: string, newValue: number) => {
    setKpis(kpis.map(kpi => {
      if (kpi.id === kpiId) {
        const progress = (newValue / kpi.targetValue) * 100;
        let status: KPI["status"];
        
        if (progress >= 100) status = "exceeded";
        else if (progress >= 80) status = "on-track";
        else if (progress >= 60) status = "at-risk";
        else status = "critical";

        return {
          ...kpi,
          previousValue: kpi.currentValue,
          currentValue: newValue,
          status,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return kpi;
    }));
    
    toast({
      title: "KPI Updated",
      description: "KPI value has been updated successfully"
    });
  };

  const getStatusColor = (status: KPI["status"]) => {
    switch (status) {
      case "exceeded": return "bg-success text-success-foreground";
      case "on-track": return "bg-primary text-primary-foreground";
      case "at-risk": return "bg-warning text-warning-foreground";
      case "critical": return "bg-destructive text-destructive-foreground";
    }
  };

  const getStatusIcon = (status: KPI["status"]) => {
    switch (status) {
      case "exceeded": return <TrendingUp className="h-4 w-4" />;
      case "on-track": return <Target className="h-4 w-4" />;
      case "at-risk": return <AlertTriangle className="h-4 w-4" />;
      case "critical": return <TrendingDown className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-3 w-3 text-success" />;
    if (current < previous) return <TrendingDown className="h-3 w-3 text-destructive" />;
    return <div className="h-3 w-3 rounded-full bg-muted" />;
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">KPI Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and track key performance indicators
          </p>
        </div>
        
        <Dialog open={isAddingKPI} onOpenChange={setIsAddingKPI}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add KPI
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New KPI</DialogTitle>
              <DialogDescription>
                Define a new key performance indicator to track
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">KPI Name *</Label>
                <Input
                  id="name"
                  value={newKPI.name}
                  onChange={(e) => setNewKPI({ ...newKPI, name: e.target.value })}
                  placeholder="Enter KPI name"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newKPI.description}
                  onChange={(e) => setNewKPI({ ...newKPI, description: e.target.value })}
                  placeholder="Describe what this KPI measures"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newKPI.category} onValueChange={(value) => setNewKPI({ ...newKPI, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Customer Service">Customer Service</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={newKPI.frequency} onValueChange={(value: any) => setNewKPI({ ...newKPI, frequency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newKPI.unit}
                    onChange={(e) => setNewKPI({ ...newKPI, unit: e.target.value })}
                    placeholder="%, hours, score, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="target">Target Value *</Label>
                  <Input
                    id="target"
                    type="number"
                    value={newKPI.targetValue}
                    onChange={(e) => setNewKPI({ ...newKPI, targetValue: parseFloat(e.target.value) })}
                    placeholder="Enter target value"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddKPI} className="flex-1">
                  Create KPI
                </Button>
                <Button variant="outline" onClick={() => setIsAddingKPI(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{kpis.length}</div>
                <div className="text-sm text-muted-foreground">Total KPIs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">
                  {kpis.filter(k => k.status === "exceeded").length}
                </div>
                <div className="text-sm text-muted-foreground">Exceeded</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {kpis.filter(k => k.status === "on-track").length}
                </div>
                <div className="text-sm text-muted-foreground">On Track</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">
                  {kpis.filter(k => k.status === "at-risk" || k.status === "critical").length}
                </div>
                <div className="text-sm text-muted-foreground">Needs Attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {kpi.name}
                    {getStatusIcon(kpi.status)}
                  </CardTitle>
                  <CardDescription>{kpi.description}</CardDescription>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {kpi.category}
                    </Badge>
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {kpi.currentValue}{kpi.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-muted-foreground">
                    {kpi.targetValue}{kpi.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">Target</div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  {getTrendIcon(kpi.currentValue, kpi.previousValue)}
                  <div className="text-sm font-medium">
                    {kpi.currentValue > kpi.previousValue ? "+" : ""}
                    {(kpi.currentValue - kpi.previousValue).toFixed(1)}{kpi.unit}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Target</span>
                  <span className="font-medium">
                    {getProgress(kpi.currentValue, kpi.targetValue).toFixed(0)}%
                  </span>
                </div>
                <Progress value={getProgress(kpi.currentValue, kpi.targetValue)} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Updated {kpi.frequency}</span>
                <span>Last: {new Date(kpi.lastUpdated).toLocaleDateString()}</span>
              </div>
              
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Update value"
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = parseFloat((e.target as HTMLInputElement).value);
                      if (!isNaN(value)) {
                        updateKPIValue(kpi.id, value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    const value = parseFloat(input.value);
                    if (!isNaN(value)) {
                      updateKPIValue(kpi.id, value);
                      input.value = "";
                    }
                  }}
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}