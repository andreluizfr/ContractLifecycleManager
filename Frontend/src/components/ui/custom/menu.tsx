import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Trans } from "react-i18next";
import { ClipboardList, Inbox, ChartNoAxesCombined , SquarePen } from 'lucide-react';

const components: { title: string; href: string; description: string }[] = [
    {
      title: "Entradas e Saídas",
      href: "/relatorios/transacoes",
      description:
        "Tire insights a partir de gráficos sobre as transações financeiras dos últimos meses.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export default function Menu() {
    return (
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
              <Link href="/contratos" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <ClipboardList className='mr-2 w-6' strokeWidth={1.4}/>
                      <Trans i18nKey={'webapp.menu.contracts'}>
                        Contratos
                      </Trans>
                  </NavigationMenuLink>
              </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
              <Link href="/transacoes" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Inbox className='mr-2 w-6' strokeWidth={1.4}/>
                      <Trans i18nKey={'webapp.menu.financialTransactions'}>
                        Transações
                      </Trans>
                  </NavigationMenuLink>
              </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
              <NavigationMenuTrigger>
                <ChartNoAxesCombined className='mr-2 w-6' strokeWidth={1.4}/>
                <Trans i18nKey={'webapp.menu.reports'}>
                  Relatórios
                </Trans>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-full md:w-[450px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                      <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                      >
                          {component.description}
                      </ListItem>
                  ))}
                  </ul>
              </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
              <Link href="/clientes" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <SquarePen className='mr-2 w-6' strokeWidth={1.4}/>
                      <Trans i18nKey={'webapp.menu.clients'}>
                        Clientes
                      </Trans>
                  </NavigationMenuLink>
              </Link>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"