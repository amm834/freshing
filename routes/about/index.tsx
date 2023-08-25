import ChangeName from "../../islands/ChangeName.tsx";
import {useSignal} from "https://esm.sh/v130/@preact/signals@1.1.3/X-ZS8q/denonext/signals.mjs";

const About = () => {
    const name = useSignal("John");
    return (
        <div>
            <ChangeName name={name}/>
        </div>
    );
};

export default About;
