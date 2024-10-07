interface NavItemProps {
    icon: JSX.Element;
    label: string;
    active?: boolean;
  }
  
  const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => {
    return (
      <a
        href="#"
        className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-[#38bdf8] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </a>
    );
  };
  
  export default NavItem;
  