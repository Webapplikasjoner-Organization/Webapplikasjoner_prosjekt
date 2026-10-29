export const SESSION_COOKIE = "session";

export const SESSION_MAX_AGE = 60 * 60;

/**
 * Bygger verdien til `Set-Cookie`. Attributtene er halve sikkerheten:
 *
 *   HttpOnly       JavaScript får ikke lese den (document.cookie). Klarer noen
 *                  å kjøre kode på siden (XSS), får de ikke med seg sesjonen
 *   SameSite=Lax   sendes ikke med når ANDRE nettsteder poster skjema eller
 *                  kaller fetch hit (CSRF)
 *   Path=/         gjelder alle ruter
 *   Max-Age        sekunder til nettleseren kaster den. 0 betyr "slett nå"
 *   Secure         sendes bare over HTTPS
 */

//Header med session-cookie
function serializeCookie(value: string, maxAge: number) {
  // Skru av https krav lokalt
  const secure = !import.meta.env.VITE_IS_DEV_SERVER;

  return [
    `${SESSION_COOKIE}=${value}`,
    "HttpOnly",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${maxAge}`,
    ...(secure ? ["Secure"] : []),
  ].join("; ");
}

/** Innlogging: cookien nettleseren skal ta vare på. */
export function createSessionCookie(userId: string) {
  return serializeCookie(encodeURIComponent(userId), SESSION_MAX_AGE);
}

// setter Max-Age=0. Da kaster nettleseren den selv.
export function clearSessionCookie() {
  return serializeCookie("", 0);
}

export function readSessionUserId(request: Request): string | null {
  const value = readCookie(request.headers.get("cookie"), SESSION_COOKIE);
  return value ? value : null;
}

// annet=1; session=2
export function readCookie(cookieHeader: string | null, name: string) {
  for (const part of cookieHeader?.split(";") ?? []) {
    const index = part.indexOf("=");
    if (index === -1 || part.slice(0, index).trim() !== name) continue;

    try {
      return decodeURIComponent(part.slice(index + 1).trim());
    } catch {
      // Ugyldig %-koding. Headeren kommer utenfra, og skal aldri velte serveren.
      return undefined;
    }
  }

  return undefined;
}
