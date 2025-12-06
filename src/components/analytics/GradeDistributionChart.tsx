import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Legend } from 'recharts';

interface GradeDistributionChartProps {
  title: string;
  description?: string;
  data: Array<{ name: string; value: number; color: string }>;
}

const chartConfig = {
  A: { label: 'A Grade', color: 'hsl(var(--chart-2))' },
  B: { label: 'B Grade', color: 'hsl(var(--primary))' },
  C: { label: 'C Grade', color: 'hsl(var(--chart-4))' },
  D: { label: 'D Grade', color: 'hsl(var(--chart-5))' },
  F: { label: 'F Grade', color: 'hsl(var(--destructive))' },
};

const GradeDistributionChart = ({ title, description, data }: GradeDistributionChartProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GradeDistributionChart;
