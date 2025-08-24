This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  assets/
    react.svg
  components/
    ui/
      button.tsx
      card.tsx
      dropdown-menu.tsx
    loading.tsx
    mode-toggle.tsx
    pinataFileUpload.tsx
    theme-provider.tsx
  layouts/
    layout.tsx
  lib/
    axios.ts
    utils.ts
  modules/
    midnight/
      counter-ui/
        api/
          common-types.ts
          contractController.ts
        contexts/
          counter-deployment-class.ts
          counter-deployment.tsx
          counter-localStorage-class.ts
          counter-localStorage.tsx
          counter-providers.tsx
          index.tsx
        hooks/
          index.ts
          use-contract-subscription.ts
          use-deployment.ts
          use-localStorage.ts
          use-providers.ts
        index.ts
      wallet-widget/
        common/
          icons/
            icon-book-dashed.tsx
            icon-chevron-right.tsx
            icon-download.tsx
            icon-fingerprint.tsx
            icon-lace.tsx
            icon-monitor-smartphone.tsx
            icon-plus.tsx
          button.tsx
          cn.ts
          dialog.tsx
          dropdown-menu.tsx
          tooltip.tsx
        midnight-wallet/
          connected-button.tsx
          data.ts
          index.tsx
          screen-main.tsx
          wallet-icon.tsx
        index.ts
  pages/
    about/
      index.tsx
    home/
      index.tsx
    leaks/
      index.tsx
    post/
      index.tsx
  App.tsx
  globals.ts
  index.css
  main.tsx
  vite-env.d.ts
index.html
package.json
README.md
```

# Files

## File: src/assets/react.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: src/components/ui/button.tsx
```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

## File: src/components/ui/card.tsx
```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
```

## File: src/components/ui/dropdown-menu.tsx
```typescript
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
```

## File: src/components/loading.tsx
```typescript
export const Loading = () => {
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
};
```

## File: src/components/mode-toggle.tsx
```typescript
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## File: src/components/pinataFileUpload.tsx
```typescript
'use client'
import { useEffect, useState } from 'react'
import { PinataSDK } from 'pinata'
import { axiosInstance } from '@/lib/axios'

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || "",
  pinataGateway: process.env.PINATA_GATEWAY_URL || "https://gateway.pinata.cloud"
})

interface PinataFileUploadProps {
  onUploaded: (link: string) => void,
  title: string,
  description: string,
}

function PinataFileUpload({onUploaded, title, description}: PinataFileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uri, setUri] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const getUploadUrl = async () => {
    try {
      setUploadStatus('Getting upload URL...')
      const urlResponse = await axiosInstance.get(`/presigned_url`)
      console.log(urlResponse)
      const data = urlResponse.data
      return data.url
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleUploadImage = async () => {
    if (!file) return

    try {
      setUploadStatus('Getting upload URL...')
      const url = await getUploadUrl()
      console.log(url)

      setUploadStatus('Uploading file...')

      const upload = await pinata.upload.private
        .file(file)
        .url(url)

      if (upload.cid) {
        setUploadStatus('File uploaded successfully!')
        handleUploadJson(upload.cid)
        setUri(upload.cid)
      } else {
        setUploadStatus('Upload failed')
      }
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)} [Is the server running?]`)
    }
  }

  const handleUploadJson = async (imagecid: string) => {
    try {
      setUploadStatus('Uploading JSON...')
      const url = await getUploadUrl()
      const jsonUpload = await pinata.upload.private
        .json({
          title,
          description,
          imagecid,
        }).url(url)
      if (jsonUpload.cid) {
        setUploadStatus('JSON uploaded successfully!')
        onUploaded(jsonUpload.cid)
      } else {
        setUploadStatus('Upload failed')
      }
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }


  const readUri = async () => {
    try {
      const response = await axiosInstance.get(`/read_uri/${uri}`)
      console.log(response)

      const file = response.data.file
      console.log(file)

      const url = file.url
      console.log(url)

      const image = new Image()
      image.src = url
    } catch (error) {
      // setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  useEffect(() => {
    if (uri) {
      readUri()
    }
  }, [uri])

  return (
    <>
      <div>
      </div>
      <h1>Pinata File Upload</h1>
      <div className="card">
        <input type="file" onChange={handleFileChange} />
        <button className="bg-black text-white p-2 rounded-md" onClick={handleUploadImage} disabled={!file}>
          Upload to Pinata
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
        {file && <img src={file.name} alt={file.name} />}
      </div>
    </>
  )
}

export default PinataFileUpload
```

## File: src/components/theme-provider.tsx
```typescript
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
```

## File: src/layouts/layout.tsx
```typescript
import { Outlet, NavLink } from "react-router-dom";
import { MidnightWallet } from "@/modules/midnight/wallet-widget";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow">
        <nav className="container mx-auto flex  p-4">
          <div className="container mx-auto flex  p-4 gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold transition hover:opacity-80 ${isActive ? "underline" : ""}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/post"
              className={({ isActive }) =>
                `font-semibold transition hover:opacity-80 ${isActive ? "underline" : ""}`
              }
            >
              Submit Leak
            </NavLink>
            <NavLink
              to="/leaks"
              className={({ isActive }) =>
                `font-semibold transition hover:opacity-80 ${isActive ? "underline" : ""}`
              }
            >
              Explore Leaks
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-semibold transition hover:opacity-80 ${isActive ? "underline" : ""}`
              }
            >
              About
            </NavLink>
          </div>
          <div className="h-full p-4">
            <MidnightWallet />
          </div>
        </nav>
      </header>
      <main className="container mx-auto flex-1 py-6">
        <Outlet />
      </main>
    </div>
  );
};
```

## File: src/lib/axios.ts
```typescript
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

## File: src/lib/utils.ts
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## File: src/modules/midnight/counter-ui/api/common-types.ts
```typescript
import { type CounterPrivateState, type Contract, Ledger, createPrivateState } from '@meshsdk/counter-contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type CounterCircuits = ImpureCircuitId<Contract<CounterPrivateState>>;

export const CounterPrivateStateId = 'counterPrivateState';

export type CounterProviders = MidnightProviders<CounterCircuits, typeof CounterPrivateStateId, CounterPrivateState>;

export type CounterContract = Contract<CounterPrivateState>;

export type DeployedCounterContract = DeployedContract<CounterContract> | FoundContract<CounterContract>;

export type Leak = {
  id: bigint;
  uri: string;
  donation_addr: string;
  donated: bigint;
};

export type UserAction = {
  increment: string | undefined;
  createLeak: string | undefined;
};

export type DerivedState = {
  readonly round: Ledger["round"];
  readonly privateState: CounterPrivateState;
  readonly turns: UserAction;
  readonly leaks: Ledger["leaks"];
  readonly nextLeakId: Ledger["nextLeakId"];
};

export const emptyState: DerivedState = {
  round: 0n,
  privateState: createPrivateState(0),
  turns: { increment: undefined, createLeak: undefined },
  leaks: {
    isEmpty: () => true,
    size: () => 0n,
    member: () => false,
    lookup: () => ({ id: 0n, uri: "", donation_addr: "", donated: 0n }),
    [Symbol.iterator]: () => [][Symbol.iterator]()
  },
  nextLeakId: 0n,
};
```

## File: src/modules/midnight/counter-ui/api/contractController.ts
```typescript
import { type Logger } from 'pino';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { type Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { CounterContract, CounterPrivateStateId, CounterProviders, DeployedCounterContract, emptyState, UserAction, type DerivedState } from './common-types';
import { Contract, ledger, CounterPrivateState, createPrivateState, witnesses } from '@meshsdk/counter-contract';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { PrivateStateProvider } from '@midnight-ntwrk/midnight-js-types';

export const counterContractInstance: CounterContract = new Contract(witnesses);

export interface ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;   
  readonly state$: Observable<DerivedState>;
  increment: () => Promise<void>;
  createLeak: (uri: string, donation_addr: string) => Promise<void>;
}

export class ContractController implements ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;
  readonly turns$: Rx.Subject<UserAction>;
  readonly state$: Observable<DerivedState>;
  readonly privateStates$: Rx.Subject<CounterPrivateState>;

  private constructor(
    public readonly contractPrivateStateId: typeof CounterPrivateStateId,
    public readonly deployedContract: DeployedCounterContract,
    public readonly providers: CounterProviders,
    private readonly logger: Logger,
  ) {
    const combine = (_acc: DerivedState, value: DerivedState): DerivedState => {
      return {
        round: value.round,
        privateState: value.privateState,
        turns: value.turns,
        leaks: value.leaks,
        nextLeakId: value.nextLeakId,
      };
    };
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    this.turns$ = new Rx.Subject<UserAction>();
    this.privateStates$ = new Rx.Subject<CounterPrivateState>();
    this.state$ = Rx.combineLatest(
      [
        providers.publicDataProvider
          .contractStateObservable(this.deployedContractAddress, { type: 'all' })
          .pipe(Rx.map((contractState) => ledger(contractState.data))),
        Rx.concat(
          Rx.from(
            Rx.defer(() => providers.privateStateProvider.get(contractPrivateStateId) as Promise<CounterPrivateState>),
          ),
          this.privateStates$,
        ),
        Rx.concat(Rx.of<UserAction>({ increment: undefined, createLeak: undefined }), this.turns$),
      ],
      (ledgerState, privateState, userActions) => {
        const result: DerivedState = {
          round: ledgerState.round,
          privateState: privateState,
          turns: userActions,
          leaks: ledgerState.leaks,
          nextLeakId: ledgerState.nextLeakId,
        };
        return result;
      },
    ).pipe(
      Rx.scan(combine, emptyState),
      Rx.retry({
        // sometimes websocket fails, if want to add attempts, include count in the object
        delay: 500,
      }),
    );
  }

  async increment(): Promise<void> {
    this.logger?.info('incrementing counter');
    this.turns$.next({ increment: 'incrementinng the counter', createLeak: undefined });

    try {
      const txData = await this.deployedContract.callTx.increment();
      this.logger?.trace({
        increment: {
          message: 'incrementing the counter - blockchain info',
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      this.turns$.next({
        increment: undefined,
        createLeak: undefined,
      });
    } catch (e) {
      this.turns$.next({
        increment: undefined,
        createLeak: undefined,
      });
      throw e;
    }
  }

  async createLeak(uri: string, donation_addr: string): Promise<void> {
    this.logger?.info('creating leak');
    this.turns$.next({ increment: undefined, createLeak: 'creating leak' });

    try {
      const txData = await this.deployedContract.callTx.createLeak(uri, donation_addr);
      this.logger?.trace({
        createLeak: {
          message: 'creating leak - blockchain info',
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      this.turns$.next({
        increment: undefined,
        createLeak: undefined,
      });
    } catch (e) {
      this.turns$.next({
        increment: undefined,
        createLeak: undefined,
      });
      throw e;
    }
  }



  static async deploy(
    contractPrivateStateId: typeof CounterPrivateStateId,    
    providers: CounterProviders,
    logger: Logger,
  ): Promise<ContractController> {
    logger.info({
      deployContract: {
        action: "Deploying contract",
        contractPrivateStateId, 
        providers       
      },
    });    
    const deployedContract = await deployContract(providers, {
      privateStateId: contractPrivateStateId,
      contract: counterContractInstance,
      initialPrivateState: await ContractController.getPrivateState(contractPrivateStateId, providers.privateStateProvider),      
    });

    logger.trace({
      contractDeployed: {
        action: "Contract was deployed",
        contractPrivateStateId,
        finalizedDeployTxData: deployedContract.deployTxData.public,
      },
    });

    return new ContractController(contractPrivateStateId, deployedContract, providers, logger);
  }

  static async join(
    contractPrivateStateId: typeof CounterPrivateStateId,   
    providers: CounterProviders,
    contractAddress: ContractAddress,
    logger: Logger,
  ): Promise<ContractController> {
    logger.info({
      joinContract: {
        action: "Joining contract",
        contractPrivateStateId,
        contractAddress,
      },
    });

    const deployedContract = await findDeployedContract(providers, {
      contractAddress,
      contract: counterContractInstance,
      privateStateId: contractPrivateStateId,
      initialPrivateState: await ContractController.getPrivateState(contractPrivateStateId, providers.privateStateProvider),
    });

    logger.trace({
      contractJoined: {
        action: "Join the contract successfully",
        contractPrivateStateId,
        finalizedDeployTxData: deployedContract.deployTxData.public,
      },
    });

    return new ContractController(contractPrivateStateId, deployedContract, providers, logger);
  }

  private static async getPrivateState(
    counterPrivateStateId: typeof CounterPrivateStateId,
    privateStateProvider: PrivateStateProvider<typeof CounterPrivateStateId, CounterPrivateState>,
  ): Promise<CounterPrivateState> {
    const existingPrivateState = await privateStateProvider.get(counterPrivateStateId);
    const initialState = await this.getOrCreateInitialPrivateState(counterPrivateStateId, privateStateProvider);
    return existingPrivateState ?? initialState;
  }

  static async getOrCreateInitialPrivateState(
    counterPrivateStateId: typeof CounterPrivateStateId,
    privateStateProvider: PrivateStateProvider<typeof CounterPrivateStateId, CounterPrivateState>,
  ): Promise<CounterPrivateState> {
    let state = await privateStateProvider.get(counterPrivateStateId);
    
    if (state === null) {
      state = this.createPrivateState(0);
      await privateStateProvider.set(counterPrivateStateId, state);
    }
    return state;
  }

  private static createPrivateState(value: number): CounterPrivateState {    
    return createPrivateState(value);
  }
}
```

## File: src/modules/midnight/counter-ui/contexts/counter-deployment-class.ts
```typescript
import {
  type CounterProviders,
  CounterPrivateStateId,
} from "../api/common-types";
import { type ContractAddress } from "@midnight-ntwrk/compact-runtime";
import { BehaviorSubject } from "rxjs";
import { type Logger } from "pino";
import { type LocalStorageProps } from "./counter-localStorage-class";
import {
  ContractController,
  ContractControllerInterface,
} from "../api/contractController";

export type ContractDeployment =  
  | InProgressContractDeployment
  | DeployedContract
  | FailedContractDeployment;

export interface InProgressContractDeployment {
  readonly status: "in-progress";
  readonly address?: ContractAddress;
}

export interface DeployedContract {
  readonly status: "deployed";
  readonly api: ContractControllerInterface;
  readonly address: ContractAddress;
}

export interface FailedContractDeployment {
  readonly status: "failed";
  readonly error: Error;
  readonly address?: ContractAddress;
}

export interface ContractFollow {
  readonly observable: BehaviorSubject<ContractDeployment>;
  address?: ContractAddress;
}

export interface DeployedAPIProvider {  
  readonly joinContract: () => ContractFollow;
  readonly deployContract: () => Promise<ContractFollow>;
}

export class DeployedTemplateManager implements DeployedAPIProvider {
  constructor(
    private readonly logger: Logger,
    private readonly localState: LocalStorageProps,    
    private readonly contractAddress: ContractAddress,
    private readonly providers?: CounterProviders
  ) {}

  joinContract(): ContractFollow {
    const deployment = new BehaviorSubject<ContractDeployment>({
      status: "in-progress",
      address: this.contractAddress,
    });
    const contractFollow = {
      observable: deployment,
      address: this.contractAddress,
    };

    void this.join(deployment, this.contractAddress);

    return contractFollow;
  }

  async deployContract(): Promise<ContractFollow> {
    const deployment = new BehaviorSubject<ContractDeployment>({
      status: "in-progress",
    });

    const address = await this.deploy(deployment);

    return { observable: deployment, address };
  }

  private async deploy(
    deployment: BehaviorSubject<ContractDeployment>
  ): Promise<string | undefined> {
    try {
      if (this.providers) {
        const api = await ContractController.deploy(
          CounterPrivateStateId,
          this.providers,
          this.logger
        );
        // this.localState.setContractPrivateId(CounterPrivateStateId, api.deployedContractAddress);
        this.localState.addContract(api.deployedContractAddress);

        deployment.next({
          status: "deployed",
          api,
          address: api.deployedContractAddress,
        });
        return api.deployedContractAddress;
      } else {
        deployment.next({
          status: "failed",
          error: new Error("Providers are not available"),
        });
      }
    } catch (error: unknown) {
      this.logger.error(error);
      deployment.next({
        status: "failed",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
    return undefined;
  }

  private async join(
    deployment: BehaviorSubject<ContractDeployment>,
    contractAddress: ContractAddress
  ): Promise<void> {
    try {
      if (this.providers) {
        // const item = this.localState.getContractPrivateId(contractAddress);

        // if (item != null) {
        // } else {
        //   this.localState.setContractPrivateId(CounterPrivateStateId, contractAddress);
        // }
        const api = await ContractController.join(
          CounterPrivateStateId,
          this.providers,
          contractAddress,
          this.logger
        );

        deployment.next({
          status: "deployed",
          api,
          address: api.deployedContractAddress,
        });
      } else {
        deployment.next({
          status: "failed",
          error: new Error("Providers are not available"),
        });
      }
    } catch (error: unknown) {
      this.logger.error(error);
      deployment.next({
        status: "failed",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }
}
```

## File: src/modules/midnight/counter-ui/contexts/counter-deployment.tsx
```typescript
import type { PropsWithChildren } from 'react';
import { createContext, useMemo } from 'react';
import { type Logger } from 'pino';

import type { DeployedAPIProvider } from './counter-deployment-class';
import { useLocalState } from '../hooks/use-localStorage';
import { DeployedTemplateManager } from './counter-deployment-class';
import { useProviders } from '../hooks';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export const DeployedProviderContext = createContext<DeployedAPIProvider | undefined>(undefined);

export type DeployedProviderProps = PropsWithChildren<{
  logger: Logger;  
  contractAddress: ContractAddress;
}>;

export const DeployedProvider = ({ logger, contractAddress, children }: DeployedProviderProps) => {
  const localState = useLocalState();
  const providers = useProviders();
  const manager = useMemo(() => {
    return new DeployedTemplateManager(logger, localState, contractAddress, providers?.providers);
  }, [logger, localState, providers?.providers]);

  return (
    <DeployedProviderContext.Provider value={manager}>
      {children}
    </DeployedProviderContext.Provider>
  );
};
```

## File: src/modules/midnight/counter-ui/contexts/counter-localStorage-class.ts
```typescript
import type { Logger } from 'pino';

export interface LocalStorageProps {    
  readonly addContract: (contract: string) => void;
  readonly getContracts: () => string[];
  // readonly getContractPrivateId: (contract: string) => string | null;
  // readonly setContractPrivateId: (contractPrivateId: string, contract: string) => void;
}

export class LocalStorage implements LocalStorageProps {
  constructor(private readonly logger: Logger) {}  

  addContract(contract: string): void {
    this.logger.trace(`Adding contract ${contract}`);
    const item = window.localStorage.getItem('counter_contracts');    
    const contracts: string[] = item ? JSON.parse(item) : [];
    const updatedContracts = Array.from(new Set([...contracts, contract]));
    window.localStorage.setItem('counter_contracts', JSON.stringify(updatedContracts));
  }

  getContracts(): string[] {
    const item = window.localStorage.getItem('counter_contracts');    
    const contracts: string[] = item ? JSON.parse(item) : [];
    return Array.from<string>(new Set([...contracts]));
  }

  // getContractPrivateId(contract: string): string | null {
  //   return window.localStorage.getItem('counter_contractPrivateId' + contract);
  // }

  // setContractPrivateId(contractPrivateId: string, contract: string): void {
  //   this.logger.trace(`Setting contract id ${contractPrivateId} for contract ${contract}`);
  //   window.localStorage.setItem('counter_contractPrivateId' + contract, contractPrivateId);
  // }
}
```

## File: src/modules/midnight/counter-ui/contexts/counter-localStorage.tsx
```typescript
import { createContext, useMemo } from 'react';
import { type Logger } from 'pino';
import { LocalStorage, LocalStorageProps } from './counter-localStorage-class';

export const LocalStorageContext = createContext<LocalStorageProps | undefined>(undefined);

export interface LocalStorageProviderProps {
  children: React.ReactNode;
  logger: Logger;
}

export const LocalStorageProvider = ({ children, logger }: LocalStorageProviderProps) => {
  const localStorageInstance = useMemo(() => new LocalStorage(logger), [logger]);

  return (
    <LocalStorageContext.Provider value={localStorageInstance}>
      {children}
    </LocalStorageContext.Provider>
  );
};
```

## File: src/modules/midnight/counter-ui/contexts/counter-providers.tsx
```typescript
import type { CoinInfo, TransactionId } from '@midnight-ntwrk/ledger';
import type {
  BalancedTransaction,
  PrivateStateProvider,
  UnbalancedTransaction,
  WalletProvider,
} from '@midnight-ntwrk/midnight-js-types';
import { createContext, useCallback, useMemo, useState } from 'react';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import {
  MidnightProvider,
  ProofProvider,
  PublicDataProvider,
  ZKConfigProvider,
  createBalancedTx,
} from '@midnight-ntwrk/midnight-js-types';
import { Logger } from 'pino';
import type { CounterCircuits, CounterPrivateStateId } from '../api/common-types';
import {
  CachedFetchZkConfigProvider,
  noopProofClient,
  proofClient,
  WrappedPrivateStateProvider,
  WrappedPublicDataProvider,
} from '@meshsdk/midnight-core';
import { CounterProviders } from '../api/common-types';
import { Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { Transaction } from '@midnight-ntwrk/ledger';
import { ProviderCallbackAction } from '@meshsdk/midnight-core';
import { useAssets, useWallet } from '@meshsdk/midnight-react';

export interface ProvidersState {
  privateStateProvider: PrivateStateProvider<typeof CounterPrivateStateId>;
  zkConfigProvider?: ZKConfigProvider<CounterCircuits>;
  proofProvider: ProofProvider<CounterCircuits>;
  publicDataProvider?: PublicDataProvider;
  walletProvider?: WalletProvider;
  midnightProvider?: MidnightProvider;
  providers?: CounterProviders;
  flowMessage?: string;
}

interface ProviderProps {
  children: React.ReactNode;
  logger: Logger;
}

export const ProvidersContext = createContext<ProvidersState | undefined>(undefined);

export const Provider = ({ children, logger }: ProviderProps) => {
  const [flowMessage, setFlowMessage] = useState<string | undefined>(undefined);

  const { uris, coinPublicKey, encryptionPublicKey } = useAssets();
  const { midnightBrowserWalletInstance } = useWallet();

  const actionMessages = useMemo<Record<ProviderCallbackAction, string | undefined>>(
    () => ({
      proveTxStarted: 'Proving transaction...',
      proveTxDone: undefined,
      balanceTxStarted: 'Signing the transaction with Midnight Lace wallet...',
      balanceTxDone: undefined,
      downloadProverStarted: 'Downloading prover key...',
      downloadProverDone: undefined,
      submitTxStarted: 'Submitting transaction...',
      submitTxDone: undefined,
      watchForTxDataStarted: 'Waiting for transaction finalization on blockchain...',
      watchForTxDataDone: undefined,
    }),
    [],
  );

  const providerCallback = useCallback(
    (action: ProviderCallbackAction): void => {
      setFlowMessage(actionMessages[action]);
    },
    [actionMessages],
  );

  const privateStateProvider: PrivateStateProvider<typeof CounterPrivateStateId> = useMemo(
    () =>
      new WrappedPrivateStateProvider(
        levelPrivateStateProvider({
          privateStateStoreName: 'counter-private-state',
        }),
        logger,
      ),
    [logger],
  );

  const publicDataProvider: PublicDataProvider | undefined = useMemo(
    () =>
      uris
        ? new WrappedPublicDataProvider(indexerPublicDataProvider(uris.indexerUri, uris.indexerWsUri), providerCallback, logger)
        : undefined,
    [uris, providerCallback, logger],
  );

  const zkConfigProvider = useMemo(() => {
    if (typeof window === 'undefined') {
      // Return undefined (or an appropriate fallback) if running on the server.
      return undefined;
    }
    return new CachedFetchZkConfigProvider<CounterCircuits>(
      `${window.location.origin}/midnight/counter`,
      fetch.bind(window),
      () => {},
    );
  }, []);

  const proofProvider = useMemo(
    () => (uris ? proofClient(uris.proverServerUri, providerCallback) : noopProofClient()),
    [uris, providerCallback],
  );

  const walletProvider: WalletProvider = useMemo(
    () =>
      midnightBrowserWalletInstance
        ? {
            coinPublicKey: coinPublicKey!,
            encryptionPublicKey: encryptionPublicKey!,
            balanceTx: (tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> => {
              providerCallback('balanceTxStarted');
              return midnightBrowserWalletInstance
                ._walletInstance!.balanceAndProveTransaction(
                  ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
                  newCoins,
                )
                .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
                .then(createBalancedTx)
                .finally(() => providerCallback('balanceTxDone'));
            },
          }
        : {
            coinPublicKey: '',
            encryptionPublicKey: '',
            balanceTx: () => Promise.reject(new Error('readonly')),
          },
    [midnightBrowserWalletInstance, coinPublicKey, providerCallback],
  );

  const midnightProvider: MidnightProvider = useMemo(
    () =>
      midnightBrowserWalletInstance
        ? {
            submitTx: (tx: BalancedTransaction): Promise<TransactionId> => {
              providerCallback('submitTxStarted');
              return midnightBrowserWalletInstance
                ._walletInstance!.submitTransaction(tx)
                .finally(() => providerCallback('submitTxDone'));
            },
          }
        : {
            submitTx: (): Promise<TransactionId> => Promise.reject(new Error('readonly')),
          },
    [midnightBrowserWalletInstance, providerCallback],
  );

  const combinedProviders: ProvidersState = useMemo(() => {
    return {
      privateStateProvider,
      publicDataProvider,
      proofProvider,
      zkConfigProvider,
      walletProvider,
      midnightProvider,
      // Only set the nested providers object if publicDataProvider (and others, if needed) are defined.
      providers:
        publicDataProvider && zkConfigProvider
          ? {
              privateStateProvider,
              publicDataProvider,
              zkConfigProvider,
              proofProvider,
              walletProvider,
              midnightProvider,
            }
          : undefined,
      flowMessage,
    };
  }, [privateStateProvider, publicDataProvider, proofProvider, zkConfigProvider, walletProvider, midnightProvider, flowMessage]);

  return <ProvidersContext.Provider value={combinedProviders}>{children}</ProvidersContext.Provider>;
};
```

## File: src/modules/midnight/counter-ui/contexts/index.tsx
```typescript
import { DeployedProvider } from './counter-deployment';
import { LocalStorageProvider } from './counter-localStorage';
import { Provider } from './counter-providers';
import { Logger } from 'pino';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export * from './counter-providers';
export * from './counter-localStorage';
export * from './counter-localStorage-class';
export * from './counter-deployment';
export * from './counter-deployment-class';

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;  
  contractAddress: ContractAddress;
}

export const CounterAppProvider = ({ children, logger, contractAddress }: AppProviderProps) => {
  return (
    <LocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger} contractAddress={contractAddress}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
```

## File: src/modules/midnight/counter-ui/hooks/index.ts
```typescript
export * from "./use-providers"
export * from "./use-localStorage"
export * from "./use-deployment"
export * from "./use-contract-subscription"
```

## File: src/modules/midnight/counter-ui/hooks/use-contract-subscription.ts
```typescript
import {  
  ContractDeployment,
  useProviders,
  useDeployedContracts,
  ContractFollow,
} from "@/modules/midnight/counter-ui";
import { DerivedState } from "../api/common-types";
import { useCallback, useEffect, useState } from "react";
import { ContractControllerInterface } from "../api/contractController";
import { useAssets } from "@meshsdk/midnight-react";
import { Observable } from "rxjs";

export const useContractSubscription = () => {
  const { hasConnectedWallet } = useAssets();
  const providers = useProviders();
  const deploy = useDeployedContracts();

  const [counterDeploymentObservable, setCounterDeploymentObservable] =
    useState<Observable<ContractDeployment> | undefined>(undefined);

  const [contractDeployment, setContractDeployment] =
    useState<ContractDeployment>();
  const [deployedContractAPI, setDeployedContractAPI] =
    useState<ContractControllerInterface>();
  const [derivedState, setDerivedState] = useState<DerivedState>();

  const onDeploy = async (): Promise<ContractFollow> => {
    const contractFollow = await deploy.deployContract();
    return contractFollow;
  }

  const onJoin = useCallback(async (): Promise<void> => {
    setCounterDeploymentObservable(deploy.joinContract().observable);
  }, [deploy, setCounterDeploymentObservable]);

  useEffect(() => {
    if (hasConnectedWallet && providers) {
      void onJoin();
    }
  }, [onJoin, hasConnectedWallet, providers]);

  useEffect(() => {
    if (!counterDeploymentObservable) {
      return;
    }
    const subscription = counterDeploymentObservable.subscribe(
      setContractDeployment
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [counterDeploymentObservable]);

  useEffect(() => {
    if (!contractDeployment) {
      return;
    }

    if (
      contractDeployment.status === "in-progress" ||
      contractDeployment.status === "failed"
    ) {
      return;
    }
    setDeployedContractAPI((prev) => prev || contractDeployment.api);
  }, [contractDeployment, setDeployedContractAPI]);

  useEffect(() => {
    if (deployedContractAPI) {
      const subscriptionDerivedState =
        deployedContractAPI.state$.subscribe(setDerivedState);
      return () => {
        subscriptionDerivedState.unsubscribe();
      };
    }
  }, [deployedContractAPI]);

  return {       
    deployedContractAPI,
    derivedState,
    onDeploy,
    providers
  };
};
```

## File: src/modules/midnight/counter-ui/hooks/use-deployment.ts
```typescript
import { useContext } from 'react';
import { DeployedProviderContext, type DeployedAPIProvider } from '../contexts';

export const useDeployedContracts = (): DeployedAPIProvider => {
  const context = useContext(DeployedProviderContext);

  if (!context) {
    throw new Error('A wallet and Provider context is required.');
  }

  return context;
};
```

## File: src/modules/midnight/counter-ui/hooks/use-localStorage.ts
```typescript
import { useContext } from 'react';
import { LocalStorageContext } from '../contexts/counter-localStorage';
import { LocalStorageProps } from '../contexts/counter-localStorage-class';

export const useLocalState = (): LocalStorageProps => {
  const context = useContext(LocalStorageContext);

  if (!context) {
    throw new Error('Hook being used outside of the provider');
  }
  return context;
};
```

## File: src/modules/midnight/counter-ui/hooks/use-providers.ts
```typescript
import { useContext } from 'react';
import { ProvidersContext, ProvidersState } from '../contexts';

export const useProviders = (): ProvidersState | null => {
  const providerState = useContext(ProvidersContext);
  if (!providerState) {
    console.warn('[useProviders] not ready yet.');
    return null;
  }
  return providerState;
};
```

## File: src/modules/midnight/counter-ui/index.ts
```typescript
export * from "./contexts"
export * from "./hooks"
```

## File: src/modules/midnight/wallet-widget/common/icons/icon-book-dashed.tsx
```typescript
export default function IconBookDashed() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: "#ffadff",
        width: "24px",
        height: "24px",
        strokeWidth: "1px",
      }}
      className="hover:mesh-fill-white"
    >
      <path d="M12 17h2" />
      <path d="M12 22h2" />
      <path d="M12 2h2" />
      <path d="M18 22h1a1 1 0 0 0 1-1" />
      <path d="M18 2h1a1 1 0 0 1 1 1v1" />
      <path d="M20 15v2h-2" />
      <path d="M20 8v3" />
      <path d="M4 11V9" />
      <path d="M4 19.5V15" />
      <path d="M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8" />
      <path d="M8 22H6.5a1 1 0 0 1 0-5H8" />
    </svg>
  );
}
```

## File: src/modules/midnight/wallet-widget/common/icons/icon-chevron-right.tsx
```typescript
export default function IconChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: "#ffadff",
        width: "24px",
        height: "24px",
        strokeWidth: "1px",
      }}
      className="hover:mesh-fill-white"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
```

## File: src/modules/midnight/wallet-widget/common/icons/icon-download.tsx
```typescript
export default function IconDownload() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: "#ffadff",
        width: "24px",
        height: "24px",
        strokeWidth: "1px",
      }}
      className="hover:mesh-fill-white"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
```

## File: src/modules/midnight/wallet-widget/common/icons/icon-fingerprint.tsx
```typescript
export default function IconFingerprint() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: "#ffadff",
        width: "24px",
        height: "24px",
        strokeWidth: "1px",
      }}
      className="hover:mesh-fill-white"
    >
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </svg>
  );
}
```

## File: src/modules/midnight/wallet-widget/common/icons/icon-lace.tsx
```typescript
export default function IconLace() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" viewBox="0 0 173.777 175.055">
    <defs>
      <radialGradient id="radial-gradient" cx="0.5" cy="0.5" r="0.506" gradientTransform="translate(-0.004) scale(1.007 1)" gradientUnits="objectBoundingBox">
        <stop offset="0.47" stop-color="#feb14f"/>
        <stop offset="1" stop-color="#ff92de"/>
      </radialGradient>
    </defs>
    <g id="Layer_1" transform="translate(0.003 0)">
      <path id="Caminho_181" data-name="Caminho 181" d="M45.11,117.71c1.18.78,2.33,1.58,3.53,2.33,10.95,6.79,22.88,10.15,35.73,9.01,17.02-1.51,30.84-9.2,41.11-22.93a55.466,55.466,0,0,0,11.36-38.09c-1.34-18.8-9.7-33.93-25.44-44.57a56.482,56.482,0,0,0-34.21-9.64,44.466,44.466,0,0,0-14.11,2.44c-6.31,2.35-12.8,4.13-19.1,6.49a72.923,72.923,0,0,0-26.74,17.2c-.26.27-.57.49-1.11.95a4.784,4.784,0,0,1,.79-2.68C28.82,16.66,46.99,4.02,71.34.65a65.626,65.626,0,0,1,41.17,7.62c21.31,11.68,33.94,29.8,37.31,53.94,2.75,19.7-2.24,37.63-14.4,53.26-12.22,15.7-28.42,24.79-48.32,27a72.388,72.388,0,0,1-25.05-1.73,14.239,14.239,0,0,1-9-5.77,46.032,46.032,0,0,1-7.92-17.26Zm110.76,18.45a76.9,76.9,0,0,1-25.72,16.35c-4.05,1.61-8.4,2.2-12.38,3.96a56.459,56.459,0,0,1-34.56,3.92,57.572,57.572,0,0,1-45.99-50.98c-1.1-11.87.95-23.26,7-33.71C54.78,57.45,70.59,47.36,91.66,46.13c12.81-.75,24.58,2.9,35.18,10.21.61.42,1.14,1.07,2,1.03.33-.55.07-1.05-.08-1.52a53.434,53.434,0,0,0-10.22-18.39,5.375,5.375,0,0,0-2.57-1.65,70.512,70.512,0,0,0-33.19-2.53A68.756,68.756,0,0,0,38.5,59.79c-12.27,15.85-17,33.95-14.3,53.87,2.46,18.2,10.76,33.36,24.84,45,17.17,14.2,37.03,19.14,58.94,14.96,18.85-3.6,33.52-13.83,44.58-29.37a40.861,40.861,0,0,0,4.97-8.91,1.964,1.964,0,0,0-1.64.82ZM22.19,43.45C-.18,65.52-5.3,92.19,5.3,121.68c5.54,15.42,25.85,36.61,34.81,37.08-.08-.58-.56-.85-.91-1.21a78.3,78.3,0,0,1-15.69-23.87c-2.48-5.74-3.48-11.92-5.87-17.67a54.177,54.177,0,0,1-2.98-31.64C18.14,66.5,27.97,53.05,43.84,44.05c1.91-1.08,4.04-1.71,5.83-3.06A70.856,70.856,0,0,1,75.3,28.87c4.71-1.21,9.52-1.73,14.26-2.62-25.51-6.24-48.61-1.33-67.38,17.19ZM134.53,17.36a79.516,79.516,0,0,1,18.61,31.92c.7,2.29,1.03,4.71,1.96,6.89,4.61,10.81,6.38,21.97,4.36,33.6q-4.44,25.485-26.21,39.57c-3.05,1.96-6.46,3.28-9.44,5.38a73.767,73.767,0,0,1-30.18,12.71c-3.05.53-6.14.9-9.54,1.39,29.34,9.02,69.14-3.67,84.47-41.81,15.02-37.38-4.23-76.75-34.58-90.58-.12.49.3.67.54.92Zm-3.41,50.96a3.138,3.138,0,0,0-1.04-1.81,51.844,51.844,0,0,0-15.23-10.24c-.35-.15-.75-.58-1.3.05a61.246,61.246,0,0,1,14.51,31.85c2.14-3.99,3.79-15.61,3.06-19.85ZM60.3,118.89A58.967,58.967,0,0,1,45.99,86.85c-.35.25-.43.28-.45.33-2.47,6.39-2.94,13.05-2.62,19.82.04.85.67,1.36,1.2,1.92a44.227,44.227,0,0,0,9.83,7.5c1.91,1.12,3.96,2.02,5.95,3.02l.39-.54Z" fill="url(#radial-gradient)"/>
    </g>
  </svg>
  
  );
}
```

## File: src/modules/midnight/wallet-widget/common/icons/icon-monitor-smartphone.tsx
```typescript
export default function IconMonitorSmartphone() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: "#ffadff",
        width: "56px",
        height: "56px",
        strokeWidth: "1px",
      }}
    >
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <path d="M10 19v-3.96 3.15" />
      <path d="M7 19h5" />
      <rect width="6" height="10" x="16" y="12" rx="2" />
    </svg>
  );
}
```

## File: src/modules/midnight/wallet-widget/common/icons/icon-plus.tsx
```typescript
export default function IconPlus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        color: "#ffadff",
        width: "56px",
        height: "56px",
        strokeWidth: "1px",
      }}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
```

## File: src/modules/midnight/wallet-widget/common/button.tsx
```typescript
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "./cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## File: src/modules/midnight/wallet-widget/common/cn.ts
```typescript
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## File: src/modules/midnight/wallet-widget/common/dialog.tsx
```typescript
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "./cn";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
,
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-foreground text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

## File: src/modules/midnight/wallet-widget/common/dropdown-menu.tsx
```typescript
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "./cn"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-muted",
      className
    )}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

## File: src/modules/midnight/wallet-widget/common/tooltip.tsx
```typescript
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "./cn"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-2 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

## File: src/modules/midnight/wallet-widget/midnight-wallet/connected-button.tsx
```typescript
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../common/dropdown-menu';
import { Button } from '../common/button';
import { useAssets, useWallet } from '@meshsdk/midnight-react';

export default function ConnectedButton() {
  const { disconnect } = useWallet();
  const { address } = useAssets();

  return (
    <>
      {address && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-black">
              {address.slice(0, 4)}...{address.slice(-4)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
```

## File: src/modules/midnight/wallet-widget/midnight-wallet/data.ts
```typescript
export const screens = {
  main: {
    title: "Connect Wallet",
  },  
};
```

## File: src/modules/midnight/wallet-widget/midnight-wallet/index.tsx
```typescript
import { useState } from "react";
import { Button } from "../common/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../common/dialog";
import { useAssets, useWallet } from "@meshsdk/midnight-react";
import ConnectedButton from "./connected-button";
import { screens } from "./data";
import ScreenMain from "./screen-main";

export const MidnightWallet = () => {
  const { open, setOpen } = useWallet();
  const [screen] = useState("main");
  const { hasConnectedWallet } = useAssets();

  return (    
      <Dialog open={open} onOpenChange={setOpen}>
      <div>
        {!hasConnectedWallet ? (
          <DialogTrigger asChild>
            <Button variant="outline" className="text-black">
              Connect Wallet
            </Button>
          </DialogTrigger>
        ) : (
          <ConnectedButton />
        )}
      </div>

      <DialogContent
        className="sm:max-w-[425px] justify-center items-center"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Header screen={screen} />
        {screen == "main" && <ScreenMain setOpen={setOpen} />}
        <Footer />
      </DialogContent>
    </Dialog>    
  );
};

interface HeaderProps {
  screen: string;
  setScreen: (screen: string) => void;
}

function Header({
  screen,
}: Omit<HeaderProps, 'setScreen'>) {
  return (
    <DialogHeader>
      <DialogTitle className="flex justify-between">
        <span style={{ width: "24px" }}></span>
        <span className="">
          {/* @ts-expect-error any type */}
          {screens[screen].title}
        </span>
        <span style={{ width: "24px" }}></span>
      </DialogTitle>
    </DialogHeader>
  );
}

function Footer() {
  return (
    <DialogFooter className="justify-center text-sm">
      <a
        href="https://meshjs.dev/"
        target="_blank"
        className="flex gap-1 items-center justify-center text-accent-foreground hover:text-zinc-500 fill-foreground hover:fill-zinc-500 dark:hover:text-orange-200 dark:hover:fill-zinc-200"
      >
        <span className="">Powered by</span>
        <svg
          width={22}
          height={22}
          enableBackground="new 0 0 300 200"
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m289 127-45-60-45-60c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-37 49.3c-2 2.7-6 2.7-8 0l-37-49.3c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-45 60-45 60c-1.3 1.8-1.3 4.2 0 6l45 60c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l45-60c1.3-1.8 1.3-4.2 0-6zm-90-103.3 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-90 0 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-53 152.6-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0z" />
        </svg>
        <span className="">Mesh SDK</span>
      </a>
    </DialogFooter>
  );
}
```

## File: src/modules/midnight/wallet-widget/midnight-wallet/screen-main.tsx
```typescript
import IconLace from '../common/icons/icon-lace';
import { TooltipProvider } from '../common/tooltip';
import { useWallet, useWalletList } from '@meshsdk/midnight-react';
import WalletIcon from './wallet-icon';
import { type JSX } from 'react';

export default function ScreenMain({
  setOpen,
}: {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setOpen: Function;
}) {
  const wallets = useWalletList();
  const { connectWallet } = useWallet();

  // Example config map for wallet overrides
  const walletsConfig: { [key: string]: { key: string; displayName: string; icon: JSX.Element } } = {
    lace: { key: 'mnLace', displayName: 'LACE', icon: <IconLace /> }
  };

  return (
    <TooltipProvider>
      <div
        className="grid gap-4 py-7 place-items-center gap-y-8"
        style={{
          gridTemplateColumns: `repeat(${wallets.length}, minmax(0, 1fr))`,
        }}
      >
        {wallets.map((wallet, index) => {
          const config = walletsConfig[wallet.name];
          if (!config) return null; // Skip rendering if config is not found
          const walletKey = config.key;
          const displayName = config.displayName;
          const icon = config.icon;

          return (
            <WalletIcon
              key={index}
              iconReactNode={icon}
              name={displayName}
              action={() => {
                connectWallet(walletKey);
                setOpen(false);
              }}
            />
          );
        })}
      </div>
    </TooltipProvider>
  );
}
```

## File: src/modules/midnight/wallet-widget/midnight-wallet/wallet-icon.tsx
```typescript
import {
  Tooltip,
  TooltipContent,  
  TooltipTrigger,
} from "../common/tooltip";

export default function WalletIcon({
  icon,
  name,
  action,
  iconReactNode,
}: {
  icon?: string;
  name: string;
  action: () => void;
  iconReactNode?: React.ReactNode;
}) {
  return (
    <Tooltip delayDuration={0} defaultOpen={false}>
      <TooltipTrigger asChild>
        <button
          className="flex items-center justify-center rounded-lg w-10 h-10 border border-zinc-700 hover:border-zinc-200 cursor-pointer"
          onClick={action}
        >
          {icon && <img src={icon} alt={name} className="w-8 h-8"/>}
          {iconReactNode && iconReactNode}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
```

## File: src/modules/midnight/wallet-widget/index.ts
```typescript
export * from "./midnight-wallet";
```

## File: src/pages/about/index.tsx
```typescript
import { Shield, Lock, FileText, Users, Zap, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const About = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Zero-Knowledge Proofs",
      description:
        "Advanced cryptographic technology ensures complete anonymity while maintaining verifiable integrity of submissions.",
    },
    {
      icon: <Lock className="w-8 h-8 text-green-600" />,
      title: "Complete Privacy",
      description:
        "No personal information is stored on-chain. Your identity remains completely anonymous and untraceable.",
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "Secure Document Storage",
      description:
        "Documents are stored securely using IPFS and Pinata, ensuring immutable and decentralized access.",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Community Support",
      description:
        "Allow supporters to donate directly to whistleblowers through transparent blockchain transactions.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Built on Midnight",
      description:
        "Leverages the Midnight blockchain's privacy-focused architecture for maximum security and anonymity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About ZK-Leaks
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A revolutionary platform that empowers whistleblowers to expose
            wrongdoing while maintaining complete anonymity through advanced
            zero-knowledge cryptography.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              ZK-Leaks exists to protect those who speak truth to power. We
              believe that transparency and accountability are fundamental to a
              just society, and that whistleblowers should never have to choose
              between doing what's right and protecting themselves.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose ZK-Leaks?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Submit</h3>
                <p className="text-muted-foreground">
                  Upload your document and provide a donation address.
                  Zero-knowledge proofs protect your identity.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Verify</h3>
                <p className="text-muted-foreground">
                  Your submission is cryptographically verified and stored
                  immutably on the blockchain.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Expose</h3>
                <p className="text-muted-foreground">
                  Your leak becomes publicly accessible while you remain
                  completely anonymous and protected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Built With</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Blockchain Technology
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Midnight blockchain for privacy-preserving smart contracts
                  </li>
                  <li>• Zero-knowledge proofs for anonymous verification</li>
                  <li>• Immutable on-chain storage for transparency</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Storage & Security
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• IPFS for decentralized document storage</li>
                  <li>• Pinata for reliable content hosting</li>
                  <li>• End-to-end encryption for data protection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the movement for transparency and accountability. Your voice
              matters, and your safety is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => (window.location.href = "/post")}
              >
                <FileText className="w-5 h-5" />
                Submit a Leak
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <Github className="w-5 h-5" />
                View Source Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
```

## File: src/pages/home/index.tsx
```typescript
import { useNavigate } from "react-router-dom";
import { Shield, FileText, Search, Info, Upload, Users } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Submit Leak",
      description:
        "Anonymously submit sensitive information with zero-knowledge proofs",
      icon: <Upload className="w-10 h-10 text-blue-600" />,
      path: "/post",
    },
    {
      title: "Explore Leaks",
      description: "Browse all submitted leaks and support whistleblowers",
      icon: <Search className="w-10 h-10 text-green-600" />,
      path: "/leaks",
    },
  ];

  const highlights = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Complete Anonymity",
      description:
        "Zero-knowledge proofs ensure your identity remains completely private",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Secure Storage",
      description: "Documents stored on IPFS with immutable blockchain records",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Community Support",
      description: "Enable direct donations to support brave whistleblowers",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              ZK-Leaks
            </h1>
            <p className="text-2xl text-muted-foreground mb-4">
              Anonymous Whistleblowing Platform
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expose wrongdoing while protecting your identity with advanced
              zero-knowledge cryptography
            </p>
          </div>
          <ModeToggle />
        </div>

        {/* Hero Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">{highlight.icon}</div>
                <h3 className="text-lg font-semibold mb-2">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((item, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-border"
            >
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  {item.icon}
                </div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{item.description}</p>
                <Button
                  className="w-full gap-2"
                  onClick={() => navigate(item.path)}
                >
                  <span>{item.title}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <Card className="mb-16 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Your Safety is Our Priority
              </h2>
              <p className="text-blue-600 dark:text-blue-400 max-w-3xl mx-auto mb-6">
                ZK-Leaks uses cutting-edge zero-knowledge proof technology to
                ensure that your identity remains completely anonymous while
                still allowing verification of your submissions. No personal
                information is ever stored on-chain.
              </p>
              <Button
                variant="outline"
                className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => navigate("/about")}
              >
                <Info className="w-4 h-4" />
                Learn More About Our Technology
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-20 mb-12 text-center">
          <p className="text-muted-foreground text-sm mb-10">
            Built with privacy-first technology
          </p>

          <div className="flex flex-col items-center justify-center space-y-1">
            <p className="text-xs text-muted-foreground tracking-wider mb-3">
              POWERED BY
            </p>
            <div className="flex items-center justify-center gap-5">
              <a
                href="https://meshjs.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center h-7 hover:opacity-80 transition-opacity"
                aria-label="Visit Mesh website"
              >
                <img
                  src="/meshlogo-with-title-white.svg"
                  alt="Mesh"
                  className="h-7 dark:block hidden object-contain"
                  style={{ width: "auto" }}
                />
                <img
                  src="/meshlogo-with-title-black.svg"
                  alt="Mesh"
                  className="h-7 dark:hidden block object-contain"
                  style={{ width: "auto" }}
                />
              </a>
              <div className="text-lg font-light text-muted-foreground opacity-50">
                ×
              </div>
              <a
                href="https://eddalabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center h-5 hover:opacity-80 transition-opacity"
                aria-label="Visit Edda Labs website"
              >
                <img
                  src="/transparent-logo-white.svg"
                  alt="Edda Labs"
                  className="h-5 dark:block hidden object-contain"
                  style={{ width: "auto" }}
                />
                <img
                  src="/transparent-logo-black.svg"
                  alt="Edda Labs"
                  className="h-5 dark:hidden block object-contain"
                  style={{ width: "auto" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/pages/leaks/index.tsx
```typescript
import { Loading } from "@/components/loading";
import { useContractSubscription } from "@/modules/midnight/counter-ui";
import { useEffect, useState } from "react";
import { FileText, Search, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const LeaksExplorer = () => {
  const { derivedState } = useContractSubscription();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (derivedState?.round !== undefined) {
      setAppLoading(false);
    }
  }, [derivedState?.round]);

  const formatLeakId = (id: unknown) => {
    return String(id);
  };

  const formatDonatedAmount = (amount: unknown) => {
    return String(amount);
  };

  const handleUriClick = (uri: string) => {
    // If it's a valid URL, open it in a new tab
    try {
      new URL(uri);
      window.open(uri, "_blank");
    } catch {
      // If not a valid URL, copy to clipboard
      navigator.clipboard.writeText(uri);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {appLoading && <Loading />}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Explore Leaks
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse all anonymous leaks submitted to the platform
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Total Leaks
              </p>
              <p className="text-3xl font-bold">
                {derivedState?.leaks?.size()?.toString() || "0"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Current Round
              </p>
              <p className="text-3xl font-bold">
                {derivedState?.round?.toString() || "0"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Next Leak ID
              </p>
              <p className="text-3xl font-bold">
                {derivedState?.nextLeakId?.toString() || "0"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leaks List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6" />
              All Submitted Leaks
            </CardTitle>
            <CardDescription>
              Anonymous submissions protected by zero-knowledge proofs. Click on
              URIs to access content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {derivedState?.leaks && !derivedState.leaks.isEmpty() ? (
                <div className="grid gap-6">
                  {Array.from(derivedState.leaks).map(([id, leak]) => (
                    <Card
                      key={formatLeakId(id)}
                      className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Leak Info */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                  Leak ID
                                </p>
                                <p className="text-2xl font-bold text-primary">
                                  #{formatLeakId(leak.id)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                  Donations Received
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                  {formatDonatedAmount(leak.donated)}
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">
                                Donation Address
                              </p>
                              <div className="bg-muted p-3 rounded-lg">
                                <p className="text-sm font-mono break-all">
                                  {leak.donation_addr}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Content Access */}
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">
                              Content URI
                            </p>
                            <div
                              className="bg-muted p-3 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
                              onClick={() => handleUriClick(leak.uri)}
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-mono break-all group-hover:text-primary transition-colors">
                                  {leak.uri}
                                </p>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-2 flex-shrink-0" />
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Click to access content (opens in new tab if URL,
                              copies to clipboard otherwise)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No leaks found
                  </h3>
                  <p className="text-muted-foreground">
                    No anonymous leaks have been submitted yet. Be the first to
                    contribute!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Privacy & Security
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                All leaks are submitted anonymously using zero-knowledge proofs.
                No personal information is stored on-chain, ensuring complete
                privacy for whistleblowers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
```

## File: src/pages/post/index.tsx
```typescript
import { Loading } from "@/components/loading";
import { useContractSubscription } from "@/modules/midnight/counter-ui";
import { useEffect, useState } from "react";
import { FileText, Upload, PlusCircle } from "lucide-react"; // Import PlusCircle
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PinataFileUpload from "@/components/pinataFileUpload";

export const SubmitLeak = () => {
  // 1. Destructure `onDeploy` from the hook to access the deployment function.
  const { deployedContractAPI, derivedState, providers, onDeploy } =
    useContractSubscription();

  const [appLoading, setAppLoading] = useState(true);
  const [newLeakUri, setNewLeakUri] = useState("");
  const [newLeakDonationAddr, setNewLeakDonationAddr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Add state to hold and display the address of a newly deployed contract.
  const [deployedAddress, setDeployedAddress] = useState<string | undefined>();

  useEffect(() => {
    if (derivedState?.round !== undefined) {
      setAppLoading(false);
    }
  }, [derivedState?.round]);

  // 3. Create a handler function to trigger the deployment.
  const handleDeploy = async () => {
    console.log("Deploying new contract for development...");
    const { address } = await onDeploy(); // Call the deployment function from the hook
    if (address) {
      setDeployedAddress(address);
      console.log(
        `New contract deployed at: ${address}. Please refresh to interact.`,
      );
    }
  };

  const createLeak = async () => {
    if (deployedContractAPI && newLeakUri && newLeakDonationAddr) {
      setIsSubmitting(true);
      try {
        await deployedContractAPI.createLeak(newLeakUri, newLeakDonationAddr);
        setNewLeakUri("");
        setNewLeakDonationAddr("");
      } catch (error) {
        console.error("Error creating leak:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {appLoading && <Loading />}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Submit a Leak
          </h1>
          <p className="text-xl text-muted-foreground">
            Anonymously submit sensitive information with zero-knowledge proofs
          </p>
        </div>

        {/* 4. Add a UI section for developer controls. */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dev Controls (For Testing Only)</CardTitle>
            <CardDescription>
              Deploy a new contract instance for testing. After deploying, you
              must refresh the page to connect to it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleDeploy} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Deploy New Test Contract
            </Button>
            {deployedAddress && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold text-foreground">
                  Deployment Successful
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  New Contract Address:
                </p>
                <p className="text-sm font-mono break-all text-primary">
                  {deployedAddress}
                </p>
                <p className="text-xs font-bold text-amber-600 mt-2">
                  ACTION REQUIRED: Please refresh the page now to interact with
                  this new contract.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {!deployedContractAPI && (
          <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-900/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-orange-600 dark:text-orange-400 font-medium">
                  Contract not deployed or connected. Please deploy a new
                  contract above or check your wallet connection.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Leak Submission Form
            </CardTitle>
            <CardDescription>
              Upload your document and provide a donation address to submit an
              anonymous leak.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Upload Document
                </label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select a file to upload. It will be stored securely and a URI
                  will be generated for the leak.
                </p>
                <PinataFileUpload
                  onUploaded={(leakUri) => {
                    setNewLeakUri(leakUri);
                  }}
                  title="Upload Leak Document"
                  description="Choose a file to upload securely"
                />
                {newLeakUri && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      ✓ File uploaded successfully
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-mono break-all mt-1">
                      {newLeakUri}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="donation-addr"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Donation Address
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  Provide a wallet address where supporters can send donations.
                </p>
                <input
                  id="donation-addr"
                  type="text"
                  value={newLeakDonationAddr}
                  onChange={(e) => setNewLeakDonationAddr(e.target.value)}
                  placeholder="Enter your donation wallet address"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="border-t pt-6">
                <Button
                  onClick={createLeak}
                  disabled={
                    !deployedContractAPI ||
                    !newLeakUri ||
                    !newLeakDonationAddr ||
                    isSubmitting
                  }
                  className="w-full gap-2 h-12"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Leak...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      <span>Submit Anonymous Leak</span>
                    </>
                  )}
                </Button>
              </div>

              {providers?.flowMessage && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {providers.flowMessage}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Privacy Notice:</strong> Your submission is protected by
                zero-knowledge proofs.
              </p>
              <p>
                No personal information is stored on-chain, and your identity
                remains completely anonymous.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
```

## File: src/App.tsx
```typescript
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import * as pino from "pino";
import { CounterAppProvider } from "@/modules/midnight/counter-ui";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { MainLayout } from "./layouts/layout";
import { Home } from "./pages/home/";
import { SubmitLeak } from "./pages/post";
import { LeaksExplorer } from "./pages/leaks";
import { About } from "./pages/about";
import { ThemeProvider } from "./components/theme-provider";

export const logger = pino.pino({
  level: "trace",
});
// Update this network id, could be testnet or undeployed
setNetworkId(NetworkId.TestNet);
// Update this with your deployed contract address
const contractAddress =
  "02009d26b4f37afc5748919cf4ea6259f92c7cdbbb7a5876ccae8bb12210dcf09a3f";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
        <CounterAppProvider logger={logger} contractAddress={contractAddress}>
          <BrowserRouter basename="/">
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<SubmitLeak />} />
                <Route path="/leaks" element={<LeaksExplorer />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CounterAppProvider>
      </MidnightMeshProvider>
    </ThemeProvider>
  );
}

export default App;
```

## File: src/globals.ts
```typescript
// Polyfill for Node.js Buffer
import { Buffer } from 'buffer';

// Ensure process.env is available globally
if (typeof globalThis.process === 'undefined') {
  // @ts-expect-error - Adding process to globalThis for Node.js compatibility
  globalThis.process = {
    env: {
      NODE_ENV: import.meta.env.MODE || 'production',
    },
    version: '', // Some libraries might check for process.version
    cwd: () => '/', // Default current working directory
  };
}

// Ensure Buffer is available globally
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}

// For environments that expect process.browser
// @ts-expect-error - Adding process.browser for compatibility
if (typeof process !== 'undefined' && !process.browser) {
  // @ts-expect-error - Adding process.browser
  process.browser = true;
}
```

## File: src/index.css
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## File: src/main.tsx
```typescript
import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Loading } from '@/components/loading.tsx'

import './globals.ts'
import './index.css'

const LazyApp = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyApp />
    </Suspense>
  </StrictMode>,
)
```

## File: src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />
```

## File: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: package.json
```json
{
  "name": "@meshsdk/frontend-vite-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "npm run copy-contract-keys && tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "copy-contract-keys": "mkdir -p ./public/midnight/counter/keys && mkdir -p ./public/midnight/counter/zkir && cp -r ../counter-contract/dist/managed/counter/keys/* ./public/midnight/counter/keys && cp -r ../counter-contract/dist/managed/counter/zkir/* ./public/midnight/counter/zkir"
  },
  "dependencies": {
    "@meshsdk/counter-contract": "*",
    "@meshsdk/midnight-core": "^0.0.6",
    "@meshsdk/midnight-react": "^0.0.6",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-icons": "^1.3.2",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tailwindcss/vite": "^4.1.10",
    "axios": "^1.11.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.517.0",
    "pinata": "^2.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "6.17.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.10",
    "vite-plugin-node-polyfills": "^0.24.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@originjs/vite-plugin-commonjs": "1.0.3",
    "@rollup/plugin-commonjs": "^28.0.1",
    "@types/node": "^24.0.3",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "tw-animate-css": "^1.3.4",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5",
    "vite-plugin-top-level-await": "^1.5.0",
    "vite-plugin-wasm": "^3.4.1"
  }
}
```

## File: README.md
```markdown
# Zk-Leaks Frontend App

## Roadmap

### Pages
- **Home (`/`)**
    * **Purpose**: A static landing page to build trust and educate visitors on the ZK-Leaks mission.
    * **Workflow**: Explains the *why* and *how* of the platform, covering security guarantees and risks. The primary call-to-action will direct users to "Submit a Leak."
    * **Implementation**: Adapt the existing `src/pages/home/index.tsx` to focus on this narrative.

- **Submit Leak (`/post`)**
    * **Purpose**: A single-purpose, distraction-free application for the whistleblower to securely submit their information. This page is the core interactive component.
    * **Workflow**: Guides the user through a linear, multi-step process:
        1.  **Security Checklist**: A mandatory confirmation of safety precautions (using Tor, a clean wallet, etc.).
        2.  **File Upload**: User uploads the leak document via the `PinataFileUpload` component to get a decentralized content identifier (CID).
        3.  **Origin Proof**: The user generates a ZK-SNARK proof in-browser to verify their affiliation without revealing their identity.
        4.  **On-Chain Submission**: The proof and CID are sent to the smart contract. The UI will display transaction status updates.
    * **Implementation**: Use `src/pages/counter/index.tsx` as the foundation, refactoring it into this guided workflow and removing the leak display section.

- **Leaks (`/leaks`)**
    * **Purpose**: A read-only repository for the public, journalists, and researchers to view verified leaks.
    * **Workflow**: Displays a list of all successful on-chain submissions. Each entry will show the leak ID, the verified origin (e.g., hash of the organization's domain), and a link to the document URI.
    * **Implementation**: Create a new page by extracting the leak-listing logic from the current `src/pages/counter/index.tsx` component.

- **About (`/about`)**
    * **Purpose**: To provide radical transparency and answer detailed questions about the technology, security, and threat model.
    * **Workflow**: Serves as a detailed FAQ and security guide. Content will cover the ZK technology, operational security (OpSec) best practices for users, and the project's limitations.
    * **Implementation**: A new static page with detailed, carefully worded explanations.
```
