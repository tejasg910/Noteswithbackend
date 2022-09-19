import React, {useContext, useEffect} from 'react'
import noteContext from '../Context/notes/noteContext';
const About = () => {
    const data  = "This is data"
    useEffect(() => {
  
    }, []);
    return (
        <div>
            
            This is home ${data}
            
        </div>
    );
}

export default About;
