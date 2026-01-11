import * as React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

interface NavigationButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof Button> {
  /**
   * The text to display on the button
   */
  children: React.ReactNode;
  /**
   * Whether to show the arrow icon
   * @default true
   */
  showArrow?: boolean;
  /**
   * Custom icon to use instead of the default arrow
   */
  icon?: React.ReactNode;
  /**
   * Arrow animation direction
   * @default "right"
   */
  arrowDirection?: "right" | "left" | "up" | "down";
  /**
   * Whether the component should render as a child element
   */
  asChild?: boolean;
}

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(
  (
    {
      children,
      showArrow = true,
      icon,
      arrowDirection = "right",
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const arrowRotation = {
      right: "rotate-0",
      left: "rotate-180",
      up: "-rotate-90",
      down: "rotate-90",
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        asChild={asChild}
        className={cn("group relative overflow-hidden ", className)}
        {...props}
      >
        <span className="flex items-center justify-center ">
          <span className="px-1">{children}</span>
          {showArrow && (
            <span className="relative inline-flex items-center justify-center w-0 group-hover:w-4 h-4 overflow-hidden transition-all duration-300 ease-out">
              {/* Arrow - slides in from left */}
              <span
                className={cn(
                  "absolute transition-all duration-300 ease-in-out",
                  "-translate-x-5 opacity-0",
                  "group-hover:translate-x-0 group-hover:opacity-100",
                  arrowRotation[arrowDirection]
                )}
              >
                {icon || <ChevronRight className="w-4 h-4" />}
              </span>
            </span>
          )}
        </span>
      </Button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";

export { NavigationButton };
export type { NavigationButtonProps };
