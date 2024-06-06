import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function UseQrMenuCategory() {
  const queryClient = useQueryClient();

  const [categoriesHeading, setCategoriesHeading] = useState({
    headingTr: "",
    headingEng: "",
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const getItemCategories = async () => {
    if (!currentUser) {
      return [];
    }
    const qrMenuCollectionRef = collection(
      db,
      `businessUsers/${currentUser.uid}/qrMenu`
    );
    const categoriesSnapShot = await getDocs(qrMenuCollectionRef);
    return categoriesSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const {
    data: categoryItems,
    refetch,
    isFetching,
    isStale,
  } = useQuery({
    queryKey: ["categoryItems", currentUser?.uid],
    queryFn: getItemCategories,
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca veriyi stale olarak kabul etme
    cacheTime: 1000 * 60 * 10, // 10 dakika boyunca veriyi cache'de tut
    keepPreviousData: true, // Eski verilerin yeni veriler fetch edilene kadar kalmasını sağla
    refetchOnWindowFocus: false, // Pencereye odaklanıldığında tekrar fetch etme
    enabled: !!currentUser, // currentUser mevcutsa query çalışsın
    onSuccess: (data) => {
      console.log("Query başarılı:", data);
    },
    onError: (error) => {
      console.error("Query hatası:", error);
    },
  });
  // console.log("isFetching:", isFetching);
  // console.log("isStale:", isStale);

  const handleNewCategoryHeading = async () => {
    const newCategoryHeadingItem = {
      headingTr: categoriesHeading.headingTr,
      headingEng: categoriesHeading.headingEng,
    };
    const inventoriesCollectionRef = collection(
      db,
      `businessUsers/${currentUser.uid}/qrMenu`
    );

    const batch = writeBatch(db);
    const newDocRef = doc(inventoriesCollectionRef);

    batch.set(newDocRef, newCategoryHeadingItem);
    await batch.commit();

    setCategoriesHeading({
      headingTr: "",
      headingEng: "",
    });

    // Bu query'yi geçersiz kılar ve yeniden fetch edilmesini sağlar
    queryClient.invalidateQueries(["categoryItems", currentUser?.uid]);
  };

  const addCategoryMutation = useMutation({
    mutationFn: handleNewCategoryHeading,
    onSuccess: () => {
      queryClient.invalidateQueries(["categoryItems", currentUser?.uid]);
    },
  });

  return {
    categoryItems: categoryItems || [],
    categoriesHeading,
    setCategoriesHeading,
    addCategoryMutation,
    refetch,
  };
}
