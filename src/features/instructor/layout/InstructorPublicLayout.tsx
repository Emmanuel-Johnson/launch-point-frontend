import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import InstructorPublicHeader from "../components/InstructorPublicHeader";
import InstructorApplicationModal from "../components/InstructorApplicationModal";

import {
  getInstructorApplications,
  type InstructorApplication,
} from "../api/instructorApplicationApi";

/**
 * Value shared with the routed pages via <Outlet context={...} />.
 * The landing page reads this with `useOutletContext<InstructorPublicContext>()`.
 */
export type InstructorPublicContext = {
  latestApplication: InstructorApplication | null;
  isApplicationLoading: boolean;
  openApplication: () => void;
  refreshApplication: () => void;
};

/**
 * Layout that wraps the three instructor public pages.
 *
 * React Router keeps this layout mounted while only swapping <Outlet />, so:
 *  - the header (logo + back button) never re-mounts / refreshes on navigation
 *  - the application status is fetched here and shared down
 *  - the "Apply" modal lives here and stays alive across page changes
 *
 * The fetch is defined INLINE inside the effect (its setState runs only after
 * `await`), so the React Compiler doesn't flag it. Because the layout never
 * unmounts, a `refreshKey` bump is used to re-run the fetch after the modal
 * closes — otherwise the header's "Become an Instructor" button would never
 * flip to "View Status" within the same session.
 */
const InstructorPublicLayout = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const [latestApplication, setLatestApplication] =
    useState<InstructorApplication | null>(null);

  // Kept so the header CTA doesn't flicker while the status is loading.
  const [isApplicationLoading, setIsApplicationLoading] = useState(true);

  // Bumping this re-runs the fetch effect (e.g. after submitting an application).
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadApplication = async () => {
      try {
        const applications = await getInstructorApplications();

        if (!cancelled) setLatestApplication(applications[0] ?? null);
      } catch (error) {
        console.error("Failed to load instructor application:", error);
      } finally {
        if (!cancelled) setIsApplicationLoading(false);
      }
    };

    void loadApplication();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const openApplication = () => setIsApplicationOpen(true);

  const closeApplication = () => {
    setIsApplicationOpen(false);
    // Re-sync the header CTA after a submit (silent refresh — no loader flicker).
    setRefreshKey((key) => key + 1);
  };

  const refreshApplication = () => setRefreshKey((key) => key + 1);

  const context: InstructorPublicContext = {
    latestApplication,
    isApplicationLoading,
    openApplication,
    refreshApplication,
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-zinc-100">
      {/* Persistent header — rendered once, never re-mounts between pages */}
      <InstructorPublicHeader
        latestApplication={latestApplication}
        isApplicationLoading={isApplicationLoading}
        onApply={openApplication}
      />

      {/* Only this swaps on navigation */}
      <Outlet context={context} />

      {/* Shared application modal — stays mounted across page changes */}
      <InstructorApplicationModal
        isOpen={isApplicationOpen}
        onClose={closeApplication}
      />
    </div>
  );
};

export default InstructorPublicLayout;
