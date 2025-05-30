import React, { useState } from 'react';
import useJobs from '../../hooks/useJobs';
import LatesJobsCard from '../Home/LatesJobsCard/LatesJobsCard';
import { BiSearch } from 'react-icons/bi';
import { useLoaderData } from 'react-router-dom';
import './AllJob.css'

const AllJob = () => {
    const [salarySort, setSalarySort] = useState(false);
    const [search, setSearch] = useState("");
    //shudu min er khetre search
    const [minSalary, setMinSalary] = useState("");
    //shudu max er khetre search
    const [maxSalary, setMaxSalary] = useState("");

    //divition
    const [division, setDivision] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    console.log(division, location, startDate, endDate)


    //pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { count } = useLoaderData();
    //console.log(count);
    // const itemsPerPage = 10;
    const numberOfPages = Math.ceil(count / itemsPerPage);

    //1 system page ber kora
    // const pages = [];
    // for(let i = 0; i<numberOfPages; i++){
    //     pages.push(i)
    // }
    //2
    const pages = [...Array(numberOfPages).keys()]
    //  console.log(pages)

    /* 
    Done: get the total number of jobs
    Done: number of items per page dynamic
    Done: get the current page
    */



    const handleItemsPerPage = e => {
        const values = parseInt(e.target.value);
        console.log(values)
        setItemsPerPage(values);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }


    const { jobs, loading } = useJobs(salarySort, search, minSalary, maxSalary, division, location, startDate, endDate, currentPage, itemsPerPage);
    //console.log(salarySort)


    if (loading) {
        return <span className="loading loading-spinner loading-xl my-20"></span>

    }
    return (
        <div className='my-20'>

            <h1 className="text-3xl py-5 font-bold text-center">All Jobs</h1>


            {/* divition  and location*/}
            <div className='mb-20'>
                <select onChange={e => setDivision(e.target.value)} value={division}>
                    <option value="">Select Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Comilla">Comilla</option>
                </select>

                <select onChange={e => setLocation(e.target.value)} value={location}>
                    <option value="">Select Location</option>
                    {division === 'Dhaka' && <>
                        <option value="Gulshan">Gulshan</option>
                        <option value="Mirpur">Mirpur</option>
                        <option value="Jatrabari">Jatrabari</option>
                    </>}
                    {division === 'Chittagong' && <>
                        <option value="Agrabad">Agrabad</option>
                        <option value="Pahartali">Pahartali</option>
                    </>}

                    {division === 'Sylhet' && (
                        <>
                            <option value="Zindabazar">Zindabazar</option>
                            <option value="Amberkhana">Amberkhana</option>
                        </>
                    )}

                    {division === 'Rajshahi' && (
                        <>
                            <option value="Boalia">Boalia</option>
                            <option value="Rajpara">Rajpara</option>
                        </>
                    )}

                    {division === 'Comilla' && (
                        <>
                            <option value="Kandirpar">Kandirpar</option>
                            <option value="Chawkbazar">Chawkbazar</option>
                        </>
                    )}
                </select>


                <input type="date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                <input type="date" onChange={e => setEndDate(e.target.value)} value={endDate} />
            </div>


            {/* sort salary */}
            <div className="w-11/12 mx-auto bg-base-200 py-5 p-3 flex items-center gap-5">
                <button onClick={() => setSalarySort(!salarySort)} className={`btn btn-neutral ${salarySort && "btn-success"}`}>
                    {salarySort == true ? "Sorted By Salary" : "Sort By Salary"}</button>

                <BiSearch></BiSearch>
                <input onKeyUp={(e) => setSearch(e.target.value)}
                    type="text" className="input w-full max-w-2xl"
                    placeholder="Search Jobs By Location,Job_Title,Job_Type,Comapnay_Name" />

                <div className="space-y-3">

                    {/* shudu salary search */}
                    <input onKeyUp={(e) => setMinSalary(e.target.value)}
                        type="text" className="input w-full max-w-xs"
                        placeholder="Min Salary" />
                    <input onKeyUp={(e) => setMaxSalary(e.target.value)}
                        type="text" className="input w-full max-w-xs"
                        placeholder="Max Salary" />

                </div>
            </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

                {
                    jobs.map(job => <LatesJobsCard key={job._id} job={job}></LatesJobsCard>)
                }
            </div>






            {/* pagination */}
            <div className='pagination text-center mt-6'>
                <p className='mb-4'>Current Page: {currentPage}</p>
                <button onClick={handlePrevPage} className='btn mr-6'>Prev</button>
                {
                    pages.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        className={` ${currentPage === page ? 'selected' : undefined} btn mr-6 `}
                        key={page}>{page}</button>)
                }
                <button onClick={handleNextPage} className='btn'>Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name=" " id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>

        </div>
    );
};

export default AllJob;