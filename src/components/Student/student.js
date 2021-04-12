// import React, { useState } from "react";
// import "antd/dist/antd.css";
// import {
//   Table,
//   Button,
//   Tag,
//   Input,
//   InputNumber,
//   Popconfirm,
//   Form,
//   Typography,
// } from "antd";
// import { format } from "date-fns";

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               messgrade: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const Student = (props) => {
//   console.log("props", props);
//   const [form] = Form.useForm();
//   const [data, setData] = useState(props.location.state.student);

//   const [editingKey, setEditingKey] = useState("");

//   const isEditing = (record) => record.key === editingKey;

//   const edit = (record) => {
//     console.log("record", record);
//     form.setFieldsValue({
//       name: "",
//       grade: "",
//       recentContactdate: "",
//       ...record,
//     });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey("");
//   };
//   const handleAdd = () => {
//     // const currentData = [...data.entries];

//     // const { count, dataSource } = state;
//     const newData = {
//       key: "12",
//       note: `Enter Entry`,
//       dateAdded: new Date().toString(),
//     };
//     setData((prevState) => ({
//       ...prevState,
//       entries: [...prevState.entries, newData],
//     }));
//   };

//   const save = async (key) => {
//     try {
//       debugger;
//       const row = await form.validateFields();
//       const newData = [...data.entries];
//       const index = newData.findIndex((item) => key === item.key);

//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, { ...item, ...row });
//         setData((prevState) => ({
//           ...prevState,
//           entries: newData,
//         }));
//         setEditingKey("");
//       } else {
//         newData.push(row);
//         setData(newData);
//         setEditingKey("");
//       }
//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };

//   const columns = [
//     {
//       title: "Date Added",
//       dataIndex: "dateAdded",
//       width: "15%",
//       editable: true,
//       render: (date) => format(new Date(date), "MM/dd/yyyy"),
//     },
//     {
//       title: "Note",
//       dataIndex: "note",
//       width: "65%",
//       editable: true,
//     },
//     {
//       title: "Contacted Parent",
//       dataIndex: "contactedParent",
//       width: "15%",
//       editable: true,
//       render: (contactedParent) => (
//         <span>
//           <Tag
//             color={!contactedParent ? "volcano" : "geekblue"}
//             key={contactedParent}
//           >
//             {contactedParent.toString()}
//           </Tag>
//         </span>
//       ),
//     },

//     {
//       title: "operation",
//       dataIndex: "operation",
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <a
//               href="javascript:;"
//               onClick={() => save(record.key)}
//               style={{
//                 marginRight: 8,
//               }}
//             >
//               Save
//             </a>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link
//             disabled={editingKey !== ""}
//             onClick={() => edit(record)}
//           >
//             Edit
//           </Typography.Link>
//         );
//       },
//     },
//   ];
//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }

//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: col.dataIndex === "grade" ? "number" : "text",
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });

//   return (
//     <div className=" row  mt-5">
//       <div className="col-2">
//         <h5>{props.location.state.student.name}</h5>
//         <h6>Grade: {props.location.state.student.grade}</h6>
//       </div>
//       <div className=" col-10">
//         <div className="container">
//           <Form form={form} component={false}>
//             <div>
//               <Button
//                 onClick={handleAdd}
//                 type="primary"
//                 style={{
//                   marginBottom: 16,
//                 }}
//               >
//                 Add a row
//               </Button>
//               <Table
//                 components={{
//                   body: {
//                     cell: EditableCell,
//                   },
//                 }}
//                 bordered
//                 dataSource={data.entries}
//                 columns={mergedColumns}
//                 rowClassName="editable-row"
//                 pagination={{
//                   onChange: cancel,
//                 }}
//               />
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Student;

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
  // constructor(props) {
  //   super(props);
  const [dataSource, setState] = useState(props.location.state.student.entries);
  const [showModal, setShowModal] = useState(false);
  console.log("showModal", showModal);
  console.log("datasource", dataSource);
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
      dataIndex: "contactedParent",
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
  // this.state = {
  //   dataSource: this.props.location.state.student.entries,
  //   count: 2,
  // };
  // }

  const handleDelete = (key) => {
    console.log("key", key);
    debugger;
    const filtedDataSource = [...dataSource];
    console.log("filteredDataSource", filtedDataSource);
    setState(filtedDataSource.filter((item) => item.key !== key));
  };

  const closeModal = () => setShowModal(false);
  const handleAdd = () => {
    setShowModal(true);
    // const { count, dataSource } = this.state;
    // const newData = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: "32",
    //   address: `London, Park Lane no. ${count}`,
    // };
    // this.setState({
    //   dataSource: [...dataSource, newData],
    //   count: count + 1,
    // });
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

  //render() {
  // const { dataSource } = this.state;
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // const columns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }

  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave: handleSave,
  //     }),
  //   };
  // });
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
