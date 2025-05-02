import Lottie from "lottie-react";
import LottieLodingMN from "../assets/lottie/Loding.json";

const LottieLoding = () => {
    return (
        <div className="flex justify-center items-center min-h-screen min-w-full bg-gray-50">
            <Lottie
                animationData={LottieLodingMN}
                loop={true}
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
    );
};

export default LottieLoding;