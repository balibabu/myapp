import React, { useContext, useEffect, useState } from 'react';
import { getGitIfos } from '../../../../http/Storage';
import AuthContext from '../../../Contexts/AuthContext';

export default function Autofill({setPrivateDetails}) {
    const [selectedOption, setSelectedOption] = useState(""); // Initialize state for the selected option
    const [gitInfos, setGitInfos] = useState([]);
    const { token } = useContext(AuthContext);


    const [, setInitialFetch] = useState(false);
    useEffect(() => {
        const fetchGitInfos=async ()=>{
            const infos=await getGitIfos(token);
            // console.log(infos);
            setGitInfos(infos);
        }
        setInitialFetch((prev) => {
            if (!prev) {
                fetchGitInfos();
            }
            return true;
        })
        // eslint-disable-next-line
    }, [])

    const handleSelectChange = (event) => {
        if(!isNaN(event.target.value)){
            const gitInfo=gitInfos[parseInt(event.target.value)]
            setPrivateDetails(gitInfo);
        }else{
            setPrivateDetails({ repo_owner: "", repo_name: "", token: "" });
        }

        setSelectedOption(event.target.value); // Update the selected option when the user makes a selection
    };

    return (
        <div>
            <div className="input-group mt-1 mb-2">
                <label className="input-group-text" htmlFor="inputGroupSelect01">
                    AutoFill
                </label>
                <select
                    className="form-select"
                    id="inputGroupSelect01"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value='choice'>Choose..</option>
                    {gitInfos.map((item,index)=>{
                        return <option key={item.repo_owner+item.repo_name} value={index}>{'git-name: '+item.repo_owner+', repo-name:'+item.repo_name}</option>
                    })}
                </select>
            </div>
        </div>
    );
}
