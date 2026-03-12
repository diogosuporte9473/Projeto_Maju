import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
function DropdownMenu({
  ...props
}: any) {
  return <DropdownMenuPrimitive.Root {...props} />;
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.Portal {...props} />
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
}
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.Trigger
      {...props}
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  );
}
      data-slot="dropdown-menu-trigger"
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        data-slot="dropdown-menu-content"
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
function DropdownMenuGroup({
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.Group {...props} />
  );
}
function DropdownMenuItem({
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  inset,
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.Item
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
      )}
      {...props}
      data-slot="dropdown-menu-item"
    />
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      data-slot="dropdown-menu-checkbox-item"
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}
function DropdownMenuRadioGroup({
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      {...props}
    />
  );
}
function DropdownMenuRadioItem({
  className,
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  ...props
}: any) {
      data-slot="dropdown-menu-radio-group"
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      data-slot="dropdown-menu-radio-item"
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.Label
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  );
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
function DropdownMenuSeparator({
  className,
      data-slot="dropdown-menu-label"
  ...props
}: any) {
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
    <DropdownMenuPrimitive.Separator
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
    <span
      className={cn(
      data-slot="dropdown-menu-separator"
        "ml-auto text-xs tracking-widest opacity-60",
        className
      )}
      {...props}
    />
  );
}
function DropdownMenuSub({
  ...props
}: any) {
  return <DropdownMenuPrimitive.Sub {...props} />;
}
      data-slot="dropdown-menu-shortcut"
function DropdownMenuSubTrigger({
        "text-muted-foreground ml-auto text-xs tracking-widest",
  inset,
  children,
  ...props
}: any) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-inset={inset}
      className={cn(
        "focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  className,
  ...props
      data-slot="dropdown-menu-sub-trigger"
}: any) {
  return (
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-sub-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  );
}
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  DropdownMenuLabel,
  DropdownMenuItem,
      data-slot="dropdown-menu-sub-content"
  DropdownMenuCheckboxItem,
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
