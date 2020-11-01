import React, { useState } from 'react';
import { Button, Space, Layout, Table, Modal, Form, Input, message, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Footer, Content } = Layout;
const { Column } = Table;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



function App() {
  const info = [
    { id: 1, personaje: 'Monkey D. Luffy', anime: 'One Piece' },
    { id: 2, personaje: 'Uzumaki Naruto', anime: 'Naruto' },
    { id: 3, personaje: 'Yagami Light', anime: 'Death Note' },
    { id: 4, personaje: 'Sun Jinwoo', anime: 'Solo Leveling' },
    { id: 5, personaje: 'Goku', anime: 'Dragon Ball Z' }
  ]
  const [data, setData] = useState(info);
  const [loadingInsertar, setLoadingInsertar] = useState(false);
  const [visibleInsertar, setVisibleInsertar] = useState(false);
  const [form, setForm] = useState({ id: '', personaje: '', anime: '' });

  const [visibleEditar, setVisibleEditar] = useState(false);
  const [loadingEditar, setLoadingEditar] = useState(false);

  const [formulario] = Form.useForm();

  const handleOkInsertar = (dato) => {
    setLoadingInsertar(true);
    setTimeout(() => {
      formulario.resetFields();
      setData([...data, dato]);
      handleClearForm();
      setVisibleInsertar(false);
      setLoadingInsertar(false);
    }, 2000);
  }
  const handleCancelInsertar = () => {
    handleClearForm();
    formulario.resetFields();
    setVisibleInsertar(false);
  }
  const handleChange = (e, id) => {
    setForm({
      ...form,
      id: id,
      [e.target.name]: e.target.value,
    })
  }
  const handleClearForm = () => {
    setForm({ id: '', personaje: '', anime: '' });
  }

  const handleEdit = (e, registro) => {
    formulario.resetFields();
    setForm(registro);
    setVisibleEditar(e);
  }
  const handleCancelEdit = () => {

    //handleClearForm();
    //formulario.resetFields();
    setVisibleEditar(false);
  }
  const handleOkEditar = (dato) => {
    var contador = 0;
    var lista = data;
    lista.map(registro => {
      if (dato.id === registro.id) {
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;

      }
      contador++;
      return (true); //Evitar warning en consola
    })
    setLoadingEditar(true);
    setTimeout(() => {
      setData(lista);
      handleClearForm(); //Limpia form
      setVisibleEditar(false);
      setLoadingEditar(false);
    }, 2000);


  }
  const mensajeEliminado = (dato) => {
    let contador = 0;
    var lista = data;
    lista.map(registro => {
      if (registro.id === dato.id) {
        lista.splice(contador, 1);
      }
      contador++;
    });
    setData([...lista]);
    message.info(`Se elimino personaje ${dato.personaje} con id ${dato.id}`, 2);
  };




  return (
    <>
      <Layout >
        <Header>
          <Space size='small'  >
            <Button type="primary" onClick={() => { setVisibleInsertar(true) }}>
              Nuevo Personaje
           </Button>
          </Space>
        </Header>
        <Content align='center' >
          <Space size='small'>
            <Table
              dataSource={data}
              pagination={false}
            >
              <Column title="Id" dataIndex="id" key={"id"} align='center' />
              <Column title="Personaje" dataIndex="personaje" key="personaje" />
              <Column title="Anime" dataIndex="anime" key="anime" />

              <Column
                align='center'
                title="Action"
                key="action"
                render={(text, record) => (
                  <Space size="middle">
                    <Button type="primary" className='warning' onClick={() => { handleEdit(true, text) }}>
                      Editar
                    </Button>
                    <Popconfirm title="Esta seguro de eliminar?" okText="Si" cancelText="No" onConfirm={() => { mensajeEliminado(text) }}>
                      <Button type="primary" danger >Eliminar</Button>
                    </Popconfirm>
                  </Space>
                )}
              />
            </Table>
          </Space>
        </Content>
        <Footer align='center' ><b>CRUD sencillo</b></Footer>
      </Layout>

      <Modal
        visible={visibleInsertar}
        title="Insertar personaje"
        onOk={() => { handleOkInsertar(form) }}
        onCancel={handleCancelInsertar}
        footer=''
        closable={false}
        maskClosable={false}
      >

        <Form
          {...layout}
          initialValues={{ remember: false }}
          form={formulario}
        >
          <Form.Item
            label="Id"
            name="id"
            rules={[{ required: false, message: 'Please input your username!' }]}
          >
            <Input disabled value={data.length + 1} prefix={data.length + 1} />
          </Form.Item>

          <Form.Item
            label="Personaje"
            name="personaje"
            rules={[{ required: false, message: 'Please input your password!' }]}
          >
            <Input name='personaje' id='personaje' onChange={(e) => { handleChange(e, data.length + 1) }} />
          </Form.Item>
          <Form.Item
            label="Anime"
            name="anime"
            rules={[{ required: false, message: 'Please input your password!' }]}
          >
            <Input name='anime' id='anime' onChange={(e) => { handleChange(e, data.length + 1) }} />
          </Form.Item>

          <Form.Item {...tailLayout} >
            <Space>
              <Button key="cancel" type="primary" onClick={() => { handleCancelInsertar() }} danger >Cancelar</Button>
              <Button key="submit" type="primary" loading={loadingInsertar} onClick={() => { handleOkInsertar(form) }} >Aceptar</Button>

            </Space>
          </Form.Item>
        </Form>




      </Modal>



      <Modal
        visible={visibleEditar}
        title="Editar personaje"
        onOk={() => { handleOkEditar(form) }}
        onCancel={handleCancelEdit}
        footer=''
        closable={false}
        maskClosable={false}
      >

        <Form
          {...layout}
          initialValues={{ remember: false }}
          form={formulario}
        >
          <Form.Item
            label="Id"
            name="id"
            rules={[{ required: false, message: 'Please input your username!' }]}

          >
            <Input disabled value={form.id} defaultValue={form.id} />
          </Form.Item>

          <Form.Item
            label="Personaje"
            name="personaje"
            rules={[{ required: false, message: 'Please input your password!' }]}
          >
            <Input name='personaje' id='personaje' defaultValue={form.personaje} onChange={(e) => { handleChange(e, form.id) }} />
          </Form.Item>
          <Form.Item
            label="Anime"
            name="anime"
            rules={[{ required: false, message: 'Please input your password!' }]}
          >
            <Input name='anime' id='anime' defaultValue={form.anime} onChange={(e) => { handleChange(e, form.id) }} />
          </Form.Item>

          <Form.Item {...tailLayout} >
            <Space>
              <Button key="cancel" type="primary" onClick={() => { handleCancelEdit() }} danger >Cancelar</Button>
              <Button key="submit" type="primary" loading={loadingEditar} onClick={() => { handleOkEditar(form) }} >Aceptar</Button>

            </Space>
          </Form.Item>
        </Form>




      </Modal>



    </>
  );
}
//DefaultValue debe cambiarse por initialValues en el form padre, para evitar warning de consola
//Corregir warning de unique key
export default App;


