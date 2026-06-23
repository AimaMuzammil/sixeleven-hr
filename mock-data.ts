export type Role = "admin" | "hr" | "employee";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  position: string;
  avatar: string;
  phone: string;
  joinedAt: string;
  status: "active" | "on-leave" | "inactive";
  salary: number;
  location: string;
}

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=2563eb,1d4ed8,3b82f6,60a5fa&textColor=ffffff`;

export const employees: Employee[] = [
  { id: "E-1001", name: "Amelia Carter", email: "amelia@sixeleven.com", role: "admin", department: "Executive", position: "Chief People Officer", avatar: avatarFor("Amelia Carter"), phone: "+1 415 555 0101", joinedAt: "2019-03-12", status: "active", salary: 184000, location: "San Francisco" },
  { id: "E-1002", name: "Jordan Reyes", email: "jordan@sixeleven.com", role: "hr", department: "Human Resources", position: "HR Manager", avatar: avatarFor("Jordan Reyes"), phone: "+1 415 555 0142", joinedAt: "2020-07-22", status: "active", salary: 96000, location: "San Francisco" },
  { id: "E-1003", name: "Priya Sharma", email: "priya@sixeleven.com", role: "employee", department: "Engineering", position: "Senior Software Engineer", avatar: avatarFor("Priya Sharma"), phone: "+1 415 555 0188", joinedAt: "2021-02-01", status: "active", salary: 142000, location: "Remote" },
  { id: "E-1004", name: "Marcus Lee", email: "marcus@sixeleven.com", role: "employee", department: "Engineering", position: "Frontend Engineer", avatar: avatarFor("Marcus Lee"), phone: "+1 415 555 0117", joinedAt: "2022-09-15", status: "active", salary: 118000, location: "New York" },
  { id: "E-1005", name: "Sofia Russo", email: "sofia@sixeleven.com", role: "employee", department: "Design", position: "Product Designer", avatar: avatarFor("Sofia Russo"), phone: "+1 415 555 0153", joinedAt: "2022-01-10", status: "on-leave", salary: 112000, location: "Remote" },
  { id: "E-1006", name: "Daniel Kim", email: "daniel@sixeleven.com", role: "employee", department: "Sales", position: "Account Executive", avatar: avatarFor("Daniel Kim"), phone: "+1 415 555 0124", joinedAt: "2023-04-19", status: "active", salary: 92000, location: "Austin" },
  { id: "E-1007", name: "Hannah Brooks", email: "hannah@sixeleven.com", role: "employee", department: "Marketing", position: "Growth Marketer", avatar: avatarFor("Hannah Brooks"), phone: "+1 415 555 0165", joinedAt: "2023-08-03", status: "active", salary: 88000, location: "Chicago" },
  { id: "E-1008", name: "Noah Patel", email: "noah@sixeleven.com", role: "employee", department: "Finance", position: "Financial Analyst", avatar: avatarFor("Noah Patel"), phone: "+1 415 555 0199", joinedAt: "2021-11-30", status: "active", salary: 95000, location: "Boston" },
  { id: "E-1009", name: "Elena Rossi", email: "elena@sixeleven.com", role: "hr", department: "Human Resources", position: "Talent Partner", avatar: avatarFor("Elena Rossi"), phone: "+1 415 555 0173", joinedAt: "2020-05-18", status: "active", salary: 84000, location: "Remote" },
  { id: "E-1010", name: "Tomás García", email: "tomas@sixeleven.com", role: "employee", department: "Engineering", position: "DevOps Engineer", avatar: avatarFor("Tomas Garcia"), phone: "+1 415 555 0190", joinedAt: "2022-06-07", status: "active", salary: 128000, location: "Madrid" },
  { id: "E-1011", name: "Aisha Khan", email: "aisha@sixeleven.com", role: "employee", department: "Customer Success", position: "CS Lead", avatar: avatarFor("Aisha Khan"), phone: "+1 415 555 0182", joinedAt: "2021-09-21", status: "active", salary: 102000, location: "Dubai" },
  { id: "E-1012", name: "Liam O'Connor", email: "liam@sixeleven.com", role: "employee", department: "Engineering", position: "Backend Engineer", avatar: avatarFor("Liam OConnor"), phone: "+1 415 555 0136", joinedAt: "2023-01-09", status: "inactive", salary: 121000, location: "Dublin" },
];

export const departments = ["Executive", "Human Resources", "Engineering", "Design", "Sales", "Marketing", "Finance", "Customer Success"];

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "late" | "absent" | "leave";
  hours: number;
}

export const attendance: AttendanceRecord[] = employees.flatMap((e, i) =>
  Array.from({ length: 5 }).map((_, d) => {
    const date = new Date();
    date.setDate(date.getDate() - d);
    const status: AttendanceRecord["status"] = e.status === "on-leave" && d < 2 ? "leave" : i % 7 === d ? "late" : "present";
    return {
      id: `${e.id}-${d}`,
      employeeId: e.id,
      date: date.toISOString().slice(0, 10),
      checkIn: status === "leave" ? "—" : status === "late" ? "09:42" : "08:58",
      checkOut: status === "leave" ? "—" : "18:05",
      status,
      hours: status === "leave" ? 0 : status === "late" ? 7.5 : 9.1,
    };
  })
);

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: "Annual" | "Sick" | "Personal" | "Maternity" | "Unpaid";
  from: string;
  to: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export const leaveRequests: LeaveRequest[] = [
  { id: "LV-2041", employeeId: "E-1005", type: "Maternity", from: "2026-06-01", to: "2026-09-01", days: 92, reason: "Maternity leave", status: "approved" },
  { id: "LV-2042", employeeId: "E-1004", type: "Annual", from: "2026-07-04", to: "2026-07-11", days: 7, reason: "Family vacation in Italy", status: "pending" },
  { id: "LV-2043", employeeId: "E-1007", type: "Sick", from: "2026-06-22", to: "2026-06-23", days: 2, reason: "Flu recovery", status: "approved" },
  { id: "LV-2044", employeeId: "E-1010", type: "Personal", from: "2026-06-28", to: "2026-06-29", days: 2, reason: "Wedding ceremony", status: "pending" },
  { id: "LV-2045", employeeId: "E-1006", type: "Annual", from: "2026-08-12", to: "2026-08-19", days: 7, reason: "Summer break", status: "pending" },
  { id: "LV-2046", employeeId: "E-1011", type: "Sick", from: "2026-06-19", to: "2026-06-20", days: 2, reason: "Migraine", status: "rejected" },
];

export interface Activity {
  id: string;
  actor: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
}

export const activities: Activity[] = [
  { id: "1", actor: "Jordan Reyes", avatar: avatarFor("Jordan Reyes"), action: "approved leave for", target: "Hannah Brooks", time: "12 min ago" },
  { id: "2", actor: "Amelia Carter", avatar: avatarFor("Amelia Carter"), action: "posted announcement", target: "Q3 Town Hall", time: "1 hour ago" },
  { id: "3", actor: "Elena Rossi", avatar: avatarFor("Elena Rossi"), action: "scheduled interview with", target: "Olivia Martins", time: "2 hours ago" },
  { id: "4", actor: "Priya Sharma", avatar: avatarFor("Priya Sharma"), action: "submitted timesheet for", target: "week 25", time: "4 hours ago" },
  { id: "5", actor: "Jordan Reyes", avatar: avatarFor("Jordan Reyes"), action: "onboarded", target: "Noah Patel", time: "Yesterday" },
];

export const notifications = [
  { id: "n1", title: "Payroll cycle closes Friday", body: "Approve outstanding timesheets before 5 pm.", time: "10 min", unread: true, type: "warning" as const },
  { id: "n2", title: "3 new leave requests", body: "Pending your approval in the Leave queue.", time: "1 h", unread: true, type: "info" as const },
  { id: "n3", title: "Marcus completed onboarding", body: "All onboarding tasks marked complete.", time: "3 h", unread: false, type: "success" as const },
  { id: "n4", title: "Interview with Olivia at 4 pm", body: "Senior Product Designer · Zoom link attached.", time: "Today", unread: false, type: "info" as const },
];

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  applicants: number;
  posted: string;
  status: "open" | "closed" | "draft";
}

export const jobListings: JobListing[] = [
  { id: "J-301", title: "Senior Product Designer", department: "Design", location: "Remote", type: "Full-time", applicants: 48, posted: "2026-06-02", status: "open" },
  { id: "J-302", title: "Staff Backend Engineer", department: "Engineering", location: "San Francisco", type: "Full-time", applicants: 73, posted: "2026-05-21", status: "open" },
  { id: "J-303", title: "People Operations Specialist", department: "Human Resources", location: "Remote", type: "Full-time", applicants: 22, posted: "2026-06-10", status: "open" },
  { id: "J-304", title: "Account Executive — EMEA", department: "Sales", location: "London", type: "Full-time", applicants: 31, posted: "2026-05-30", status: "open" },
  { id: "J-305", title: "Content Marketing Manager", department: "Marketing", location: "New York", type: "Full-time", applicants: 19, posted: "2026-06-14", status: "draft" },
];

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected";
  appliedAt: string;
  avatar: string;
  rating: number;
}

export const candidates: Candidate[] = [
  { id: "C-501", name: "Olivia Martins", role: "Senior Product Designer", stage: "Interview", appliedAt: "2026-06-08", avatar: avatarFor("Olivia Martins"), rating: 4.5 },
  { id: "C-502", name: "Ethan Wright", role: "Staff Backend Engineer", stage: "Offer", appliedAt: "2026-05-25", avatar: avatarFor("Ethan Wright"), rating: 4.8 },
  { id: "C-503", name: "Maya Singh", role: "People Operations Specialist", stage: "Screening", appliedAt: "2026-06-15", avatar: avatarFor("Maya Singh"), rating: 4.2 },
  { id: "C-504", name: "Diego Alvarez", role: "Account Executive — EMEA", stage: "Applied", appliedAt: "2026-06-19", avatar: avatarFor("Diego Alvarez"), rating: 3.9 },
  { id: "C-505", name: "Ruby Chen", role: "Staff Backend Engineer", stage: "Interview", appliedAt: "2026-06-04", avatar: avatarFor("Ruby Chen"), rating: 4.6 },
  { id: "C-506", name: "Karim Hassan", role: "Senior Product Designer", stage: "Rejected", appliedAt: "2026-05-30", avatar: avatarFor("Karim Hassan"), rating: 3.4 },
];

export interface Payslip {
  id: string;
  employeeId: string;
  period: string;
  gross: number;
  tax: number;
  net: number;
  status: "paid" | "processing" | "pending";
}

export const payslips: Payslip[] = employees.slice(0, 10).map((e, i) => ({
  id: `PS-${2400 + i}`,
  employeeId: e.id,
  period: "June 2026",
  gross: Math.round(e.salary / 12),
  tax: Math.round((e.salary / 12) * 0.22),
  net: Math.round((e.salary / 12) * 0.78),
  status: i < 7 ? "paid" : i < 9 ? "processing" : "pending",
}));

export interface Review {
  id: string;
  employeeId: string;
  period: string;
  score: number;
  kpis: { label: string; value: number }[];
  reviewer: string;
  status: "completed" | "in-progress" | "scheduled";
}

export const reviews: Review[] = [
  { id: "R-701", employeeId: "E-1003", period: "H1 2026", score: 4.6, reviewer: "Amelia Carter", status: "completed", kpis: [{ label: "Delivery", value: 92 }, { label: "Collaboration", value: 88 }, { label: "Impact", value: 95 }] },
  { id: "R-702", employeeId: "E-1004", period: "H1 2026", score: 4.2, reviewer: "Priya Sharma", status: "completed", kpis: [{ label: "Delivery", value: 84 }, { label: "Collaboration", value: 90 }, { label: "Impact", value: 80 }] },
  { id: "R-703", employeeId: "E-1006", period: "H1 2026", score: 3.9, reviewer: "Amelia Carter", status: "in-progress", kpis: [{ label: "Quota", value: 76 }, { label: "Pipeline", value: 82 }, { label: "Retention", value: 88 }] },
  { id: "R-704", employeeId: "E-1010", period: "H1 2026", score: 4.4, reviewer: "Priya Sharma", status: "in-progress", kpis: [{ label: "Reliability", value: 96 }, { label: "Incidents", value: 89 }, { label: "Automation", value: 91 }] },
  { id: "R-705", employeeId: "E-1007", period: "H1 2026", score: 0, reviewer: "Jordan Reyes", status: "scheduled", kpis: [] },
];

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  tag: "company" | "policy" | "event";
}

export const announcements: Announcement[] = [
  { id: "A-1", title: "Q3 Town Hall — July 12", body: "Join us for the quarterly company-wide update covering strategy, roadmap and people initiatives.", author: "Amelia Carter", date: "2026-06-20", tag: "event" },
  { id: "A-2", title: "Updated remote work policy", body: "Effective July 1st, eligible roles can opt into our new hybrid-flex schedule. Read the full policy in the handbook.", author: "Jordan Reyes", date: "2026-06-18", tag: "policy" },
  { id: "A-3", title: "Summer wellness program", body: "Free monthly wellness stipend, on-site yoga and a partnership with Headspace launches this week.", author: "Elena Rossi", date: "2026-06-15", tag: "company" },
  { id: "A-4", title: "Engineering hack-week", body: "Sign up for the cross-team hackathon from July 22–26. Prizes for the top three projects.", author: "Priya Sharma", date: "2026-06-12", tag: "event" },
];

export const headcountByDept = departments.map((d) => ({
  department: d.length > 10 ? d.slice(0, 9) + "…" : d,
  count: employees.filter((e) => e.department === d).length + Math.floor(Math.random() * 8) + 2,
}));

export const attendanceTrend = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    present: 88 + Math.round(Math.random() * 8),
    late: 4 + Math.round(Math.random() * 6),
    absent: 2 + Math.round(Math.random() * 4),
  };
});

export const leaveBreakdown = [
  { name: "Annual", value: 42, color: "oklch(0.55 0.18 255)" },
  { name: "Sick", value: 18, color: "oklch(0.7 0.16 35)" },
  { name: "Personal", value: 12, color: "oklch(0.68 0.16 150)" },
  { name: "Maternity", value: 6, color: "oklch(0.7 0.15 320)" },
  { name: "Unpaid", value: 4, color: "oklch(0.6 0.05 250)" },
];

export const payrollTrend = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => ({
  month: m,
  payroll: 410 + i * 12 + Math.round(Math.random() * 14),
  bonus: 30 + Math.round(Math.random() * 20),
}));

export function getEmployee(id: string) {
  return employees.find((e) => e.id === id);
}
