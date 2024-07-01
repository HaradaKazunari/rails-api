import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { Card, Spinner } from "@/components/Elements";
import { ContentLayout } from "@/components/Layout";

import { DeleteProject, useProject, UpdateProject } from "@/features/projects";
import { UpdateEstimate } from "@/features/estimates/components/UpdateEstimate";
import { UpdateContract, AddContract } from "@/features/contracts";
import {
  CreateProjectDetail,
  ProjectDetail,
  ProjectDetailsList,
  useProjectDetails,
} from "@/features/projectDetails";
import { EstimateDetail } from "@/features/estimates";
import { ContractDetail, useContract } from "@/features/contracts";
import { DownloadEstimate, DownloadDelivery } from "@/features/document";

export const Project = () => {
  const { project_id = "" } = useParams();

  const navigate = useNavigate();
  if (!project_id) navigate("..");

  const projectQuery = useProject({ project_id });
  const projectDetailQuery = useProjectDetails({ params: { project_id } });

  const contractQuery = useContract({
    contract_id: projectQuery.data?.contract_id,
  });

  if (
    projectQuery.isPending ||
    projectDetailQuery.isPending ||
    contractQuery.isPending
  ) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!projectQuery.data || !contractQuery.data) return null;

  const canEdit = contractQuery.data?.invoice_issued_date
    ? dayjs(contractQuery.data.invoice_issued_date).add(2, "month") > dayjs()
    : true;

  const projectDetails: ProjectDetail[] = projectDetailQuery.data || [];
  const isDisabledDLEstimate =
    !projectDetails.length || !projectQuery.data?.estimate_id;
  const isDisabledDLDelivery = !!(
    !projectDetails.length || !projectQuery.data?.contract_id
  );

  return (
    <>
      <ContentLayout title="案件詳細">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-xl mt-2">
              <UpdateProject project_id={project_id} />
            </div>
            <DownloadEstimate
              project_id={project_id}
              disabled={isDisabledDLEstimate}
            />
            <DownloadDelivery
              delivery_issued_date={contractQuery.data?.delivery_issued_date}
              project_id={project_id}
              disabled={isDisabledDLDelivery}
            />
          </div>
          <DeleteProject project_id={project_id} disabled={!canEdit} />
        </div>
        <div className="mt-6 flex gap-6">
          <Card head="見積情報">
            {projectQuery.data?.estimate_id ? (
              <>
                <EstimateDetail estimate_id={projectQuery.data?.estimate_id} />
                <div className="flex justify-end mt-4">
                  <UpdateEstimate
                    estimate_id={projectQuery.data?.estimate_id}
                    disabled={!canEdit}
                  />
                </div>
              </>
            ) : (
              <span>見積情報はありません</span>
            )}
          </Card>
          <Card head="受注情報">
            {projectQuery.data?.contract_id ? (
              <>
                <ContractDetail contract_id={projectQuery.data?.contract_id} />
                <div className="flex justify-end mt-4">
                  <UpdateContract
                    contract_id={projectQuery.data?.contract_id}
                    disabled={!canEdit}
                  />
                </div>
              </>
            ) : (
              <>
                <span>契約情報はありません</span>
                <div className="flex justify-end mt-4">
                  <AddContract project_id={project_id} />
                </div>
              </>
            )}
          </Card>
        </div>
        <div className="mt-6">
          <ProjectDetailsList project_id={project_id} canEdit={canEdit} />
        </div>
        <div className="mt-6 flex justify-center">
          <CreateProjectDetail project_id={project_id} disabled={!canEdit} />
        </div>
      </ContentLayout>
    </>
  );
};
export default Project;
