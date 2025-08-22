import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Users, Trophy, AlertCircle } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: any;
  description?: string;
}

function MetricCard({ title, value, change, trend, icon: Icon, description }: MetricCardProps) {
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : AlertCircle;

  return (
    <Card className="hover:shadow-soft transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className={`flex items-center text-xs ${trendColor}`}>
          <TrendIcon className="h-3 w-3 mr-1" />
          {change}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface KPIProgressProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  status: "on-track" | "at-risk" | "exceeded";
}

function KPIProgress({ title, current, target, unit, status }: KPIProgressProps) {
  const progress = Math.min((current / target) * 100, 100);
  const statusColor = {
    "on-track": "bg-success",
    "at-risk": "bg-warning", 
    "exceeded": "bg-primary"
  };
  
  const statusText = {
    "on-track": "On Track",
    "at-risk": "At Risk",
    "exceeded": "Exceeded"
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="secondary" className={statusColor[status]}>
            {statusText[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Current: {current} {unit}</span>
            <span>Target: {target} {unit}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {progress.toFixed(0)}% of target achieved
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardMetricsProps {
  role: string;
}

export function DashboardMetrics({ role }: DashboardMetricsProps) {
  // Mock data - in real app this would come from API
  const getMetricsForRole = () => {
    switch (role) {
      case "hr":
        return [
          { title: "Total Employees", value: "234", change: "+12 this month", trend: "up" as const, icon: Users },
          { title: "Avg Performance", value: "8.4", change: "+0.3 from last quarter", trend: "up" as const, icon: Trophy },
          { title: "Reviews Completed", value: "89%", change: "+5% this month", trend: "up" as const, icon: Target },
          { title: "At Risk Employees", value: "8", change: "-2 from last month", trend: "up" as const, icon: AlertCircle },
        ];
      case "dean":
        return [
          { title: "Department Performance", value: "85%", change: "+3% this quarter", trend: "up" as const, icon: Trophy },
          { title: "Goals Achieved", value: "76%", change: "+8% from target", trend: "up" as const, icon: Target },
          { title: "Faculty Satisfaction", value: "4.2", change: "+0.2 this quarter", trend: "up" as const, icon: Users },
          { title: "Strategic Initiatives", value: "12/15", change: "3 pending", trend: "neutral" as const, icon: TrendingUp },
        ];
      case "hod":
        return [
          { title: "Team Performance", value: "82%", change: "+5% this month", trend: "up" as const, icon: Users },
          { title: "KPIs Met", value: "14/16", change: "87.5% completion", trend: "up" as const, icon: Target },
          { title: "Team Goals", value: "9/11", change: "2 in progress", trend: "up" as const, icon: Trophy },
          { title: "Productivity Score", value: "4.1", change: "+0.3 this quarter", trend: "up" as const, icon: TrendingUp },
        ];
      default: // staff
        return [
          { title: "Personal Goals", value: "7/9", change: "2 in progress", trend: "up" as const, icon: Target },
          { title: "KPI Performance", value: "91%", change: "+7% this month", trend: "up" as const, icon: Trophy },
          { title: "Skill Development", value: "4/5", change: "1 remaining", trend: "up" as const, icon: TrendingUp },
          { title: "Performance Rating", value: "4.3", change: "+0.2 this quarter", trend: "up" as const, icon: Users },
        ];
    }
  };

  const getKPIsForRole = () => {
    switch (role) {
      case "hr":
        return [
          { title: "Employee Satisfaction", current: 84, target: 85, unit: "%", status: "at-risk" as const },
          { title: "Training Hours Delivered", current: 1250, target: 1200, unit: "hrs", status: "exceeded" as const },
        ];
      case "dean":
        return [
          { title: "Strategic Goals Completed", current: 12, target: 15, unit: "goals", status: "on-track" as const },
          { title: "Faculty Performance Score", current: 4.2, target: 4.0, unit: "/5", status: "exceeded" as const },
        ];
      case "hod":
        return [
          { title: "Team Productivity", current: 88, target: 90, unit: "%", status: "on-track" as const },
          { title: "Project Deliveries", current: 45, target: 48, unit: "projects", status: "at-risk" as const },
        ];
      default:
        return [
          { title: "Individual Productivity", current: 92, target: 85, unit: "%", status: "exceeded" as const },
          { title: "Skill Development Hours", current: 38, target: 40, unit: "hrs", status: "on-track" as const },
        ];
    }
  };

  const metrics = getMetricsForRole();
  const kpis = getKPIsForRole();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {kpis.map((kpi, index) => (
          <KPIProgress key={index} {...kpi} />
        ))}
      </div>
    </div>
  );
}