// Mock JWT authentication utilities
// In a real app, these would connect to your backend API

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock user data for demo
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    password: "demo123",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    email: "test@example.com",
    name: "Test User",
    password: "test123",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b25aa310?w=150&h=150&fit=crop&crop=face",
  },
];

// Storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// Generate mock JWT token
function generateMockToken(user: User): string {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  return btoa(JSON.stringify(payload));
}

// Validate mock token
function validateToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

// Auth functions
export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  };

  const token = generateMockToken(userWithoutPassword);

  // Store in localStorage
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

  return { user: userWithoutPassword, token };
}

export async function register(
  email: string,
  password: string,
  name: string,
): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if user already exists
  if (MOCK_USERS.some((u) => u.email === email)) {
    throw new Error("User with this email already exists");
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=150&background=0ea5e9&color=ffffff`,
  };

  const token = generateMockToken(newUser);

  // Store in localStorage
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));

  return { user: newUser, token };
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);

    if (!token || !userStr) return null;

    const user = validateToken(token);
    return user;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
