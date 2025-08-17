export default function Card({children,className}:{
    className?: string;
    children: React.ReactNode;
}){
    return(
        <div className={`card bg-[#F9E6D6A8] rounded-xl shadow-[#F9E6D6A8] shadow-md overflow-hidden hover:shadow-[#f8ddc7a8] transform-gpu transition-all duration-300 ${className}`}>
            {children}
        </div>
    )
}