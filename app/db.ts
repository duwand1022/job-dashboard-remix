// app/db.ts
import { Job } from "~/models/Job";

let jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We're looking for an experienced React developer to join our team.",
    salaryRange: [90000, 120000],
    region: "North America",
    techStack: ["React", "TypeScript", "Remix"],
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    title: "Backend Engineer",
    description: "Join our backend team working with Node.js and databases.",
    salaryRange: [80000, 110000],
    region: "Europe",
    techStack: ["Node.js", "PostgreSQL", "Docker"],
    createdAt: new Date("2023-02-20"),
  },
  // Add more mock jobs as needed
  {
    id: "3",
    title: "Full Stack Developer",
    description: "Join our team to work on both frontend and backend systems.",
    salaryRange: [85000, 115000],
    region: "North America",
    techStack: ["React", "Node.js", "MongoDB"],
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "4",
    title: "DevOps Engineer",
    description: "Help us build and maintain our cloud infrastructure.",
    salaryRange: [95000, 130000],
    region: "Europe",
    techStack: ["AWS", "Docker", "Kubernetes"],
    createdAt: new Date("2023-03-05"),
  },
  {
    id: "5",
    title: "Data Scientist",
    description: "Work with large datasets to extract valuable insights.",
    salaryRange: [90000, 125000],
    region: "Asia",
    techStack: ["Python", "TensorFlow", "Pandas"],
    createdAt: new Date("2023-02-28"),
  },
  {
    id: "6",
    title: "Mobile Developer (React Native)",
    description: "Build cross-platform mobile applications for our users.",
    salaryRange: [80000, 110000],
    region: "North America",
    techStack: ["React Native", "TypeScript", "Firebase"],
    createdAt: new Date("2023-02-22"),
  },
  {
    id: "7",
    title: "UX/UI Designer",
    description: "Create beautiful and intuitive user interfaces.",
    salaryRange: [75000, 100000],
    region: "Europe",
    techStack: ["Figma", "Sketch", "Adobe XD"],
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "8",
    title: "QA Automation Engineer",
    description: "Develop automated tests to ensure software quality.",
    salaryRange: [70000, 95000],
    region: "South America",
    techStack: ["Selenium", "Jest", "Cypress"],
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "9",
    title: "Cloud Architect",
    description: "Design and implement cloud solutions for our clients.",
    salaryRange: [120000, 160000],
    region: "North America",
    techStack: ["AWS", "Azure", "Terraform"],
    createdAt: new Date("2023-02-05"),
  },
  {
    id: "10",
    title: "Machine Learning Engineer",
    description: "Develop and deploy machine learning models.",
    salaryRange: [100000, 140000],
    region: "Asia",
    techStack: ["Python", "PyTorch", "Scikit-learn"],
    createdAt: new Date("2023-01-30"),
  },
  {
    id: "11",
    title: "Technical Writer",
    description: "Create documentation for our developer products.",
    salaryRange: [60000, 85000],
    region: "Australia",
    techStack: ["Markdown", "Git", "Swagger"],
    createdAt: new Date("2023-01-25"),
  },
  {
    id: "12",
    title: "Product Manager",
    description: "Lead product development from conception to launch.",
    salaryRange: [95000, 135000],
    region: "North America",
    techStack: ["Agile", "JIRA", "Scrum"],
    createdAt: new Date("2023-01-20"),
  },
  {
    id: "13",
    title: "Security Engineer",
    description: "Protect our systems from security threats.",
    salaryRange: [110000, 150000],
    region: "Europe",
    techStack: ["OWASP", "Penetration Testing", "SIEM"],
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "14",
    title: "Blockchain Developer",
    description: "Build decentralized applications on Ethereum.",
    salaryRange: [100000, 145000],
    region: "North America",
    techStack: ["Solidity", "Web3.js", "Ethereum"],
    createdAt: new Date("2023-01-10"),
  },
  {
    id: "15",
    title: "Site Reliability Engineer",
    description: "Ensure our systems are reliable and scalable.",
    salaryRange: [105000, 140000],
    region: "Asia",
    techStack: ["Prometheus", "Grafana", "Kubernetes"],
    createdAt: new Date("2023-01-05"),
  },
  {
    id: "16",
    title: "Frontend Developer (Vue.js)",
    description: "Build user interfaces with Vue.js framework.",
    salaryRange: [80000, 110000],
    region: "Europe",
    techStack: ["Vue.js", "JavaScript", "CSS"],
    createdAt: new Date("2022-12-20"),
  },
  {
    id: "17",
    title: "Database Administrator",
    description: "Manage and optimize our database systems.",
    salaryRange: [85000, 120000],
    region: "North America",
    techStack: ["PostgreSQL", "MySQL", "MongoDB"],
    createdAt: new Date("2022-12-15"),
  },
  {
    id: "18",
    title: "Game Developer",
    description: "Create interactive gaming experiences.",
    salaryRange: [70000, 100000],
    region: "South America",
    techStack: ["Unity", "C#", "3D Modeling"],
    createdAt: new Date("2022-12-10"),
  },
  {
    id: "19",
    title: "AI Research Scientist",
    description: "Conduct cutting-edge AI research.",
    salaryRange: [120000, 160000],
    region: "North America",
    techStack: ["Python", "TensorFlow", "Research"],
    createdAt: new Date("2022-12-05"),
  },
  {
    id: "20",
    title: "Technical Support Engineer",
    description: "Help customers with technical issues.",
    salaryRange: [60000, 85000],
    region: "Africa",
    techStack: ["Troubleshooting", "Linux", "Networking"],
    createdAt: new Date("2022-11-30"),
  },
  {
    id: "21",
    title: "iOS Developer",
    description: "Build native iOS applications.",
    salaryRange: [90000, 125000],
    region: "North America",
    techStack: ["Swift", "UIKit", "Xcode"],
    createdAt: new Date("2022-11-25"),
  },
  {
    id: "22",
    title: "Android Developer",
    description: "Develop Android applications for our platform.",
    salaryRange: [85000, 120000],
    region: "Europe",
    techStack: ["Kotlin", "Android SDK", "Jetpack"],
    createdAt: new Date("2022-11-20"),
  },
];

export const db = {
  job: {
    findMany: async (options?: {
      skip?: number;
      take?: number;
      where?: Partial<Job>;
      orderBy?: { [key in keyof Job]?: "asc" | "desc" };
    }) => {
      let result = [...jobs];

      // Filtering
      if (options?.where) {
        for (const [key, value] of Object.entries(options.where)) {
          if (value !== undefined) {
            if (key === "techStack" && Array.isArray(value)) {
              result = result.filter((job) =>
                value.every((tech) => job.techStack.includes(tech))
              );
            } else {
              result = result.filter((job) =>
                String(job[key as keyof Job])
                  .toLowerCase()
                  .includes(String(value).toLowerCase())
              );
            }
          }
        }
      }

      // Sorting
      if (options?.orderBy) {
        const [key, direction] = Object.entries(options.orderBy)[0];
        result.sort((a, b) => {
          if (a[key as keyof Job] < b[key as keyof Job])
            return direction === "asc" ? -1 : 1;
          if (a[key as keyof Job] > b[key as keyof Job])
            return direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      // Pagination
      const skip = options?.skip || 0;
      const take = options?.take || 10;
      const paginatedResult = result.slice(skip, skip + take);

      return {
        jobs: paginatedResult,
        total: result.length,
      };
    },
    create: async (data: Omit<Job, "id" | "createdAt">) => {
      const newJob: Job = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date(),
      };
      jobs.push(newJob);
      return newJob;
    },
    update: async (id: string, data: Partial<Job>) => {
      const index = jobs.findIndex((job) => job.id === id);
      if (index === -1) throw new Error("Job not found");
      jobs[index] = { ...jobs[index], ...data };
      return jobs[index];
    },
    delete: async (id: string) => {
      jobs = jobs.filter((job) => job.id !== id);
      return true;
    },
    findUnique: async (id: string) => {
      return jobs.find((job) => job.id === id);
    },
  },
};
