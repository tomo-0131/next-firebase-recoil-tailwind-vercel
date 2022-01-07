import { Dialog, Transition } from "@headlessui/react";
import { LoginIcon } from "@heroicons/react/outline";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { auth, provider } from "../lib/firebase";
import { modalLogin } from "./atoms/modalAtom";

function ModalLogin() {
	const [open, setOpen] = useRecoilState(modalLogin);

	const handleLogin = async (e) => {
		try {
			await signInWithRedirect(auth, provider);
			alert("ログイン完了");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={setOpen}
			>
				<div className="flex items-end mt-44 justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 lg:-mt-12">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white w-86 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6 ">
							{/* {selectedFile ? (
								<img
									className="w-full object-contain cursor-pointer"
									src={selectedFile}
									onClick={() => setSelectedFile(null)}
								/>
							) : (
								<div
									onClick={() => filePickerRef.current.click()}
									className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
								>
									<CameraIcon
										className="h-6 w-6 text-red-500"
										aria-hidden="true"
									/>
								</div>
							)} */}

							<div className="mt-3 text-center sm:mt-5">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-medium text-gray-900"
								>
									⚡️ Talexyをはじめよう
								</Dialog.Title>
								<div className="mt-8 mb-8 lg:mt-4">
									<span>Firebase Authentication</span>
								</div>
							</div>

							<div className="sm:mt-6">
								<button
									// onClick={uploadPost}
									// disabled={!selectedFile}
									onClick={handleLogin}
									type="button"
									className="inline-flex justify-center w-full rounded-md border border-transparent shadow-md px-4 py-2 bg-teal-400 text-base font-medium text-white hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
								>
									<LoginIcon className="h-24 mt-2 ml-4" />
									<span className="font-bold text-xl w-96 mt-10 mb-5 lg:mt-10 lg:mb-5 lg:w-96">
										Login with Google
									</span>
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default ModalLogin;
