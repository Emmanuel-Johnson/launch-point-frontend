import { useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "Emmanuel Johnson",
    email: "emmanuel.johnson@example.com",
    bio: "Full stack developer passionate about Python, Django and React.",
    location: "Kerala, India",
    education: "Computer Science",
    occupation: "Software Developer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // API PATCH will be added here
    console.log("Profile data:", profile);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#080614] px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage your personal information and profile details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-violet-500/20 bg-white/[0.03] shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-violet-900/60 via-purple-800/40 to-fuchsia-900/40" />

          {/* Profile Content */}
          <div className="px-6 pb-8 sm:px-8">
            {/* Avatar + Basic Info */}
            <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#080614] bg-gradient-to-br from-violet-500 to-purple-700 text-4xl font-bold shadow-xl shadow-violet-900/40">
                  EJ
                </div>

                <div className="text-center sm:mb-2 sm:text-left">
                  <h2 className="text-2xl font-semibold">
                    {profile.full_name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">{profile.email}</p>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-medium transition hover:from-violet-500 hover:to-purple-500"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-white/10" />

            {/* Profile Information */}
            <div>
              <h3 className="mb-5 text-lg font-semibold">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Full Name
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="full_name"
                      value={profile.full_name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-violet-500/20 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm">
                      {profile.full_name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Email
                  </label>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-gray-400">
                    {profile.email}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Location
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-violet-500/20 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm">
                      {profile.location || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Education */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Education
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="education"
                      value={profile.education}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-violet-500/20 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm">
                      {profile.education || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Occupation */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Occupation
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="occupation"
                      value={profile.occupation}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-violet-500/20 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm">
                      {profile.occupation || "Not provided"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="mb-2 block text-sm text-gray-400">Bio</label>

              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={5}
                  maxLength={500}
                  className="w-full resize-none rounded-xl border border-violet-500/20 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                  placeholder="Tell us something about yourself..."
                />
              ) : (
                <div className="min-h-[120px] rounded-xl border border-white/5 bg-white/[0.02] px-4 py-4 text-sm leading-6 text-gray-300">
                  {profile.bio || "No bio added yet."}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2.5 text-sm font-medium transition hover:from-violet-500 hover:to-purple-500"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
