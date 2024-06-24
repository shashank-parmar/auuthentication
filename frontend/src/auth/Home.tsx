
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { fetchAllStudentsAsync } from "../features/counter/StudentSlice";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const allStudents = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(true);
  const [nodata, setNodata] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getToken = localStorage.getItem("token");
        if (!getToken) {
          alert("Please login or Signup to access Dashboard page");
          navigate("/");
          return;
        }

        await dispatch(fetchAllStudentsAsync());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (allStudents && allStudents.counter && allStudents.counter.allStudents) {
      setStudents(allStudents.counter.allStudents);
    }
  }, [allStudents]);

  const handleSearch = (query: string) => {
    const filtered = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(query.toLowerCase()) ||
        student.lastName.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length === 0) {
      setNodata("No student found");
    } else {
      setNodata(null);
    }
    setFilteredStudents(filtered);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0  ">
        <div className="flex">
          <h2 className="text-lg font-semibold mr-8">All students</h2>
          <input
            type="text"
            placeholder="Search Student"
            className="w-[1000px] px-2 focus:outline-none rounded-md"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 font-extrabold"
                    >
                      <span>First name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-10 py-3.5 text-left text-sm font-normal text-gray-700 font-extrabold"
                    >
                      <span>Last name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700 font-extrabold"
                    >
                      Email Id
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 font-extrabold"
                    >
                      Phone no
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.firstName} 
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">
                            {student.lastName}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">
                            {student.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {student.mobile}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : nodata ? (
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-center" colSpan="4">
                        {nodata}
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.firstName} 
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">
                            {student.lastName}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">
                            {student.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {student.mobile}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;