import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  Check
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Multi-Tenant Architecture',
      description: 'Support for colleges, schools, coaching centers, and training institutes'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Role-Based Access',
      description: 'Comprehensive permission system for different user roles'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Academic Management',
      description: 'Complete class, assignment, and grade management tools'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics & Reports',
      description: 'Detailed insights and reports for administrators'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Real-time Updates',
      description: 'Instant notifications and live data synchronization'
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Student Portal',
      description: 'Dedicated portal for students to access their academic information'
    }
  ];

  const roles = [
    'System Owner',
    'Organization Admin',
    'Department Head',
    'Teacher/Lecturer',
    'Class Teacher',
    'Lab Incharge',
    'Librarian',
    'Manager',
    'Accountant',
    'Parent',
    'Student'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">EduFlow</span>
          </div>
          <Button onClick={() => navigate('/auth')}>
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            Production-Ready Multi-Tenant LMS
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
            Complete Learning Management System for
            <span className="block text-primary">Every Educational Institution</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
            Powerful, flexible, and scalable LMS platform designed for colleges, schools, 
            coaching centers, and training institutes. Built with modern technology stack.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Powerful Features</h2>
          <p className="text-muted-foreground">
            Everything you need to manage your educational institution
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Comprehensive Role Management</CardTitle>
              <CardDescription>
                Support for all types of users in your educational ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((role, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <Card className="border-border bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="flex flex-col items-center justify-center gap-6 p-12 text-center">
            <h2 className="text-3xl font-bold">Ready to Transform Your Institution?</h2>
            <p className="max-w-2xl text-muted-foreground">
              Join thousands of educational institutions using EduFlow to manage 
              their academic operations efficiently.
            </p>
            <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-semibold">EduFlow LMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EduFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
