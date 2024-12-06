import * as React from "react";

export default function LoginForm({ switchToRegister, switchToForgotPassword }) {
  return (
    <div className="bg-white px-16 py-8 rounded-3xl border-2 border-gray-200 mr-4 max-[553px]:px-4">
      <div className="flex items-center mt-2">
        <svg
          width="30"
          height="30"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <g clip-path="url(#clip0_7_61)">
            <path
              opacity="0.72"
              d="M40.0885 18.3521C40.0688 18.1525 39.976 17.9672 39.8279 17.8315C39.6798 17.6957 39.4867 17.619 39.2854 17.6161H19.2735C18.73 17.6293 18.1995 17.7839 17.7346 18.0646C17.2697 18.3453 16.8866 18.7422 16.6234 19.2161C16.3797 19.6398 16.2515 20.1197 16.2515 20.6081C16.2515 21.0964 16.3797 21.5763 16.6234 22.0001C16.693 22.1333 16.7962 22.2462 16.923 22.3276C17.0497 22.4089 17.1955 22.456 17.3461 22.4641H39.3337C39.5349 22.4611 39.728 22.3844 39.8761 22.2487C40.0243 22.1129 40.117 21.9276 40.1367 21.7281C40.1367 21.1041 40.1367 20.5761 40.1367 20.1281C40.1367 19.6801 40.1367 18.9601 40.0885 18.3521Z"
              fill="black"
            />
            <path
              d="M40.072 18.3521C40.0561 18.1539 39.9667 17.9687 39.8213 17.8327C39.6758 17.6966 39.4846 17.6194 39.285 17.6161H36.0728C35.9602 17.6173 35.849 17.6422 35.7466 17.6891C35.6442 17.7359 35.5529 17.8037 35.4786 17.8881C35.4037 17.9691 35.3476 18.0656 35.3143 18.1707C35.281 18.2758 35.2713 18.3868 35.2859 18.4961C35.2859 19.0081 35.2859 19.5201 35.2859 20.0961C35.2818 22.6492 34.6323 25.1601 33.3972 27.3972C32.1622 29.6343 30.3812 31.5254 28.219 32.896C27.9941 33.04 27.7855 33.2161 27.5445 33.3441C26.366 34.0127 25.1015 34.5187 23.7861 34.8481L25.8902 38.5761C25.9616 38.6993 26.0648 38.8014 26.189 38.8717C26.3132 38.942 26.4539 38.978 26.5968 38.9761C26.6818 38.9913 26.7689 38.9913 26.8538 38.9761L27.3677 38.7681L27.8335 38.5761C28.544 38.2821 29.2359 37.9455 29.9055 37.5681C33.0369 35.8108 35.6388 33.2502 37.4407 30.1523C39.2427 27.0545 40.1791 23.5324 40.1524 19.9521C40.1524 19.3601 40.1202 18.8961 40.072 18.3521Z"
              fill="black"
            />
            <path
              d="M28.7035 33.5388C28.5956 33.3562 28.424 33.2196 28.2216 33.1548H27.9967C27.8573 33.1559 27.72 33.1887 27.5952 33.2508C25.305 34.549 22.7137 35.2275 20.0788 35.2188C16.0347 35.2103 12.1587 33.6062 9.29915 30.7574C6.43957 27.9087 4.8293 24.0475 4.82081 20.0188C4.8293 15.9901 6.43957 12.1288 9.29915 9.28008C12.1587 6.43136 16.0347 4.82722 20.0788 4.81876C22.7125 4.8196 25.3014 5.49745 27.5952 6.78676C27.7151 6.86258 27.8547 6.90153 27.9967 6.89876H28.1734C28.2835 6.87454 28.3874 6.82794 28.4786 6.76187C28.5698 6.69579 28.6465 6.61166 28.7035 6.51476L30.3096 3.73076C30.4158 3.5456 30.445 3.32639 30.391 3.12006C30.3369 2.91372 30.2039 2.73666 30.0204 2.62676C26.9973 0.924867 23.5834 0.031889 20.1109 0.0347665C14.789 0.0432289 9.68741 2.15308 5.92422 5.90198C2.16104 9.65087 0.0431627 14.733 0.034668 20.0348C0.0431627 25.3365 2.16104 30.4187 5.92422 34.1676C9.68741 37.9164 14.789 40.0263 20.1109 40.0348C23.5834 40.0376 26.9973 39.1446 30.0204 37.4428C30.1123 37.3914 30.1929 37.3222 30.2575 37.2392C30.322 37.1562 30.3691 37.0612 30.3961 36.9597C30.423 36.8582 30.4294 36.7524 30.4145 36.6485C30.3996 36.5446 30.3639 36.4447 30.3096 36.3548L28.7035 33.5388Z"
              fill="black"
            />
            <path
              opacity="0.56"
              d="M22.3727 22.4H17.2976C17.1537 22.3897 17.0142 22.3451 16.8912 22.2699C16.7682 22.1947 16.6652 22.0912 16.5908 21.968L25.9224 38.432C25.9938 38.5552 26.0969 38.6573 26.2211 38.7276C26.3454 38.7979 26.4861 38.8339 26.6289 38.832C26.7193 38.8472 26.8117 38.8472 26.9021 38.832C27.9633 38.4513 28.9897 37.9802 29.9698 37.4239C30.0616 37.3726 30.1421 37.3033 30.2066 37.2204C30.2711 37.1374 30.3182 37.0423 30.3452 36.9409C30.3722 36.8394 30.3785 36.7336 30.3636 36.6297C30.3488 36.5258 30.3131 36.4259 30.2587 36.3359L22.3727 22.4Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_61">
              <rect width="40.1525" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h1 className="text-3xl font-Poppins break-words font-semibold max-[574px]:text-2xl">
          {" "}
          E-Commerce{" "}
        </h1>
      </div>
      <p className="font-medium text-lg text-gray-500 mt-4">
        {" "}
        Welcome Back 👋 {" "}
      </p>
      <div className="mt-2 mb-3">
        <p className="text-5xl font-semibold font-Poppins"> Sign In </p>
      </div>
      <div className="mt-3">
        <div>
          <label className="text-lg font-medium"> Email </label>
          <input
            className="w-full border-2 border-gray-100 p-3 rounded-xl mt-1 bg-transparent"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="text-lg font-medium"> Password </label>
          <input
            className="w-full border-2 border-gray-100 p-3 rounded-xl mt-1 bg-transparent"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className=" items-center flex mt-8">
          <div className="ml-0" >
            <input type="checkbox" id="remember" />
            <label className="ml-2 font-medium text-base max-[574px]:text-sm" for="remember">
              {" "}
              Remember me{" "}
            </label>
          </div>
          <button onClick={switchToForgotPassword} className="text-base font-medium text-violet-500 pl-16 max-[1100px]:pl-2 max-[574px]:text-sm max-[574px]:pl-4">
            {" "}
            Forgot password?{" "}
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-95 active:duration-75 transition-all hover:scale-105 ease-in-out py-3 rounded-xl bg-violet-500 text-white font-bold text-lg">
            {" "}
            Login{" "}
          </button>
          <button className="flex border-2 border-gray-100 py-3 rounded-xl items-center justify-center gap-2 active:scale-95 active:duration-75 transition-all hover:scale-105 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>{" "}
            Login with Google{" "}
          </button>
        </div>
        <div className="flex mt-8 justify-center items-center">
          <p className="font-medium text-base ">
            {" "}
            Don't have an account?
            <button onClick={switchToRegister} className="text-base font-medium text-violet-500 pl-1 max-[1100px]:pl-2 max-[574px]:text-sm max-[574px]:pl-4">
            {" "}
            Register{" "}
          </button>
          </p>
        </div>
      </div>
    </div>
  );
}
