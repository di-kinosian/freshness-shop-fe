import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import FormField from "./FormField";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
}

export function InputFormField<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          placeholder={placeholder || label}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

//   return (
//     <>
//       {/* Header */}
//       <div
//         className={twMerge(
//           "bg-white sticky top-0 z-10",
//           hasShadow && "border-b border-gray-300",
//         )}
//       >
//         <div className="h-16 flex items-center justify-between max-w-full sm:max-w-[1200px] px-4 sm:px-6 mx-auto">
//           {/* Logo */}
//           <img
//             src="/freshness-shop-fe/freshnesecom.svg"
//             alt="Logo freshnesecom"
//             onClick={goToMainPage}
//             className="cursor-pointer hidden sm:block"
//           />
//           <img
//             src="/freshness-shop-fe/freshnesecom.svg"
//             alt="Logo freshnesecom"
//             onClick={goToMainPage}
//             className="cursor-pointer block sm:hidden w-24"
//           />

//           {/* Search */}
//           <div className="hidden sm:block">
//             <Search />
//           </div>

//           {/* Icons */}
//           <div className="flex gap-6 sm:gap-10 items-center">
//             <UserIcon
//               isLogin={isLogin}
//               className="cursor-pointer"
//               onClick={isLogin ? handleUserIconClick : handleOpenLogin}
//             />
//             <div className="relative" onClick={goToCart}>
//               <img
//                 src="/freshness-shop-fe/ic-ecommerce-basket.svg"
//                 alt="Shopping basket icon"
//                 className="cursor-pointer"
//               />
//               <div className="cursor-pointer absolute top-[8px] right-[6px] sm:top-[12px] sm:right-[9px]">
//                 <Bage>{cart.length}</Bage>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="block sm:hidden px-4 py-2">
//           <Search />
//         </div>
//       </div>

//       {/* Popover */}
//       <Popover onClose={handleUserMenuClose} anchorEl={anchorEl} left={-24}>
//         <div className="px-4 py-2 border border-basicGray rounded-md">
//           {isLogin && (
//             <ul className="space-y-2">
//               <li className="cursor-pointer flex gap-2 items-center">
//                 <PersonIcon fontSize="small" />
//                 <span>Profile</span>
//               </li>
//               <li
//                 className="cursor-pointer flex gap-2 items-center"
//                 onClick={handleOpenWishList}
//               >
//                 <ChecklistIcon fontSize="small" />
//                 <span>Wish list</span>
//               </li>
//               <li
//                 className="cursor-pointer flex gap-2 items-center"
//                 onClick={handleOpenLogout}
//               >
//                 <LogoutIcon fontSize="small" />
//                 <span>Log out</span>
//               </li>
//             </ul>
//           )}
//         </div>
//       </Popover>
//     </>
// }
