import {
	ArrowDownIcon,
	ArrowUpIcon,
	CaretSortIcon,
	EyeNoneIcon,
} from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "../button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../dropdown-menu"
import { Trans } from "react-i18next"

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	i18nKey: string
}

export default function DataTableColumnHeader<TData, TValue>({
	column,
	i18nKey,
	className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>
					<Trans i18nKey={i18nKey}>
						{i18nKey}
					</Trans>
				</div>
	}

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>
							<Trans i18nKey={i18nKey}>
								{i18nKey}
							</Trans>
						</span>
						{column.getIsSorted() === "desc" ? (
							<ArrowDownIcon className="ml-2 h-4 w-4" />
						) : <></>}
						{column.getIsSorted() === "asc" ? (
							<ArrowUpIcon className="ml-2 h-4 w-4" />
						) : <></>}
						{(column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc") ? (
							<CaretSortIcon className="ml-2 h-4 w-4" />
						) : <></>}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}