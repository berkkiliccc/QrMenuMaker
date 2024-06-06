import UseInventory from "../hooks/UseInventory";

// eslint-disable-next-line react/prop-types
export default function AddInventoryItemModal({ open, onClose, onSuccess }) {
  const { item, setItem, handleNewItem } = UseInventory();

  const addInventoryItem = async () => {
    try {
      await handleNewItem();
      onClose();
      onSuccess();
      console.log("Item added successfully. addInventoryItem modal closed.");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (!open) return null;

  return (
    <dialog id="additem" className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">
        <label className="input input-bordered input-md flex items-center gap-2 mt-3">
          Ürün İsmi
          <input
            type="text"
            className="grow"
            placeholder="Ürün ismi"
            onChange={(e) => {
              setItem({ ...item, itemName: e.target.value });
            }}
            value={item?.itemName}
            required
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Ürün Açıklaması</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Ürün Açıklaması"
            onChange={(e) => {
              setItem({ ...item, itemDescription: e.target.value });
            }}
            value={item?.itemDescription}
          ></textarea>
        </label>

        <label className="input input-bordered input-md flex items-center justify-between gap-2 mt-3">
          Kategori
          <select
            className="select select-bordered select-sm w-1/2 max-w-xs text-center"
            value={item.itemCategory}
            onChange={(e) => {
              const newCategory = e.target.value;
              console.log("Selected Category:", newCategory);
              setItem((prevItem) => ({
                ...prevItem,
                itemCategory: newCategory,
              }));
              console.log("Updated Item:", {
                ...item,
                itemCategory: newCategory,
              });
            }}
          >
            <option value="Yiyecek">Yiyecek</option>
            <option value="Alkol">Alkol</option>
            <option value="İçecek">İçecek</option>
          </select>
        </label>

        <label className="input input-bordered input-md flex items-center justify-between gap-2 mt-3">
          Kdv
          <select
            className="select select-bordered select-sm w-1/2 max-w-xs text-center"
            value={item.itemTax}
            onChange={(e) => {
              const newKdv = e.target.value;
              console.log("Selected KDV:", newKdv);
              setItem((prevItem) => ({
                ...prevItem,
                itemTax: newKdv,
              }));
              console.log("Updated Item:", { ...item, itemTax: newKdv });
            }}
          >
            <option value="20%">20%</option>
            <option value="10%">10%</option>
            <option value="1%">1%</option>
          </select>
        </label>

        <label className="input input-bordered input-md flex items-center gap-2 mt-3 ">
          Ürün Fiyatı
          <input
            type="number"
            className="grow text-center "
            placeholder="Ürün Fiyatı"
            value={item?.itemPrice}
            onChange={(e) => {
              setItem({ ...item, itemPrice: e.target.value });
            }}
            required
          />
          <i className="fa-solid fa-turkish-lira-sign"></i>
        </label>

        <div className="modal-action">
          <form method="dialog">
            <div className="flex items-center justify-between gap-2">
              <button className="btn" onClick={onClose}>
                Vazgeç
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  addInventoryItem();
                }}
              >
                Onayla
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
