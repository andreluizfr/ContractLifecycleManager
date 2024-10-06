import PuffLoader from "react-spinners/PuffLoader";

export default function Loading() {
  return (
    <div className='flex justify-center items-center min-h-screen min-h-svh w-full bg-background'>
      <PuffLoader
        color="rgb(8, 8, 8)"
        size={70}
        aria-label="Loading Spinner"
      />
    </div>
  )
}