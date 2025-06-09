import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

export const sidebar_defination = {
    user: {
        name: "Sauradip Ghosh",
        email: "sauradip96ghosh@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Sauradip AWS",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Sauradip GCP",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Sauradip Azure",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Network",
                    url: "#",
                },
                {
                    title: "Public",
                    url: "#",
                },
                {
                    title: "Private",
                    url: "#",
                },
            ],
        },
        {
            title: "Compute",
            url: "/compute",
            icon: Bot,
            items: [
                {
                    title: "EC2",
                    url: "/compute/ec2",
                },
                {
                    title: "ECS",
                    url: "/compute/ecs",
                },
            ],
        },
        {
            title: "Storage",
            url: "/storage",
            icon: BookOpen,
            items: [
                {
                    title: "S3",
                    url: "/storage/s3",
                },
                {
                    title: "EBS",
                    url: "/storage/ebs",
                },
                {
                    title: "DynamoDB",
                    url: "/storage/dynamodb",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Recommendations",
            url: "/recommendation",
            icon: PieChart,
        },
        {
            name: "Cost Calculator",
            url: "/cost-calculator",
            icon: Frame,
        },
        {
            name: "Compare",
            url: "#",
            icon: Map,
        },
    ],
}