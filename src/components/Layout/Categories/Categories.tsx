import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../../main/constants/common";

interface SubCategories {
  name: string;
  _id: string;
  parentCategoryId: string;
}

interface CategoryList {
  name: string;
  subCategories: SubCategories[];
  _v?: number;
  _id: string;
}

export const Categories = () => {
  const [categoryList, setCategoryList] = useState<CategoryList[] | []>([]);
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const responce = await axios.get(`${url}/categories`);
      console.log(responce.data);
      setCategoryList(responce.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-14 flex justify-around items-center bg-neutralGrayBg w-full max-w-[1200px] mx-auto">
      {categoryList.map((category) => (
        <div className="flex gap-1 items-center">
          <div className="text-black font-medium">{category.name}</div>
          <img src="/vector.svg" alt="" className="w-2.5 h-2.5" />
        </div>
      ))}
    </div>
  );
};
