import {Signal} from "@preact/signals";

interface ChangeNameProps {
    name: Signal<string>
}

const ChangeName = ({name}: ChangeNameProps) => {
    return (
        <div>
            <div>Name is {name}</div>
            <button onClick={() => name.value = "Name Changed"}>Change Name</button>
        </div>
    );
};

export default ChangeName;
