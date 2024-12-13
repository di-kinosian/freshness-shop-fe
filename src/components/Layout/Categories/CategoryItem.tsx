import { Category } from "../../../redux/features/categories/types";

interface Props {
  category: Category;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

export const CategoryItem = ({ category, handleClick }: Props) => {
  return (
    <button
      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
        handleClick(event, category._id)
      }
      className="flex gap-1 items-center cursor-pointer"
    >
      <div className="text-black font-medium">{category.name}</div>
      <img src="/vector.svg" alt="Vector icon bottom" className="w-2.5 h-2.5" />
    </button>
  );
};
