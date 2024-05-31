import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Giriş başarılı", auth.currentUser);
      navigate("/");
    } catch (e) {
      handleError(e);
      console.error(e);
    }
  };

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

  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Giriş Yap</h1>

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
              handleLogin();
            }}
          >
            <div className="form-control">
              {errorMessage && (
                <div
                  role="alert"
                  className="alert alert-error "
                  onClick={() => setErrorMessage(null)}
                >
                  <span>{errorMessage}</span>
                </div>
              )}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary"
                >
                  Şifremi unuttum
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Giriş Yap</button>
            </div>
            <div className="form-control mt-6">
              <p className="text-center">
                Hesabınız yok mu?
                <a href="/register" className="link link-hover text-primary">
                  Kayıt Ol
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
