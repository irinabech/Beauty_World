import React, { useState, useEffect } from "react";
import { Modal, Button, Input, InputNumber, Select, Form, DatePicker} from 'antd';
import  { MastersApi, ServicesApi, OrdersApi } from "../../api";
import moment from 'moment';


const CreateOrders = (kwargs) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [MastersSelector, SetMastersSelector] = useState([])
    const [ServicesSelector, SetServicesSelector] = useState([])
    const [MasterId, SetMasterId] = useState(null)
    const [ServiceId, SetServiceId] = useState(null)


    const showModal = () => {
        setIsModalVisible(true);
        set_data();
    };

    function serializeForm(formNode) {
        const { elements } = formNode;
        const data = {};
        const dataRaw = Array.from(elements)
            .filter((item) => !!item.id)
            .map((element) => {
                if (element.id === "rc_select_0") {
                    return { "id" :"MasterId", "value": MasterId };
                } else if (element.id === "rc_select_1") {
                    return { "id" :"ServiceId", "value": ServiceId };
                } else {
                    const { id, value } = element;
                    return { id, value };
                }
            });
        dataRaw.forEach(function (el) {
            data[el["id"]] = el["value"];
        });
        return data;
    }

    async function createOrders() {
        const addForm = document.getElementsByClassName("addForm");
        const formData = serializeForm(addForm[0]);
        var response = null;
        if (kwargs["ColumId"]) {
            response = await OrdersApi.editOrder(kwargs["ColumId"], formData);
        } else {
            response = await OrdersApi.createOrders(formData);
        }
        window.location.reload();
    }

    const handleOk = () => {
        createOrders();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    

    async function set_data() {
        let mastersRaw = [];
        let servicesRaw = [];

        const masters = await MastersApi.getMasters();
        const services = await ServicesApi.getServices();

        masters.forEach((master) => {
            const option = {};
            option["value"] = master.id;
            option["text"] = master.fullName;
            mastersRaw.push(option);
        });
        services.forEach((service) => {
            const option = {};
            option["value"] = service.id;
            option["text"] = service.name;
            servicesRaw.push(option);
        });
        SetMastersSelector(mastersRaw);
        SetServicesSelector(servicesRaw);
    }

    function setMasterValue(event) {
        SetMasterId(event)
    }

    function setserviceValue(event) {
        SetServiceId(event)
    }


    return (
        <>
            <Button type="primary" onClick={showModal}>
                {kwargs["buttonName"]}
            </Button>

            <Modal title="Заявка" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form className="addForm">
                    <Form.Item
                        label="ФИО клиента"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Мастер">
                        <Select className="Masters" onChange={setMasterValue}>
                        {MastersSelector.map(item => {
                            return (<Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>);
                        })}
                        </Select>
                    </Form.Item>

                    <Form.Item className="Services" label="Услуга">
                        <Select onChange={setserviceValue}>
                        {ServicesSelector.map(item => {
                            return (<Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>);
                        })}
                        </Select>
                    </Form.Item>

                
                    <Form.Item label="Дата визита">
                        <DatePicker
                            id="visitDate"
                            format="YYYY-MM-DDTHH:mm:ss.zzzZ"
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Телефон"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input addonBefore="+ 7"   />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
    };

export default CreateOrders;