import React, { useMemo, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { emptyWordPronounce } from './types/WordPronounce';
import { WordTranslation, WordType } from './types/WordTranslation';
import WordPronounceEditor from './WordPronounceEditor';
import WordImageEditor from './WordImageEditor';

interface WordTranslationEditorProps {
  initialTranslations: WordTranslation[];
  onSave: (translations: WordTranslation[]) => void;
}

const WordTranslationEditor: React.FC<WordTranslationEditorProps> = ({ initialTranslations, onSave }) => {
  const [translations, setTranslations] = useState(initialTranslations);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  // 获取 translations 中已经使用过的 typeText
  const usedTypeTexts = useMemo(() => translations.map(translation => translation.typeText), [translations]);

  // 获取剩下的 typeText list
  const remainingTypeTexts = useMemo(() => Object.keys(WordType).filter(key => !usedTypeTexts.includes(key)), [usedTypeTexts]);

  const columns: ProColumns<WordTranslation>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        options: remainingTypeTexts.map(key => ({ label: WordType[key as keyof typeof WordType], value: WordType[key as keyof typeof WordType] })),
      },
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '类型文本',
      width: '100px',
      dataIndex: 'typeText',
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '音标',
      dataIndex: 'phonetic',
      width: '150px',
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '翻译',
      dataIndex: 'translation',
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '定义',
      dataIndex: 'definition',
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '示例',
      dataIndex: 'example',
      formItemProps: () => {
        return {
          rules:
            [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '音频',
      dataIndex: 'audio',
      valueType: 'text',
      render: () => <WordPronounceEditor readonly />,
      renderFormItem: () => <WordPronounceEditor />,
    },
    {
      title: '频率',
      dataIndex: 'frequency',
      valueType: 'digit',
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

            const updatedTranslations = translations.filter((_, i) => i !== index);

            setTranslations(updatedTranslations);

            onSave(updatedTranslations);
          }}
        >
          删除
        </a>,
        <a
          key="edit-image"
          onClick={() => {
            // 打开 WordImageEditor 进行图片编辑
            // 这里假设有一个状态来控制 WordImageEditor 的显示
            // 例如：setShowImageEditor(true);
            console.log('Edit Image');
          }}
        >
          编辑图片
        </a>,
        <a
          key="delete-image"
          onClick={() => {
            // 删除图片的逻辑
            console.log('Delete Image');
          }}
        >
          删除图片
        </a>,
      ],
    },
  ];

  const handleSave = () => {
    onSave(translations);
  };

  return (
    <div>
      <EditableProTable<WordTranslation>
        rowKey="typeText"
        columns={columns}
        value={translations}
        onChange={(value) => setTranslations([...value])}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => {
            const targetType = remainingTypeTexts?.[0] || WordType.NOUN

            return {
              id: translations.length,
              type: WordType[targetType as keyof typeof WordType],
              typeText: `${targetType}`,
              translation: '',
              definition: '',
              example: '',
              phonetic: '',
              audio: emptyWordPronounce(),
              frequency: 0,
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

export default WordTranslationEditor;