import { useEffect, useState } from "react";
import Router from "./Router/Router";
import Navbar from "./components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 dakika
        cacheTime: 1000 * 60 * 10, // 10 dakika
        refetchOnWindowFocus: false, // Pencereye odaklanıldığında tekrar fetch etme
      },
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
