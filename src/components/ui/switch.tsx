"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({ checked, onCheckedChange, className, ...props }: SwitchProps) {
  return (
    <label className={cn("inline-flex items-center cursor-pointer", className)}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
      <div className="w-10 h-6 bg-gray-300 peer-checked:bg-[#8B0000] rounded-full relative transition-colors">
        <div className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform", checked ? "translate-x-4" : "translate-x-0")} />
      </div>
    </label>
  )
}
