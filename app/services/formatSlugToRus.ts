export function getSlugRus(componentType: any): any {
    const rusSlugList: any = {
      processor: "Процессоры",
      motherboard: "Материнские платы",
      gpu: "Видеокарты",
      ram: "Оперативная память",
      ssd: "Хранение данных",
      hdd: "Хранение данных",
      power_supply: "Блоки питания",
      case: "Корпус",
      case_fans: "Охлаждение",
      liquid_cooling: "Охлаждение",
      cooler: "Охлаждение",
    };
  
    const slug = Object.keys(rusSlugList).find((slug) =>
      slug.includes(componentType)
    );
    return slug ? rusSlugList[slug] : "";
  }