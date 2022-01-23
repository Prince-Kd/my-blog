import { useState } from "react";
import Modal from "react-modal";
import { updateAbout } from "../firebaseConfig";

export default function AboutModal({ toggle, modal, about }) {
  const [loading, setLoading] = useState(false);
  const [newAbout, setNewAbout] = useState(about || '');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      updateAbout(newAbout, setLoading);
    }
  };
  return (
    <Modal
    ariaHideApp={false}
      isOpen={modal}
      onRequestClose={toggle}
      className={
        "bg-gray-200 flex flex-col py-10 px-10 rounded-3xl w-1/2 m-auto mt-20"
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-1/2">
        <label className="text-xl ">Edit About</label>
        <textarea
          value={newAbout}
          onChange={(e) => {
            setNewAbout(e.target.value);
          }}
          className="rounded-md border-2 border-gray-300 p-4 w-full h-64 overflow-scroll mt-5"
          placeholder="Say something about yourself"
        ></textarea>
        <div className="flex flex-row justify-end mt-10">
          <input
            className="bg-purple-500 rounded-md h-12 w-52 text-center cursor-pointer text-white font-medium hover:border-2 hover:border-purple-500 hover:bg-white hover:text-purple-500"
            type={"submit"}
            value={loading ? "LOADING..." : "SAVE"}
          />
        </div>
      </form>
    </Modal>
  );
}
