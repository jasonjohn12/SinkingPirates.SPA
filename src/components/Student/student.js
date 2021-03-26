import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  Table,
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
} from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              messgrade: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Student = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.location.state.student);

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      grade: "",
      recentContactdate: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const handleAdd = () => {
    // const currentData = [...data.entries];

    // const { count, dataSource } = state;
    const newData = {
      key: "12",
      note: `Enter Entry`,
      dateAdded: new Date().toString(),
    };
    setData((prevState) => ({
      ...prevState,
      entries: [...prevState.entries, newData],
    }));
  };

  const save = async (key) => {
    try {
      debugger;
      const row = await form.validateFields();
      const newData = [...data.entries];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData((prevState) => ({
          ...prevState,
          entries: newData,
        }));
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      width: "15%",
      editable: true,
      // render: (text, i) => (
      //   <Link
      //     to={{
      //       pathname: "/student",
      //       state: {
      //         student: data[i.key],
      //       },
      //     }}
      //   >
      //     {text}
      //   </Link>
      // ),
    },
    {
      title: "Note",
      dataIndex: "note",
      width: "65%",
      editable: true,
    },
    // {
    //   title: "Last Successful Contact Date",
    //   dataIndex: "recentContactdate",
    //   width: "40%",
    //   editable: true,
    // },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "grade" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className=" row  mt-5">
      <div className="col-4">
        <h5>{props.location.state.student.name}</h5>
        <h6>Grade: {props.location.state.student.grade}</h6>
      </div>
      <div className=" col-8">
        <div className="container">
          <Form form={form} component={false}>
            <div>
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
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={data.entries}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Student;
