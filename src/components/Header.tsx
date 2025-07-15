import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
// import { FiMenu } from "react-icons/fi";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
      await navigate("/login");
    } catch (error) {
      toast.error("Sign Out Fail");
      console.error(error);
    }
  };

  return (
    <nav className="header">
      {/* <div className="left-icons">
        <FiMenu size={25} className="icon" />
      </div> */}

      <div className="nav-links">
        <Link onClick={() => setIsOpen(false)} to={"/"}>
          HOME
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/search"}>
          COLLECTION
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/"}>
          NEW
        </Link>
      </div>

      <div className="right-icons">
        <Link onClick={() => setIsOpen(false)} to={"/search"}>
          <FaSearch size={25} className="icon" />
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/cart"}>
          <FaShoppingBag size={25} className="icon" />
        </Link>

        {user?._id ? (
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FaUserCircle size={25} className="icon" />
            </button>
            <dialog open={isOpen}>
              <div>
                {user.role === "admin" && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                )}

                <Link onClick={() => setIsOpen(false)} to="/orders">
                  Orders
                </Link>

                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
