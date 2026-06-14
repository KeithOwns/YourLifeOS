// data.js - Data for YourLifeOS Template

const YourLifeOSData = {
    // User Profile
    profile: {
        name: "Alex Carter",
        role: "Product Manager | Tech Lead",
        avatarInitials: "AC"
    },
    
    // Active Projects & Tasks
    projects: [
        {
            id: "job-1",
            title: "Q3 Strategy Planning",
            client: "Internal",
            status: "open", // active, pending, blocked, completed
            nextAction: "Finalize Executive Summary",
            date: "June 9",
            priority: "high", // high, normal
            category: "open", // open, submitted, secondary, backup, closed
            description: "Critical Q3 objective. Requires coordination with VP of Sales and Marketing.",
            url: "https://docs.google.com/document/d/..."
        },
        {
            id: "job-2",
            title: "Website Redesign",
            client: "Marketing Dept",
            status: "open",
            nextAction: "Approve Mockups",
            date: "June 9",
            priority: "normal",
            category: "open"
        },
        {
            id: "job-3",
            title: "Cloud Migration",
            client: "IT Infrastructure",
            status: "submitted",
            nextAction: "Awaiting DevOps Provisioning",
            date: "June 10",
            priority: "normal",
            category: "submitted"
        },
        {
            id: "job-4",
            title: "Vendor Selection",
            client: "Operations",
            status: "submitted",
            nextAction: "Review Vendor Proposals",
            date: "June 9",
            priority: "normal",
            category: "submitted"
        },
        {
            id: "job-5",
            title: "Security Audit",
            client: "Compliance Team",
            status: "submitted",
            nextAction: "Schedule Audit Review",
            date: "June 11",
            priority: "normal",
            category: "secondary"
        },
        {
            id: "job-6",
            title: "New Product Launch",
            client: "Product Team",
            status: "submitted",
            nextAction: "Draft Product PRD",
            date: "June 12",
            priority: "normal",
            category: "backup"
        },
        {
            id: "job-7",
            title: "Legacy System Deprecation",
            client: "IT Dept",
            status: "passed_over",
            nextAction: "Archive - Budget Cut",
            date: "May 22",
            priority: "normal",
            category: "closed"
        }
    ],

    // Events & Networking
    events: [
        {
            id: "event-1",
            name: "Local Tech Meetup",
            date: "June 10",
            time: "6:00 PM",
            location: "Downtown Hub",
            status: "upcoming" // upcoming, past
        },
        {
            id: "event-2",
            name: "Global Developer Conference",
            date: "July 15",
            time: "9:00 AM",
            location: "Virtual",
            status: "upcoming"
        }
    ],

    // Habit Tracking
    habits: [
        { id: "habit-1", name: "Deep Work (2 hrs)", category: "Morning Routine" },
        { id: "habit-2", name: "Fitness / Gym", category: "Afternoon Routine" },
        { id: "habit-3", name: "Read 20 pages", category: "Evening Routine" }
    ]
};

// Make it available globally
window.YourLifeOSData = YourLifeOSData;
