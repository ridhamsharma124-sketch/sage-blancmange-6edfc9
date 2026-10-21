import { Fragment, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiUsers,
  FiBookOpen,
  FiHeart,
  FiHeadphones,
  FiFileText,
  FiStar,
  FiCalendar,
} from "react-icons/fi";
import { PiSparkleBold } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineBookOpen } from "react-icons/hi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { TbSettingsCog } from "react-icons/tb";
import { GiThreeLeaves } from "react-icons/gi";
import adminDashboardImage from "../../assets/AdminDBImage.png"; // Ensure this path is correct

// Mock API fetch
const fetchDashboardData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        user: { name: "John", date: "Tue, 20th Jan 2025 – 10:30 AM" },
        overview: [
          {
            key: "totalUsers",
            label: "Total Users",
            value: 12847,
            change: 8.5,
            icon: "users",
            color: "purple",
          },
          {
            key: "dailyVerseViews",
            label: "Daily Verse Views",
            value: "5.47K",
            change: 12.4,
            icon: "verse",
            color: "green",
          },
          {
            key: "reflections",
            label: "Reflections Created",
            value: 1291,
            change: 5.5,
            icon: "book",
            color: "blue",
          },
          {
            key: "prayers",
            label: "Prayers Logged",
            value: 3982,
            change: 15.3,
            icon: "heart",
            color: "orange",
          },
          {
            key: "audio",
            label: "Audio Listens",
            value: 345,
            change: 7.2,
            icon: "headphones",
            color: "purple",
          },
          {
            key: "activeUsers",
            label: "Active Users",
            value: 890,
            change: 9.3,
            icon: "users",
            color: "blue",
          },
          {
            key: "subscriptions",
            label: "Subscriptions",
            value: 556,
            change: 6.3,
            icon: "file",
            color: "orange",
          },
          {
            key: "reviews",
            label: "Reviews",
            value: 5,
            change: null,
            note: "Awesome!",
            icon: "star",
            color: "orange",
          },
        ],
        userGrowth: [
          { month: "Aug", users: 6000 },
          { month: "Sep", users: 7400 },
          { month: "Oct", users: 8800 },
          { month: "Nov", users: 10200 },
          { month: "Dec", users: 11500 },
          { month: "Jan", users: 12847 },
        ],
        devices: [
          { name: "iOS", value: 40, color: "#7AC3FE" },
          { name: "Android", value: 35, color: "#4618F7" },
          { name: "Web", value: 15, color: "#FE9C02" },
          { name: "Others", value: 10, color: "#444B59" },
        ],
        recentActivity: [
          {
            title: "New user registered",
            desc: "John Doe joined Bible Counsel",
            time: "1 min ago",
            icon: "user",
          },
          {
            title: "Daily verse updated",
            desc: `"Trust in the Lord with all your heart." – Prov 3:5`,
            time: "10 min ago",
            icon: "verse",
          },
          {
            title: "Daily Reflection created",
            desc: `Reflection on "God's strength in weakness"`,
            time: "25 min ago",
            icon: "reflection",
          },
          {
            title: "New prayer received",
            desc: "Emily R. submitted a new prayer",
            time: "30 min ago",
            icon: "prayer",
          },
        ],
        quote: {
          text: "Trust in the Lord with all your heart.",
          ref: "Proverbs 3:5",
        },
      });
    }, 600),
  );

const iconMap = {
  users: FiUsers,
  verse: HiOutlineBookOpen,
  book: FiBookOpen,
  heart: FiHeart,
  headphones: FiHeadphones,
  file: FiFileText,
  star: FiStar,
};

const colorMap = {
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-100 text-orange-600",
};

const activityIconMap = {
  user: FiUsers,
  verse: GiThreeLeaves,
  reflection: FiHeart,
  prayer: AiOutlineUserSwitch,
};

const activityBgMap = {
  user: "bg-[#F0EDFF] text-[#6366F1]",
  verse: "bg-[#ECFDF5] text-[#317302]",
  reflection: "bg-[#FFF7ED] text-[#F97316]",
  prayer: "bg-[#EFF6FF] text-[#3B82F6]",
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetchDashboardData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 text-gray-500 text-sm">Loading dashboard...</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-xl text-[#0A0847] font-[Inter]">
          Welcome back, <span className="font-semibold">{data.user.name}</span>{" "}
          👋
        </h1>
      </div>

      <div className="flex items-center gap-2 bg-[#F2F8FE] border border-[#E2DFFC] rounded-lg px-4 py-3 text-sm text-[#001984] font-[Inter] font-semibold w-full">
        <LuCalendarDays className="text-[#001984]" size={20} />
        {now.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </div>

      {/* Overview */}
      <div>
        <h2 className="text-base font-semibold font-[Inter] text-[#0A0847] mb-3">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.overview.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.key}
                className="bg-[#FEFFFF] rounded-lg border border-[#E2DFFC] h-[142px] px-4 flex items-center gap-4 font-[Inter]"
              >
                <div
                  className={`h-[60px] w-[60px] shrink-0 rounded-[18px] flex items-center justify-center ${colorMap[item.color]}`}
                >
                  <Icon size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-[Inter] font-semibold text-[#001984]">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-6 mt-1">
                    <p className="text-[22px] leading-none font-semibold font-[Inter] text-[#0A0847]">
                      {typeof item.value === "number"
                        ? item.value.toLocaleString()
                        : item.value}
                    </p>
                    {item.change !== null ? (
                      <span className="text-xs font-semibold text-[#4EB179]">
                        ↑ {item.change}%
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#FF9E01]">
                        {item.note}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#0A084799] font-medium mt-0.5">
                    vs last month
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* User Growth */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] font-[Inter] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0A0847] text-base">
              User Growth
            </h3>
            <select className="text-xs bg-[#F3F7FD] border border-[#E2DFFC] rounded-lg px-3 py-2 font-medium text-[#001984] outline-none">
              <option>Last 6 Months</option>
            </select>
          </div>

          <div className="w-full h-[240px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.userGrowth}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="userGrowthFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#818CF8" stopOpacity={0.25} />
                    <stop
                      offset="100%"
                      stopColor="#818CF8"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12, fontWeight: 500 }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 14000]}
                  ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000]}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}K`
                  }
                  tick={{ fill: "#64748B", fontSize: 12, fontWeight: 500 }}
                />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !payload.length) return null;
                    return (
                      <div className="bg-white border border-[#E2DFFC] rounded-lg px-3 py-2 text-sm">
                        <p className="font-semibold text-[#0A0847]">{label}</p>
                        <p className="text-[#001984] font-medium">
                          Users: {payload[0].value.toLocaleString()}
                        </p>
                      </div>
                    );
                  }}
                />

                <Area
                  type="linear"
                  dataKey="users"
                  stroke="#1E3A8A"
                  strokeWidth={1.5}
                  fill="url(#userGrowthFill)"
                  dot={{
                    r: 4,
                    fill: "#1E3A8A",
                    stroke: "#FFFFFF",
                    strokeWidth: 1.5,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#1E3A8A",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Devices By Platform */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] font-[Inter] overflow-hidden flex flex-col justify-between">
          <div className="bg-[#F3F7FD] px-6 py-4 border-b border-[#E2DFFC]">
            <h3 className="font-semibold text-base text-[#0A0847]">
              Devices By Platform
            </h3>
          </div>

          <div className="p-6 flex flex-wrap items-center justify-center gap-x-[43px] gap-y-6 flex-1">
            {/* Left: Donut Chart */}
            <div className="relative w-[220px] h-[220px] shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.devices}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={0}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {data.devices.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-[#0A0847] leading-none">
                  {data.devices.length}
                </span>
                <span className="text-xs text-[#8A8A8A] font-medium mt-1">
                  Total
                </span>
              </div>
            </div>

            {/* Right: Legend — Figma: 167px wide, names col 70px, 64px gap, 38px row gap */}
            <div className="grid grid-cols-[70px_auto] gap-x-16 gap-y-[38px] items-center">
              {data.devices.map((d) => (
                <Fragment key={d.name}>
                  <span className="flex items-center gap-2.5 text-[13px] leading-4 font-semibold text-[#7A7A7A]">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    {d.name}
                  </span>
                  <span className="text-[13px] leading-4 font-bold text-[#0A0847]">
                    {d.value}%
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tools & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-[Inter]">
        {/* Tools & Services */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#F3F7FD] px-6 py-4 border-b border-[#E2DFFC]">
            <h3 className="font-bold text-base text-[#0A0847]">
              Tools & Services
            </h3>
          </div>

          {/* Items */}
          <div className="p-6 space-y-4 flex-1 flex flex-col ">
            {/* AI Comprehension */}
            <button className="w-full flex items-center justify-between border border-[#E2DFFC] rounded-lg px-4 py-4 text-left hover:bg-[#F8FAFC] transition-colors group">
              <div className="flex items-center gap-3">
                {/* Sparkles Icon */}
                <div className="w-11 h-11 text-[#EAB308] flex items-center justify-center shrink-0">
                  <PiSparkleBold size={32} />
                </div>
                <span className="font-medium text-[#0A0847] text-sm">
                  AI Comprehension
                </span>
              </div>
              <span className="text-[#0A0847] font-bold text-base group-hover:translate-x-0.5 transition-transform">
                ›
              </span>
            </button>

            {/* AI Personalization */}
            <button className="w-full flex items-center justify-between border border-[#E2DFFC] rounded-lg px-4 py-4 text-left hover:bg-[#F8FAFC] transition-colors group">
              <div className="flex items-center gap-3">
                {/* AI Badge Icon */}
                <div className="w-11 h-11 text-[#6D37FD] flex items-center justify-center shrink-0 font-extrabold text-xs">
                  <TbSettingsCog size={32} />
                </div>
                <span className="font-medium text-[#0A0847] text-sm">
                  AI Personalization
                </span>
              </div>
              <span className="text-[#0A0847] font-bold text-base group-hover:translate-x-0.5 transition-transform">
                ›
              </span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#E2DFFC] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#F3F7FD] px-6 py-4 border-b border-[#E2DFFC] flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0A0847]">
              Recent Activity
            </h3>
            <button className="text-xs font-bold text-[#001984] hover:underline">
              View All
            </button>
          </div>

          {/* Activity List */}
          <div className="p-6 divide-y divide-[#F1F5F9] flex-1 flex flex-col justify-between">
            {data.recentActivity.map((a, i) => {
              const Icon = activityIconMap[a.icon];
              return (
                <div
                  key={i}
                  className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    {/* Distinct colored icon container */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${activityBgMap[a.icon] || "bg-gray-100 text-gray-600"}`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0A0847]">
                        {a.title}
                      </p>
                      <p className="text-xs text-[#7A7A7A] italic mt-0.5">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#7A7A7A] whitespace-nowrap ml-4">
                    {a.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quote banner */}
      <div className="relative rounded-lg overflow-hidden border border-[#E2DFFC] font-[Inter]">
        {/* Background Image */}
        <img
          src={adminDashboardImage}
          alt="Quote background"
          className="w-full h-auto min-h-[160px] object-cover"
        />

        {/* Centered Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xl md:text-2xl font-bold text-[#0A0847]">
            "Trust in the Lord with all your heart."
          </p>
          <p className="text-sm md:text-base font-semibold italic text-[#001984] mt-1.5">
            – Proverbs 3:5
          </p>
        </div>
      </div>
    </div>
  );
}