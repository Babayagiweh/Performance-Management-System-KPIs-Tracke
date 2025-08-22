import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, Plus, Star, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  employeeName: string;
  employeeRole: string;
  reviewerId: string;
  reviewerName: string;
  period: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  dueDate: string;
  completedDate?: string;
  scores: {
    performance: number;
    goals: number;
    collaboration: number;
    communication: number;
  };
  feedback: string;
  employeeFeedback?: string;
  developmentPlan: string[];
}

interface PerformanceReviewsProps {
  userRole: string;
  userName: string;
}

export default function PerformanceReviews({ userRole, userName }: PerformanceReviewsProps) {
  const { toast } = useToast();
  
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      employeeName: "Alice Johnson",
      employeeRole: "Senior Developer",
      reviewerId: "manager1",
      reviewerName: userName,
      period: "Q4 2024",
      status: "completed",
      dueDate: "2024-12-15",
      completedDate: "2024-12-10",
      scores: { performance: 4.5, goals: 4.2, collaboration: 4.8, communication: 4.3 },
      feedback: "Excellent performance this quarter. Alice has consistently delivered high-quality work and shown great leadership skills.",
      employeeFeedback: "Thank you for the feedback. I'm looking forward to taking on more leadership responsibilities next quarter.",
      developmentPlan: ["Leadership training program", "Mentoring junior developers", "Technical architecture certification"]
    },
    {
      id: "2",
      employeeName: "Bob Smith", 
      employeeRole: "Product Manager",
      reviewerId: "manager1",
      reviewerName: userName,
      period: "Q4 2024",
      status: "in-progress",
      dueDate: "2024-12-20",
      scores: { performance: 4.0, goals: 3.8, collaboration: 4.2, communication: 4.1 },
      feedback: "Good progress on product roadmap. Could improve on stakeholder communication.",
      developmentPlan: ["Communication skills workshop", "Stakeholder management course"]
    },
    {
      id: "3",
      employeeName: "Carol Davis",
      employeeRole: "UX Designer",
      reviewerId: "manager1", 
      reviewerName: userName,
      period: "Q4 2024",
      status: "pending",
      dueDate: "2024-12-25",
      scores: { performance: 0, goals: 0, collaboration: 0, communication: 0 },
      feedback: "",
      developmentPlan: []
    },
    {
      id: "4",
      employeeName: "David Wilson",
      employeeRole: "Marketing Specialist",
      reviewerId: "manager1",
      reviewerName: userName,
      period: "Q4 2024", 
      status: "overdue",
      dueDate: "2024-12-05",
      scores: { performance: 0, goals: 0, collaboration: 0, communication: 0 },
      feedback: "",
      developmentPlan: []
    }
  ]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const getStatusColor = (status: Review["status"]) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-primary text-primary-foreground";
      case "pending": return "bg-muted text-muted-foreground";
      case "overdue": return "bg-destructive text-destructive-foreground";
    }
  };

  const getStatusIcon = (status: Review["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "in-progress": return <Clock className="h-4 w-4" />;
      case "pending": return <Calendar className="h-4 w-4" />;
      case "overdue": return <AlertCircle className="h-4 w-4" />;
    }
  };

  const startReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: "in-progress" as const }
        : review
    ));
    
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      setSelectedReview(review);
      setIsReviewDialogOpen(true);
    }
  };

  const saveReview = (reviewData: Partial<Review>) => {
    if (!selectedReview) return;
    
    setReviews(reviews.map(review => 
      review.id === selectedReview.id 
        ? { 
            ...review, 
            ...reviewData,
            status: "completed" as const,
            completedDate: new Date().toISOString().split('T')[0]
          }
        : review
    ));
    
    setIsReviewDialogOpen(false);
    setSelectedReview(null);
    
    toast({
      title: "Review Saved",
      description: "Performance review has been completed successfully"
    });
  };

  const avgScore = (scores: Review["scores"]) => {
    const values = Object.values(scores);
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  if (userRole === "staff") {
    // Staff can only see their own reviews
    const myReviews = reviews.filter(review => 
      review.employeeName.toLowerCase().includes(userName.toLowerCase())
    );
    
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Performance Reviews</h1>
          <p className="text-muted-foreground">
            View your performance reviews and feedback
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {myReviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(review.status)}
                      {review.period} Performance Review  
                    </CardTitle>
                    <CardDescription>
                      Review by {review.reviewerName}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(review.status)}>
                    {review.status.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {review.status === "completed" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(review.scores).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-primary">{value.toFixed(1)}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-semibold">Manager Feedback</Label>
                      <p className="text-sm">{review.feedback}</p>
                    </div>
                    
                    {review.developmentPlan.length > 0 && (
                      <div className="space-y-2">
                        <Label className="font-semibold">Development Plan</Label>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {review.developmentPlan.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {review.status !== "completed" && (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Review scheduled for {new Date(review.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance Reviews</h1>
          <p className="text-muted-foreground">
            Manage and conduct team performance reviews
          </p>
        </div>
        
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Review
        </Button>
      </div>

      {/* Review Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{reviews.length}</div>
                <div className="text-sm text-muted-foreground">Total Reviews</div>
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
                  {reviews.filter(r => r.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">
                  {reviews.filter(r => r.status === "in-progress").length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <div className="text-2xl font-bold">
                  {reviews.filter(r => r.status === "overdue").length}
                </div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {review.employeeName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.employeeName}</CardTitle>
                    <Badge className={getStatusColor(review.status)}>
                      {getStatusIcon(review.status)}
                      <span className="ml-1">{review.status.replace("-", " ")}</span>
                    </Badge>
                  </div>
                  <CardDescription>
                    {review.employeeRole} • {review.period}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground mt-1">
                    Due: {new Date(review.dueDate).toLocaleDateString()}
                    {review.completedDate && (
                      <span> • Completed: {new Date(review.completedDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {review.status === "completed" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        {avgScore(review.scores).toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="font-medium mb-1">Key Feedback:</div>
                    <p className="text-muted-foreground line-clamp-2">{review.feedback}</p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 mt-4">
                {review.status === "pending" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => startReview(review.id)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Start Review
                  </Button>
                )}
                
                {review.status === "in-progress" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedReview(review);
                      setIsReviewDialogOpen(true);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Continue Review
                  </Button>
                )}
                
                {review.status === "completed" && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                )}
                
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Performance Review - {selectedReview?.employeeName}
            </DialogTitle>
            <DialogDescription>
              {selectedReview?.period} • {selectedReview?.employeeRole}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReview && (
            <ReviewForm 
              review={selectedReview} 
              onSave={saveReview}
              onCancel={() => setIsReviewDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Review Form Component
function ReviewForm({ 
  review, 
  onSave, 
  onCancel 
}: { 
  review: Review; 
  onSave: (data: Partial<Review>) => void;
  onCancel: () => void;
}) {
  const [scores, setScores] = useState(review.scores);
  const [feedback, setFeedback] = useState(review.feedback);
  const [developmentPlan, setDevelopmentPlan] = useState(review.developmentPlan.join('\n'));

  const handleSave = () => {
    onSave({
      scores,
      feedback,
      developmentPlan: developmentPlan.split('\n').filter(item => item.trim())
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scores" className="w-full">
        <TabsList>
          <TabsTrigger value="scores">Performance Scores</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="development">Development Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(scores).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()} Score
                </Label>
                <Select 
                  value={value.toString()} 
                  onValueChange={(v) => setScores({...scores, [key]: parseFloat(v)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Needs Improvement</SelectItem>
                    <SelectItem value="2">2 - Below Expectations</SelectItem>
                    <SelectItem value="3">3 - Meets Expectations</SelectItem>
                    <SelectItem value="4">4 - Exceeds Expectations</SelectItem>
                    <SelectItem value="5">5 - Outstanding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="space-y-2">
            <Label>Performance Feedback</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide detailed feedback on the employee's performance..."
              rows={8}
            />
          </div>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <div className="space-y-2">
            <Label>Development Plan</Label>
            <Textarea
              value={developmentPlan}
              onChange={(e) => setDevelopmentPlan(e.target.value)}
              placeholder="Enter development goals and plans (one per line)..."
              rows={6}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={handleSave} className="flex-1">
          Save Review
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}