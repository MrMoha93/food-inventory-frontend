interface Props {
  isFavored: boolean;
  onFavor(): void;
}

function Favorite({ isFavored, onFavor }: Props) {
  let classes = "clickable fa-star fa-";
  classes += isFavored ? "solid" : "regular";

  return <i className={classes} onClick={onFavor} />;
}

export default Favorite;
