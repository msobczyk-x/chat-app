import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Avatar } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

const ProfileDropdown = (props: any) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const { username } = props;
  const items: MenuProps["items"] = [
    {
      label: (
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-red-500" : "null"
          }
        >
          Profile
        </NavLink>
      ),
      key: "0",
    },
    {
      label: (
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-red-500" : "null"
          }
        >
          Chat
        </NavLink>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <NavLink to="/" onClick={handleLogout} className="flex flex-row">
          <svg
            className="w-5 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
          </svg>
          Logout
        </NavLink>
      ),
      key: "3",
    },
  ];

  return (
    <div className="w-full flex items-center justify-between py-4 px-5 md:py-5">
      <div className="font-sans font-bold text-3xl text-left lg:pl-5 ">
        <NavLink to="/" className="logo">
          Vibe
        </NavLink>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar size="large" icon={<UserOutlined />} />{" "}
            <p className="text-lg font-bold font-sans">{username}</p>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};
export default ProfileDropdown;
