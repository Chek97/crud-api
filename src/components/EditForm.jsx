import { Button, Form, Input, Radio, Space, Spin, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const { Title } = Typography;

export const EditForm = () => {

    axios.defaults.headers.common['Authorization'] = 'Bearer 8f2dc4280155b97b4052dfecbe1cd5b6ef8092a701994fc4e963a69ac35b54fd';

    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    
    const {name, email } = user;
            
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://gorest.co.in/public/v2/users/${id}`);
            console.log(response);
            console.log('Usuario actualizado con exito');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(`https://gorest.co.in/public/v2/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    }, []);

    return (
        <div className='container'>
            {loading 
            ?
            <Space size="middle">
                <Spin size="large" />
            </Space> 
            : 
            (<Form
                    name='basic'
                    autoComplete='off'
                    initialValues={user}
                    className="form-container"
                >
                    <div className='inputs-group'>
                    <Title style={{textAlign: 'center'}}>Nuevo Usuario</Title>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[ {required: true, message: 'Introduce el nombre de usuario!'}]}
                    >
                        <Input
                            name='name'
                            value={name}
                            onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} 
                        />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[ {required: true, message: 'Introduce un correo electronico!'}]}
                            >
                                <Input
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} 
                                />
                            </Form.Item>
                            <Form.Item
                                label="Gender"
                                name="gender"
                            >
                                <Radio.Group onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} name="gender">
                                    <Radio value="male">Masculino</Radio>
                                    <Radio value="female">Femenino</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Status"
                                name="status"
                            >
                                <Radio.Group onChange={(e) => setUser({...user, [e.target.name]: e.target.value})} name="status">
                                    <Radio value="active">Activo</Radio>
                                    <Radio value="inactive">Inactivo</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Button type='primary' block={true} onClick={handleSubmit}>
                                Actualizar
                            </Button>
                    </div>
                        </Form>
                    )
            }
        </div>
    )
}
