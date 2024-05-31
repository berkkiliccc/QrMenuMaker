import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Navbar() {
  const handleLogout = async () => {
    try {
      console.log("Çıkış yapılıyor...");
      await signOut(auth);
      console.log("Çıkış başarılı");
    } catch (e) {
      console.error("Çıkış sırasında hata oluştu:", e);
    }
  };

  return (
    <div className="navbar z-50 bg-base-300 text-black ">
      <div className="flex-1">
        <div tabIndex={0} className="ml-2">
          <div className="w-10 ">
            <img
              alt="pionpos"
              src="https://app.pionpos.com/assets/icon-192x192-daBVoz4w.png"
            />
          </div>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          Qr Menu Maker
        </a>
      </div>
      {auth.currentUser !== null && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    auth.currentUser.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <a
                  href={`/profile/${auth.currentUser.uid}`}
                  className="justify-between btn m-1 btn-sm"
                >
                  <button className="">Profil</button>
                  <span className="badge bg-lime-500">New</span>
                </a>
              </li>
              <li>
                <button className="btn m-1 btn-sm">Settings</button>
              </li>
              <li>
                <button
                  className="btn btn-sm btn-error m-1 z-50"
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {auth.currentUser === null && (
        <div className="flex-none">
          <a href="/login" className="btn btn-outline btn-primary btn-sm m-2">
            Giriş Yap
          </a>
          <a href="/register" className="btn btn-outline btn-sm">
            Kayıt Ol
          </a>
        </div>
      )}
    </div>
  );
}
