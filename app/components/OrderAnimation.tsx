import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import orderloading from "@/public/orderloading.json";

export default function OrderAnimation() {
      return (
            <div className="flex items-center justify-center flex-col mt-24">
                  <motion.h1 initial={{ opacity: 0, y: 10}} animate={{opacity: 1, y:0}} transition={{delay: 0.5}}>
                        Loading your Payment
                  </motion.h1>
                  <Player autoplay loop src={orderloading}></Player>
            </div>
      )
}
