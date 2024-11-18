"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:shadow-md",
      className
    )}
    {...props}
  />
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }