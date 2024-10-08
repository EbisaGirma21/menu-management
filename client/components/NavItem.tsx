// NavItem Component Type Definition
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
}) => {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-4 text-sm ${
        active
          ? "bg-[#9FF443] text-black rounded-md"
          : "text-[#667085] hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  );
};
