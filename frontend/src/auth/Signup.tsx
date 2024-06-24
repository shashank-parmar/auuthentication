// import React, { useState, ChangeEvent, FormEvent } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import { Link, useNavigate } from "react-router-dom";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   mobile: string;
//   otp: string;
// }

// const Signup: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     mobile: "",
//     otp: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("http://localhost:7711/createStudent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log("Response data:", data);

//       if (data && data.token) {
//         localStorage.setItem("token", data.token);
//         console.log("Token set in localStorage:", data.token);

//         console.log("User created successfully:", data);
//         alert("User created successfully");

//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           password: "",
//           mobile: "",
//           otp: "",
//         });

//         navigate("/Home");
//       } else {
//         console.error("Data received from server does not include 'token' property:", data);
//         alert("Failed to create user. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error creating user:", error);
//       alert("Failed to create user. Please try again.");
//     }
//   };

//   const handleGetOtp = async () => {
//     const otpmailResponse = await fetch(`http://localhost:7711/sendmail`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (otpmailResponse.ok) {
//       alert("OTP sent to your email");
//     } else {
//       const otpMailData = await otpmailResponse.json();
//       console.error("Failed to send OTP. Response data:", otpMailData);
//       alert("Failed to send OTP. Please try again.");
//     }
//   }

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           className="mx-auto h-10 w-auto"
//           src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//           alt="Your Company"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           Sign up for your account
//         </h2>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
//       >
//         <div>
//           <div>
//             <label
//               htmlFor="firstName"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               First Name
//             </label>
//             <input
//               id="firstName"
//               name="firstName"
//               type="text"
//               value={formData.firstName}
//               onChange={handleChange}
//               autoComplete="given-name"
//               required
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//         </div>
//         <div>
//           <div>
//             <label
//               htmlFor="lastName"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Last Name
//             </label>
//             <input
//               id="lastName"
//               name="lastName"
//               type="text"
//               value={formData.lastName}
//               onChange={handleChange}
//               autoComplete="family-name"
//               required
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//         </div>
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Email address
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             autoComplete="email"
//             required
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <button
//             onClick={handleGetOtp}
//             type="button"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Get OTP
//           </button>

//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             autoComplete="new-password"
//             required
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="mobile"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Mobile
//           </label>
//           <input
//             id="mobile"
//             name="mobile"
//             type="text"
//             value={formData.mobile}
//             onChange={handleChange}
//             autoComplete="tel"
//             required
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <ReCAPTCHA sitekey="6LeW3_8pAAAAANqV1Lvtyly2bguDiDUrdriUMjV7"/> </div>
//         <div>
//           <label
//             htmlFor="otp"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             OTP
//           </label>
//           <input
//             id="otp"
//             name="otp"
//             type="text"
//             value={formData.otp}
//             onChange={handleChange}
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Sign up
//           </button>
//         </div>
//       </form>

//       <p className="mt-8 text-center text-sm text-gray-500">
//         Already have an account?{" "}
//         <Link
//           to="/login"
//           className="font-medium text-indigo-600 hover:text-indigo-500"
//         >
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, ChangeEvent, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  otp: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:7711/createStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        alert("User created successfully");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          mobile: "",
          otp: "",
        });
        navigate("/Home");
      } else {
        alert("Failed to create user. Please try again.");
      }
    } catch (error) {
      alert("Failed to create user. Please try again.");
    }
  };

  const handleGetOtp = async () => {
    try {
      const response = await fetch("http://localhost:7711/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        alert("OTP sent to your email");
      } else {
        const errorData = await response.json();
        alert(`Failed to send OTP: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Error occurred while sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for your account
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
      >
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mobile
          </label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            value={formData.otp}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleGetOtp}
            className="mt-2 text-indigo-600 hover:text-indigo-500"
          >
            Get OTP
          </button>
        </div>
        <div>
          <ReCAPTCHA sitekey="6LeW3_8pAAAAANqV1Lvtyly2bguDiDUrdriUMjV7" />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have a account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
