import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas que son explícitamente públicas (accesibles sin autenticación)
const PUBLIC_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica la existencia de la cookie de autenticación.
  // En un entorno de producción real, aquí validarías un token JWT seguro
  // con Firebase Admin SDK en un backend para mayor seguridad.
  const isAuthenticated = request.cookies.has("firebaseAuthToken");

  // Si el usuario NO está autenticado Y la ruta NO es pública
  if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
    // Redirige al usuario a la página de login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si el usuario SÍ está autenticado Y está intentando acceder a una ruta pública (login/register)
  // Lo redirigimos a la página principal del chat. Esto evita que un usuario logueado
  // vea las pantallas de login/registro.
  if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // Si ninguna de las condiciones anteriores se cumple, permite que la solicitud continúe.
  return NextResponse.next();
}

// Define qué rutas deben pasar por este middleware.
// Captura todas las rutas excepto las API routes, archivos estáticos de Next.js,
// imágenes optimizadas y el favicon.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
