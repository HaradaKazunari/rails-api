import { ContentLayout } from "@/components/Layout";
import { UnclaimedProjects } from "@/features/projects";

export const Dashboard = () => {
  return (
    <ContentLayout title="会議スケジュール">
      <div className="mt-6">
        <UnclaimedProjects />
      </div>
    </ContentLayout>
  );
};
export default Dashboard;
