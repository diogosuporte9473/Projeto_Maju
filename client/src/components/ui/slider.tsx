import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: any) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  );
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      data-slot="slider"
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <(SliderPrimitive.Track as any)
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
      <SliderPrimitive.Track
        data-slot="slider-track"
      >
        <(SliderPrimitive.Range as any)
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        <SliderPrimitive.Range
          data-slot="slider-range"
        />
      </(SliderPrimitive.Track as any)>
      {Array.from({ length: _values.length }, (_, index) => (
        <(SliderPrimitive.Thumb as any)
      </SliderPrimitive.Track>
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
      ))}
    </SliderPrimitive.Root>
  );
}
export { Slider };
