import React from 'react'
import {Form, Input, Button, Radio, Typography} from 'antd'
import { useForm } from '../hooks/useForm'
import axios from 'axios';

const { Title } = Typography;

export const CreateForm = () => {

    axios.defaults.headers.common['Authorization'] = 'Bearer 8f2dc4280155b97b4052dfecbe1cd5b6ef8092a701994fc4e963a69ac35b54fd';

    const [values, setValues] = useForm({
        name: '',
        email: '',
        gender: '',
        status: ''
    });

    const {name, email } = values;

    const  handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const url = `https://gorest.co.in/public/v2/users`;
            const response = await axios.post(url, values);
            console.log(response);
            console.log('Usuario creado con exito');
        } catch (error) {
            console.error('Error: ', error);
        }
    }

  return (
    <Form
        name='basic'
        autoComplete='off'
        className='form-container'
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
                    onChange={setValues} 
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
                    onChange={setValues} 
                />
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
            >
                <Radio.Group onChange={setValues} name="gender">
                    <Radio value="male">Masculino</Radio>
                    <Radio value="female">Femenino</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
            >
                <Radio.Group onChange={setValues} name="status">
                    <Radio value="active">Activo</Radio>
                    <Radio value="inactive">Inactivo</Radio>
                </Radio.Group>
            </Form.Item>
            <Button type='primary' block={true} onClick={handleSubmit}>
                Crear
            </Button>
        </div>
    </Form>
  )
}
