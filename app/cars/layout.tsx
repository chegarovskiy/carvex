import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./p.module.css";
import { prisma } from "../../lib/prisma";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface Brands {
  brands: {
    code: string;
    name: string;
    uuid: string;
  }[];
}

interface FormData {
  text: string;
}

const Home = ({ brands }: Brands) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function createBrands(data: FormData) {
    try {
      fetch("http://localhost:3000/api/createbrands", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("createBrands error", error);
    }
  }

  const handleCreateBrands = async (data: FormData) => {
    try {
      createBrands(data);
    } catch (error) {
      console.log("handleCreateBrands", error);
    }
  };

  const createModels = async (uuid: string, name: string) => {
    try {
      fetch("http://localhost:3000/api/createmodels", {
        body: JSON.stringify({ uuid: uuid, name: name }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("handleApi error", error);
    }
  };

  const handleCreateModels = async (uuid: string, name: string) => {
    try {
      createModels(uuid, name);
    } catch (error) {
      console.log("handleCreateBrands", error);
    }
  };

  const createAllModels = async () => {
    try {
      fetch("http://localhost:3000/api/createallmodels", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("handleApi error", error);
    }
  };

  const handleCreateAllModels = async () => {
    try {
      createAllModels();
    } catch (error) {
      console.log("handleCreateBrands", error);
    }
  };

  const AdLogin = async () => {
    try {
      fetch("http://localhost:3000/api/ad/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("AdLogin error", error);
    }
  };

  const handleLogin = async () => {
    try {
      AdLogin();
    } catch (error) {
      console.log("handleLogin error", error);
    }
  };

  const Brands = async () => {
    try {
      fetch("http://localhost:3000/api/ad/marks", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("Brands error", error);
    }
  };

  const handleBrands = async () => {
    try {
      Brands();
    } catch (error) {
      console.log("handleBrands error", error);
    }
  };

  const Models = async () => {
    try {
      fetch("http://localhost:3000/api/ad/models", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("Models error", error);
    }
  };

  const handleModels = async () => {
    try {
      Models();
    } catch (error) {
      console.log("handleModels error", error);
    }
  };

  const Vehicles = async () => {
    try {
      fetch("http://localhost:3000/api/ad/vehicles", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("Vehicles error", error);
    }
  };

  const handleVehicles = async () => {
    try {
      Vehicles();
    } catch (error) {
      console.log("handleVehicles error", error);
    }
  };

  const Catalogs = async () => {
    try {
      fetch("http://localhost:3000/api/ad/catalogs", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("Catalogs error", error);
    }
  };

  const handleCatalogs = async () => {
    try {
      Catalogs();
    } catch (error) {
      console.log("handleCatalogs error", error);
    }
  };

  const Items = async () => {
    try {
      fetch("http://localhost:3000/api/ad/items", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("Items error", error);
    }
  };

  const handleItems = async () => {
    try {
      Items();
    } catch (error) {
      console.log("handleItems error", error);
    }
  };

  const OeItems = async () => {
    try {
      fetch("http://localhost:3000/api/ad/oerelations", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("OE Items error", error);
    }
  };

  const handleOeItems = async () => {
    try {
      OeItems();
    } catch (error) {
      console.log("handleItems error", error);
    }
  };

  const ItemCards = async () => {
    try {
      fetch("http://localhost:3000/api/ad/itemcards", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("ItemCards error", error);
    }
  };

  const handleItemCards = async () => {
    try {
      ItemCards();
    } catch (error) {
      console.log("handleItemCards error", error);
    }
  };

  const ItemReplaceCards = async () => {
    try {
      fetch("http://localhost:3000/api/ad/itemreplacecards", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("ItemReplaceCards error", error);
    }
  };

  const handleItemReplaceCards = async () => {
    try {
      ItemReplaceCards();
    } catch (error) {
      console.log("handleItemReplaceCards error", error);
    }
  };

  const AddItemId = async () => {
    try {
      fetch("http://localhost:3000/api/ad/additemids", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("ItemReplaceCards error", error);
    }
  };

  const handleAddItemId = async () => {
    try {
      AddItemId();
    } catch (error) {
      console.log("handleAddItemId error", error);
    }
  };

  return (
    <div>
      <button
        onClick={(e) => {
          handleLogin();
        }}
      >
        AD login
      </button>
      <button
        onClick={(e) => {
          handleBrands();
        }}
      >
        AD marks
      </button>
      <button
        onClick={(e) => {
          handleModels();
        }}
      >
        AD models
      </button>
      <button
        onClick={(e) => {
          handleVehicles();
        }}
      >
        AD vehicles
      </button>
      <button
        onClick={(e) => {
          handleCatalogs();
        }}
      >
        AD catalogs
      </button>
      <button
        onClick={(e) => {
          handleItems();
        }}
      >
        AD items
      </button>
      <button
        onClick={(e) => {
          handleOeItems();
        }}
      >
        AD OE items
      </button>
      <button
        onClick={(e) => {
          handleItemCards();
        }}
      >
        AD ItemCards
      </button>
      <button
        onClick={(e) => {
          handleItemReplaceCards();
        }}
      >
        AD ItemReplaceCards
      </button>
      <button
        onClick={(e) => {
          handleAddItemId();
        }}
      >
        AD Add item id to tables
      </button>
      {/* <h1 className=''>Create Brands</h1>
      <button onClick={e => {handleCreateBrands({text: 'handleCreate data'})}}>brands</button>
      <button onClick={e => {handleCreateAllModels()}}>all marks of marked brands</button>
      <div>
        {brands && brands.map((brand, index) => (
          <div key={index}>
            <div >{brand.name}</div>
            <button type='button' onClick={e => {handleCreateModels(brand.uuid, brand.name)}}>create models</button>
          </div>
        ))}
      </div> */}

      <div>
        {/* {brands && brands.map((brand, index) => (
          <div key={index} className={styles.brandslist}>
           <div>{brand.name}</div>
           <div>{brand.code}</div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps =async () => {

//   const brands = await prisma.mark.findMany({
//     where: {
//       marked: true,
//     },
//     orderBy: {mark: 'asc'},
//     select: {
//       mark: true,
//       markId: true,

//     }
//   })

//   return {
//     props: {
//       brands
//     }
//   }
// }
