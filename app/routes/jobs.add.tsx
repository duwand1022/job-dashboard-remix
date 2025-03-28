// app/routes/jobs.add.tsx
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { db } from "~/db";
// import type { ActionArgs } from "@remix-run/node";

export async function action({ request }) {
  const formData = await request.formData();
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

  if (!jobData.title || !jobData.description) {
    return json({ error: "Title and description are required" }, { status: 400 });
  }

  await db.job.create(jobData);
  return redirect("/");
}

export default function AddJob() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const techStackOptions = [
    "React", "TypeScript", "Node.js", "Python", "Java",
    "Docker", "AWS", "PostgreSQL", "MongoDB", "Remix"
  ];

  return (
    <div className="add-job">
      <h1>Add New Job</h1>
      <Form method="post">
        <input type="hidden" name="intent" value="create" />

        <div>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
          />
        </div>

        <div className="salary-range">
          <label>Salary Range</label>
          <div>
            <input
              type="number"
              name="salaryMin"
              placeholder="Min"
              required
            />
            <span>to</span>
            <input
              type="number"
              name="salaryMax"
              placeholder="Max"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="region">Region</label>
          <select id="region" name="region" required>
            <option value="">Select a region</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="South America">South America</option>
            <option value="Africa">Africa</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        <div className="tech-stack">
          <label>Tech Stack</label>
          <div className="tech-options">
            {techStackOptions.map(tech => (
              <label key={tech}>
                <input
                  type="checkbox"
                  name="techStack"
                  value={tech}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        {actionData?.error && <p className="error">{actionData.error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Job"}
        </button>
      </Form>
    </div>
  );
}