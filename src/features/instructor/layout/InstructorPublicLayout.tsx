import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import InstructorPublicHeader from "../components/InstructorPublicHeader";
import InstructorApplicationModal from "../components/InstructorApplicationModal";

import {
  getInstructorApplications,
  type InstructorApplication,
  type InstructorApplicationDetail,
} from "../api/instructorApplicationApi";

/**
 * Value shared with the routed pages via <Outlet context={...} />.
 */
export type InstructorPublicContext = {
  latestApplication: InstructorApplication | null;
  isApplicationLoading: boolean;
  openApplication: (application?: InstructorApplicationDetail | null) => void;
  refreshApplication: () => void;
};

const InstructorPublicLayout = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const [applicationToPrefill, setApplicationToPrefill] =
    useState<InstructorApplicationDetail | null>(null);

  const [latestApplication, setLatestApplication] =
    useState<InstructorApplication | null>(null);

  const [isApplicationLoading, setIsApplicationLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadApplication = async () => {
      try {
        const applications = await getInstructorApplications();

        if (!cancelled) {
          setLatestApplication(applications[0] ?? null);
        }
      } catch (error) {
        console.error("Failed to load instructor application:", error);
      } finally {
        if (!cancelled) {
          setIsApplicationLoading(false);
        }
      }
    };

    void loadApplication();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // Open a fresh application form or prefill it for reapplication.
  const openApplication = (
    application?: InstructorApplicationDetail | null,
  ) => {
    setApplicationToPrefill(application ?? null);
    setIsApplicationOpen(true);
  };

  // Explicit handler for the header's Become an Instructor button.
  const handleBecomeInstructor = () => {
    openApplication(null);
  };

  const closeApplication = () => {
    setIsApplicationOpen(false);
    setApplicationToPrefill(null);

    // Refresh application status after the modal closes/submission.
    setRefreshKey((key) => key + 1);
  };

  const refreshApplication = () => {
    setRefreshKey((key) => key + 1);
  };

  const context: InstructorPublicContext = {
    latestApplication,
    isApplicationLoading,
    openApplication,
    refreshApplication,
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-zinc-100">
      {/* Persistent header */}
      <InstructorPublicHeader
        latestApplication={latestApplication}
        isApplicationLoading={isApplicationLoading}
        onApply={handleBecomeInstructor}
      />

      {/* Routed instructor public pages */}
      <Outlet context={context} />

      {/* Shared application modal */}
      <InstructorApplicationModal
        isOpen={isApplicationOpen}
        onClose={closeApplication}
        initialApplication={applicationToPrefill}
      />
    </div>
  );
};

export default InstructorPublicLayout;
