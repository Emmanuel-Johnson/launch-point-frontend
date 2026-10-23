import { useMemo, useState } from "react";
import {
  MessageCircle,
  Heart,
  Search,
  Plus,
  Users,
  TrendingUp,
  Hash,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Bookmark,
  Clock3,
  Flame,
  GraduationCap,
  Code2,
  BriefcaseBusiness,
  X,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type CommunityPost = {
  id: number;
  author: string;
  role: string;
  initials: string;
  avatarColor: string;
  time: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  liked: boolean;
  bookmarked: boolean;
  isMine?: boolean;
  commentList: {
    id: number;
    author: string;
    initials: string;
    text: string;
  }[];
};

const topics = [
  "All Discussions",
  "General",
  "Web Development",
  "Python",
  "Career",
  "DSA",
];

const initialPosts: CommunityPost[] = [
  {
    id: 1,
    author: "Alex Morgan",
    role: "Student",
    initials: "AM",
    avatarColor: "from-violet-500 to-indigo-600",
    time: "12 min ago",
    category: "Web Development",
    title: "How should I structure a large React project?",
    content:
      "I'm building a project with multiple dashboards and role-based routes. I'm currently using a feature-based folder structure. What practices have worked well for you when projects start getting bigger?",
    likes: 24,
    comments: 8,
    tags: ["React", "Architecture", "Frontend"],
    liked: false,
    bookmarked: false,
    commentList: [
      {
        id: 1,
        author: "Sarah Lee",
        initials: "SL",
        text: "Feature-based folders work really well. Keep components close to the features that use them.",
      },
      {
        id: 2,
        author: "Daniel Kim",
        initials: "DK",
        text: "I'd also keep shared UI components separate from feature-specific components.",
      },
    ],
  },
  {
    id: 2,
    author: "Sarah Lee",
    role: "Student",
    initials: "SL",
    avatarColor: "from-pink-500 to-rose-600",
    time: "38 min ago",
    category: "DSA",
    title: "Finally completed 30 days of consistent problem solving!",
    content:
      "The biggest lesson for me was to focus on understanding the pattern instead of memorizing the solution. Sliding window and two pointers are starting to make much more sense now.",
    likes: 42,
    comments: 12,
    tags: ["LeetCode", "Consistency", "DSA"],
    liked: false,
    bookmarked: false,
    commentList: [
      {
        id: 1,
        author: "Alex Morgan",
        initials: "AM",
        text: "Congratulations! Consistency really makes a difference.",
      },
    ],
  },
  {
    id: 3,
    author: "Daniel Kim",
    role: "Student",
    initials: "DK",
    avatarColor: "from-cyan-500 to-blue-600",
    time: "1 hour ago",
    category: "Python",
    title: "Django REST Framework: serializers vs model methods",
    content:
      "When building a REST API, how do you decide which validation belongs in the serializer and which logic belongs in a service layer? I'd love to hear how you organize your backend code.",
    likes: 18,
    comments: 6,
    tags: ["Django", "DRF", "Backend"],
    liked: false,
    bookmarked: false,
    commentList: [],
  },
  {
    id: 4,
    author: "Emily Carter",
    role: "Student",
    initials: "EC",
    avatarColor: "from-amber-500 to-orange-600",
    time: "2 hours ago",
    category: "Career",
    title: "What should a junior developer portfolio include?",
    content:
      "I'm preparing for my first developer interviews. Apart from projects and a GitHub profile, what else should I include in my portfolio to make it more useful to recruiters?",
    likes: 31,
    comments: 15,
    tags: ["Portfolio", "Interview", "Career"],
    liked: false,
    bookmarked: false,
    commentList: [],
  },
];

const trendingTopics = [
  { name: "React Architecture", posts: 128 },
  { name: "Python & Django", posts: 96 },
  { name: "LeetCode Challenges", posts: 84 },
  { name: "Career Preparation", posts: 62 },
];

const studyGroups = [
  {
    name: "Frontend Developers",
    members: "1.2k members",
    initials: "FD",
    color: "from-violet-500 to-indigo-600",
  },
  {
    name: "Python Enthusiasts",
    members: "860 members",
    initials: "PY",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "DSA Study Circle",
    members: "740 members",
    initials: "DS",
    color: "from-orange-500 to-rose-600",
  },
];

const formatCount = (count: number) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [activeTopic, setActiveTopic] = useState("All Discussions");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("General");
  const [showComposer, setShowComposer] = useState(false);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>(
    {},
  );
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = posts.filter((post) => {
      const matchesTopic =
        activeTopic === "All Discussions" || post.category === activeTopic;

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesSaved = !savedOnly || post.bookmarked;

      return matchesTopic && matchesSearch && matchesSaved;
    });

    if (sortBy === "popular") {
      return [...result].sort(
        (a, b) => b.likes + b.comments - (a.likes + a.comments),
      );
    }

    return result;
  }, [posts, activeTopic, search, sortBy, savedOnly]);

  const updatePost = (
    postId: number,
    updater: (post: CommunityPost) => CommunityPost,
  ) => {
    setPosts((previous) =>
      previous.map((post) => (post.id === postId ? updater(post) : post)),
    );
  };

  const toggleLike = (postId: number) => {
    updatePost(postId, (post) => ({
      ...post,
      liked: !post.liked,
      likes: post.likes + (post.liked ? -1 : 1),
    }));
  };

  const toggleBookmark = (postId: number) => {
    updatePost(postId, (post) => ({
      ...post,
      bookmarked: !post.bookmarked,
    }));
    setActiveMenu(null);
  };

  const toggleComments = (postId: number) => {
    setExpandedComments((previous) =>
      previous.includes(postId)
        ? previous.filter((id) => id !== postId)
        : [...previous, postId],
    );
  };

  const submitPost = () => {
    const title = postTitle.trim();
    const content = postContent.trim();

    if (!title || !content) return;

    const newPost: CommunityPost = {
      id: Date.now(),
      author: "You",
      role: "Student",
      initials: "YO",
      avatarColor: "from-violet-500 to-purple-600",
      time: "Just now",
      category: postCategory,
      title,
      content,
      likes: 0,
      comments: 0,
      tags: [],
      liked: false,
      bookmarked: false,
      isMine: true,
      commentList: [],
    };

    setPosts((previous) => [newPost, ...previous]);
    setPostTitle("");
    setPostContent("");
    setPostCategory("General");
    setShowComposer(false);
    setActiveTopic("All Discussions");
    setSearch("");
    setSavedOnly(false);
    setSortBy("recent");
  };

  const submitComment = (postId: number) => {
    const text = commentDrafts[postId]?.trim();
    if (!text) return;

    updatePost(postId, (post) => ({
      ...post,
      comments: post.comments + 1,
      commentList: [
        ...post.commentList,
        {
          id: Date.now(),
          author: "You",
          initials: "YO",
          text,
        },
      ],
    }));

    setCommentDrafts((previous) => ({ ...previous, [postId]: "" }));
    setExpandedComments((previous) =>
      previous.includes(postId) ? previous : [...previous, postId],
    );
  };

  const toggleGroup = (groupName: string) => {
    setJoinedGroups((previous) =>
      previous.includes(groupName)
        ? previous.filter((name) => name !== groupName)
        : [...previous, groupName],
    );
  };

  const clearFilters = () => {
    setActiveTopic("All Discussions");
    setSearch("");
    setSavedOnly(false);
    setSortBy("recent");
  };

  return (
    <div className="min-h-screen bg-[#08080D] text-white">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-violet-400">
              <Users size={16} />
              <span>Student community</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Community
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              Share ideas, ask questions, and learn together with fellow
              students.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowComposer(true)}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500 sm:self-auto"
          >
            <Plus size={18} />
            Create a post
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Users size={20} />}
            label="Community members"
            value="2,450+"
            description="Learning together"
            color="violet"
          />
          <StatCard
            icon={<MessageCircle size={20} />}
            label="Discussions"
            value={String(posts.length)}
            description="Posts in this feed"
            color="blue"
          />
          <StatCard
            icon={<Flame size={20} />}
            label="Your study groups"
            value={String(joinedGroups.length)}
            description="Groups you've joined"
            color="orange"
          />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
          <main className="min-w-0">
            {/* Search */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search discussions, topics, or people..."
                  className="w-full rounded-xl border border-white/10 bg-[#111117] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500/60"
                />
              </div>

              <button
                type="button"
                onClick={() => setSavedOnly((previous) => !previous)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                  savedOnly
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                    : "border-white/10 bg-[#111117] text-gray-400 hover:text-white"
                }`}
              >
                <Bookmark size={16} />
                Saved posts
              </button>
            </div>

            {/* Topic filters */}
            <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setActiveTopic(topic)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                    activeTopic === topic
                      ? "bg-violet-600 text-white"
                      : "border border-white/10 bg-[#111117] text-gray-400 hover:border-violet-500/40 hover:text-white"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Feed header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Discussion feed</h2>
                <p className="mt-1 text-xs text-gray-500">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "discussion" : "discussions"}{" "}
                  found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as "recent" | "popular")
                  }
                  className="rounded-lg border border-white/10 bg-[#111117] px-3 py-2 text-sm text-gray-300 outline-none focus:border-violet-500/60"
                >
                  <option value="recent">Most recent</option>
                  <option value="popular">Most popular</option>
                </select>
              </div>
            </div>

            {/* Create-post prompt */}
            {!showComposer && (
              <button
                type="button"
                onClick={() => setShowComposer(true)}
                className="mb-5 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#111117] p-4 text-left transition hover:border-violet-500/30"
              >
                <Avatar
                  initials="YO"
                  color="from-violet-500 to-purple-600"
                  size="md"
                />
                <span className="flex-1 text-sm text-gray-500">
                  What would you like to share with the community?
                </span>
                <span className="rounded-lg bg-violet-500/15 p-2 text-violet-300">
                  <Plus size={18} />
                </span>
              </button>
            )}

            {/* Composer */}
            {showComposer && (
              <section className="mb-5 rounded-2xl border border-violet-500/30 bg-[#111117] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Create a discussion</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Share a question, idea, or learning milestone.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowComposer(false)}
                    aria-label="Close composer"
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Topic
                </label>
                <select
                  value={postCategory}
                  onChange={(event) => setPostCategory(event.target.value)}
                  className="mb-4 w-full rounded-xl border border-white/10 bg-[#0B0B11] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60"
                >
                  {topics
                    .filter((topic) => topic !== "All Discussions")
                    .map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                </select>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  value={postTitle}
                  onChange={(event) => setPostTitle(event.target.value)}
                  maxLength={120}
                  placeholder="Give your discussion a clear title"
                  className="mb-4 w-full rounded-xl border border-white/10 bg-[#0B0B11] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500/60"
                />

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  value={postContent}
                  onChange={(event) => setPostContent(event.target.value)}
                  rows={5}
                  maxLength={3000}
                  placeholder="What would you like to discuss?"
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0B0B11] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-gray-600 focus:border-violet-500/60"
                />

                <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <span className="text-xs text-gray-500">
                    {postContent.length}/3000 characters
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowComposer(false)}
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={submitPost}
                      disabled={!postTitle.trim() || !postContent.trim()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Send size={15} />
                      Publish post
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-white/10 bg-[#111117] p-4 transition hover:border-white/15 sm:p-5"
                >
                  {/* Author */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar
                        initials={post.initials}
                        color={post.avatarColor}
                        size="md"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm font-semibold">
                            {post.author}
                          </span>
                          {post.isMine && (
                            <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                              You
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span>{post.role}</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 size={12} />
                            {post.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu((previous) =>
                            previous === post.id ? null : post.id,
                          )
                        }
                        aria-label="Post options"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {activeMenu === post.id && (
                        <div className="absolute right-0 top-10 z-10 w-44 rounded-xl border border-white/10 bg-[#1A1A23] p-1.5 shadow-xl">
                          <button
                            type="button"
                            onClick={() => toggleBookmark(post.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5"
                          >
                            <Bookmark size={15} />
                            {post.bookmarked
                              ? "Remove saved post"
                              : "Save post"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveMenu(null)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5"
                          >
                            <X size={15} />
                            Close menu
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                      <Hash size={12} />
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mt-3 text-base font-semibold leading-6 text-white sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-400">
                    {post.content}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearch(tag)}
                          className="text-xs text-violet-400 transition hover:text-violet-300"
                        >
                          #{tag.replace(/\s+/g, "")}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Engagement count */}
                  <div className="mt-5 flex items-center justify-between border-b border-white/5 pb-3 text-xs text-gray-500">
                    <span>
                      {formatCount(post.likes)}{" "}
                      {post.likes === 1 ? "like" : "likes"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleComments(post.id)}
                      className="transition hover:text-violet-300"
                    >
                      {post.comments}{" "}
                      {post.comments === 1 ? "comment" : "comments"}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm transition ${
                        post.liked
                          ? "bg-pink-500/10 text-pink-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-pink-400"
                      }`}
                    >
                      <Heart
                        size={17}
                        fill={post.liked ? "currentColor" : "none"}
                      />
                      {post.liked ? "Liked" : "Like"}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleComments(post.id)}
                      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm transition ${
                        expandedComments.includes(post.id)
                          ? "bg-violet-500/10 text-violet-300"
                          : "text-gray-400 hover:bg-white/5 hover:text-violet-300"
                      }`}
                    >
                      <MessageCircle size={17} />
                      Comment
                    </button>
                  </div>

                  {/* Comments */}
                  {expandedComments.includes(post.id) && (
                    <div className="mt-4 border-t border-white/5 pt-4">
                      <div className="space-y-4">
                        {post.commentList.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex items-start gap-3"
                          >
                            <Avatar
                              initials={comment.initials}
                              color="from-slate-500 to-slate-700"
                              size="sm"
                            />
                            <div className="min-w-0 flex-1 rounded-xl bg-[#0B0B11] px-3 py-2.5">
                              <p className="text-xs font-semibold text-gray-200">
                                {comment.author}
                              </p>
                              <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-gray-400">
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        ))}

                        {post.commentList.length === 0 && (
                          <p className="py-2 text-center text-sm text-gray-500">
                            No comments yet. Start the conversation.
                          </p>
                        )}
                      </div>

                      <form
                        className="mt-4 flex items-center gap-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          submitComment(post.id);
                        }}
                      >
                        <input
                          value={commentDrafts[post.id] ?? ""}
                          onChange={(event) =>
                            setCommentDrafts((previous) => ({
                              ...previous,
                              [post.id]: event.target.value,
                            }))
                          }
                          placeholder="Write a comment..."
                          maxLength={1000}
                          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0B0B11] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500/60"
                        />
                        <button
                          type="submit"
                          disabled={!commentDrafts[post.id]?.trim()}
                          aria-label="Send comment"
                          className="rounded-xl bg-violet-600 p-3 text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Send size={16} />
                        </button>
                      </form>
                    </div>
                  )}
                </article>
              ))}

              {filteredPosts.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#111117] px-5 py-14 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                    <Search size={24} />
                  </div>
                  <h3 className="mt-4 font-semibold">No discussions found</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Try another search or topic, or start a discussion of your
                    own.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Community welcome */}
            <section className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#241747] via-[#17132B] to-[#111117] p-5">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-lg font-semibold">
                  Learn better, together.
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Ask questions, share your progress, and help other learners
                  grow.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-violet-300">
                  <CheckCircle2 size={15} />
                  <span>Every learner has something to share</span>
                </div>
              </div>
            </section>

            {/* Trending */}
            <section className="rounded-2xl border border-white/10 bg-[#111117] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  <TrendingUp size={18} className="text-violet-400" />
                  Trending topics
                </h3>
                <Flame size={17} className="text-orange-400" />
              </div>

              <div className="space-y-1">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic.name}
                    type="button"
                    onClick={() => setSearch(topic.name.split(" ")[0])}
                    className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-semibold text-gray-400">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-gray-200 transition group-hover:text-violet-300">
                        {topic.name}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {topic.posts} discussions
                      </span>
                    </span>
                    <ChevronRight
                      size={16}
                      className="text-gray-600 transition group-hover:text-violet-300"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Study groups */}
            <section className="rounded-2xl border border-white/10 bg-[#111117] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Users size={18} className="text-violet-400" />
                  Study groups
                </h3>
                <span className="text-xs text-gray-500">
                  {joinedGroups.length} joined
                </span>
              </div>

              <div className="space-y-4">
                {(showAllGroups ? studyGroups : studyGroups.slice(0, 3)).map(
                  (group) => {
                    const isJoined = joinedGroups.includes(group.name);

                    return (
                      <div key={group.name} className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${group.color} text-xs font-bold`}
                        >
                          {group.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-200">
                            {group.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {group.members}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.name)}
                          className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                            isJoined
                              ? "border border-white/10 text-gray-400 hover:border-red-500/30 hover:text-red-300"
                              : "bg-violet-600 text-white hover:bg-violet-500"
                          }`}
                        >
                          {isJoined ? "Joined" : "Join"}
                        </button>
                      </div>
                    );
                  },
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowAllGroups((previous) => !previous)}
                className="mt-5 w-full rounded-xl border border-white/10 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                {showAllGroups ? "Show fewer groups" : "Explore study groups"}
              </button>
            </section>

            {/* Community guidelines */}
            <section className="rounded-2xl border border-white/10 bg-[#111117] p-5">
              <h3 className="flex items-center gap-2 font-semibold">
                <GraduationCap size={19} className="text-violet-400" />
                Community guidelines
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-5 text-gray-400">
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  Be respectful and supportive.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  Share knowledge and explain your ideas.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  Keep discussions relevant to learning.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  Never share private information.
                </li>
              </ul>
            </section>

            {/* Quick links */}
            <section className="rounded-2xl border border-white/10 bg-[#111117] p-5">
              <h3 className="mb-4 font-semibold">Explore more</h3>
              <div className="space-y-2">
                <QuickLink
                  icon={<Code2 size={17} />}
                  label="Explore courses"
                  onClick={() =>
                    window.location.assign("/student/explore-courses")
                  }
                />
                <QuickLink
                  icon={<BriefcaseBusiness size={17} />}
                  label="My learning"
                  onClick={() => window.location.assign("/student/my-learning")}
                />
                <QuickLink
                  icon={<MessageCircle size={17} />}
                  label="Notifications"
                  onClick={() =>
                    window.location.assign("/student/notifications")
                  }
                />
              </div>
            </section>

            <p className="px-2 text-xs leading-5 text-gray-600">
              Launch Point · Learn Today, Lead Tomorrow
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Avatar({
  initials,
  color,
  size = "md",
}: {
  initials: string;
  color: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} font-semibold text-white ${
        size === "sm" ? "h-8 w-8 text-[10px]" : "h-11 w-11 text-xs"
      }`}
    >
      {initials}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: "violet" | "blue" | "orange";
}) {
  const colorClasses = {
    violet: "bg-violet-500/10 text-violet-300",
    blue: "bg-blue-500/10 text-blue-300",
    orange: "bg-orange-500/10 text-orange-300",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111117] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
        <div className={`rounded-xl p-3 ${colorClasses[color]}`}>{icon}</div>
      </div>
    </div>
  );
}

function QuickLink({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
    >
      <span className="text-violet-400">{icon}</span>
      <span className="flex-1">{label}</span>
      <ChevronRight size={15} className="text-gray-600" />
    </button>
  );
}
