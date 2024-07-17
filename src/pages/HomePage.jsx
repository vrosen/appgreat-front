import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo"
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {

    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTodos = async () => {
        try{
           setIsLoading(true); 
           const response = await axios.get(`${VITE_BACKEND_URL}/todos`);
           console.log(response.data);
           setTodos(response.data.data);
           setIsLoading(false);

        } catch (error){
           console.log(error);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Create a Todo
                </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {isLoading ? (
                    "Loading"
                ) : (
                    <>
                    {todos.length > 0 ? (
                        <>

                            {
                                todos.map((todo, index) => {
                                   return (
                                     <Todo key={index} todo={todo} getTodos={getTodos}/>
                                   )
                                })
                            }
                        </>
                    ) : (
                        <div>
                            There is no todos
                        </div>
                    )}
                    
                    </>
                )}
            </div>
        </div>
    )
}


export default HomePage;