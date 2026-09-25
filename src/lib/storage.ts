// Simple localStorage helpers for THE Connect (client-side only)

export function getUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("the_connect_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("the_connect_user", JSON.stringify(user));
}

export function getMessages(channel: string = "community") {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`the_connect_msgs_${channel}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMessages(channel: string, messages: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`the_connect_msgs_${channel}`, JSON.stringify(messages));
}

export function getDatingProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("the_connect_dating_profile");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDatingProfile(profile: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("the_connect_dating_profile", JSON.stringify(profile));
}

export function getMatches() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("the_connect_matches");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMatches(matches: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("the_connect_matches", JSON.stringify(matches));
}

export function getTheme() {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("the_connect_theme") || "light";
}

export function saveTheme(theme: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("the_connect_theme", theme);
}
