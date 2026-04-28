import { useRoomAssignments } from "../../hooks/queries/useRoomAssignments";
import { useUIStore } from "../../store/uiStore";
import { Search } from "lucide-react";
import { useState } from "react";

const LockerList = ({ roomId }: { roomId: number }) => {
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const { data: assignments, isLoading, error } = useRoomAssignments(roomId);
  const openModal = useUIStore((state) => state.openModal);

  if (isLoading || !assignments) return <div>loading...</div>;
  if (error) return <div>error loading</div>;

  const colNameStyle =
    "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider";

  const formatDate = (dateString: string) => {
    if (dateString.length === 0) return " ";
    return new Date(dateString).toLocaleString("fi-FI", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = (value: string) => {
    setSearchKeyWord(value);
    console.log(value);
  };

  const filteredAssignments =
    searchKeyWord === ""
      ? assignments
      : assignments.filter((item) => {
          return (
            (item.employeeFirstName ?? "")
              .toLowerCase()
              .includes(searchKeyWord.toLowerCase()) ||
            (item.employeeLastName ?? "")
              .toLowerCase()
              .includes(searchKeyWord.toLowerCase()) ||
            item.lockerNumber
              .toLowerCase()
              .includes(searchKeyWord.toLowerCase()) ||
            item.keyNumber
              .toString()
              .toLowerCase()
              .includes(searchKeyWord.toLowerCase())
          );
        });

  return (
    <div className="overflow-x-auto">
      <div className="bg-[#171d27] w-fit py-2 px-4 rounded-xl flex gap-2 ">
        <Search color="#62748e" />
        <input
          type="text"
          value={searchKeyWord}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="text-white outline-none text-sm w-80"
          placeholder="Etsi nimellä, avaimen tai pukukaaapin numerolla"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-[#1d293d]">
          <tr>
            <th scope="col" className={colNameStyle}>
              Tila
            </th>
            <th scope="col" className={colNameStyle}>
              Pukukaappi #
            </th>
            <th scope="col" className={colNameStyle}>
              Avain #
            </th>
            <th scope="col" className={colNameStyle}>
              Työntekijä
            </th>
            <th scope="col" className={colNameStyle}>
              Luovutettu
            </th>
            <th scope="col" className={colNameStyle}>
              Toiminto
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#1d293d] divide-y divide-gray-700">
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id}>
              <td
                className={`flex gap-2 px-6 py-4 items-center whitespace-nowrap text-sm ${
                  assignment.status === "FREE"
                    ? "text-[#00a63e]"
                    : assignment.status === "OCCUPIED"
                      ? "text-[#155dfc]"
                      : "text-gray-400"
                }`}
              >
                <div
                  className={`rounded-4xl  h-3 w-3 ${assignment.status === "FREE" ? "bg-[#00a63e]" : "bg-[#155dfc]"}`}
                ></div>
                {assignment.status === "FREE"
                  ? "Vapaa"
                  : assignment.status === "OCCUPIED"
                    ? "Varattu"
                    : "Tuntematon"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {assignment.lockerNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {assignment.keyNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex gap-2">
                <p>{assignment.employeeFirstName}</p>
                <p>{assignment.employeeLastName}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {formatDate(assignment.assignedAt ?? "")}
              </td>
              <td className="px-6 whitespace-nowrap text-sm text-white">
                <p
                  className="bg-[#151b29] rounded-xl cursor-pointer w-fit px-3 py-2 font-medium self-center"
                  onClick={() => {
                    assignment.status == "FREE"
                      ? openModal("ASSIGN_LOCKER", { listRow: assignment })
                      : openModal("RETURN_LOCKER", { listRow: assignment });
                  }}
                >
                  {assignment.status === "FREE" ? "Varaa" : "Vapauta"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LockerList;
