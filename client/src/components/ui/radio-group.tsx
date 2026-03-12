import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
function RadioGroup({
  className,
  ...props
}: any) {
  return (
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
      className={cn("grid gap-3", className)}
      {...props}
      data-slot="radio-group"
    />
  );
}
function RadioGroupItem({
  className,
  ...props
}: any) {
  return (
    <RadioGroupPrimitive.Item
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      data-slot="radio-group-item"
      )}
      {...props}
    >
      <(RadioGroupPrimitive.Indicator as any)
        className={cn("relative flex items-center justify-center", className)}
        {...props}
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
    </RadioGroupPrimitive.Item>
  );
      </RadioGroupPrimitive.Indicator>
export { RadioGroup, RadioGroupItem };
