import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, TrendingUp, Search, Filter, Star, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  performance: {
    overall: number;
    goals: number;
    kpis: number;
    collaboration: number;
  };
  status: "excellent" | "good" | "average" | "needs-improvement";
  goalsCompleted: number;
  totalGoals: number;
  lastReview: string;
  manager: string;
}

interface TeamPerformanceProps {
  userRole: string;
  userName: string;
}

export default function TeamPerformance({ userRole, userName }: TeamPerformanceProps) {
  const { toast } = useToast();
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alice Johnson",
      role: "Senior Developer",
      department: "Engineering",
      performance: { overall: 92, goals: 88, kpis: 95, collaboration: 94 },
      status: "excellent",
      goalsCompleted: 8,
      totalGoals: 9,
      lastReview: "2024-10-15",
      manager: userName
    },
    {
      id: "2", 
      name: "Bob Smith",
      role: "Product Manager",
      department: "Product",
      performance: { overall: 85, goals: 82, kpis: 87, collaboration: 86 },
      status: "good",
      goalsCompleted: 6,
      totalGoals: 8,
      lastReview: "2024-10-20",
      manager: userName
    },
    {
      id: "3",
      name: "Carol Davis",
      role: "UX Designer", 
      department: "Design",
      performance: { overall: 78, goals: 75, kpis: 80, collaboration: 79 },
      status: "good",
      goalsCompleted: 5,
      totalGoals: 7,
      lastReview: "2024-10-12",
      manager: userName
    },
    {
      id: "4",
      name: "David Wilson",
      role: "Marketing Specialist",
      department: "Marketing", 
      performance: { overall: 68, goals: 65, kpis: 70, collaboration: 71 },
      status: "average",
      goalsCompleted: 4,
      totalGoals: 8,
      lastReview: "2024-10-08",
      manager: userName
    },
    {
      id: "5",
      name: "Eva Martinez",
      role: "Sales Representative",
      department: "Sales",
      performance: { overall: 58, goals: 55, kpis: 60, collaboration: 60 },
      status: "needs-improvement",
      goalsCompleted: 3,
      totalGoals: 9,
      lastReview: "2024-09-25",
      manager: userName
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "excellent": return "bg-success text-success-foreground";
      case "good": return "bg-primary text-primary-foreground";
      case "average": return "bg-warning text-warning-foreground";
      case "needs-improvement": return "bg-destructive text-destructive-foreground";
    }
  };

  const getPerformanceBand = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "text-success" };
    if (score >= 80) return { label: "Good", color: "text-primary" };
    if (score >= 70) return { label: "Average", color: "text-warning" };
    return { label: "Needs Improvement", color: "text-destructive" };
  };

  const avgPerformance = teamMembers.reduce((acc, member) => acc + member.performance.overall, 0) / teamMembers.length;

  const scheduleReview = (memberId: string) => {
    toast({
      title: "Review Scheduled",
      description: "Performance review has been scheduled successfully"
    });
  };

  const sendFeedback = (memberId: string) => {
    toast({
      title: "Feedback Sent",
      description: "Feedback has been sent to the team member"
    });
  };

  if (userRole === "staff") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground">
              Team performance data is only available to managers and above.
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
          <h1 className="text-3xl font-bold text-foreground">Team Performance</h1>
          <p className="text-muted-foreground">
            Monitor and manage your team's performance metrics
          </p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{teamMembers.length}</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">{avgPerformance.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Avg Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">
                  {teamMembers.filter(m => m.status === "excellent" || m.status === "good").length}
                </div>
                <div className="text-sm text-muted-foreground">Top Performers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {teamMembers.reduce((acc, m) => acc + m.goalsCompleted, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Goals Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <CardDescription>{member.role} • {member.department}</CardDescription>
                  <div className="text-xs text-muted-foreground">
                    Last review: {new Date(member.lastReview).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">
                      {member.performance.overall}%
                    </div>
                    <div className={`text-sm font-medium ${getPerformanceBand(member.performance.overall).color}`}>
                      {getPerformanceBand(member.performance.overall).label}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goals Progress</span>
                      <span>{member.goalsCompleted}/{member.totalGoals}</span>
                    </div>
                    <Progress 
                      value={(member.goalsCompleted / member.totalGoals) * 100} 
                      className="h-2" 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  {[
                    { label: "Goals", value: member.performance.goals },
                    { label: "KPIs", value: member.performance.kpis },
                    { label: "Collaboration", value: member.performance.collaboration }
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{metric.label}</span>
                        <span className="font-medium">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-1" />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => scheduleReview(member.id)}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Review
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => sendFeedback(member.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Send Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No team members found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}