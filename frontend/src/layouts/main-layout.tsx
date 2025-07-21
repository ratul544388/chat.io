import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  const { setUser, loading, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (loading) {
    return "Loading...";
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
