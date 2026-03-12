import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
function Progress({
  className,
  value,
  ...props
}: any) {
  return (
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
      data-slot="progress"
        className
      )}
      {...props}
    >
      <(ProgressPrimitive.Indicator as any)
        className="bg-primary h-full w-full flex-1 transition-all"
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
      />
    </ProgressPrimitive.Root>
  );
}
export { Progress };
