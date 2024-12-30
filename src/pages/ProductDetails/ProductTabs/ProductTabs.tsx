import { useAppSelector } from "@redux/app/hooks";
import { selectComments } from "@redux/features/comments/selectors";
import { Product } from "@redux/features/products/types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDialog } from "@components/Dialog/context/DialogContext";
import { AddReviewForm } from "@components/AddReviewForm/AddReviewForm";
import { AppDispatch } from "@redux/app/store";
import { useDispatch } from "react-redux";
import { getComments } from "@redux/features/comments/commentsSlice";
import { DescriptionTab } from "./Tabs/DescriptionTab";
import { ReviewsTab } from "./Tabs/Review/ReviewsTab";

interface Props {
  product: Product;
}

export const ProductTabs = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Reviews");
  const comments = useAppSelector(selectComments);
  const { openDialog, closeDialog } = useDialog();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments({ productId: product._id }));
  }, []);

  const handleOpenReviewDialog = (): void => {
    openDialog({
      title: "Add review",
      content: <AddReviewForm onClose={closeDialog} productId={product._id} />,
      className: "w-[400px]",
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full p-2 flex justify-between border-b border-grayBorder">
        {["Description", "Reviews", "Questions"].map((tab) => (
          <span
            key={tab}
            className={twMerge(
              "text-xl font-semibold text-black relative cursor-pointer",
              activeTab === tab ? "text-black" : "text-gray-500",
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </span>
        ))}
      </div>
      {activeTab === "Description" && <DescriptionTab product={product} />}
      {activeTab === "Reviews" && (
        <ReviewsTab
          productId={product._id}
          comments={comments}
          handleOpenReviewDialog={handleOpenReviewDialog}
        />
      )}
    </div>
  );
};
