import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./style.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user,  } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "feed", label: "Feed", icon: "📰", href: "/feed" },
    { id: "newpost", label: "Novo Post", icon: "✍️", href: "/newpost" },
    { id: "profile", label: "Perfil", icon: "👤", href: "/profile" },
    { id: "favorites", label: "Favoritos", icon: "⭐", href: "/favorites" },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    //logout();
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">MyCodeBlog</h1>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                  onClick={() => navigate(item.href)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* USER SECTION */}
        <div className="sidebar-footer">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="user-button-sidebar">
                {user?.id ? (
                  <img src={user.id} alt={user?.name} className="user-avatar-sidebar" />
                ) : (
                  <div className="user-avatar-placeholder-sidebar">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                {sidebarOpen && (
                  <span className="user-name-sidebar">{user?.name}</span>
                )}
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="dropdown-content" align="end">
                <DropdownMenu.Label className="dropdown-label">
                  {user?.name}
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="dropdown-separator" />
                <DropdownMenu.Item
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  👤 Perfil
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="dropdown-item"
                  onClick={() => navigate("/settings")}
                >
                  ⚙️ Configurações
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="dropdown-separator" />
                <DropdownMenu.Item
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  🚪 Sair
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="layout-main">
        {children}
      </div>
    </div>
  );
};

export default Layout;