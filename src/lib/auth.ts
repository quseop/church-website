export interface AdminUser {
  id: string
  username: string
  role: "admin"
}

// Simple admin credentials - in production, this would be in a secure database
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "church2024", // Change this in production
}

export class AuthService {
  private static readonly TOKEN_KEY = "admin_token"
  private static readonly USER_KEY = "admin_user"

  static async login(
    username: string,
    password: string,
  ): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const user: AdminUser = {
        id: "1",
        username,
        role: "admin",
      }

      // Store in localStorage
      localStorage.setItem(this.TOKEN_KEY, "admin_token_" + Date.now())
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))

      return { success: true, user }
    }

    return { success: false, error: "Invalid credentials" }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static getCurrentUser(): AdminUser | null {
    if (typeof window === "undefined") return null

    const token = localStorage.getItem(this.TOKEN_KEY)
    const userStr = localStorage.getItem(this.USER_KEY)

    if (!token || !userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}
