import { Dialog, Transition } from '@headlessui/react';
import { AnnotationIcon, LoginIcon } from '@heroicons/react/outline';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UseAuthContext } from '../context/AuthContext';
import { auth, db, provider } from '../lib/firebase';
import { modalPost, modalUpdate } from './atoms/modalAtom';

export const getStaticProps = async (ctx) => {
  try {
    const id = ctx;

    console.log(id);

    const docRef = doc(db, 'posts', id);

    // console.log(docLikesRef);

    const docSnap = await getDoc(docRef);
    // console.log(docSnap);

    // const likesSnap = await getDocs(docLikesRef);
    // console.log(likesSnap);

    // const likesProps = likesSnap.docs.map((doc) => doc.data());

    return {
      props: {
        postProps: JSON.stringify(docSnap.data()) || null,
        // likesProps: JSON.stringify(likesProps),
        id: ctx,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

function ModalUpdate({ postProps }) {
  const post = JSON.parse(postProps);
  // console.log(ctx);
  const [open, setOpen] = useRecoilState(modalUpdate);
  const [loading, setLoading] = useState(false);
  const { user } = UseAuthContext();
  const router = useRouter();

  // const titleRef = useRef(title);
  // const descriptionRef = useRef(description);

  const updatePost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = doc(db, 'posts');
    await setDoc(docRef, {
      username: user.displayName,
      uid: user.uid,
      title: titleRef,
      description: descriptionRef,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    alert('編集が完了しました');
    router.push('/');
  };

  const [titleRef, setTitleRef] = useState(post.title);
  const [descriptionRef, setDescriptionRef] = useState(post.description);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
        <div className='flex items-end mt-44 justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 lg:-mt-12'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-200'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-400 bg-opacity-25 transition-opacity' />
          </Transition.Child>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white w-86 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6 '>
              <h1 className='flex justify-center text-xl pt-1'>
                投稿を編集する
                <AnnotationIcon className='absolute h-5 w-5 mt-1 ml-48' />
              </h1>
              <form className='text-center'>
                <div className='relative rounded-md'>
                  <div className='inset-y-0 pt-2 flex justify-center items-center'>
                    <div className='pt-2'>
                      <input
                        ref={titleRef}
                        // value={titles}
                        className='bg-gray-200 w-80 h-11 pl-10 mb-5 sm:text-sm lg:w-96 md:w-96
                      border-gray-300 focus:ring-black focus:border-black rounded-md'
                        type='text'
                        placeholder='Add your dreams title'
                        // onChange={(e)=>setTitles(e.target.value)}
                      />
                      <br />
                      <input
                        ref={descriptionRef}
                        // onChange={(e)=>setDescriptions(e.target.value)}
                        // key={id}
                        // value={descriptions}
                        className='bg-gray-200 w-80 h-14 pl-10 sm:text-sm lg:w-96 md:w-96
              border-gray-500 focus:ring-black focus:border-black rounded-md'
                        type='text'
                        placeholder='Add your dreams description'
                      />
                      <div className='mt-5 sm:mt-6'>
                        <button
                          onClick={() => updatePost()}
                          type='button'
                          className='inline-flex justify-center w-full rounded-md border border-transparent shadow-md  py-3 pb-3 mb-2  w-32 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                        >
                          {loading ? '投稿中...' : 'Post'}
                        </button>
                        <div>{}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>{' '}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalUpdate;
