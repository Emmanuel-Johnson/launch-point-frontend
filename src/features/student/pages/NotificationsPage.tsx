import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Bell,
  BookOpen,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  MessageCircle,
  MoreHorizontal,
  Search,
  Settings2,
  Trash2,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type NotificationCategory =
  | "All"
  | "Courses"
  | "Assignments"
  | "Community"
  | "Account";

type NotificationType =
  | "course"
  | "assignment"
  | "community"
  | "account"
  | "achievement";

interface StudentNotification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
  actionLabel?: string;
  actionPath?: string;
}

const initialNotifications: StudentNotification[] = [
  {
    id: 1,
    title: "Welcome to Launch Point!",
    message:
      "Welcome aboard! Explore your courses and start building your skills today.",
    type: "account",
    createdAt: "Just now",
    read: false,
    actionLabel: "Explore courses",
    actionPath: "/student/courses",
  },
  {
    id: 2,
    title: "Your course is waiting",
    message:
      "Continue learning and make progress toward completing your course.",
    type: "course",
    createdAt: "2 hours ago",
    read: false,
    actionLabel: "My learning",
    actionPath: "/student/my-learning",
  },
  {
    id: 3,
    title: "Assignment reminder",
    message: "Review your pending assignments and keep your learning on track.",
    type: "assignment",
    createdAt: "Yesterday",
    read: false,
    actionLabel: "View assignments",
    actionPath: "/student/assignments",
  },
  {
    id: 4,
    title: "New community discussion",
    message:
      "There may be a new discussion worth checking out in your learning community.",
    type: "community",
    createdAt: "Yesterday",
    read: true,
    actionLabel: "Visit community",
    actionPath: "/student/community",
  },
  {
    id: 5,
    title: "Keep up your learning streak",
    message:
      "Consistency matters. Spend some time today practicing what you have learned.",
    type: "achievement",
    createdAt: "2 days ago",
    read: true,
    actionLabel: "Continue learning",
    actionPath: "/student/my-learning",
  },
  {
    id: 6,
    title: "Subscription information",
    message:
      "Check your subscription details to understand which learning features are available to you.",
    type: "account",
    createdAt: "3 days ago",
    read: true,
    actionLabel: "View subscription",
    actionPath: "/student/subscription",
  },
];

const filters: NotificationCategory[] = [
  "All",
  "Courses",
  "Assignments",
  "Community",
  "Account",
];

function getCategory(type: NotificationType): NotificationCategory {
  switch (type) {
    case "course":
      return "Courses";
    case "assignment":
      return "Assignments";
    case "community":
      return "Community";
    case "account":
    case "achievement":
      return "Account";
  }
}

function NotificationIcon({ type }: { type: NotificationType }) {
  const iconClass =
    "flex size-11 shrink-0 items-center justify-center rounded-xl";

  switch (type) {
    case "course":
      return (
        <div className={`${iconClass} bg-violet-500/10 text-violet-300`}>
          <BookOpen size={20} />
        </div>
      );

    case "assignment":
      return (
        <div className={`${iconClass} bg-amber-500/10 text-amber-300`}>
          <Clock3 size={20} />
        </div>
      );

    case "community":
      return (
        <div className={`${iconClass} bg-sky-500/10 text-sky-300`}>
          <MessageCircle size={20} />
        </div>
      );

    case "achievement":
      return (
        <div className={`${iconClass} bg-emerald-500/10 text-emerald-300`}>
          <Trophy size={20} />
        </div>
      );

    case "account":
      return (
        <div className={`${iconClass} bg-fuchsia-500/10 text-fuchsia-300`}>
          <UserRound size={20} />
        </div>
      );
  }
}

export default function NotificationsPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<StudentNotification[]>(initialNotifications);

  const [activeFilter, setActiveFilter] = useState<NotificationCategory>("All");

  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuId, setMenuId] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const filteredNotifications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesCategory =
        activeFilter === "All" ||
        getCategory(notification.type) === activeFilter;

      const matchesUnread = !unreadOnly || !notification.read;

      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query);

      return matchesCategory && matchesUnread && matchesSearch;
    });
  }, [notifications, activeFilter, unreadOnly, searchQuery]);

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );

    setMenuId(null);
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id),
    );

    setMenuId(null);
  };

  const clearReadNotifications = () => {
    setNotifications((previous) =>
      previous.filter((notification) => !notification.read),
    );

    setShowSettings(false);
  };

  const openNotification = (notification: StudentNotification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    if (notification.actionPath) {
      navigate(notification.actionPath);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
              <Bell size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Notifications
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Stay updated on your learning journey.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>

            <button
              type="button"
              onClick={() => setShowSettings(true)}
              aria-label="Notification settings"
              className="flex size-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Settings2 size={18} />
            </button>
          </div>
        </header>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total notifications"
            value={notifications.length}
            icon={<Bell size={19} />}
          />

          <SummaryCard
            label="Unread notifications"
            value={unreadCount}
            icon={<MessageCircle size={19} />}
            highlight
          />

          <SummaryCard
            label="Read notifications"
            value={notifications.length - unreadCount}
            icon={<CheckCheck size={19} />}
          />
        </div>

        {/* Notifications panel */}
        <section className="overflow-visible rounded-2xl border border-white/[0.08] bg-[#101016]">
          {/* Search and filters */}
          <div className="space-y-5 border-b border-white/[0.07] p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search notifications..."
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B11] py-3 pl-11 pr-10 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500/50"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setUnreadOnly((value) => !value)}
                aria-pressed={unreadOnly}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  unreadOnly
                    ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
                    : "border-white/10 text-gray-400 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`size-2 rounded-full ${
                    unreadOnly ? "bg-violet-400" : "bg-gray-600"
                  }`}
                />
                Unread only
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-violet-600 text-white"
                        : "border border-white/[0.07] text-gray-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* List heading */}
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-white">
                {unreadOnly ? "Unread notifications" : "Recent activity"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {filteredNotifications.length}{" "}
                {filteredNotifications.length === 1
                  ? "notification"
                  : "notifications"}
              </p>
            </div>

            {notifications.some((notification) => notification.read) && (
              <button
                type="button"
                onClick={clearReadNotifications}
                className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-red-400"
              >
                <Trash2 size={14} />
                Clear read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="divide-y divide-white/[0.06]">
            {filteredNotifications.map((notification) => (
              <article
                key={notification.id}
                className={`relative flex gap-3 px-4 py-5 transition sm:gap-4 sm:px-6 ${
                  notification.read ? "bg-transparent" : "bg-violet-500/[0.025]"
                }`}
              >
                <NotificationIcon type={notification.type} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-sm ${
                        notification.read
                          ? "font-medium text-gray-300"
                          : "font-semibold text-white"
                      }`}
                    >
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="size-1.5 rounded-full bg-violet-400" />
                    )}
                  </div>

                  <p className="mt-1.5 max-w-3xl text-sm leading-6 text-gray-400">
                    {notification.message}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock3 size={13} />
                      {notification.createdAt}
                    </span>

                    <span className="rounded-md border border-white/[0.07] px-2 py-1 text-[11px] text-gray-500">
                      {getCategory(notification.type)}
                    </span>

                    {notification.actionLabel && notification.actionPath && (
                      <button
                        type="button"
                        onClick={() => openNotification(notification)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-violet-300 transition hover:text-violet-200"
                      >
                        {notification.actionLabel}
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Notification actions */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setMenuId((current) =>
                        current === notification.id ? null : notification.id,
                      )
                    }
                    aria-label={`Actions for ${notification.title}`}
                    aria-expanded={menuId === notification.id}
                    className="flex size-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <MoreHorizontal size={19} />
                  </button>

                  {menuId === notification.id && (
                    <div className="absolute right-0 top-10 z-20 w-48 rounded-xl border border-white/10 bg-[#191922] p-1.5 shadow-xl">
                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-gray-300 hover:bg-white/[0.05]"
                        >
                          <Check size={15} />
                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => deleteNotification(notification.id)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                        Delete notification
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] text-gray-500">
                  <Bell size={24} />
                </div>

                <h3 className="mt-4 text-base font-semibold text-white">
                  No notifications found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  {unreadOnly
                    ? "You're all caught up. Try switching off the unread filter."
                    : "There are no notifications matching your current filters."}
                </p>

                {(searchQuery || activeFilter !== "All" || unreadOnly) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("All");
                      setUnreadOnly(false);
                    }}
                    className="mt-5 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-white/[0.07] px-5 py-4 text-center">
              <p className="text-xs text-gray-600">
                You&apos;re viewing your available notifications.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Settings modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowSettings(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-settings-title"
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="notification-settings-title"
                  className="text-lg font-bold text-white"
                >
                  Notification settings
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Manage notifications in this demo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
                className="flex size-9 items-center justify-center rounded-lg text-gray-400 hover:bg-white/[0.05] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-violet-300">
                  <Trash2 size={18} />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">
                    Clear read notifications
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Remove all read notifications from this page.
                  </p>

                  <button
                    type="button"
                    onClick={clearReadNotifications}
                    disabled={
                      !notifications.some((notification) => notification.read)
                    }
                    className="mt-3 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Clear read notifications
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Done
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101016] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-400">{label}</p>

        <div
          className={`flex size-10 items-center justify-center rounded-xl ${
            highlight
              ? "bg-violet-500/10 text-violet-300"
              : "bg-white/[0.04] text-gray-400"
          }`}
        >
          {icon}
        </div>
      </div>

      <p
        className={`mt-4 text-3xl font-bold tabular-nums ${
          highlight ? "text-violet-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
