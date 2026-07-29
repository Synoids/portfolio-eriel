import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import CaseStudyGlobalNav from "@/components/case-study/CaseStudyGlobalNav";
import ReadingProgress from "@/components/ui/ReadingProgress";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

// Generates static paths for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<import("next").Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} - Case Study`;
  const description = project.summary ? project.summary.en : project.description.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://portfolio-eril.vercel.app/projects/${project.slug}`,
      images: [
        {
          url: project.heroImage || project.image || "/api/og",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.heroImage || project.image || "/api/og"],
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    }
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <CaseStudyGlobalNav currentSlug={project.slug} />
      <main className="min-h-screen bg-background text-foreground pb-20 pt-10 selection:bg-primary-500/30">
        <CaseStudyContent project={project} />
      </main>
      <Footer />
    </>
  );
}
