import { Menu } from "@headlessui/react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// interface Props {
//
// }

export const DropdownMenu = () => {
  const { logOut } = useAuthContext();
  const navigate = useNavigate();

  function handleLogoutClick() {
    logOut();
  }
  return (
    <Menu as="div" className="dropdown-end dropdown">
      <Menu.Button tabIndex={0} className="rounded-full focus:outline-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 text-white hover:cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      </Menu.Button>
      <Menu.Items
        as="ul"
        tabIndex={0}
        className=" dropdown-content menu rounded-box w-52 bg-primary bg-opacity-40 p-4 font-semibold text-white shadow backdrop-blur-lg"
      >
        <Menu.Item as="li" onClick={handleLogoutClick}>
          {({ active }) => (
            <button
              className={`justify-end ${
                active ? "bg-primary-dark bg-opacity-50" : ""
              }`}
            >
              Logout
            </button>
          )}
        </Menu.Item>
        <Menu.Item as="li" onClick={() => navigate("/delete-account")}>
          {({ active }) => (
            <button
              className={`justify-end ${
                active ? "bg-primary-dark bg-opacity-50" : ""
              }`}
            >
              Delete account
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
