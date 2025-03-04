
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        sport: "",
      },
      sport: {
        football: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        basketball: "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200",
        tennis: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        volleyball: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        cricket: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200",
        default: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
      }
    },
    defaultVariants: {
      variant: "default",
      sport: "default",
    },
    compoundVariants: [
      {
        variant: "sport",
        sport: "football",
        class: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
      },
      {
        variant: "sport",
        sport: "basketball",
        class: "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200",
      },
      {
        variant: "sport",
        sport: "tennis",
        class: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      {
        variant: "sport",
        sport: "volleyball",
        class: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
      },
      {
        variant: "sport",
        sport: "cricket",
        class: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200",
      },
    ],
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    sport?: "football" | "basketball" | "tennis" | "volleyball" | "cricket" | "default";
}

function Badge({ className, variant, sport, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, sport }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
