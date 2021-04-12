import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  Button,
  Table,
  Input,
  Tag,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import Faker from "faker";
import { format, compareAsc } from "date-fns";
const originData = [];
const entries = [];
for (let i = 1; i < 5; i++) {
  entries.push({
    key: i.toString(),
    dateAdded: Faker.date.past().toString(),
    note: Faker.lorem.sentence(),
    contactedParent: Faker.random.boolean(),
  });
}

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: Faker.name.findName(),
    grade: Math.floor(Math.random() * 100) + 1,
    recentContactdate: format(Faker.date.past(), "MM/dd/yyyy"),
    entries,
  });
}

const handleAdd = () => {
  console.log("ADD");
};

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
  console.log("EDITING");
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

const Dashboard = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
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

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
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
      title: "Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
      render: (text, i) => (
        <Link
          to={{
            pathname: "/student",
            state: {
              student: data[i.key],
            },
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      width: "15%",
      editable: true,
      render: (grade) => (
        <span>
          <Tag color={grade < 60 ? "volcano" : "geekblue"} key={grade}>
            {grade}
          </Tag>
        </span>
      ),
    },
    {
      title: "Recent Attempted Contact",
      dataIndex: "recentContactdate",
      width: "40%",
      editable: true,
    },
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
    {
      title: "Parent Responded",
      dataIndex: "true",
      width: "15%",
      render: (_, record) => <span>{"True"}</span>,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    const handleAdd = () => {
      console.log("ADD");
    };

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

  const components = {
    body: {
      // row: EditableCell,
      cell: EditableCell,
    },
  };
  return (
    <div className="container mt-5">
      <Form form={form} component={false}>
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
          components={components}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default Dashboard;
