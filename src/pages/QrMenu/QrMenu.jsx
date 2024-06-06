import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AddCategoryHeadingModal from "../../components/AddCategoryHeadingModal";
import UseQrMenuCategory from "../../hooks/UseQrMenuCategory";
import UseQrMenuSection from "../../hooks/UseQrMenuSection";

export default function QrMenu() {
  const params = useParams();
  const navigate = useNavigate();

  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalSection, setOpenModalSection] = useState(false);

  const { categoryItems, refetch } = UseQrMenuCategory();
  const {
    sectionItems,
    sectionName,
    setSectionName,
    addSectionMutation,
    setCategoryItemId,
    categoryItemId,
  } = UseQrMenuSection();

  const addSectionItem = async () => {
    try {
      await addSectionMutation.mutateAsync();

      console.log(
        "Item added successfully. addSectionNameModal modal closed.",
        categoryItemId
      );
      setOpenModalSection(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (!open) return null;

  const handleOpenModal = () => {
    setOpenModalCategory(true);
  };

  const handleCloseModal = () => {
    setOpenModalCategory(false);
  };

  const handleOpenModalSection = (categoryId) => {
    setOpenModalSection(true);
    setCategoryItemId(categoryId);
    console.log("categoryId HandleOpenModalSection", categoryId);
  };

  const handleCloseModalSection = () => {
    setOpenModalSection(false);
  };

  const handleSectionClick = (sectionId) => {
    console.log("sectionId:", sectionId);
  };

  const openCollapse = (event) => {
    const collapse = event.target.closest(".collapse");
    collapse.classList.toggle("collapse-open");
  };

  return (
    <div className="flex h-screen">
      <div
        className={`md:w-80 text-lg w-full bg-base-200 text-base-content p-4 ${
          params.inventoryId ? "hidden md:block" : ""
        }`}
      >
        <div className="flex justify-between">
          <div className="lg:tooltip" data-tip="Geri">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate("/")}
            >
              <i className="fa-solid fa-backward"></i>
            </button>
          </div>
          <div className="lg:tooltip" data-tip="Oluştur">
            <button className="btn btn-ghost btn-sm" onClick={handleOpenModal}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Menü</h2>
        <label className="input input-bordered input-sm flex items-center gap-2">
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

        {categoryItems && categoryItems.length > 0 && (
          <div>
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="collapse collapse-arrow bg-base-200 rounded-none p-2 m-2"
              >
                <input
                  type="checkbox"
                  onClick={(event) => openCollapse(event)}
                />

                <div className="collapse-title text-l font-medium">
                  <div>{item.headingTr}</div>
                </div>

                <div className="collapse-content bg-white p-2 m-0">
                  {sectionItems &&
                    sectionItems.length > 0 &&
                    sectionItems.map((section) => (
                      <ul
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                      >
                        {section.categoryId === item.id && (
                          <li className="p-2">{section.sectionName}</li>
                        )}
                      </ul>
                    ))}
                  <div className="flex items-center justify-center">
                    <div className="lg:tooltip w-full" data-tip="Kısım Oluştur">
                      <div className="divider m-0 p-0"></div>
                      <button
                        className="btn btn-ghost btn-sm w-full"
                        onClick={() => handleOpenModalSection(item.id)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddCategoryHeadingModal
        open={openModalCategory}
        onClose={handleCloseModal}
        onSuccess={refetch}
      />
      {/* //* Add Section Modal */}
      {openModalSection && (
        <dialog
          id="addcategory"
          className={`modal ${open ? "modal-open" : ""}`}
        >
          <div className="modal-box flex-1">
            <label className="input input-bordered input-md flex items-center gap-2 mt-3">
              Başlık
              <div className="divider divider-horizontal"></div>
              <input
                type="text"
                className="grow"
                placeholder=" Başlık"
                onChange={(e) =>
                  setSectionName({
                    ...sectionName,
                    sectionName: e.target.value,
                  })
                }
                value={sectionName?.sectionName}
                required
              />
            </label>

            <div className="modal-action">
              <form method="dialog">
                <div className="flex items-center justify-between gap-2">
                  <button className="btn" onClick={handleCloseModalSection}>
                    Vazgeç
                  </button>
                  <button className="btn btn-primary" onClick={addSectionItem}>
                    Onayla
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
