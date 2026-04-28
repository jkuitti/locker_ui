import { useUIStore } from "../../store/uiStore";
import { useState } from "react";
import BaseModal from "./BaseModal";
import type { Gender } from "../../types/room";
import useCreateRoom from "../../hooks/mutations/useCreateRoom";

type AddRoomData = {
  name: string;
  gender: Gender;
};

const AddNewRoomModal = () => {
  const closeModal = useUIStore((state) => state.closeModal);
  const [roomName, setRoomName] = useState<string>("");
  const [gender, setGender] = useState<Gender>("MEN");
  const mutation = useCreateRoom();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRoom: AddRoomData = {
      name: roomName.trim(),
      gender: gender,
    };
    setIsSubmitting(true);
    mutation.mutate(newRoom, {
      onSuccess: () => {
        closeModal();
      },
      onSettled: () => setIsSubmitting(false),
    });
  };

  return (
    <BaseModal title="Lisää uusi huone" onClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          <label
            className={`cursor-pointer rounded-lg border px-4 py-2 transition 
        ${gender === "MEN" ? "bg-blue-400 text-white border-blue-500" : "bg-white text-gray-700"}
      `}
          >
            <input
              type="radio"
              name="gender"
              value="MEN"
              className="hidden"
              checked={gender === "MEN"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGender(e.target.value as Gender)
              }
            />
            Miehet
          </label>
          <label
            className={`cursor-pointer rounded-lg border px-4 py-2 transition 
        ${gender === "WOMEN" ? "bg-red-400 text-white border-red-500" : "bg-white text-gray-700"}
      `}
          >
            <input
              type="radio"
              name="gender"
              value="WOMEN"
              className="hidden"
              checked={gender === "WOMEN"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGender(e.target.value as Gender)
              }
            />
            Naiset
          </label>
        </div>

        <label className="text-white text-sm font-bold">
          Huoneen nimi
          <input
            type="text"
            placeholder="huoneen nimi"
            value={roomName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRoomName(e.target.value)
            }
            required
            className="w-full border-1 border-[#262626] focus:outline-none focus:ring text-lg rounded-lg px-3 py-2 mt-2 bg-[#121212] font-normal"
          />
        </label>

        <button
          type="submit"
          disabled={!roomName.trim() || isSubmitting}
          className={
            "mt-4 rounded-lg px-4 py-2 text-black w-full brightness-90 " +
            (roomName.trim() && !isSubmitting
              ? "bg-white hover:brightness-100 cursor-pointer"
              : "bg-[#828282] opacity-90 cursor-not-allowed")
          }
        >
          {isSubmitting ? "Adding..." : "Lisää huone"}
        </button>
      </form>
      <button
        className="mt-4 border-1 border-[#262626] rounded-lg bg-[#121212] px-4 py-2 text-white hover:bg-[#1a1a1a] w-full cursor-pointer"
        onClick={closeModal}
      >
        Peruuta
      </button>
    </BaseModal>
  );
};

export default AddNewRoomModal;
