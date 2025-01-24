import React, { useEffect, useMemo, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';

interface WordImageEditorProps {
  value: string[];
  onChange: (translations: string[]) => void;
}

type Image = {
  id: number;
  url: string;
}

const WordImageEditor: React.FC<WordImageEditorProps> = ({ value, onChange }) => {
  const [imageList, setImageList] = useState<Image[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (!value) return
    setImageList([...value].map((url, index) => ({ id: index, url })));
  }, [value])

  const columns: ProColumns<{ id: number; url: string }>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'text',
    },
    {
      title: '图片',
      dataIndex: 'url',
      valueType: 'image',
      renderFormItem: () => <span>-</span>
    },
    {
      title: '图片URL地址',
      dataIndex: 'url',
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (text, record, index, action) => [
        <a
          key="edit"
          onClick={() => {
            action?.startEditable?.(index);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setEditableRowKeys(editableKeys.filter((key) => key !== index));
            const updatedImageList = imageList.filter((_, i) => i !== index);
            setImageList(updatedImageList);
            onChange(updatedImageList.map(item => item.url));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleSave = () => {
    onChange(imageList.map(item => item.url));
  };

  return (
    <div>
      <EditableProTable
        rowKey="id"
        columns={columns}
        value={imageList}
        onChange={setImageList}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => {
            return {
              id: imageList.length,
              url: '',
            }
          },
        }}
        toolBarRender={false}
        pagination={false}
        editable={{
          type: 'single',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            handleSave();
          },
          onChange: setEditableRowKeys,
        }}
      />
    </div>
  );
};

export default WordImageEditor;