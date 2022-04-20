import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MainTable } from './components/index'
import { Space, Spin } from 'antd';

export const App = () => {

    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async() => {
            try {
                const request = await axios.get(`https://gorest.co.in/public/v2/users`);
                setUsers(request.data);
                setLoading(false);
            } catch (error) {
                console.error(error);   
            }
        }
        getUsers();
    }, []);
  return (
    <div className='container'>
        {loading 
        ? 
        <Space size="middle">
            <Spin size="large" />
        </Space> 
        : 
        <MainTable users={users} />}
    </div>
  )
}
