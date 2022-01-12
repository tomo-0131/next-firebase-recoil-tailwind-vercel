import Head from 'next/head'
import Image from 'next/image'
import Todos from '../components/Posts'
import { useAuthContext } from '../context/AuthContext'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalLogin } from '../components/atoms/modalAtom'
import ModalLogin from '../components/ModalLogin'

export default function Home() {

  const { user } = useAuthContext();

  const [ open, setOpen ] = useRecoilState(modalLogin)

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Talexy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-blue-50 h-screen'>
        { user ? (
          <Todos />
        ) : (
          <div className='flex grid items-center justify-center'>
            <h1 className='text-2xl my-3 p-5 text-center lg:text-3xl lg:p-9 lg:my-3'>⚡️Talexy</h1>
            <h1 className='text-2xl p-1 text-center lg:mb-8 lg:text-3xl'>Make your small dreams come true!</h1>
            <img className='flex justify-center items-center my-4 mb-8' src='https://image.freepik.com/free-vector/business-team-work-process-steps-from-idea-target-business-workflow-business-process-efficiency-working-activity-pattern-concept-pinkish-coral-bluevector-isolated-illustration_335657-1649.jpg' />
            <div className='flex justify-center items-center'>
              <button onClick={()=> setOpen(true)} className='bg-teal-500 text-white border m-2 p-1 w-40 rounded-lg'>Log in</button>
              <ModalLogin />
              <button onClick={()=> router.push('/about')} className='border text-white bg-yellow-400 m-2 p-1 w-40 rounded-lg'>About</button>
            </div>
          </div>
        ) }
      </div>
    </div>
  )
}