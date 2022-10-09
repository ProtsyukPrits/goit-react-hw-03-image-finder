import { LoadButton } from "./Button.styled";


export const Button = ({ loadMore }) => {
  return <LoadButton type="button" onClick={loadMore}>Load more!</LoadButton>;
};