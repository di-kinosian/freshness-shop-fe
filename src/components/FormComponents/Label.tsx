import { FormLabel } from "@mui/material";
// import { makeStyles } from "@mui/styles";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
}

export default function Label(props: LabelProps) {
  // const classes = useStyles(props);

  return (
    <FormLabel
      {...props}
      sx={{
        color: props.error ? "red" : "black",
      }}
    />
  );
}

// const useStyles = makeStyles(() => {
//   return {
//     root: {
//       color: "green",
//     },
//   };
// });
