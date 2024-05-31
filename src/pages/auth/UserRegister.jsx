import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        setErrorMessage("Geçersiz Email");
        break;
      case "auth/user-not-found":
        setErrorMessage("Kullanıcı Bulunamadı");
        break;
      case "auth/wrong-password":
        setErrorMessage("Yanlış Şifre");
        break;
      case "auth/invalid-credential":
        setErrorMessage("Geçersiz Kimlik Bilgisi");
        break;
      case "auth/too-many-requests":
        setErrorMessage(
          "Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin."
        );
        break;
      case "auth/network-request-failed":
        setErrorMessage("İnternet bağlantınızı kontrol edin.");
        break;
      case "auth/email-already-in-use":
        setErrorMessage("Bu email adresi zaten kullanımda");
        break;

      default:
        setErrorMessage("Bir hata oluştu");
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const newUser = userCredential.user;

      console.log(newUser);

      await updateProfile(newUser, {
        displayName: user.userName,
      });

      await setDoc(doc(db, "users", newUser.uid), {
        userId: newUser.uid,
        email: user.email,
        userName: user.userName,
        gender: "",
        phonoNumber: "",
        profileCreatedAt: new Date().toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        isBusiness: false,
      });

      // Giriş sayfasına yönlendir
      navigate("/");
    } catch (error) {
      console.error(error.message);
      handleError(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Kayıt Ol </h1>
          <p className="py-6">
            Tek bir uygulama ile tüm mekanların QR menülerini görebilir ve
            sipariş verebilirsiniz.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            className="card-body"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            {errorMessage && (
              <div
                role="alert"
                className="alert alert-error "
                onClick={() => setErrorMessage(null)}
              >
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Kullanıcı Adı</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Şifre</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                minLength={4}
                maxLength={16}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
              {/* <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-primary"
                  >
                    Şifremi unuttum
                  </a>
                </label> */}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Kayıt Ol</button>
            </div>
            <div className="form-control mt-6">
              <p className="text-center">
                İşletme sahibiyim ?
                <a
                  href="/business-register"
                  className="link link-hover text-primary"
                >
                  <br /> Kayıt Ol
                </a>
              </p>
            </div>
            <div className="form-control mt-6">
              <p className="text-center">
                Hesabınız var mı ?
                <a href="/login" className="link link-hover text-primary">
                  <br /> Giriş Yap
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
