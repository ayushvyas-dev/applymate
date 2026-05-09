import LoginButton from '@/components/LoginButton';

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-[#F5FAFF] flex justify-center px-4 py-32'>
      <div className='w-full max-w-sm'>
        <div className='bg-[#FFFFFF] border border-[#EBEFF4] shadow-md rounded-md p-2 '>
          <h1 className='text-md font-semibold   text-blue-600 text-center m-2'>
            Log In
          </h1>
          <p className='text-sm text-gray-800 text-center m-2'>
            Acess your personalized application
          </p>
          <div className='flex justify-center m-2 mt-4 '>
            <LoginButton>Continue with Google</LoginButton>
          </div>
        </div>
      </div>
    </div>
  );
}
