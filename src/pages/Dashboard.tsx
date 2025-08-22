import { DashboardMetrics } from "@/components/DashboardMetrics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Eye } from "lucide-react";

interface DashboardProps {
  userRole: string;
  userName: string;
}

export default function Dashboard({ userRole, userName }: DashboardProps) {
  const getWelcomeMessage = () => {
    const roleMessages = {
      hr: "Monitor company-wide performance and drive strategic HR initiatives.",
      dean: "Oversee academic excellence and strategic planning across all departments.",
      hod: "Lead your team to success with data-driven performance insights.",
      staff: "Track your professional growth and achieve your career goals."
    };
    return roleMessages[userRole as keyof typeof roleMessages] || "Welcome to your dashboard.";
  };

  const getRecentActivities = () => {
    switch (userRole) {
      case "hr":
        return [
          { title: "Q4 Performance Reviews", description: "89% completion rate", time: "2 hours ago", type: "review" },
          { title: "New Employee Onboarding", description: "3 new hires this week", time: "1 day ago", type: "onboarding" },
          { title: "Training Program Launch", description: "Leadership Development", time: "3 days ago", type: "training" },
        ];
      case "dean":
        return [
          { title: "Faculty Meeting", description: "Strategic planning session", time: "1 hour ago", type: "meeting" },
          { title: "Budget Review", description: "Q4 financial planning", time: "4 hours ago", type: "budget" },
          { title: "Accreditation Update", description: "Documentation submitted", time: "2 days ago", type: "accreditation" },
        ];
      case "hod":
        return [
          { title: "Team Stand-up", description: "Weekly progress review", time: "30 mins ago", type: "meeting" },
          { title: "KPI Assessment", description: "Q4 targets reviewed", time: "3 hours ago", type: "assessment" },
          { title: "Staff 1:1 Sessions", description: "Performance discussions", time: "1 day ago", type: "one-on-one" },
        ];
      default:
        return [
          { title: "Goal Update", description: "Project milestone achieved", time: "1 hour ago", type: "goal" },
          { title: "Training Completed", description: "Advanced Analytics course", time: "2 days ago", type: "training" },
          { title: "Performance Review", description: "Quarterly assessment", time: "1 week ago", type: "review" },
        ];
    }
  };

  const getUpcomingTasks = () => {
    switch (userRole) {
      case "hr":
        return [
          { title: "Complete Q4 Performance Reviews", due: "Due in 3 days", priority: "high" },
          { title: "Prepare Annual HR Report", due: "Due in 1 week", priority: "medium" },
          { title: "Schedule Team Building Event", due: "Due in 2 weeks", priority: "low" },
        ];
      case "dean":
        return [
          { title: "Review Department Budgets", due: "Due tomorrow", priority: "high" },
          { title: "Faculty Performance Assessment", due: "Due in 5 days", priority: "high" },
          { title: "Strategic Planning Workshop", due: "Due in 2 weeks", priority: "medium" },
        ];
      case "hod":
        return [
          { title: "Team Performance Review", due: "Due in 2 days", priority: "high" },
          { title: "Resource Allocation Planning", due: "Due in 1 week", priority: "medium" },
          { title: "Process Improvement Meeting", due: "Due in 10 days", priority: "low" },
        ];
      default:
        return [
          { title: "Complete Monthly Self-Assessment", due: "Due tomorrow", priority: "high" },
          { title: "Submit Project Progress Report", due: "Due in 3 days", priority: "medium" },
          { title: "Attend Skills Development Workshop", due: "Due in 1 week", priority: "medium" },
        ];
    }
  };

  const recentActivities = getRecentActivities();
  const upcomingTasks = getUpcomingTasks();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-lg opacity-90">
              {getWelcomeMessage()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">Today</div>
            <div className="text-xl font-semibold">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <DashboardMetrics role={userRole} />

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.title}</div>
                  <div className="text-xs text-muted-foreground">{activity.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>
              Tasks requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="text-xs text-muted-foreground">{task.due}</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-destructive' : 
                  task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                }`}></div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New Task
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}