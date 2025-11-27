import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess } from '@/store/slices/authSlice';
import { setCurrentOrganization } from '@/store/slices/organizationSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { UserRole } from '@/store/slices/authSlice';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const roleOptions: { value: UserRole; label: string; route: string }[] = [
    { value: 'system_owner', label: 'System Owner', route: '/system-owner' },
    { value: 'org_admin', label: 'Organization Admin', route: '/org-admin' },
    { value: 'teacher', label: 'Teacher', route: '/teacher' },
    { value: 'student', label: 'Student', route: '/student' },
    { value: 'parent', label: 'Parent', route: '/parent' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login - In production, this would call an API
    const mockUser = {
      id: '1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      role: selectedRole,
      organizationId: selectedRole !== 'system_owner' ? 'org-1' : undefined,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    if (selectedRole !== 'system_owner') {
      dispatch(setCurrentOrganization({
        id: 'org-1',
        name: 'Demo University',
        type: 'college',
      }));
    }

    dispatch(loginSuccess(mockUser));
    
    const route = roleOptions.find(r => r.value === selectedRole)?.route || '/';
    toast.success('Login successful!');
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <Button
          variant="ghost"
          className="absolute left-4 top-4 gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Card className="w-full max-w-md border-border shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome to EduFlow</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Demo Mode - Use any email and password
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
