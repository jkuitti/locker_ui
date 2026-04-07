import { useUIStore } from "../../store/uiStore";
import { useState } from "react";
import BaseModal from "./BaseModal";
import type { Gender } from "../../types/room";
import { useNavigate } from "react-router-dom";
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
        <div>
          <label className="mr-4 text-lg">
            <input
              type="radio"
              name="gender"
              value="MEN"
              checked={gender === "MEN"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGender(e.target.value as Gender)
              }
            />
            Miehet
          </label>
          <label className="mr-4 p-2 text-lg">
            <input
              type="radio"
              name="gender"
              value="WOMEN"
              checked={gender === "WOMEN"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGender(e.target.value as Gender)
              }
            />
            Naiset
          </label>
        </div>

        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomName(e.target.value)
          }
          required
          className="w-full border rounded px-3 py-2 mt-2"
        />

        <button
          type="submit"
          disabled={!roomName.trim() || isSubmitting}
          className={
            "mt-4 rounded px-4 py-2 text-white w-full " +
            (roomName.trim() && !isSubmitting
              ? "bg-black hover:brightness-90"
              : "bg-gray-500 opacity-60 cursor-not-allowed")
          }
        >
          {isSubmitting ? "Adding..." : "Lisää huone"}
        </button>
      </form>
      <button
        className="mt-4 border-1 border-gray-300 rounded bg-white px-4 py-2 text-black hover:bg-gray-300 w-full"
        onClick={closeModal}
      >
        Peruuta
      </button>
    </BaseModal>
  );
};

export default AddNewRoomModal;
