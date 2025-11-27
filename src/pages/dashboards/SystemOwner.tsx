import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Settings, 
  BarChart3, 
  Plus,
  TrendingUp,
  Activity,
  DollarSign
} from 'lucide-react';

const SystemOwner = () => {
  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/system-owner' },
    { label: 'Organizations', icon: <Building2 className="h-5 w-5" />, path: '/system-owner/organizations' },
    { label: 'Users', icon: <Users className="h-5 w-5" />, path: '/system-owner/users' },
    { label: 'Analytics', icon: <Activity className="h-5 w-5" />, path: '/system-owner/analytics' },
    { label: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/system-owner/settings' },
  ];

  const stats = [
    {
      title: 'Total Organizations',
      value: '24',
      change: '+3 this month',
      icon: <Building2 className="h-5 w-5" />,
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: '12,543',
      change: '+1,234 this month',
      icon: <Users className="h-5 w-5" />,
      trend: 'up'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: 'All systems operational',
      icon: <Activity className="h-5 w-5" />,
      trend: 'stable'
    },
    {
      title: 'Revenue',
      value: '$124,800',
      change: '+12% from last month',
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up'
    },
  ];

  const recentOrganizations = [
    { name: 'Stanford University', type: 'College', users: 2341, status: 'active' },
    { name: 'Lincoln High School', type: 'School', users: 856, status: 'active' },
    { name: 'TechPro Coaching', type: 'Coaching', users: 432, status: 'active' },
    { name: 'Business Institute', type: 'Institute', users: 678, status: 'trial' },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Overview</h1>
            <p className="text-muted-foreground">
              Monitor and manage all organizations and system health
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Organization
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1 text-sm">
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-primary" />}
                  <span className="text-muted-foreground">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Organizations */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Organizations</CardTitle>
                <CardDescription>Recent organizations added to the system</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrganizations.map((org, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{org.name}</h4>
                      <p className="text-sm text-muted-foreground">{org.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{org.users} users</p>
                      <p className="text-xs text-muted-foreground capitalize">{org.status}</p>
                    </div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemOwner;
