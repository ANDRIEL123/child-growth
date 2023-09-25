import * as React from "react"

import { cn } from "@/lib/utils"
import { Warning } from '@mui/icons-material'
import { Label } from "@radix-ui/react-label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string,
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, label, ...props }, ref) => {
    return (
      <div className="mb-2">
        <Label className={cn(
          "text-xs",
          errorMessage ? "text-red-400" : null,
        )}>{label}</Label>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            errorMessage ? "border-red-400" : null,
            className
          )}
          ref={ref}
          {...props}
        />
        {
          errorMessage ? (
            <span className="flex items-center text-red-400 text-sm mt-1">
              <Warning style={{ fontSize: 18 }} />
              <b className="ml-1.5 text-xs">{errorMessage}</b>
            </span>
          ) : null
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
