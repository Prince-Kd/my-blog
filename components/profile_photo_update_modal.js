import Modal from "react-modal";
import { useState } from "react";
import { uploadProfilePhoto } from "../firebaseConfig";

//Modal.setAppElement(app);

export default function ProfilePhotoModal({ toggle, modal }) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  return (
    <Modal
      isOpen={modal}
      onRequestClose={toggle}
      className={
        "bg-gray-200 flex flex-col lg:py-10 py-5 rounded-3xl lg:w-1/3 lg:m-auto lg:mt-20 mt-40  mx-10 relative"
      }
    >
      <form
        onSubmit={async (e) => {
          if (loading == false) {
            e.preventDefault();
            await uploadProfilePhoto(image.raw, setLoading)
          }
        }}
      >
        <div className="flex flex-col h-1/2 m-auto rounded-lg justify-center items-center ">
          <button className="absolute top-2 right-4 font-semibold text-lg text-white bg-gray-600 px-3 hover:text-purple-500" onClick={toggle}>x</button>
          <div className="mb-4 lg:h-52 lg:w-52 h-48 w-48 rounded-full border-4 border-white text-center flex justify-center items-center ">
            <img className="rounded-full lg:h-52 lg:w-52 h-48 w-48" src={image.preview} />
          </div>
          <label>Select photo</label>
          <div className="border-2 border-gray-300 rounded-md mb-4 flex items-center p-2 w-60">
            <input
              required
              type={"file"}
              accept="image/png, image/gif, image/jpeg"
              //style={{display: 'none'}}
              onChange={handleChange}
            />
          </div>
          <input
            className="bg-purple-500 rounded-md h-12 lg:w-40 w-32  text-center cursor-pointer text-white font-medium"
            type={"submit"}
            value={loading ? "LOADING..." : "UPLOAD"}
          />
        </div>
      </form>
    </Modal>
  );
}
