import UseQrMenuCategory from "../hooks/UseQrMenuCategory";

// eslint-disable-next-line react/prop-types
export default function AddCategoryHeadingModal({ open, onClose, onSuccess }) {
  const { categoriesHeading, setCategoriesHeading, addCategoryMutation } =
    UseQrMenuCategory();

  const addCategory = async () => {
    try {
      await addCategoryMutation.mutateAsync();
      onClose();
      onSuccess();
      console.log("Item added successfully. addInventoryItem modal closed.");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (!open) return null;
  return (
    <dialog id="addcategory" className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box flex-1   ">
        <label className="input input-bordered input-md flex items-center gap-2 mt-3">
          Başlık
          <div className="divider divider-horizontal"></div>
          <input
            type="text"
            className="grow"
            placeholder=" Başlık"
            onChange={(e) => {
              setCategoriesHeading({
                ...categoriesHeading,
                headingTr: e.target.value,
              });
            }}
            value={categoriesHeading?.headingTr}
            required
          />
        </label>
        <label className="input input-bordered input-md flex items-center gap-2 mt-3">
          Başlık (İngilizce)
          <div className="divider divider-horizontal"></div>
          <input
            type="text"
            className="grow"
            placeholder="Başlık (İngilizce)"
            onChange={(e) => {
              setCategoriesHeading({
                ...categoriesHeading,
                headingEng: e.target.value,
              });
            }}
            value={categoriesHeading?.headingEng}
            required
          />
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
                  addCategory();
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
