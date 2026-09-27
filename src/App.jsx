import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  Cloud,
  Database,
  Gauge,
  LayoutDashboard,
  Menu,
  Server,
  Settings,
  ShieldCheck,
  Users,
  X
} from "lucide-react";

const initialProjects = [
  { name: "Production API", status: "Healthy", region: "Mumbai", uptime: "99.98%", usage: 72 },
  { name: "Student Portal", status: "Healthy", region: "Singapore", uptime: "99.95%", usage: 54 },
  { name: "Analytics Service", status: "Warning", region: "Frankfurt", uptime: "98.91%", usage: 88 }
];

function App() {
  const [active, setActive] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [showNotification, setShowNotification] = useState(false);

  const navigation = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Projects", icon: Server },
    { label: "Analytics", icon: BarChart3 },
    { label: "Team", icon: Users },
    { label: "Security", icon: ShieldCheck },
    { label: "Settings", icon: Settings }
  ];

  const addProject = () => {
    const newProject = {
      name: `New Cloud App ${projects.length + 1}`,
      status: "Healthy",
      region: "Mumbai",
      uptime: "100.00%",
      usage: 12
    };
    setProjects([...projects, newProject]);
    setActive("Projects");
  };

  return (
    <div className="app-shell">
      {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Cloud size={21} /></div>
          <div>
            <strong>CloudBoard</strong>
            <span>Cloud Management</span>
          </div>
          <button className="close-mobile" onClick={() => setMobileOpen(false)}><X size={20} /></button>
        </div>

        <div className="workspace">
          <div className="workspace-avatar">CP</div>
          <div>
            <strong>Cloud Projects</strong>
            <span>Production workspace</span>
          </div>
        </div>

        <nav>
          <p className="nav-title">WORKSPACE</p>
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => {
                setActive(label);
                setMobileOpen(false);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot" />
          <div>
            <strong>All systems operational</strong>
            <span>Last checked just now</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>{active}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-btn" onClick={() => setShowNotification(!showNotification)} aria-label="Notifications">
              <Bell size={19} />
              <i />
            </button>
            <div className="profile">
              <div className="profile-avatar">SK</div>
              <div className="profile-text">
                <strong>Admin User</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {showNotification && (
          <div className="notification">
            <strong>Notifications</strong>
            <p>Analytics Service is using 88% of its current capacity.</p>
          </div>
        )}

        <section className="content">
          <div className="hero">
            <div>
              <p className="eyebrow">CLOUD CONTROL CENTER</p>
              <h1>Good afternoon, Admin.</h1>
              <p className="hero-copy">Monitor your applications, infrastructure and cloud resources from one place.</p>
            </div>
            <button className="primary-btn" onClick={addProject}>
              <span>+</span> Deploy project
            </button>
          </div>

          <div className="metrics">
            <Metric icon={<Activity />} label="Total Requests" value="2.84M" change="+18.4%" />
            <Metric icon={<Gauge />} label="Avg. Response" value="142ms" change="-12.6%" positive />
            <Metric icon={<Database />} label="Storage Used" value="428 GB" change="+8.2%" />
            <Metric icon={<ShieldCheck />} label="Security Score" value="96/100" change="+3.1%" positive />
          </div>

          <div className="section-heading">
            <div>
              <h2>Project overview</h2>
              <p>Current health and resource consumption</p>
            </div>
            <button className="text-btn" onClick={() => setActive("Projects")}>View all <ArrowUpRight size={16} /></button>
          </div>

          <div className="project-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          <div className="bottom-grid">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Resource usage</h3>
                  <p>Last 7 days</p>
                </div>
                <select defaultValue="7d">
                  <option value="7d">7 days</option>
                  <option value="30d">30 days</option>
                </select>
              </div>
              <div className="chart">
                {[42, 58, 47, 72, 64, 82, 69, 91, 74, 84, 78, 88].map((height, i) => (
                  <div className="bar-wrap" key={i}>
                    <div className="bar" style={{ height: `${height}%` }} />
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Recent activity</h3>
                  <p>Latest workspace events</p>
                </div>
              </div>
              <div className="activity-list">
                <ActivityItem title="Production API deployed" time="8 minutes ago" type="success" />
                <ActivityItem title="Database backup completed" time="34 minutes ago" type="success" />
                <ActivityItem title="Analytics capacity reached 88%" time="1 hour ago" type="warning" />
                <ActivityItem title="New team member added" time="3 hours ago" type="info" />
              </div>
            </div>
          </div>
        </section>

        <footer>© 2026 CloudBoard · React Cloud Application</footer>
      </main>
    </div>
  );
}

function Metric({ icon, label, value, change, positive }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-main">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className={`change ${positive ? "positive" : ""}`}>{change}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-top">
        <div className="server-icon"><Server size={20} /></div>
        <span className={`status ${project.status.toLowerCase()}`}>{project.status}</span>
      </div>
      <h3>{project.name}</h3>
      <p>{project.region} region</p>
      <div className="project-stats">
        <div><span>Uptime</span><strong>{project.uptime}</strong></div>
        <div><span>Usage</span><strong>{project.usage}%</strong></div>
      </div>
      <div className="progress"><span style={{ width: `${project.usage}%` }} /></div>
    </div>
  );
}

function ActivityItem({ title, time, type }) {
  return (
    <div className="activity-item">
      <span className={`activity-dot ${type}`} />
      <div><strong>{title}</strong><span>{time}</span></div>
    </div>
  );
}

export default App;