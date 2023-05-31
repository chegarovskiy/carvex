'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { CATALOGUE } from 'dictionarys/dictionary';
import catologDark from "../public/assets/icons/catologDark.svg";

export default function Catalogue() {
    return <div className=" min-w-[300px] pl-[40px]  py-[40px] ">
        <div className='flex text-center items-center  '>
             <Image src={catologDark} alt={"catalog"} width={26} height={26} className="mr-[19px]" />
            <h2 className='font-roboto text-green1 text-[28px] leading-[130%] tracking-[0.02em] capitalize '>{ CATALOGUE.TEXT}</h2>
        </div>

    <div className=' text-[16px] leading-[20px]  font-montserrat font-medium pt-[24px] '>
            <div className='flex text-center items-center  '>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
                <Link  rel="stylesheet" href="" className=''>{ CATALOGUE.ACCESSORIES}</Link>
            </div>
              <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.CAR_SERVICE_ACCESSORIES}</Link>
            </div>
              <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.EXHAUST_SYSTEM}</Link>
            </div>
              <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.INSTRUMENT}</Link>
            </div>
              <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.OIL_CHEMISTRY}</Link>
            </div>
           <div className='flex text-center items-center  pt-[16px] '>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
                <Link  rel="stylesheet" href="" className=''>{ CATALOGUE.EQUIPMENT_FOR_CAR_SERVICE}</Link>
            </div>
           <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.WINDSCREEN_WIPER}</Link>
        </div>
           <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.BRAKING_SYSTEM}</Link>
        </div>
           <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.FUEL_SYSTEM}</Link>
            </div>
             <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.FILTERS_LPG}</Link>
        </div>
         <div className='flex text-center items-center pt-[16px]'>
                <Image src={catologDark} alt={"catalog"} width={24} height={24} className="mr-[8px]" />
               <Link rel="stylesheet" href="" >{ CATALOGUE.ELECTRICAL_EQUIPMENT}</Link>
        </div>
     </div>        
    </div>
}