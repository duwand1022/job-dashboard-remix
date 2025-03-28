// app/routes/_index.tsx
import { json } from "@remix-run/node";
import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import { db } from "~/db";
import type { Job } from "~/models/Job";
import { useState, useEffect } from "react";

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
    ? { [url.searchParams.get("orderBy")!]: url.searchParams.get("order") || "asc" }
    : undefined;

  const result = await db.job.findMany({
    skip,
    take,
    where: filters,
    orderBy,
  });

  // Get all unique values for filters
  const allRegions = Array.from(new Set((await db.job.findMany()).jobs.map(job => job.region)));
  const allTechStack = Array.from(new Set((await db.job.findMany()).jobs.flatMap(job => job.techStack)));

  return json({
    jobs: result.jobs,
    total: result.total,
    allRegions,
    allTechStack,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(result.total / take),
  });
};

export default function Dashboard() {
  const { jobs, total, allRegions, allTechStack, currentPage, totalPages } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    title: searchParams.get("title") || "",
    region: searchParams.get("region") || "",
    techStack: searchParams.getAll("techStack") || [],
  });
  const [sort, setSort] = useState({
    field: searchParams.get("orderBy") || "createdAt",
    direction: searchParams.get("order") || "desc",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (tech: string) => {
    setFilters(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleSortChange = (field: string) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.title) params.set("title", filters.title);
    if (filters.region) params.set("region", filters.region);
    filters.techStack.forEach(tech => params.append("techStack", tech));

    params.set("orderBy", sort.field);
    params.set("order", sort.direction);

    setSearchParams(params);
  }, [filters, sort, setSearchParams]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("skip", ((page - 1) * 10).toString());
    setSearchParams(params);
  };

  return (
    <div className="dashboard">
      <h1>Job Dashboard</h1>
      <div className="controls">
        <Link to="/jobs/add" className="add-job-button">
          Add New Job
        </Link>

        <div className="filters">
          <input
            type="text"
            name="title"
            placeholder="Filter by title"
            value={filters.title}
            onChange={handleFilterChange}
          />

          <select
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
          >
            <option value="">All Regions</option>
            {allRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <div className="tech-stack-filter">
            <label>Tech Stack:</label>
            {allTechStack.map(tech => (
              <label key={tech}>
                <input
                  type="checkbox"
                  checked={filters.techStack.includes(tech)}
                  onChange={() => handleTechStackChange(tech)}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="job-list">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSortChange("title")}>
                Title {sort.field === "title" && (sort.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Description</th>
              <th onClick={() => handleSortChange("salaryRange")}>
                Salary {sort.field === "salaryRange" && (sort.direction === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSortChange("region")}>
                Region {sort.field === "region" && (sort.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Tech Stack</th>
              <th onClick={() => handleSortChange("createdAt")}>
                Posted {sort.field === "createdAt" && (sort.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>${job.salaryRange[0]} - ${job.salaryRange[1]}</td>
                <td>{job.region}</td>
                <td>
                  <div className="tech-stack">
                    {job.techStack.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/jobs/${job.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {jobs.length === 0 && <p>No jobs found matching your criteria.</p>}

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <div className="total-jobs">Total jobs: {total}</div>
      </div>
    </div>
  );
}