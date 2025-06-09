"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ComputeRequirements } from "./compute-calculator"
import { Brain } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { regions } from "@/constants/aws"

interface ComputeFormProps {
    onSubmit: (requirements: ComputeRequirements) => void
    isLoading: boolean
}

// Define regions
// const regions = [
//   { value: "us-east-1", label: "US East (N. Virginia)" },
//   { value: "us-east-2", label: "US East (Ohio)" },
//   { value: "us-west-1", label: "US West (N. California)" },
//   { value: "us-west-2", label: "US West (Oregon)" },
//   { value: "eu-west-1", label: "EU West (Ireland)" },
//   { value: "eu-central-1", label: "EU Central (Frankfurt)" },
//   { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
//   { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
//   { value: "ap-southeast-2", label: "Asia Pacific (Sydney)" },
//   { value: "sa-east-1", label: "South America (São Paulo)" },
// ]

// Define usage patterns
const usagePatterns = [
    { value: "50%", label: "Low (50%)" },
    { value: "80%", label: "High (80%)" },
    { value: "99.99%", label: "Very High (99.99%)" },
]

// Define durations
const durations = [
    { value: "1 week", label: "1 Week" },
    { value: "1 month", label: "1 Month" },
    { value: "1 year", label: "1 Year" },
    { value: "more than a year", label: "More than a Year" },
]

// Define form validation schema
const formSchema = z.object({
    vCPU: z.number().min(1, "vCPU must be at least 1"),
    RAM_GB: z.number().min(1, "RAM must be at least 1 GB"),
    machine_count: z.number().min(1, "Machine count must be at least 1"),
    storage: z.object({
        type: z.enum(["SSD", "HDD"], { required_error: "Storage type is required" }),
        size_GB: z.number().min(1, "Storage size must be at least 1 GB"),
    }),
    region: z.string({ required_error: "Region is required" }),
    OS: z.enum(["Linux", "Windows"], { required_error: "OS is required" }),
    duration: z.string({ required_error: "Duration is required" }),
    usage: z.string({ required_error: "Usage pattern is required" }),
    budget_limit: z.number().nullable(),
    workload_type: z.literal("Web Application"),
    preferred_cloud: z.enum(["AWS", "Azure", "GCP", "Any"], { required_error: "Preferred cloud is required" }),
    billing_model: z.enum(["OnDemand", "Reserved", "Spot", "Preemptible"], {
        required_error: "Billing model is required",
    }),
})

export function ComputeForm({ onSubmit, isLoading }: ComputeFormProps) {
    // Initialize form with react-hook-form and zod validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vCPU: 2,
            RAM_GB: 8,
            machine_count: 1,
            storage: {
                type: "SSD",
                size_GB: 100,
            },
            region: "us-east-1",
            OS: "Linux",
            duration: "1 month",
            usage: "80%",
            budget_limit: null,
            workload_type: "Web Application",
            preferred_cloud: "Any",
            billing_model: "OnDemand",
        },
    })

    const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values as ComputeRequirements)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 compute-form">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="vCPU"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">vCPU</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="RAM_GB"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">RAM (GB)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="machine_count"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Machine Count</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="storage.size_GB"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Storage Size (GB)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="storage.type"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Storage Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                            <SelectValue placeholder="Select storage type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white border-gray-300">
                                        <SelectItem value="SSD">SSD</SelectItem>
                                        <SelectItem value="HDD">HDD</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Region</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                            <SelectValue placeholder="Select region" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white border-gray-300 max-h-[200px]">
                                        {regions.map((region) => (
                                            <SelectItem key={region} value={region}>
                                                {region}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="OS"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Operating System</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                            <SelectValue placeholder="Select OS" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white border-gray-300">
                                        <SelectItem value="Linux">Linux</SelectItem>
                                        <SelectItem value="Windows">Windows</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="preferred_cloud"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Preferred Cloud</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                            <SelectValue placeholder="Select preferred cloud" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white border-gray-300">
                                        <SelectItem value="Any">Any</SelectItem>
                                        <SelectItem value="AWS">AWS</SelectItem>
                                        <SelectItem value="Azure">Azure</SelectItem>
                                        <SelectItem value="GCP">GCP</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="billing_model"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Billing Model</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                            <SelectValue placeholder="Select billing model" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white border-gray-300">
                                        <SelectItem value="OnDemand">On Demand</SelectItem>
                                        <SelectItem value="Reserved">Reserved</SelectItem>
                                        <SelectItem value="Spot">Spot</SelectItem>
                                        <SelectItem value="Preemptible">Preemptible</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Duration</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white border-gray-300">
                                        {durations.map((duration) => (
                                            <SelectItem key={duration.value} value={duration.value}>
                                                {duration.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="usage"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Usage Pattern</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                            <SelectValue placeholder="Select usage pattern" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white border-gray-300">
                                        {usagePatterns.map((usage) => (
                                            <SelectItem key={usage.value} value={usage.value}>
                                                {usage.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="budget_limit"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-gray-700">Budget Limit (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                                        placeholder="Monthly budget in USD"
                                        className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading || !form.formState.isValid}
                >
                    {isLoading ? (
                        <>
                            <Brain className="mr-2 h-4 w-4 animate-pulse" />
                            AI is analyzing...
                        </>
                    ) : (
                        "Get AI Recommendations"
                    )}
                </Button>
            </form>
        </Form>
    )
}
