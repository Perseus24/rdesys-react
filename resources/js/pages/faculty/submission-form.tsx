import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, NavItem } from "@/types";
import { Head } from "@inertiajs/react";
import clsx from "clsx";
import { LayoutDashboard, SquareLibrary } from "lucide-react";
import { useEffect, useState } from "react";

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: 'dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Submission Form',
        href: 'submission-form',
        icon: SquareLibrary,
        isActive: true,
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Submission Form',
        url: 'submission-form',
    },
]
export default function SubmissionForm() {
    const [step, setStep] = useState(1);

    const [submissionLevel, setSubmissionLevel] = useState([
        {
            title: "Program",
            isActive: true,
        },
        {
            title: "Project",
            isActive: false,

        },
        {
            title: "Study",
            isActive: false,
        },
    ])
    // Function to update the chosen submission level
    const updateSubmissionLevel = (index: number) => {
        const newSubmissionLevel = [...submissionLevel];
        newSubmissionLevel.forEach((item, i) => {
            if (i === index) {
                item.isActive = true;
            } else {
                item.isActive = false;
            }
        });
        setSubmissionLevel(newSubmissionLevel);
    }

    const [targetImplementationDate, setTargetImplementationDate] = useState<any[]>([]);
    const [tentativeDuration, setTentativeDuration] = useState<any[]>([]);

    useEffect(() => {
        const newDates = [];
        const newDurations = [];
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        for (let i = 0; i <= 5; i++) {
            newDates.push(
                {
                    title: `January ${year + i}`,
                    isActive: false,
                });
            newDates.push(
                {
                    title: `August ${year + i}`,
                    isActive: false,
                });
            
            if (i == 0) {
                newDurations.push(
                    {
                        title: `1 semester`,
                        isActive: false,
                    });
            } else if (i == 5) {
                newDurations.push(
                    {
                        title: `6 or more semesters`,
                        isActive: false,
                    });
            } else {
                newDurations.push(
                    {
                        title: `${i + 1} semesters`,
                        isActive: false,
                    });
            }
            
        }
        setTentativeDuration(newDurations);
        setTargetImplementationDate(newDates); 
    }, []);

    console.log(targetImplementationDate)
    
    return (
        <AppLayout navItems={navItems} breadcrumbs={breadcrumbs}>
            <Head title="Submission Form" />

            <div className="flex border border-gray-200 rounded-xl m-4 text-xs">
                <div className="flex flex-col w-3/4 p-8 ">
                    <div className="flex justify-between mb-6">
                        <p className="text-base font-semibold text-cyan-500">Research Information</p>
                        <p className="text-red-500">* Indicates required question</p>
                    </div>
                        {
                            step === 1 && (
                                <div className="flex flex-col gap-7">
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="title">Proposal Submission Title <span className="text-red-500">*</span></Label>
                                        <textarea rows={6} className="border border-gray-200 rounded-md block p-2.5 mt-2 text-sm bg-gray-50 text-gray-900 focus:outline-none  focus:ring-cyan-500 focus:border-cyan-500" placeholder="Type here your complete title..." />
                                    </div>
                                    <div className="flex w-full gap-5">
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <Label htmlFor="num-studies">Number of Studies <span className="text-red-500">*</span></Label>
                                            <Input type="number" className="border border-gray-200 rounded-md block p-2.5 mt-2 text-sm bg-gray-50 text-gray-900 focus:outline-none  focus:ring-cyan-500 focus:border-cyan-500" min={1} max={40} />
                                        </div>
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <Label htmlFor="num-studies">Level of Submission <span className="text-red-500">*</span></Label>
                                            <div className="flex flex-wrap gap-2 mt-2 text-sm">
                                                {
                                                    submissionLevel.map((level, index) => (
                                                        <div key={index} className={clsx(
                                                            "px-5 py-2 rounded-md cursor-pointer",
                                                            level.isActive ? "bg-cyan-500 text-white" : "border border-cyan-500 text-cyan-500"
                                                        )} onClick={() => updateSubmissionLevel(index)}
                                                        >
                                                            {level.title}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full gap-5">
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <Label htmlFor="target-implementation-date" className="mb-2">Target Start of Implementation <span className="text-red-500">*</span></Label>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select a date" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        targetImplementationDate.map((date, index) => (
                                                            <SelectItem key={index} value={date.title}>{date.title}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <Label htmlFor="tentative-duration" className="mb-2">Tentative Duration <span className="text-red-500">*</span></Label>
                                            <Select>
                                                <SelectTrigger className="w-[220px]">
                                                    <SelectValue placeholder="Choose semesters" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        tentativeDuration.map((duration, index) => (
                                                            <SelectItem key={index} value={duration.title}>{duration.title}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                </div>
                <div className="flex flex-col w-1/4 bg-cyan-500 rounded-r-xl py-8 px-6 text-white">
                    <p className="text-xl font-semibold">Step {step}</p>
                    <p className="mt-3">Enter the details of your research proposal.</p>
                </div>
            </div>
        </AppLayout>
    );
}