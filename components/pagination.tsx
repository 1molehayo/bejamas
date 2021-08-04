import { useAppContext } from "../contexts/appContext";
import { Button } from "./button";

interface IProps {
  fetchData: (val: "next" | "prev") => void;
}

export const Pagination = ({ fetchData }: IProps) => {
  const { currentPage, pageSize } = useAppContext();

  return (
    <div className="pagination">
      <Button
        text="Previous Page"
        type="outline"
        disabled={currentPage === 1}
        onClick={() => fetchData("prev")}
      />

      <Button
        text="Next Page"
        type="outline"
        disabled={currentPage === pageSize}
        onClick={() => fetchData("next")}
      />
    </div>
  );
};
