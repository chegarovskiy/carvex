'use client';

import clsx from 'clsx';

export default function Sidebar() {
    return <div className="bg-slate-400 min-w-[300px]">
            <ul>
                <li>Аксесуари</li>
                <li>Автосервісне приладдя</li>
                <li>Вихлопна система</li>
                <li>Інструменти</li>
                <li>Оливи та автохімія</li>
                <li>Обладнання для автосервісу</li>
                <li>Склоочисник</li>
                <li>Гальмівна система</li>
                <li>Палисна</li>
                <li>Фільтри LPG</li>
                <li>Електрообладнання</li>
            </ul>
            <ul>
                <li>Про нас</li>
                <li>Оплата та доставка</li>
                <li>Гарантія</li>
                <li>Контакти</li>
            </ul>
        </div>
}