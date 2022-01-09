import { Dialog, Transition } from "@headlessui/react";
import { AnnotationIcon, LoginIcon } from "@heroicons/react/outline";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { auth, provider } from "../lib/firebase";
import { modalPost } from "./atoms/modalAtom";

function ModalPost() {
	const [open, setOpen] = useRecoilState(modalPost);

	// const handleLogin = async (e) => {
	// 	try {
	// 		await signInWithRedirect(auth, provider);
	// 		alert("ログイン完了");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

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
							<h1 className="flex justify-center text-xl pt-1">
								Add Your Dream
								<AnnotationIcon className="absolute h-5 w-5 mt-1 ml-24" />
							</h1>
							<form className="text-center">
								<div className="relative rounded-md">
									<div className="inset-y-0 pt-2 flex justify-center items-center">
										{/* <PencilIcon className="absolute mx-32 h-4 w-4 text-gray-500 md:ml-40 lg:ml-80"/> */}
										<div className="pt-2">
											<input
												className="bg-gray-200 w-80 h-11 pl-10 mb-5 sm:text-sm lg:w-96 md:w-96
                      border-gray-300 focus:ring-black focus:border-black rounded-md"
												type="text"
												placeholder="Add your dreams title"
											/>
											{/* <AnnotationIcon className="absolute h-5 w-5 top-1/2 right-0 mr-12 mt-2 text-gray-500 md:ml-40 xl:mr-96"/> */}
											<br />
											<input
												className="bg-gray-200 w-80 h-14 pl-10 sm:text-sm lg:w-96 md:w-96
              border-gray-500 focus:ring-black focus:border-black rounded-md"
												type="text"
												placeholder="Add your dreams description"
											/>
											<div className="mt-5 sm:mt-6">
												<button
													type="button"
													className="inline-flex justify-center w-full rounded-md border border-transparent shadow-md  py-3 pb-3 mb-2  w-32 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
												>
													Post
												</button>
												<div>{}</div>
											</div>
										</div>
									</div>
								</div>
							</form>{" "}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default ModalPost;
