"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, getMe, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type AuthProviderProps = {
  children: ReactNode;
};

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const verifySession = async () => {
      setIsLoading(true);

      const isPrivateRoute = privateRoutes.some((route) =>
        pathname.startsWith(route),
      );

      const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route),
      );

      try {
        const session = await checkSession();

        if (ignore) return;

        if (session.success) {
          const user = await getMe();

          if (ignore) return;

          setUser(user);

          if (isAuthRoute) {
            router.replace("/profile");
          }

          return;
        }

        clearIsAuthenticated();

        if (isPrivateRoute) {
          await logout().catch(() => undefined);
          router.replace("/sign-in");
        }
      } catch {
        if (ignore) return;

        clearIsAuthenticated();

        if (isPrivateRoute) {
          await logout().catch(() => undefined);
          router.replace("/sign-in");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      ignore = true;
    };
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <>{children}</>;
}
