// app/routes/jobs.$id.tsx
import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { db } from "~/db";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }) {
  const job = await db.job.findUnique(params.id!);
  if (!job) throw new Response("Not Found", { status: 404 });
  return json({ job });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "update") {
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

    await db.job.update(params.id!, jobData);
    return redirect("/");
  }

  if (intent === "delete") {
    await db.job.delete(params.id!);
    return redirect("/");
  }

  return json({ error: "Invalid intent" }, { status: 400 });
}

export default function JobDetail() {
  const { job } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const techStackOptions = [
    "React", "TypeScript", "Node.js", "Python", "Java",
    "Docker", "AWS", "PostgreSQL", "MongoDB", "Remix"
  ];

  return (
    <div className="job-detail">
      <h1>Edit Job</h1>
      <Form method="post">
        <input type="hidden" name="intent" value="update" />

        <div>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={job.title}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={job.description}
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
              defaultValue={job.salaryRange[0]}
              required
            />
            <span>to</span>
            <input
              type="number"
              name="salaryMax"
              placeholder="Max"
              defaultValue={job.salaryRange[1]}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="region"
            defaultValue={job.region}
            required
          >
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
                  defaultChecked={job.techStack.includes(tech)}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        {actionData?.error && <p className="error">{actionData.error}</p>}

        <div className="actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <Form method="post">
            <input type="hidden" name="intent" value="delete" />
            <button type="submit" className="delete" disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete Job"}
            </button>
          </Form>
        </div>
      </Form>
    </div>
  );
}