import { useState } from "react";
import Modal from "react-modal";
import { updateAbout } from "../firebaseConfig";

export default function AboutModal({ toggle, modal, about }) {
  const [loading, setLoading] = useState(false);
  const [newAbout, setNewAbout] = useState(`${about}` || '');
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
        "bg-gray-200 flex flex-col lg:p-10 p-5 rounded-3xl mx-10 lg:w-1/2 m-auto lg:mt-20 mt-40 relative"
      }
    >
        <button className="absolute top-2 right-4 font-semibold text-xl" onClick={toggle}>X</button>
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
            className="bg-purple-500 rounded-md h-12 lg:w-52 w-40 text-center cursor-pointer text-white font-medium hover:border-2 hover:border-purple-500 hover:bg-white hover:text-purple-500"
            type={"submit"}
            value={loading ? "LOADING..." : "SAVE"}
          />
        </div>
      </form>
    </Modal>
  );
}
