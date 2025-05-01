

const Header = ({ header, title }) => {


    return (
        <div
            className=" transition-colors duration-300 text-white "
        >
            <div className="max-w-7xl mx-auto">
                {/* Header Section with dynamic content */}
                <div
                    className="relative overflow-hidden rounded-2xl mb-16 p-8 md:p-12 transition-all duration-700 transform"
                >
                    <div className="absolute inset-0 bg-custom-gradient opacity-90"></div>

                    {/* Animated background shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white opacity-10 blur-xl"></div>
                        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-white opacity-10 blur-xl"></div>
                        <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-white opacity-10 blur-xl"></div>
                    </div>

                    <div className="relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            {header}
                        </h1>
                        <p className="mt-3 text-xl text-purple-100 max-w-2xl mx-auto">
                            {title}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Header;