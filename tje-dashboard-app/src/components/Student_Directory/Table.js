import React from "react";

function Table({tableData}){
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Age</th>
                    <th>Classes</th>
                </tr>
            </thead>
            <tbody>
            {
                tableData.map((data, index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data[index].name}</td>
                            <td>{data[index].age}</td>
                            <td>{data[index].classesTaken[0]}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default Table;