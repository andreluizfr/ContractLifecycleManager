import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegendContent, ChartLegend } from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Monitor, Smartphone } from "lucide-react"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
        label: <span className="">Desktop</span>,
        color: "hsl(var(--chart-2))",
        icon: Monitor,
    },
    mobile: {
        label: <span className="">Mobile</span>,
        color: "hsl(var(--chart-3))",
        icon: Smartphone,
    },
} satisfies ChartConfig;

export default function MoneyBarChart() {

    return (
        <ChartContainer config={chartConfig} className="h-[500px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" hideIndicator={false}/>} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}

