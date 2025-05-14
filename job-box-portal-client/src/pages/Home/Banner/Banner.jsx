
import { easeInOut, motion } from "motion/react"
import team1 from '../../../assets/team/team1.jpg'
import team2 from '../../../assets/team/team2.jpg'



// motion library use

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96 ">
            <div className="hero-content flex-col lg:flex-row-reverse ">
                <div className='flex-1'>
                    <motion.img
                        src={team1}
                        animate={{ y: [50, 100, 50] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl" />
                    <motion.img
                        src={team2}
                        animate={{ x: [100, 150, 100] }}
                        transition={{ duration: 10, delay: 5, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl" />
                </div>


                <div className='flex-1'>
                    <motion.h1
                        animate={{ x: 50 }}
                        transition={{ duration: 2, delay: 1, ease: easeInOut, repeat: Infinity }}
                        className="text-5xl font-bold">Find Your <motion.span
                            animate={{ color: ['#8dff33', '#ffc733', '#33c4ff', '#3342ff'] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >Dream Job</motion.span> Today</motion.h1>
                    <p className="py-6">
                        JobPortal is a modern platform connecting job seekers with employers efficiently.
                        Easily apply for jobs, manage applications, and communicate directly with recruiters.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>

    );
};

export default Banner;