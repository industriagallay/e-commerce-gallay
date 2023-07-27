


export const dataProducts = [
    {
      id: 11,
      title: "Mario Kart™ 8 Deluxe",
      price: "$59.99",
      category: "Nintendo Switch",
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/m/mario-kart-8-deluxe-switch/hero?_a=AJADJWI0",
    },
    {
      id: 22,
      title: "TRIANGLE STRATEGY™",
      price: "$59.99",
      category: "Nintendo Switch",
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/t/triangle-strategy-switch/hero?_a=AJADJWI0",
    },
    {
      id: 33,
      title: "Pokémon™ Legends: Arceus",
      price: "$59.99",
      category: "Nintendo Switch",
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/p/pokemon-legends-arceus-switch/hero?_a=AJADJWI0",
    },
    {
      id: 44,
      title: "Super Mario™ 3D World + Bowser’s Fury",
      price: "$59.99",
      category: "Nintendo Switch",
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/s/super-mario-3d-world-plus-bowsers-fury-switch/hero?_a=AJADJWI0",
    },
    {
      id: 55,
      title: "Cuphead",
      price: "$19.99",
      category: "Nintendo Switch",
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/c/cuphead-switch/hero?_a=AJADJWI0",
    },
    {
      id: 66,
      title: "Minecraft",
      price: "$29.99",
      category: "Nintendo Switch",
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/m/minecraft-switch/hero?_a=AJADJWI0",
    },
    {
      id: 77,
      title: "Mario + Rabbids® Kingdom Battle",
      price: "$59.99",
      category: "Nintendo Switch",
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/m/mario-plus-rabbids-kingdom-battle-switch/hero?_a=AJADJWI0",
    },
    {
      id: 88,
      title: "Unravel Two",
      price: "$59.99",
      category: "Nintendo Switch",
      sale: 63, //percent
      linkImg:
        "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/u/unravel-two-switch/hero?_a=AJADJWI0",
    },
  ];

  export interface Product {
    id: number;
    title: string;
    price: string;
    category: string;
    linkImg: string;
    sale?: number;
  }