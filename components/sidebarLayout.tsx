'use client';

import Catalogue from './catalogue';
import Menu from "./menu"

import clsx from 'clsx';

export default function SidebarLayout() {
    return <div className="bg-[#FFFFFF] min-w-[300px] ">
        <Catalogue />
        <div className='border-b border-solid border-[#E7E7E7] '></div>
        <Menu />
        <div className='border-b border-solid border-[#E7E7E7] '></div>
        </div>
}