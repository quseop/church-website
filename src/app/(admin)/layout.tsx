"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Admin routes are protected in middleware; we don't need to check session here.
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">OSM Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/admin"
              className={cn(
                "border-b-2 py-4 px-1 text-sm font-medium",
                isActive("/admin") ? "border-[#8B0000] text-[#8B0000]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/content"
              className={cn(
                "border-b-2 py-4 px-1 text-sm font-medium",
                isActive("/admin/content") ? "border-[#8B0000] text-[#8B0000]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              )}
            >
              Content Management
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
