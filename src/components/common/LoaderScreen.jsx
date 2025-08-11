import React, {useEffect, useRef} from "react";
import Lottie from "lottie-react";
import Loader from "../../assets/animations/LoaderFeedhi.json"
import styles from "../../components/common/LoaderScreen.module.css";





const LottieScreen = ({onAnimationCompete}) => {


   const lottieRef = useRef(null);

   useEffect(()=> {
      if (lottieRef.current) {
         lottieRef.current.play();
      }
   }, []);
 return(
    <div className={styles.loaderContainer}>
      

      <Lottie
      lottieRef={lottieRef}
      animationData={Loader}
      
      loop={true}
      autoplay={true}
      onComplete={() =>{
         if (onAnimationCompete) {
            onAnimationCompete();
         }
      }}
      />

      <h3 className={styles.LoaderText}>Feedih</h3>
    </div>
 )

}

export default LottieScreen;