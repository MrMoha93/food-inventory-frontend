interface Item {
  id: string;
  name: string;
}

interface Props<T extends Item> {
  items: T[];
  selectedItem: T;
  onItemSelect(category: T): void;
}

//Jämfört med andra reusable components som pagination så
// behövde vi inte köra generics eftersom typerna är primitiva
// Listgroup däremot kan behöva katerogirer, kunder, regioner och de typerna ser annorlunda ut.
// Favorite kommer alltid vara en boolean och en funktion, kommer aldrig vara en number eller en kategori.

function ListGroup<T extends Item>({
  items,
  selectedItem,
  onItemSelect,
}: Props<T>) {
  return (
    <ul className="list-group ">
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={`list-group-item ${
            item.id === selectedItem.id ? "active" : ""
          }`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
