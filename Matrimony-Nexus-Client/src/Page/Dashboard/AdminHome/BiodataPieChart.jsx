"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";

export function BiodataPieChart() {
  const [chartData, setChartData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/dashboard/chart");
        setChartData([
          {
            label: "Biodata",
            value: response.data.totalBiodatas,
            fill: "hsl(var(--chart-1))",
          },
          {
            label: "Male",
            value: response.data.maleBiodatas,
            fill: "hsl(var(--chart-2))",
          },
          {
            label: "Female",
            value: response.data.femaleBiodatas,
            fill: "hsl(var(--chart-3))",
          },
          {
            label: "Premium",
            value: response.data.premiumBiodatas,
            fill: "hsl(var(--chart-4))",
          },
          {
            label: "Total Revenue",
            value: response.data.totalRevenue,
            fill: "hsl(var(--chart-5))",
          },
        ]);
      } catch (error) {
        console.error("Error fetching biodata stats:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const chartConfig = {
    value: {
      label: "Value",
    },
    "Total Biodata": {
      label: "Total Biodata",
      color: "hsl(var(--chart-1))",
    },
    "Male Biodata": {
      label: "Male Biodata",
      color: "hsl(var(--chart-2))",
    },
    "Female Biodata": {
      label: "Female Biodata",
      color: "hsl(var(--chart-3))",
    },
    "Premium Biodata": {
      label: "Premium Biodata",
      color: "hsl(var(--chart-4))",
    },
    "Total Revenue": {
      label: "Total Revenue",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Biodata Statistics</CardTitle>
        <CardDescription>Overview of biodata and revenue</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              labelLine={false}
              label={({ payload, ...props }) => (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                >
                  {payload.label}: {payload.value}
                </text>
              )}
              nameKey="label"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing biodata and revenue data
        </div>
      </CardFooter>
    </Card>
  );
}

export default BiodataPieChart;
