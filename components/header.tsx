"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/images/logo.svg";
import menu from "../public/assets/icons/burger-menu.svg";
import garage from "../public/assets/icons/garage.svg";
import shoppingCart from "../public/assets/icons/shopping-cart.svg";
import catalog from "../public/assets/icons/catalog.svg";
import { HEADER } from "../dictionarys/dictionary";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";



export default function Header() {
  return (
    <nav className="flex justify-between w-full">
      <div className="flex justify-start items-center">
        <Link href="/">
          <Image src={menu} alt={"menu"} width={32} height={32} className="" />
        </Link>
        <Link href="/" className="pl-[32px]">
          <Image
            src={logo}
            alt={"Carvex Logo"}
            width={117}
            height={50}
            className=""
          />
        </Link>
        <Link href="/" className="flex items-center pl-[32px]">
          <Image src={catalog} alt={"catalog"} width={32} height={32} className="" />
          <h1 className={'header_catalog_text'}>{HEADER.CATALOG.toUpperCase()}</h1>
        </Link>
      </div>
      <div className="flex justify-end items-center">
        <Link href="/">
          <Image src={garage} alt={"garage"} width={32} height={32} className="" />
        </Link>
        <Link href="/" className="pl-[32px]">
          <Image src={shoppingCart} alt={"shopping-cart"} width={32} height={32} className="" />
        </Link>
      </div>
    </nav>
  );
}
