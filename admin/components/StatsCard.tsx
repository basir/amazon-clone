import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    description: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    description,
}: StatsCardProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {title}
                </h3>
                <Icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            </div>
            <div className="mt-2">
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {value}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {description}
                </p>
            </div>
        </div>
    );
}
