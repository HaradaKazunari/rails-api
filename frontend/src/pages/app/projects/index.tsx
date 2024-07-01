import { Card } from "@/components/Elements";
import { ContentLayout } from "@/components/Layout";

import { ProjectsList, useProjectFilter } from "@/features/projects";

export const Projects = () => {
  const { FilterForm, filterTerms } = useProjectFilter();
  return (
    <ContentLayout title="案件一覧">
      <Card className="mt-4">
        <div className="text-xl text-gray-800 mb-6">検索条件</div>
        <FilterForm />
      </Card>
      <div className="mt-4">
        <ProjectsList filterTerms={filterTerms} />
      </div>
    </ContentLayout>
  );
};

export default Projects;
