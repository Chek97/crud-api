import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Row, Col, Table, Tag, Space, Button, Typography } from 'antd'
import axios from 'axios';

const { Title } = Typography;

export const MainTable = ({ users }) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer 8f2dc4280155b97b4052dfecbe1cd5b6ef8092a701994fc4e963a69ac35b54fd';
    let navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/user/create');
    }
    
    const handleEdit = (e, id) => {
        e.preventDefault();
        navigate(`/user/${id}/edit`);
    }

    const handleDelete = async(e, id) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`https://gorest.co.in/public/v2/users/${id}`);
            console.log(response);
            console.log('Usuario Eliminado con exito');
        } catch (error) {
            console.error(error);
        }
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', render: text => <p>{text}</p>},
        { title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Email', dataIndex: 'email', key: 'email'},
        {title: 'Gender', dataIndex: 'gender', key: 'gender'},
        { title: 'Status', dataIndex: 'status', key: 'status',
            render: status => <Tag color={status === 'active' ? "green" : "volcano"} key={status}>{status.toUpperCase()}</Tag>
        },
        {title: 'Actions', key: 'action',
            render: (user) => (<Space>
                <Button type='warning' onClick={(e) => handleEdit(e, user.id)}>Editar</Button>
                <Button type='danger' onClick={(e) => handleDelete(e, user.id)}>Eliminar</Button>
            </Space>)
        }
    ]

  return (
    <Row className='row-container'>
        <Col span={24} className="col-container">
            <div style={{textAlign: 'center', padding: '10px 0'}}>
                <Title style={{color: '#fff'}}>CRUD API</Title>
            </div>
            <div className='button-container'>
                <Button type='primary' size="large" onClick={handleClick}>Nuevo Usuario</Button>
            </div>
            <Space align='center'>
                <Table 
                    columns={columns}
                    dataSource={users}
                />
            </Space>
        </Col>
    </Row>
  )
}
