interface Props {
  isInWishList: boolean;
}

const WishListIcon = ({ isInWishList }: Props) => {
  return (
    <svg
      width="17"
      height="15"
      viewBox="0 0 17 15"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isInWishList ? "fill-black" : "fill-none"} stroke-black`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.70191 2.76001C10.3384 2.12349 11.2017 1.7659 12.1019 1.7659C13.0021 1.7659 13.8654 2.12349 14.5019 2.76001C15.1384 3.39653 15.496 4.25984 15.496 5.16001C15.496 6.06019 15.1384 6.92349 14.5019 7.56001L13.6286 8.43334L8.82858 13.2333L4.02858 8.43334L3.15525 7.56001C2.51873 6.92349 2.16113 6.06019 2.16113 5.16001C2.16113 4.25984 2.51873 3.39653 3.15525 2.76001C3.79177 2.12349 4.65507 1.7659 5.55525 1.7659C6.45542 1.7659 7.31873 2.12349 7.95525 2.76001L8.82858 3.63334L9.70191 2.76001Z"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WishListIcon;
