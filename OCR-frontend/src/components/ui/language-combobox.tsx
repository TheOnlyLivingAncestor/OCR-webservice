"use client"

import { CheckIcon, ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

const languages = [
  {
    value: "eng",
    label: "Angol",
  },
  {
    value: "ger",
    label: "Német",
  },
]

export default function LanguageCombobox({value, onChange}: {value: string, onChange: (value:string) => void}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow_neutral"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:max-w-[200px]"
        >
          {value
            ? languages.find((language) => language.value === value)?.label
            : "Válassz nyelvet..."}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) border-0 p-0">
        <Command className="**:data-[slot=command-input-wrapper]:h-11">
          <CommandInput placeholder="Keress egy nyelvet..." />
          <CommandList className="p-1">
            <CommandEmpty>Nincs ilyen nyelv.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {language.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === language.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
