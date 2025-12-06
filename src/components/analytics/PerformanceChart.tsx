import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  title: string;
  description?: string;
  data: Array<{ month: string; average: number; highest: number; lowest: number }>;
}

const chartConfig = {
  average: { label: 'Average', color: 'hsl(var(--primary))' },
  highest: { label: 'Highest', color: 'hsl(var(--chart-2))' },
  lowest: { label: 'Lowest', color: 'hsl(var(--chart-3))' },
};

const PerformanceChart = ({ title, description, data }: PerformanceChartProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            <Line 
              type="monotone" 
              dataKey="highest" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="lowest" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
