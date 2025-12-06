import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface ComparisonChartProps {
  title: string;
  description?: string;
  data: Array<{ subject: string; classA: number; classB: number; average: number }>;
}

const chartConfig = {
  classA: { label: 'Class A', color: 'hsl(var(--primary))' },
  classB: { label: 'Class B', color: 'hsl(var(--chart-2))' },
  average: { label: 'Average', color: 'hsl(var(--muted-foreground))' },
};

const ComparisonChart = ({ title, description, data }: ComparisonChartProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <RadarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <PolarGrid className="stroke-muted" />
            <PolarAngleAxis dataKey="subject" className="text-xs fill-muted-foreground" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-xs fill-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar 
              name="Class A" 
              dataKey="classA" 
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))" 
              fillOpacity={0.3} 
            />
            <Radar 
              name="Class B" 
              dataKey="classB" 
              stroke="hsl(var(--chart-2))" 
              fill="hsl(var(--chart-2))" 
              fillOpacity={0.3} 
            />
            <Legend />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
