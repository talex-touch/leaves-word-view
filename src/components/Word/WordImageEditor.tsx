import React, { useCallback, useEffect, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Typography } from 'antd';
import { addMediaCreatorUsingPost } from '@/services/backend/mediaCreatorController';
import { parseSSEData } from '@/composables/stream-analyser';
import { request } from '@umijs/max';

interface WordImageEditorProps {
  value: string[];
  readonly?: boolean;
  onChange: (translations: string[]) => void;
}

type Image = {
  id: number;
  url: string;
}

const WordImageEditor: React.FC<WordImageEditorProps> = ({ value, readonly, onChange }) => {
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
      render: (text, record, index, action) => !readonly && [
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
        recordCreatorProps={readonly ? false : {
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

type WordImageCreatorProp = {
  wordId: number
  onSubmit: (url: string) => void
}

const { Paragraph } = Typography;

export const WordImageCreator = ({ wordId, onSubmit }: WordImageCreatorProp) => {
  const [data, setData] = useState('')


  const handleCreate = useCallback(async () => {
    //  /api/media_creator/add
    const res = await addMediaCreatorUsingPost({
      wordId,
      mediaType: 'IMAGE'
    }) as string

    console.log({ res })

    // data: [{ "data": "data:", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }, { "data": "waiting", "mediaType": null }, { "data": "\n\n", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }] data: [{ "data": "id:20250126001541F2DDA3A00F77B0803B9E\nevent:Message\ndata:", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }, { "data": { "content": "{\"add\":\"The person's mouth is moving as they speak, and there are small speech bubbles coming out. The floor is a light wood texture. There are no other distractions in the background.\",\"neg\":\"Blur, noise, distortion, discolored\",\"pos\":\"A person engaged in a lively conversation, with a friendly expression and animated gestures. The background is a simple and clean space with soft lighting. The colors are warm and inviting, with a combination of light brown and pale yellow. The person is dressed casually and comfortably.\"}", "node_title": "输出_1", "node_seq_id": "0", "node_is_finish": true, "ext": null }, "mediaType": null }, { "data": "\n\n", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }] data: [{ "data": "id:20250126001541F2DDA3A00F77B0803B9E\nevent:Message\ndata:", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }, { "data": { "content": "https://s.coze.cn/t/_3Y3dFN7YNE/", "node_title": "输出_2", "node_seq_id": "0", "node_is_finish": true, "ext": null }, "mediaType": null }, { "data": "\n\n", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }] data: [{ "data": "id:20250126001541F2DDA3A00F77B0803B9E\nevent:Message\ndata:", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }, { "data": { "content": "{\"output\":\"https://s.coze.cn/t/_3Y3dFN7YNE/\"}", "node_title": "End", "node_seq_id": "0", "node_is_finish": true, "ext": null }, "mediaType": null }, { "data": "\n\n", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }] data: [{ "data": "id:20250126001541F2DDA3A00F77B0803B9E\nevent:Done\ndata:", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }, { "data": null, "mediaType": null }, { "data": "\n\n", "mediaType": { "type": "text", "subtype": "plain", "parameters": { "charset": "UTF-8" }, "qualityValue": 1.0, "charset": "UTF-8", "concrete": true, "subtypeSuffix": null, "wildcardSubtype": false, "wildcardType": false } }]

    // 解析sse event data的数据
    const result = parseSSEData(res)

    console.log({
      result
    })

    // 将这种格式纳入data
    setData(res)
  }, []);

  const handleInsert = useCallback(async () => {
    // 解析 sse 的数据

  }, [data])

  return (
    <div>
      <p>为单词 <strong>#{wordId}</strong> 一键创作</p>
      <div className='flex flex-center gap-2'>
        <Button onClick={handleCreate}>AI一键创作</Button>
        <Button disabled={!data} onClick={handleInsert}>插入图片</Button>
      </div>

      <Paragraph>
        {data}
      </Paragraph>
    </div>
  )
}

export default WordImageEditor;