//VERY UNFINISHED

import { useEffect } from "react";
import { useState } from "react";

export default function useVisiblity(ref) {
    const [isVisible, setVisibility] = useState(false);

    const options = {
        threshold: 0.5,
    };
    function callback(entries, observer) {
        console.log(entries[0].isIntersecting)
    }

    
    useEffect(() => {
        let observer = new IntersectionObserver(callback, options);
        
        let target = document.querySelector("#projects")
        observer.observe(target);
    }, []);

    return isVisible;
}
