import axios from "axios";
import { useEffect, useState } from "react";

interface RequestData{
    data: any;
}

const Request: React.FC = () => {
    const[response, setResponse] = useState<RequestData | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response: any = await axios.get("https://localhost:7071/documents/certificate");
            if(response) {
                setResponse(response);
            }
        }
        fetchData();
    }, []);

    if(!response) {
        return <div>Loading...</div>
    }

    const {data} = response;
   
    return (
        <div>
          <h1>{data.title}</h1>
          <ul>
            {data.valuation.map((item) => (
                <li key={item.id}>{item.course} : {item.note}</li>
            ))}
          </ul>
        </div>
      );
};

export default Request;