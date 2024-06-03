import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-pink-800 to-pink-600",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ cardType }) => {
	const cardClass = categoryColorMap[cardType];

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>Saving</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer"} />
						<Link to={`/transaction/123`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: Salary
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: Cash
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: $150
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: New York
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>21 Sep, 2001</p>
					<img
						 src={"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1717374257~exp=1717374857~hmac=35c91cf86c0f20464b3eb626daa2e5ddbe4fa055eb419df7624b9274e7d6af20"}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;