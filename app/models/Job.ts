// app/models/Job.ts
export type Job = {
  id: string;
  title: string;
  description: string;
  salaryRange: [number, number];
  region: string;
  techStack: string[];
  createdAt: Date;
};
