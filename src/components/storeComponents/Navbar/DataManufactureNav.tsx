import Link from "next/link";
export default function DataManufactureNav({
  dataManufactureNav,
}: {
  dataManufactureNav: categoriesDTO[] | [];
}) {
  return (
    <>
      {dataManufactureNav.length != 0 ? (
        dataManufactureNav?.map((item, index) => {
          return (
            <li key={item.CATEGORY_ID}>
              <Link
                className="nav-link"
                href={`/categories/${item.CATEGORY_ID}`}
              >
                {item.CATEGORY_NAME}
              </Link>
            </li>
          );
        })
      ) : (
        <div>Something wrong</div>
      )}
    </>
  );
}
