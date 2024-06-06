import { Link, useNavigate, useParams } from "react-router-dom";
import UseInventory from "../../hooks/UseInventory";
import { useEffect, useState } from "react";
import AddInventoryItemModal from "../../components/AddInventoryItemModal";

export default function Inventory() {
  const {
    inventoryItemList,
    getInventoryItems,
    getInventoryItem,
    inventoryItem,
    handleDeleteItem,
  } = UseInventory();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getInventoryItems();
    console.log("Inventory items fetched.");
  }, []);

  useEffect(() => {
    if (params.inventoryId) {
      setLoading(true);
      getInventoryItem(params.inventoryId).finally(() => setLoading(false));
    }
  }, [params.inventoryId]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`md:w-80 text-lg  w-full bg-base-200 text-base-content p-4 ${
          params.inventoryId ? "hidden md:block" : ""
        }
      `}
      >
        <div className="flex justify-between ">
          <div className="lg:tooltip" data-tip="Geri">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                navigate("/");
              }}
            >
              <i className="fa-solid fa-backward"></i>
            </button>
          </div>
          <div className="lg:tooltip" data-tip="Oluştur">
            <button
              className="btn btn-ghost btn-sm "
              onClick={() => handleOpenModal()}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Envanter</h2>
        <label className="input input-bordered input-sm flex items-center gap-2 ">
          <input type="text" className="grow" placeholder="Ara" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        {inventoryItemList.length > 0 && inventoryItemList && (
          <div className="mt-4">
            {inventoryItemList.map((item) => (
              <div className="bg-base-200 " key={item.id}>
                <Link
                  to={`/inventory/${item.id}`}
                  className="text-xl md:text-lg font-semibold"
                  onClick={() => getInventoryItem(item.id)}
                >
                  {item.itemName}
                </Link>
                <div className="divider m-0 p-0 " />
              </div>
            ))}
          </div>
        )}

        {inventoryItemList.length === 0 && (
          <p className="text-lg">Henüz envanterinizde ürün bulunmamaktadır.</p>
        )}
      </div>

      {params.inventoryId && (
        <div className="flex-grow p-4">
          {loading ? ( // Yüklenme durumunda loading göstergesi
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <span className="loading loading-ring loading-xs"></span>
              <span className="loading loading-ring loading-sm"></span>
              <span className="loading loading-ring loading-md"></span>
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : (
            inventoryItem && (
              <div className="min-h-screen">
                <div className="lg:tooltip" data-tip="Geri">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      navigate(`/inventory`);
                    }}
                  >
                    <i
                      className="fa-solid fa-chevron-left fa-2xl md:fa-xl"
                      style={{ color: "#74C0FC" }}
                    ></i>
                    <p
                      className="text-xl md:text-l"
                      style={{ color: "#74C0FC" }}
                    >
                      Geri
                    </p>
                  </button>
                </div>
                <div className="flex">
                  <h1 className="text-3xl font-bold md:font-bold md:text-2xl">
                    {inventoryItem.itemName}
                  </h1>
                  <div className="lg:tooltip" data-tip="Düzenle">
                    <button className="btn btn-ghost btn-sm">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </div>
                </div>
                <p className="text-2xl md:text-xl font-thin mt-2">
                  {inventoryItem.itemName}
                </p>

                <div className="divider"></div>
                <div className="flex justify-center w-full text-center ">
                  <div className="w-full max-w-md">
                    <label className="input input-bordered input-md flex items-center gap-2 mt-3 ">
                      Ürün İsmi
                      <div className="divider divider-horizontal p-0 m-0"></div>
                      <input
                        type="text"
                        className="grow "
                        placeholder="Ürün ismi"
                        value={inventoryItem?.itemName}
                        readOnly
                        required
                      />
                    </label>

                    <label className="form-control mt-3">
                      <div className="label">
                        <span className="label-text text-xl">
                          Ürün Açıklaması
                        </span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        placeholder="Ürün Açıklaması"
                        value={inventoryItem?.itemDescription}
                        readOnly
                      ></textarea>
                    </label>

                    <label className="input input-bordered input-md flex items-center justify-between gap-2 mt-3">
                      Kategori
                      <select
                        className="select select-bordered select-sm w-1/2 max-w-xs text-center "
                        value={inventoryItem.itemCategory}
                        readOnly
                      >
                        <option value="Yiyecek">Yiyecek</option>
                        <option value="Alkol">Alkol</option>
                        <option value="İçecek">İçecek</option>
                      </select>
                    </label>

                    <label className="input input-bordered input-md flex items-center justify-between gap-2 mt-3">
                      Kdv
                      <select
                        className="select select-bordered select-sm w-1/2 max-w-xs text-center "
                        value={inventoryItem.itemTax}
                        readOnly
                      >
                        <option value="20%">20%</option>
                        <option value="10%">10%</option>
                        <option value="1%">1%</option>
                      </select>
                    </label>

                    <label className="input input-bordered input-md flex items-center justify-between gap-2 mt-3 ">
                      Ürün Fiyatı
                      <input
                        type="text"
                        className="grow text-end text-lg font-serif mr-3"
                        placeholder="Ürün Fiyatı"
                        value={inventoryItem?.itemPrice}
                        readOnly
                        required
                      />
                      <i className="fa-solid fa-turkish-lira-sign"></i>
                    </label>

                    <div className="flex justify-center mt-6">
                      <button
                        className="btn btn-error"
                        onClick={() => handleDeleteItem(params.inventoryId)}
                      >
                        Envanteri Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <AddInventoryItemModal
        open={openModal}
        onClose={handleCloseModal}
        onSuccess={getInventoryItems}
      />
    </div>
  );
}
