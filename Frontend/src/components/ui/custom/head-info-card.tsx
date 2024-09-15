import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface IProps {
	title: string,
	value: string,
	description: string,
	Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export default function HeadInfoCard({title, value, description, Icon}: Readonly<IProps>) {
    return (
		<Card className="flex-grow">
			<CardHeader className="p-3 flex-row justify-between items-center">
				<CardDescription>{title}</CardDescription>
				<Icon className="w-6" style={{margin: 0}}/>
			</CardHeader>

			<CardContent className="p-3 pt-0">
				<CardTitle>{value}</CardTitle>
			</CardContent>

			<CardFooter className="p-3">
				<CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>
			</CardFooter>
		</Card>
    )
}