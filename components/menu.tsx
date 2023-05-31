'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { MENU } from 'dictionarys/dictionary';

export default function Menu() {
    return <div className="p-[40px] min-w-[300px]">
        <h2 className=' text-green1 text-[28px] leading-[130%] tracking-[0.02em] capitalize '> { MENU.TEXT }</h2>

          <ul className='  text-[16px] leading-[158%] tracking-[0.03em] uppercase font-roboto text-black'>
            <li className='pt-[24px]'> <Link rel="stylesheet" href="" > { MENU.MAIN }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > { MENU.CATALOGUE }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > { MENU.CATALOG_OF_CARS }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > {MENU.ABOUT_US }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > {MENU.PAYMENT_AND_DELIVERY }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > {MENU.GUARANTEE }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > {MENU.CONTACTS }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > {MENU.GARAGE }</Link></li>
            <li className='pt-[16px]'> <Link rel="stylesheet" href="" > {MENU.FEEDBACK }</Link></li>         
            </ul>
        </div>
}



