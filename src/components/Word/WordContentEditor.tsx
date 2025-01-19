import { Form, Input, Button, Modal, Drawer, message, Checkbox } from 'antd'; // 添加 message 导入
import { useEffect, useState } from 'react';

import InfoComponent from './InfoComponent'; // 假设自定义组件名为InfoComponent
import WordPronounceEditor from './WordPronounceEditor'; // 添加导入语句
import WordTranslationEditor from './WordTranslationEditor'; // 添加导入语句
import { emptyWordContent, parseWordContent } from './types/WordContent';
import { isValidPronounce, isValidTranslationList, isValidWordDerivedList } from './types';
import WordDerivedEditor from './WordDerivedEditor';
import WordImageEditor from './WordImageEditor';
import WordAffixEditor from './WordAffixEditor';
import WordTransformEditor from './WordTransformEditor';

export type Prop = {
  word_head?: string;
  info?: string;
  editable?: boolean;
  onSubmit?: (wordContent: string) => void;
}

const WordContentEditor: React.FC<Prop> = ({ word_head, info, onSubmit }) => {
  const [form] = Form.useForm();
  const [currentContent, setCurrentContent] = useState(emptyWordContent());
  const [isTransformModalVisible, setTransformModalVisible] = useState(false);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isAdvancedFeaturesEnabled, setAdvancedFeaturesEnabled] = useState(false);
  const [infoData, setInfoData] = useState(info || '');

  function tryParseInfo(info: string) {
    const [parsedInfo, parseStatus] = parseWordContent(info);

    if (parsedInfo && !parseStatus) {
      Modal.confirm({
        title: '结构不一致',
        content: '传入的 info 结构与 WordContent 不一致，是否强行转换？',
        onOk() {
          setCurrentContent(parsedInfo);
          setInfoData(JSON.stringify(parsedInfo, null, 2));
        }
      });
    } else if (parsedInfo) {
      setCurrentContent(parsedInfo);
      setInfoData(JSON.stringify(parsedInfo, null, 2));
    }

    form.setFieldsValue(currentContent);
  }

  useEffect(() => {
    tryParseInfo(info || '')
  }, [form, currentContent, info]);

  const handleSave = () => {
    form.validateFields().then(values => {
      message.loading("正在检验配置...")

      if (!isValidPronounce(currentContent.britishPronounce)) {
        message.error("英式发音未通过检验！")
        return;
      }

      if (!isValidPronounce(currentContent.americanPronounce)) {
        message.error("美式发音未通过检验！")
        return;
      }

      if (isValidTranslationList(currentContent.translation)) {
        message.error("翻译列表未通过检验！")
        return;
      }

      if (isValidWordDerivedList(currentContent.translation)) {
        message.error("派生词列表未通过检验！")
        return;
      }

      message.success("检验通过！")
      setCurrentContent(values);
      setInfoData(JSON.stringify(currentContent, null, 2));
      setDrawerVisible(false);

      onSubmit?.(JSON.stringify(currentContent));
    });
  };

  const handleInfoChange = (newInfo: string) => {
    if (infoData === newInfo) {
      return;
    }

    setInfoData(newInfo);
    tryParseInfo(newInfo);
  }

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="">
        <InfoComponent onChange={handleInfoChange} data={infoData} />
      </Form.Item>
      <Button type="dashed" onClick={() => setDrawerVisible(true)}>
        进入单词编辑器
      </Button>

      <Drawer
        title="单词编辑器"
        placement="right"
        width='85%'
        onClose={() => setDrawerVisible(false)}
        open={isDrawerVisible}
      >
        <Form.Item name="britishPronounce" label="英式发音" rules={[{ required: true, message: '请输入英式发音!' }]}>
          <WordPronounceEditor value={currentContent.britishPronounce} onChange={(pronounce) => setCurrentContent({ ...currentContent, britishPronounce: pronounce })} />
        </Form.Item>
        <Form.Item name="americanPronounce" label="美式发音" rules={[{ required: true, message: '请输入美式发音!' }]}>
          <WordPronounceEditor value={currentContent.americanPronounce} onChange={(pronounce) => setCurrentContent({ ...currentContent, americanPronounce: pronounce })} />
        </Form.Item>
        <Form.Item name="img" label="图片列表" rules={[{ required: true, message: '请输入图片列表!' }]}>
          <WordImageEditor value={currentContent.img} onChange={(img) => setCurrentContent({...currentContent, img: img })} />
        </Form.Item>

        <Form.Item name="translation" label="翻译" rules={[{ required: true, message: '请编辑翻译内容!' }]}>
          <WordTranslationEditor
            initialTranslations={currentContent.translation}
            onSave={(updatedTranslations) => setCurrentContent({ ...currentContent, translation: updatedTranslations })}
          />
        </Form.Item>

        <Form.Item name="parts" label="词形变化" rules={[{ required: true, message: '请编辑词形变化!' }]}>
          <WordTransformEditor
            initialTransforms={currentContent.transform}
            onSave={(updatedTransforms) => setCurrentContent({ ...currentContent, transform: updatedTransforms })}
          />
        </Form.Item>

        <Form.Item name="derived" label="单词网络" rules={[{ required: true, message: '请编辑单词网络!' }]}>
          <WordDerivedEditor
            initialDerivedWords={currentContent.derived}
            onSave={(updatedDerivedWords) => setCurrentContent({ ...currentContent, derived: updatedDerivedWords })}
          />
        </Form.Item>

        <Form.Item name="parts" label="单词组成" rules={[{ required: true, message: '请编辑单词组成!' }]}>
          <WordAffixEditor
            initialAffixParts={currentContent.parts}
            onSave={(updatedAffixParts) => setCurrentContent({ ...currentContent, parts: updatedAffixParts })}
          />
        </Form.Item>
        
        <Form.Item name="advancedFeatures" valuePropName="checked">
          <Checkbox onChange={(e) => setAdvancedFeaturesEnabled(e.target.checked)}>启用拓展功能</Checkbox>
        </Form.Item>
        {isAdvancedFeaturesEnabled && (
          <>
            <Form.Item name="remember" label="记忆方法">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="story" label="故事">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="backgroundStory" label="背景故事">
              <Input.TextArea rows={4} />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" onClick={handleSave}>
            校验并提交
          </Button>
        </Form.Item>

        <Modal
          title="编辑词形变化"
          visible={isTransformModalVisible}
          onCancel={() => setTransformModalVisible(false)}
          footer={null}
        >
          {/* 这里可以添加Word Transform的编辑表单 */}
        </Modal>
      </Drawer>
    </Form>
  );
};

export default WordContentEditor;


