import React, { useMemo, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { WordAffixPart, WordAffixType, WordAffixTypeDescription } from './types/WordAffixPart';

interface WordAffixEditorProps {
  initialAffixParts: WordAffixPart[];
  onSave: (affixParts: WordAffixPart[]) => void;
}

const WordAffixEditor: React.FC<WordAffixEditorProps> = ({ initialAffixParts, onSave }) => {
  const [affixParts, setAffixParts] = useState(initialAffixParts);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<WordAffixPart>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        options: Object.keys(WordAffixType).map(key => ({ label: WordAffixType[key as keyof typeof WordAffixType], value: key })),
      },
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
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
            // 编辑操作逻辑
            action?.startEditable?.(index);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            // delete editable
            setEditableRowKeys(editableKeys.filter((key) => key !== index));

            const updatedAffixParts = affixParts.filter((_, i) => i !== index);

            setAffixParts(updatedAffixParts);

            onSave(updatedAffixParts);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleSave = () => {
    onSave(affixParts);
  };

  return (
    <div>
      <EditableProTable<WordAffixPart>
        rowKey="type"
        columns={columns}
        value={affixParts}
        onChange={(value) => setAffixParts([...value])}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => {

            return {
              type: WordAffixType.NONE,
              content: '',
              data: {},
              description: WordAffixTypeDescription[WordAffixType.NONE],
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

            handleSave()
          },
          onChange: setEditableRowKeys,
        }}
      />
    </div>
  );
};

export default WordAffixEditor;