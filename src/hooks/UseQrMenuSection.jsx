import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../config/firebase";

export default function UseQrMenuSection() {
  const queryClient = useQueryClient();

  const [sectionName, setSectionName] = useState({
    sectionName: "",
  });

  const [sectionItemId, setSectionItemId] = useState(null);
  const [categoryItemId, setCategoryItemId] = useState(null);

  const getCategorySections = async () => {
    if (!auth.currentUser) {
      return [];
    }
    const qrMenuCollectionRef = collection(
      db,
      `businessUsers/${auth.currentUser.uid}/qrMenu/${categoryItemId}/sections`
    );
    const categoriesSnapShot = await getDocs(qrMenuCollectionRef);
    return categoriesSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const {
    data: sectionItems,
    refetch: refetchSections,
    isFetching,
    isStale,
  } = useQuery({
    queryKey: ["sectionItems", auth.currentUser?.uid],
    queryFn: getCategorySections,
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca veriyi stale olarak kabul etme
    cacheTime: 1000 * 60 * 10, // 10 dakika boyunca veriyi cache'de tut
    keepPreviousData: true, // Eski verilerin yeni veriler fetch edilene kadar kalmasını sağla
    refetchOnWindowFocus: false, // Pencereye odaklanıldığında tekrar fetch etme
    enabled: !!auth.currentUser, // currentUser mevcutsa query çalışsın
    onSuccess: (data) => {
      console.log("Query başarılı:", data);
    },
    onError: (error) => {
      console.error("Query hatası:", error);
    },
  });
  //   console.log("isFetching:", isFetching);
  //   console.log("isStale:", isStale);

  const handleNewSectionItem = async () => {
    const newSectionItem = {
      sectionName: sectionName.sectionName,
    };

    const qrMenuCollectionRef = collection(
      db,
      `businessUsers/${auth.currentUser.uid}/qrMenu/${categoryItemId}/sections`
    );

    const batch = writeBatch(db);
    const newDocRef = doc(qrMenuCollectionRef);

    batch.set(newDocRef, newSectionItem);
    await batch.commit();

    setSectionName({
      sectionName: "",
    });

    console.log("Category Id icine eklendi", categoryItemId);

    // Bu query'yi geçersiz kılar ve yeniden fetch edilmesini sağlar
    queryClient.invalidateQueries(["sectionItems", auth.currentUser?.uid]);
  };

  const addSectionMutation = useMutation({
    mutationFn: handleNewSectionItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["sectionItems", auth.currentUser?.uid]);
    },
  });

  return {
    sectionItems: sectionItems || [],
    sectionName,
    setSectionName,
    addSectionMutation,
    refetchSections,
    sectionItemId,
    setSectionItemId,
    categoryItemId,
    setCategoryItemId,
  };
}
