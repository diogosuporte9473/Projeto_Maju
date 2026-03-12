import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
function Drawer({
  ...props
}: any) {
  return <DrawerPrimitive.Root {...props} />;
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
  ...props
}: any) {
  return <DrawerPrimitive.Trigger {...props} />;
}
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}: any) {
  return <DrawerPrimitive.Portal {...props} />;
}
function DrawerClose({
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
  return <DrawerPrimitive.Close {...props} />;
}
function DrawerOverlay({
  className,
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
  return (
    <DrawerPrimitive.Overlay
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
      {...props}
    />
      data-slot="drawer-overlay"
  );
}
function DrawerContent({
  className,
  children,
  ...props
}: any) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
    <DrawerPortal data-slot="drawer-portal">
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        data-slot="drawer-content"
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  );
}
      data-slot="drawer-header"
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}
function DrawerTitle({
  className,
  ...props
}: any) {
      data-slot="drawer-footer"
  return (
    <DrawerPrimitive.Title
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}
function DrawerDescription({
  className,
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
}: any) {
  return (
      data-slot="drawer-title"
    <DrawerPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
export {
  Drawer,
  DrawerPortal,
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  DrawerTrigger,
  DrawerClose,
      data-slot="drawer-description"
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
