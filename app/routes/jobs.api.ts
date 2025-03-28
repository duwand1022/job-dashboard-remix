// app/routes/jobs.api.ts
import { json } from "@remix-run/node";
import { db } from "~/db";
import type { Job } from "~/models/Job";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const skip = parseInt(url.searchParams.get("skip") || "0");
  const take = parseInt(url.searchParams.get("take") || "10");

  const filters = {
    title: url.searchParams.get("title") || undefined,
    region: url.searchParams.get("region") || undefined,
    techStack: url.searchParams.getAll("techStack") || undefined,
  };

  const orderBy = url.searchParams.get("orderBy")
    ? {
        [url.searchParams.get("orderBy")!]:
          url.searchParams.get("order") || "asc",
      }
    : undefined;

  const result = await db.job.findMany({
    skip,
    take,
    where: filters,
    orderBy,
  });

  return json(result);
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create") {
    const jobData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      salaryRange: [
        parseInt(formData.get("salaryMin") as string),
        parseInt(formData.get("salaryMax") as string),
      ] as [number, number],
      region: formData.get("region") as string,
      techStack: formData.getAll("techStack") as string[],
    };

    const newJob = await db.job.create(jobData);
    return json(newJob, { status: 201 });
  }

  if (intent === "update") {
    const id = formData.get("id") as string;
    const jobData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      salaryRange: [
        parseInt(formData.get("salaryMin") as string),
        parseInt(formData.get("salaryMax") as string),
      ] as [number, number],
      region: formData.get("region") as string,
      techStack: formData.getAll("techStack") as string[],
    };

    const updatedJob = await db.job.update(id, jobData);
    return json(updatedJob);
  }

  if (intent === "delete") {
    const id = formData.get("id") as string;
    await db.job.delete(id);
    return json({ success: true });
  }

  return json({ error: "Invalid intent" }, { status: 400 });
};
