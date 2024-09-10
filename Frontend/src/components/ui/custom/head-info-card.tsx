import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { DollarSign } from 'lucide-react'

export default function HeadInfoCard() {
    return (
		<Card className="flex-grow">
			<CardHeader className="p-3 flex-row justify-between items-center">
				<CardDescription>Total Revenue</CardDescription>
				<DollarSign className="w-4" style={{margin: 0}}/>
			</CardHeader>

			<CardContent className="p-3 pt-0">
				<CardTitle>$45,231.89</CardTitle>
			</CardContent>

			<CardFooter className="p-3">
				<CardDescription className="text-xs text-muted-foreground">+20.1% from last month</CardDescription>
			</CardFooter>
		</Card>
    )
}