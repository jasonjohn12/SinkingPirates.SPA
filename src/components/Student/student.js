import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Tag, Input, Button, Popconfirm, Form } from "antd";
import { format } from "date-fns";
import ModalEntry from "../ModalEntry/ModalEntry";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const Student = (props) => {
  const [dataSource, setState] = useState(props.location.state.student.entries);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      width: "10%",
      editable: true,
      render: (date) => (date ? format(new Date(date), "MM/dd/yyyy") : date),
    },
    {
      title: "Note",
      dataIndex: "note",
      editable: true,
    },
    {
      title: "Parent Response Date",
      dataIndex: "dateAdded",
      editable: true,
      render: (date) => (date ? format(new Date(date), "MM/dd/yyyy") : date),
    },
    {
      title: "Contacted Parents",
      dataIndex: "parentContact",
      render: (parentContact) => (
        <span>
          <Tag
            color={!parentContact ? "volcano" : "geekblue"}
            key={parentContact}
          >
            {parentContact?.toString()}
          </Tag>
        </span>
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    console.log("key", key);
    debugger;
    const filtedDataSource = [...dataSource];
    setState(filtedDataSource.filter((item) => item.key !== key));
  };

  const closeModal = () => setShowModal(false);
  const handleAdd = () => {
    setShowModal(true);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setState({
      newData,
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div className="row mt-5">
      {showModal && <ModalEntry show={showModal} closeModal={closeModal} />}
      <div className="col-2">
        <h5>{props.location.state.student.name}</h5>
        <h6>Grade: {props.location.state.student.grade}</h6>
      </div>
      <div className="col-10">
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  );
};
export default Student;
