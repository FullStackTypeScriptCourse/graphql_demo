// Form to create a new task and update an existing task with qraphql mutation
// Uses react-hook-form for form validation
import InputField from "../basic/InputField";
import Button from "../basic/Button";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { emptyTask } from "../../types";
import { CREATE_TASK } from "../../queries/mutations";
import { useMutation } from "@apollo/client";
import DropDown from "../basic/DropDown";


const TaskForm = () => {
    const [formData, setFormData] = useState(emptyTask);
    const [createTask, createUserResponse] = useMutation(CREATE_TASK, {
        // refetchQueries: [GET_ALL_PEOPLE] // Updates page by refetching data from server.
    });


    const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((curr) => {
            return { ...curr, [e.target.name]: e.target.value };
        });
    }, []);

    const reset = useCallback(() => {
        setFormData(emptyTask);
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        FormData
        createTask({
            variables: {
                "input":
                {
                    title: formData.title,
                    description: formData.description,
                    correctAnswer: formData.correctAnswer,
                    studyPoints: formData.studyPoints,
                    level: formData.level,
                    measureUnit: formData.measureUnit,
                    imageUrl: formData.imageUrl,
                    name: formData.name,

                }
            }
        });
        reset();
    };

    return (
            <div className="p-1.5 flex items-center justify-center h-screen">
        <form onSubmit={onSubmit} className="w-1/3">
            {/* <div className="flex gap-5"> */}
                <InputField
                    value={formData.name}
                    onChange={onChange}
                    label="Name"
                    name="name"
                    type="text"
                    required
                />
                <InputField
                    value={formData.title}
                    onChange={onChange}
                    label="Title"
                    name="title"
                    type="text"
                    required
                />
                <InputField
                    value={formData.description}
                    onChange={onChange}
                    label="Description"
                    name="description"
                    type="text"
                    rows={5}
                    required
                />
                <div className="flex gap-4">

                <InputField
                    value={formData.correctAnswer}
                    onChange={onChange}
                    label="Correct Answer"
                    name="correctAnswer"
                    type="text"
                    required
                />
                <DropDown
                    // value={formData.measureUnit}
                    onChange={onChange}
                    label="Choose unit"
                    name="measureUnit"
                    type="text"
                    msg=""
                    required
                    data={[{name:"kg"},{name:"g"},{name:"l"},{name:"ml"},{name:"st"},{name:"pcs"}]}
                />
                </div>
                <InputField
                    value={formData.studyPoints}
                    onChange={onChange}
                    label="Studypoints"
                    name="studyPoints"
                    type="text"
                    required
                />
                <InputField
                    value={formData.level}
                    onChange={onChange}
                    label="Level"
                    name="level"
                    type="text"
                    required
                />
                <InputField
                    value={formData.imageUrl}
                    onChange={onChange}
                    label="Image URL if any"
                    name="imageUrl"
                    type="text"
                />
            {/* </div> */}
            <div className="flex gap-5 pt-2">
                <Button onClick={reset} type="reset"
                    className=" bg-slate-700 w-[clamp(100px,_100%_,10vw)]"
                >
                    Reset
                </Button>
                <Button type="submit"
                    className=" bg-slate-700 w-[clamp(100px,_100%_,10vw)]"
                >Create</Button>
            </div>
        </form>
            </div>
    );
};

export default TaskForm;
