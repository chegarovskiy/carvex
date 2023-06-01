interface Dictionary<T> {
    [Key: string]: T;
}

export const HEADER: Dictionary<string> = {
    'CATALOG': 'каталог',
    'TEXT_1': 'автозапчастини для',
    'TEXT_2': 'твоєї',
    'TEXT_3': 'car',
    'SEARCH': 'пошук',
    'SEARCH_TEXT': 'що бажаєте знайти?',
    'SELECT_MARK': 'марка',
    'SELECT_MODEL': 'модель',
    'SELECT_MODIFICATION': 'модифікація',
    
}

export const CATALOGUE: Dictionary<string> = {
    "TEXT":"каталог",
    "ACCESSORIES": "Аксесуари",
    "CAR_SERVICE_ACCESSORIES": "Автосервісне приладдя",
    "EXHAUST_SYSTEM": "Вихлопна система",
    "INSTRUMENT": 'Інструмент',
    "OIL_CHEMISTRY": "Оливи та автохімія",
    "EQUIPMENT_FOR_CAR_SERVICE": "Обладнання для автосервісу",
    "WINDSCREEN_WIPER": "Склоочисник",
    "BRAKING_SYSTEM": "Гальмівна система",
    "FUEL_SYSTEM": "Паливна система",
    "FILTERS_LPG": "Фільтри LPG",
    "ELECTRICAL_EQUIPMENT": "Електрообладнення",
}

export const MENU: Dictionary<string> = {
    "TEXT":"меню",
    "MAIN": "головна",
    "CATALOGUE": "каталог",
    "CATALOG_OF_CARS": "каталог по машинах",
    "ABOUT_US": "про нас",
    "PAYMENT_AND_DELIVERY": "оплата та доставка",
    "GUARANTEE": "гарантія",
    "CONTACTS": "контакти",
    "GARAGE": "гараж",
    "FEEDBACK": "зворотній зв'язок",
    
}