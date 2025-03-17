"use client";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Github,
  Search,
  ChevronRight,
  Plus,
  X,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/ModeToggle";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchCommand from "@/components/search-command";
import { signOut } from "next-auth/react";

interface CategoryImage {
  public_id: string;
  url: string;
  _id: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images: CategoryImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Product {
  _id: string;
  name: string;
  category: string;
  slug: string;
  images: CategoryImage[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
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
];
const smartphones = [
  {
    title: "Find X8 Pro",
    href: "/smartphones/find-x8-pro",
    image:
      "https://opsg-img-cdn-gl.heytapimg.com/epb/202408/08/gv7ALxsTfaVjRPP7.png?x-amz-process=image/format,webp/quality,Q_80",
    description: "New",
  },
  {
    title: "Find X8",
    href: "/smartphones/find-x8",
    image:
      "https://opsg-img-cdn-gl.heytapimg.com/epb/202408/08/gv7ALxsTfaVjRPP7.png?x-amz-process=image/format,webp/quality,Q_80",
    description: "New",
  },
  {
    title: "Reno12 Pro 5G",
    href: "/smartphones/reno12-pro-5g",
    image:
      "https://opsg-img-cdn-gl.heytapimg.com/epb/202408/08/gv7ALxsTfaVjRPP7.png?x-amz-process=image/format,webp/quality,Q_80",
  },
];

const series = [
  { name: "Find N Series", href: "/series/find-n" },
  { name: "Find X Series", href: "/series/find-x" },
  { name: "Reno Series", href: "/series/reno" },
  { name: "F Series", href: "/series/f" },
  { name: "A Series", href: "/series/a" },
  { name: "K Series", href: "/series/k" },
];
const mainNav = [
  {
    title: "Tablets",
    items: [
      { name: "OPPO Pad", href: "#" },
      { name: "Accessories", href: "#" },
    ],
  },
  {
    title: "Audio",
    items: [
      { name: "Wireless Earbuds", href: "#" },
      { name: "Neckbands", href: "#" },
    ],
  },
  {
    title: "Accessories",
    items: [
      { name: "Cases & Protection", href: "#" },
      { name: "Chargers", href: "#" },
    ],
  },
  {
    title: "About OPPO",
    items: [
      { name: "Company Profile", href: "#" },
      { name: "Press", href: "#" },
    ],
  },
];

const secondaryNav = [
  { title: "Store", href: "#" },
  { title: "ColorOS", href: "#" },
  { title: "Support", href: "#" },
  { title: "Community", href: "#" },
];

const userNav = [
  { title: "Orders", href: "#" },
  { title: "Membership", href: "#" },
];
export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  console.log("popularProducts", popularProducts)
  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }
  // if (!session) {
  //   return router.push("/auth/signin");
  // }

  useEffect(() => {
    const data = products?.filter(product => product?.tags?.includes("Popular Kit"));
    setPopularProducts(data);
  }, [products]);

  useEffect(() => {
    // Fetch cart count if user is logged in
    if (session) {
      fetchCartCount();
      fetchWishlistCount();
    }
  }, [session]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const cartItems = await response.json();
        setCartCount(cartItems.length);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  const fetchWishlistCount = async () => {
    try {
      const response = await fetch("/api/wishlist");
      if (response.ok) {
        const wishItems = await response.json();
        setWishCount(wishItems.length);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const category = await response.json();
        setCategories(category);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const product = await response.json();
        setProducts(product);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="flex h-14 items-center justify-between container mx-auto px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 ">
                <div className="flex items-center justify-center">
                  {/* <img src={logo1} alt="Logo"  /> */}
                  <Image
                    src="/images/logo1.png" // replace with your image path
                    alt="Your image alt text"
                    width={25} // optional
                    height={20} // optional
                  />
                </div>

                <div className="flex flex-col text-center">
                  <span className="text-lg font-bold tex-bg ">SAJIVAN</span>
                  <Separator className="text-muted-foreground" />
                  <span className="text-[10px] tracking-wide truncate">
                    Ocean Of Ayurveda
                  </span>
                </div>
              </div>
              {/* <span className="font-bold">supabase</span> */}
            </Link>
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">


                      {products.map((product) => (
                        <Link
                          key={product._id}
                    
                          href={`/products/${product._id}`}
                        >
                          <div className="">{product.name}</div>
                          <div className="flex flex-col gap-2">
                            <div className="aspect-[4/3] overflow-hidden rounded-md">
                              <Image
                                src={product.images[0].url}
                                alt={product.name}
                                width={200}
                                height={150}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {typeof product.category === 'string' ? (
                                <p className="text-sm text-muted-foreground">
                                  {product.category}
                                </p>
                              ) : Array.isArray(product.category) ? (
                                product.category.map((cat: string, index: number) => (
                                  <p key={index} className="text-sm text-muted-foreground">
                                    {cat.trim()}
                                  </p>
                                ))
                              ) : null}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-2">
                      {categories?.map((category) => (
                        <ListItem
                          key={category?._id}
                          title={category?.name}
                          href={`/category/${category?.slug}`}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="aspect-[4/3] overflow-hidden rounded-md">
                              <Image
                                src={category?.images[0]?.url}
                                alt={category?.name}
                                width={200}
                                height={150}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {category?.description}
                            </p>
                          </div>
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Popular Kits</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-6 p-6 md:w-[800px] lg:w-[900px]">
                      <div className="grid grid-cols-3 gap-4">
                        {popularProducts?.map((product) => (
                          <Link
                            key={product?._id}
                            href={`/products/${product?._id}`}
                            passHref
                            legacyBehavior
                          >
                            <NavigationMenuLink className="block space-y-2">
                              <div className="aspect-square overflow-hidden rounded-lg bg-muted/50">
                                <Image
                                  src={product?.images[0]?.url || '/images/placeholder.png'}
                                  alt={product?.name}
                                  width={800}
                                  height={600}
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {product?.name}
                                </span>
                              </div>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>


                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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


              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">

            {/* <Link
              href="https://github.com/supabase/supabase"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              <span>75.4k</span>
            </Link>
            <Button variant="ghost" onClick={() => router.push("/auth")}>
              Sign in
            </Button> */}
            {/* <Button>Start your project</Button> */}
            {/* Wishlist */}
            {/* Search Command */}
            <div className="hidden sm:block">
              <SearchCommand products={products} categories={categories} />
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=""
            >
              <Link href="/wishlist">
                <Button variant="secondary" size="icon" aria-label="Wishlist">
                  <div className="relative">
                    <Heart className="h-5 w-5" />
                    {wishCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                        {wishCount}
                      </Badge>
                    )}
                  </div>
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/cart">
                <Button variant="secondary" size="icon" aria-label="Cart">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                        {cartCount}
                      </Badge>
                    )}
                  </div>
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:block"
            >

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={
                        session?.user.image || "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="p-3"> <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          session?.user.image ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback className="bg-gray-200">
                        <span className="sr-only">User avatar</span>
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h2 className="text-sm font-medium">
                        Hi, {session?.user.name}
                      </h2>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <Link href="#" className="hover:underline">
                          Sign up
                        </Link>
                        <span>·</span>
                        <Link href="#" className="hover:underline">
                          Sign in
                        </Link>
                      </div>
                    </div>
                  </div></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </motion.div>
            {/* <Button
              onClick={() => router.push("/search")}
              variant="outline"
              size="icon"
            >
              <Search className="h-6 w-6 text-muted-foreground" />
            </Button> */}

            {/* <ModeToggle /> */}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="block md:hidden"
                >
                  <span className="icon-[solar--hamburger-menu-line-duotone] text-xl mt-1 text-muted-foreground"></span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-xs p-0 overflow-auto pb-12"
              >
                <SheetHeader className="border-b p-4 ">
                  <SheetTitle className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path
                          fill="#3ECF8E"
                          d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659h9.362v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.659Z"
                        />
                      </svg>
                      <span className="font-bold">supabase</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col">
                  <div className="flex flex-col space-y-2">
                    <Link href="/" className="px-4 py-2 text-base font-medium border-b flex items-center justify-between">
                      Home
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {mainNav.map((item) => (
                      <AccordionItem key={item.title} value={item.title}>
                        <AccordionTrigger className="px-4 py-3 text-base hover:no-underline">
                          <span>{item.title}</span>
                          {/* <Plus className="h-4 w-4 shrink-0 transition-transform" /> */}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pb-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="px-6 py-2 text-sm"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="flex flex-col bg-gray-50/90 p-4">
                    {secondaryNav.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center justify-between py-3 text-base"
                      >
                        {item.title}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>

                  <div className="border-t p-4">
                    <div className="mb-4 flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100" />
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Hi, Friends</p>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          <Link href="#" className="underline">
                            Sign up
                          </Link>
                          <Link href="#" className="underline">
                            Sign in
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {userNav.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center justify-between py-2 text-base"
                        >
                          {item.title}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<"a"> & { title: string }
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
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
