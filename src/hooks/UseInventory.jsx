import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function useInventory() {
  const [item, setItem] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "Yiyecek",
    itemTax: "20%",
    itemPrice: "",
  });
  const [inventoryItemList, setInventoryItemList] = useState([]);
  const [inventoryItem, setInventoryItem] = useState(null);
  const navigate = useNavigate();

  const handleNewItem = async () => {
    try {
      const newInventoryItem = {
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemCategory: item.itemCategory,
        itemTax: item.itemTax,
        itemPrice: item.itemPrice,
      };
      const inventoriesCollectionRef = collection(
        db,
        `businessUsers/${auth.currentUser.uid}/inventory`
      );

      const batch = writeBatch(db);
      const newDocRef = doc(inventoriesCollectionRef);

      batch.set(newDocRef, newInventoryItem);
      await batch.commit();

      console.log("Batch write succeeded.");

      setItem({
        itemName: "",
        itemDescription: "",
        itemCategory: "Yiyecek",
        itemTax: "20%",
        itemPrice: "",
      });

      console.log("New item added successfully.");

      navigate(`/inventory/${newDocRef.id}`);
    } catch (error) {
      console.error("Batch write failed: ", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const docRef = doc(
        db,
        `businessUsers/${auth.currentUser.uid}/inventory/${id}`
      );
      await deleteDoc(docRef);

      console.log("Document successfully deleted!");
      console.log("Deleted item id: ", id);

      navigate("/inventory");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const getInventoryItems = async () => {
    const inventoriesCollectionRef = collection(
      db,
      `businessUsers/${auth.currentUser.uid}/inventory`
    );

    const snapshot = await getDocs(inventoriesCollectionRef);
    const inventories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setInventoryItemList(inventories);
  };

  const getInventoryItem = async (id) => {
    try {
      const docRef = doc(
        db,
        `businessUsers/${auth.currentUser.uid}/inventory/${id}`
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInventoryItem(docSnap.data());
      } else {
        setInventoryItem(null);
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      setInventoryItem(null);
    }
  };

  return {
    item,
    setItem,
    inventoryItemList,
    handleNewItem,
    getInventoryItems,
    getInventoryItem,
    inventoryItem,
    handleDeleteItem,
  };
}
