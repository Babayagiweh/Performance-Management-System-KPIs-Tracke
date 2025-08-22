import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Users, Target, Award, Activity } from "lucide-react";
import { useState } from "react";

interface AnalyticsProps {
  userRole: string;
  userName: string;
}

export default function Analytics({ userRole, userName }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState("3months");
  
  // Mock data for charts
  const performanceData = [
    { month: 'Jan', performance: 78, goals: 65, kpis: 82 },
    { month: 'Feb', performance: 82, goals: 70, kpis: 85 },
    { month: 'Mar', performance: 85, goals: 75, kpis: 88 },
    { month: 'Apr', performance: 87, goals: 78, kpis: 90 },
    { month: 'May', performance: 89, goals: 82, kpis: 92 },
    { month: 'Jun', performance: 91, goals: 85, kpis: 94 },
  ];

  const departmentData = [
    { name: 'Engineering', performance: 92, employees: 45, color: '#3b82f6' },
    { name: 'Product', performance: 88, employees: 28, color: '#10b981' },
    { name: 'Design', performance: 85, employees: 15, color: '#f59e0b' },
    { name: 'Marketing', performance: 82, employees: 22, color: '#ef4444' },
    { name: 'Sales', performance: 78, employees: 35, color: '#8b5cf6' },
  ];

  const goalCompletionData = [
    { category: 'Completed', value: 68, color: '#10b981' },
    { category: 'In Progress', value: 24, color: '#3b82f6' },
    { category: 'Not Started', value: 8, color: '#6b7280' },
  ];

  const kpiTrendData = [
    { week: 'W1', satisfaction: 8.2, productivity: 85, engagement: 78 },
    { week: 'W2', satisfaction: 8.4, productivity: 87, engagement: 80 },
    { week: 'W3', satisfaction: 8.3, productivity: 89, engagement: 82 },
    { week: 'W4', satisfaction: 8.6, productivity: 91, engagement: 85 },
    { week: 'W5', satisfaction: 8.7, productivity: 88, engagement: 83 },
    { week: 'W6', satisfaction: 8.5, productivity: 92, engagement: 86 },
  ];

  if (userRole === "staff" || userRole === "hod") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground">
              Advanced analytics are only available to HR and Dean roles.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive performance insights and trends
          </p>
        </div>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">234</div>
                <div className="text-sm text-muted-foreground">Total Employees</div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                  +12 this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm text-muted-foreground">Avg Performance</div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                  +3.2% vs last quarter
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">76%</div>
                <div className="text-sm text-muted-foreground">Goals Achieved</div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                  +8% above target
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-destructive" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">At Risk Employees</div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingDown className="h-3 w-3" />
                  -2 from last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
          <TabsTrigger value="goals">Goal Completion</TabsTrigger>
          <TabsTrigger value="kpis">KPI Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends Over Time</CardTitle>
              <CardDescription>
                Monthly performance, goals, and KPI metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                    name="Performance"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="goals" 
                    stackId="2"
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success))" 
                    fillOpacity={0.6}
                    name="Goals"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="kpis" 
                    stackId="3"
                    stroke="hsl(var(--warning))" 
                    fill="hsl(var(--warning))" 
                    fillOpacity={0.6}
                    name="KPIs"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Comparison</CardTitle>
              <CardDescription>
                Performance scores by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="performance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {departmentData.map((dept) => (
              <Card key={dept.name}>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold" style={{ color: dept.color }}>
                    {dept.performance}%
                  </div>
                  <div className="text-sm font-medium">{dept.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {dept.employees} employees
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Goal Completion Status</CardTitle>
                <CardDescription>
                  Current status of all organizational goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={goalCompletionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {goalCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Goal Statistics</CardTitle>
                <CardDescription>
                  Detailed breakdown of goal metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {goalCompletionData.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <Badge variant="outline">{item.value}%</Badge>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="text-2xl font-bold text-center">156</div>
                  <div className="text-sm text-muted-foreground text-center">Total Goals</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KPI Performance Trends</CardTitle>
              <CardDescription>
                Weekly trends for key performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={kpiTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaction" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Satisfaction Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Productivity %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="hsl(var(--warning))" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Engagement %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}