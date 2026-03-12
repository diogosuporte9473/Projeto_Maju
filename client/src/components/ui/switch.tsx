import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
function Switch({
  className,
  ...props
}: any) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer focus-visible:border-ring focus-visible:ring-ring/50 dark:focus-visible:ring-ring/40 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-all focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      data-slot="switch"
        className
      )}
      {...props}
    >
      <(SwitchPrimitive.Thumb as any)
        className={cn(
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        )}
      />
    </SwitchPrimitive.Root>
  );
}
export { Switch };
