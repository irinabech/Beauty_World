
import React, { useState, useEffect } from "react";
import { Table, Modal, Input, Button, Space, Popconfirm, Typography } from 'antd';
import 'antd/dist/antd.css';
import  OrdersApi from "../../api/orders-api";
import CreateOrders from "./CreateOrders";
import {SearchOutlined} from "@ant-design/icons"
const { Title } = Typography;


export function OrderPage () {
    const [data, setData] = useState([null]);

    const columns = [
        {
            title: 'ФИО клиента',
            dataIndex: 'customer',
            key: 'customer',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
                return (
                    <>
                    <Input 
                        autoFocus
                        placeholder="Начните вводить имя"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value?[e.target.value]:[]);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                    ></Input>
                    <Button
                        onClick={() => {confirm()}} 
                        type='primary'>Поиск
                    </Button>
                    <Button
                        onClick={() => {clearFilters()}} 
                        type='danger'>Очистить
                    </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.customer.firstName.toLowerCase().includes(value.toLowerCase())
            },
            render: customer => `${customer? customer.fullName : null}`
        },
        {
            title: 'Телефон',
            dataIndex: 'customer',
            key: 'customer',
            render: customer => `${customer? customer.phone : null}`
        },
        {
            title: 'Мастер',
            dataIndex: 'master',
            key: 'master',
            render: master => `${master? master.fullName : null} - опыт работы ${master? getDataDiff(master.startWorkDate) : null} дней`
        },{
            title: 'Услуга',
            dataIndex: 'service',
            key: 'servise',
            render: servise => `${servise? servise.name : null} - ${servise? servise.description : null}`
        },
        {
            title: 'Дата визита',
            dataIndex: 'visitDate',
            key: 'visitDate',
        },
        {
            title: 'Статус заявки',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Opened', value: 'Opened' },
                { text: 'Closed', value: 'Closed' },
            ],
            onFilter: (value, record) => {
                return record.status === value
            }
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
            <Space size="middle">
                <CreateOrders  buttonName="Редактировать" ColumId={record? record.id : null}/>
            </Space>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteOrder(record.id)}>
            <Space size="middle">
                <a>Удалить</a>
            </Space>
            </Popconfirm>
            ),
        },
    ];
    
    async function deleteOrder(order_id) {
        var response = OrdersApi.deleteOrders(order_id);
        console.log(response)
        OrdersApi.getOrders().then(setData);
    }
    
    function getDataDiff(date) {
        const currentDate = new Date()
        const oldDate = new Date(date)
        return Math.ceil(Math.abs(currentDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24));
    }

    useEffect(() => {
        OrdersApi.getOrders().then(setData);
    }, []);

    return (
        <>
            <Title align="center">Заявки</Title>
            <CreateOrders buttonName = "Cоздать новую заявку"/>
            <Table columns={columns} dataSource={data} />
        </>
    )
}