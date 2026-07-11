import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProject } from "@/lib/data";
import ProjectDetail from "./ProjectDetail";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <Link
          href="/#portfolio"
          className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md border border-white/10 rounded-full text-sm text-muted hover:text-orange hover:border-orange/30 transition-all"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
      <ProjectDetail project={project} />
    </div>
  );
}
