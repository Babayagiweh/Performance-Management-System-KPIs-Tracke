import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Building2, User } from "lucide-react";

const roles = [
  {
    id: "hr",
    title: "HR Manager",
    description: "Manage employee performance, analytics, and reports across all departments",
    icon: Users,
    color: "bg-gradient-primary"
  },
  {
    id: "dean",
    title: "Dean",
    description: "Oversee department performance and strategic planning initiatives", 
    icon: GraduationCap,
    color: "bg-gradient-success"
  },
  {
    id: "hod",
    title: "Head of Department",
    description: "Manage team goals, track KPIs, and conduct performance reviews",
    icon: Building2,
    color: "bg-primary"
  },
  {
    id: "staff",
    title: "Staff Member",
    description: "Set personal goals, track KPIs, and manage individual performance",
    icon: User,
    color: "bg-secondary"
  }
];

interface RoleSelectorProps {
  onRoleSelect: (role: string, name: string) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const handleRoleSelect = (roleId: string) => {
    // In a real app, this would come from authentication
    const mockNames = {
      hr: "Sarah Johnson",
      dean: "Dr. Michael Smith", 
      hod: "Prof. Emily Davis",
      staff: "John Anderson"
    };
    
    onRoleSelect(roleId, mockNames[roleId as keyof typeof mockNames]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Performance Management System
          </h1>
          <p className="text-xl text-muted-foreground">
            Select your role to access your dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className="hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}