import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    label?: string;
    error?: string;
  }
>(({ className, label, error, ...props }, ref) => {
  const id = React.useId()
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-purple-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-base text-purple-900 shadow-sm transition-all duration-200",
          "placeholder:text-purple-400",
          "focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-purple-50",
          "resize-y",
          error && "border-pink-500 focus:border-pink-500 focus:ring-pink-200",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-pink-600">{error}</p>
      )}
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }