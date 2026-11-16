import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserRound, LogOut } from "lucide-react";
import { UserContext } from "../context/UserContext";

export default function Topbar() {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const name = user?.clientName || user?.name || "My account";
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { setImageFailed(false); }, [user?.profileImg]);
  useEffect(() => {
    if (!open) return;
    const outside = event => { if (!dropdownRef.current?.contains(event.target)) setOpen(false); };
    const escape = event => { if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <header className="dashboard-topbar">
    <div className="profile-dropdown" ref={dropdownRef} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button ref={triggerRef} type="button" className="profile-trigger" aria-label="Open profile options" aria-expanded={open} aria-controls="profile-options" onClick={() => setOpen(!open)}>
        {user?.profileImg && !imageFailed ? <img src={user.profileImg} alt={`${name} profile`} onError={() => setImageFailed(true)} /> : <span className="account-avatar">{name.charAt(0).toUpperCase()}</span>}
      </button>
      {open && <div id="profile-options" className="profile-dropdown-panel">
        <Link to="/dashboard/profile" onClick={() => setOpen(false)}><UserRound size={17} />Profile</Link>
        <button type="button" onClick={() => { setOpen(false); logout(); navigate("/login", { replace: true }); }}><LogOut size={17} />Logout</button>
      </div>}
    </div>
  </header>;
}
