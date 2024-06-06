import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="drawer-open w-full h-full ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side  ">
        <ul className="menu p-4 w-full md:w-full lg:w-full  min-h-full h-full bg-base-200 text-base-content ">
          {/* Sidebar content here */}
          <li>
            <button
              className="btn btn-outline btn-md mb-3"
              onClick={() => {
                navigate(`/profile/${auth.currentUser.uid}/inventory`);
              }}
            >
              Envanter
            </button>
          </li>
          <li>
            <button
              className="btn btn-outline btn-md"
              onClick={() => {
                navigate(`/profile/${auth.currentUser.uid}/qr-menu`);
              }}
            >
              QR Menü Ayarları
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
