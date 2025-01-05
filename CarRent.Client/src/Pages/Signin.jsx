
export default function Signin() {
  return (
    <div className="min-h-screen w-full flex m-auto bg-gray-100">
      <div className="m-auto bg-white rounded-xl shadow-md p-10">
        <h1 className="text-center text-xl font-bold">Login</h1>
        <form action="" className="flex flex-col gap-10 mx-auto">
          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input type="text" className="bg-gray-100 border border-gray-300 rounded-lg"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input type="text" className="bg-gray-100 border border-gray-300 rounded-lg"/>
          </div>
        </form>
      </div>
    </div>
  )
}
