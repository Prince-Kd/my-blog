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
        "bg-gray-200 flex flex-col py-10 rounded-3xl w-1/3 m-auto mt-20"
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
        <div className="flex flex-col w-96 h-1/2 m-auto rounded-lg items-center">
          <div className="mb-4 h-52 w-52 rounded-full border-4 border-white text-center flex justify-center items-center relative">
            <img className="rounded-full h-52 w-52" src={image.preview} />
          </div>
          <label>Select photo</label>
          <div className="border-2 border-gray-300 rounded-md mb-4 flex items-center p-2">
            <input
              required
              type={"file"}
              accept="image/png, image/gif, image/jpeg"
              //style={{display: 'none'}}
              onChange={handleChange}
            />
          </div>
          <input
            className="bg-purple-500 rounded-md h-12 w-40 text-center cursor-pointer text-white font-medium"
            type={"submit"}
            value={loading ? "LOADING..." : "UPLOAD"}
          />
        </div>
      </form>
    </Modal>
  );
}
