import { Form, Input, Button, Drawer, message, Checkbox } from 'antd'; // 添加 message 导入
import { useEffect, useMemo, useState } from 'react';

import InfoComponent from './InfoComponent'; // 假设自定义组件名为InfoComponent
import WordPronounceEditor from './WordPronounceEditor'; // 添加导入语句
import WordTranslationEditor from './WordTranslationEditor'; // 添加导入语句
import { emptyWordContent, parseWordContent } from './types/WordContent';
import { isValidPronounce, isValidTranslationList, isValidWordAffixPartList, isValidWordDerivedList, isValidWordTransformList, WordExampleTypeEnum } from './types';
import WordDerivedEditor from './WordDerivedEditor';
import WordImageEditor from './WordImageEditor';
import WordAffixEditor from './WordAffixEditor';
import WordTransformEditor from './WordTransformEditor';
import WordExampleListEditor from './WordExampleListEditor';

export type Prop = {
  word_head?: string;
  info?: string;
  editable?: boolean;
  onSubmit?: (wordContent: string) => void;
}

enum ParseStatus {
  UNKNOWN = -1,
  NORMAL = 0,
  ERROR = 1,
  SYNCHORNISED = 2
}

const WordContentEditor: React.FC<Prop> = ({ info, onSubmit }) => {
  const [form] = Form.useForm();
  const [currentContent, setCurrentContent] = useState(emptyWordContent());
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isAdvancedFeaturesEnabled, setAdvancedFeaturesEnabled] = useState(false);
  const [infoData, setInfoData] = useState(info || '');
  const [parseStatus, setParseStatus] = useState<ParseStatus>(ParseStatus.NORMAL);
  const [tipMsg, setTipMsg] = useState('');

  function tryParseInfo(info: string) {
    console.error("trace")
    const [parsedInfo, parseStatus, msg] = parseWordContent(info);

    if (parsedInfo) {
      setInfoData(JSON.stringify(parsedInfo, null, 2));
      setCurrentContent(parsedInfo);
      setParseStatus(ParseStatus.SYNCHORNISED);

      return
    }

    setTipMsg('');
    if (parsedInfo && !parseStatus) {
      setTipMsg(msg!);
      setParseStatus(ParseStatus.ERROR);

      console.warn("解析失败，请检查输入格式！")
    } else {
      console.log(parsedInfo)

      setParseStatus(ParseStatus.UNKNOWN);
    }

    form.setFieldsValue(currentContent);
  }

  useEffect(() => {
    setInfoData(info || '');
  }, []);

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

      if (!currentContent.img.length) {
        message.error("图片列表未通过检验！")
        return;
      }

      if (isValidTranslationList(currentContent.translation)) {
        message.error("翻译列表未通过检验！")
        return;
      }

      if (!currentContent.examplePhrases.length || !(currentContent.examplePhrases.every(example => example.type === WordExampleTypeEnum.PHRASE && example.translation))) {
        message.error("短语列表未通过检验！")
        return;
      }

      if (isValidWordDerivedList(currentContent.derived)) {
        message.error("单词网络列表未通过检验！")
        return;
      }

      if (isValidWordTransformList(currentContent.transform)) {
        message.error("词形变化列表未通过检验！")
        return;
      }

      if (isValidWordAffixPartList(currentContent.parts)) {
        message.error("单词组成列表未通过检验！")
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
    setInfoData(newInfo);
    tryParseInfo(newInfo || '')
  }

  const renderStatusTip = useMemo(() => {
    if (parseStatus === ParseStatus.NORMAL) return null

    if (parseStatus === ParseStatus.SYNCHORNISED) {
      return <span>
        已同步至单词编辑器
      </span>
    }

    if (parseStatus === ParseStatus.ERROR) {
      return <span>
        结构不一致，<Button color='primary' variant="text" onClick={() => {
          const [parsedInfo] = parseWordContent(info!);
          if (!parsedInfo) {
            message.error("解析失败，请检查输入格式！")
            return;
          }

          setInfoData(JSON.stringify(parsedInfo, null, 2));
          setCurrentContent(parsedInfo!);
          setParseStatus(ParseStatus.SYNCHORNISED);
        }}>点击这里强行转换</Button>
        <span>
          {tipMsg}
        </span>
      </span>
    }

    if (parseStatus === ParseStatus.UNKNOWN) {
      return <span>
        未知的格式，无法完成解析
      </span>
    }

  }, [parseStatus])

  const renderWordEditor = useMemo(() => (
    <>
      <Form.Item name="britishPronounce" label="英式发音" rules={[{ required: true, message: '请输入英式发音!' }]}>
        <WordPronounceEditor value={currentContent.britishPronounce} onChange={(pronounce) => setCurrentContent({ ...currentContent, britishPronounce: pronounce })} />
      </Form.Item>
      <Form.Item name="americanPronounce" label="美式发音" rules={[{ required: true, message: '请输入美式发音!' }]}>
        <WordPronounceEditor value={currentContent.americanPronounce} onChange={(pronounce) => setCurrentContent({ ...currentContent, americanPronounce: pronounce })} />
      </Form.Item>
      <Form.Item name="img" label="图片列表" rules={[{ required: true, message: '请输入图片列表!' }]}>
        <span className='hidden'>
          {JSON.stringify(currentContent.img)}
        </span>
        <WordImageEditor value={currentContent.img} onChange={(img) => setCurrentContent({ ...currentContent, img: img })} />
      </Form.Item>

      <Form.Item name="translation" label="翻译" rules={[{ required: true, message: '请编辑翻译内容!' }]}>
        <WordTranslationEditor
          initialTranslations={currentContent.translation}
          onSave={(updatedTranslations) => setCurrentContent({ ...currentContent, translation: updatedTranslations })}
        />
      </Form.Item>

      <Form.Item name="examplePhrases" label="短语" rules={[{ required: true, message: '请编辑短语!' }]}>
        <WordExampleListEditor
          value={currentContent.examplePhrases}
          onChange={(updatedExamplePhrased) => setCurrentContent({ ...currentContent, examplePhrases: updatedExamplePhrased })}
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
    </>
  ), [currentContent, isAdvancedFeaturesEnabled, infoData, handleSave, handleInfoChange, setAdvancedFeaturesEnabled, setCurrentContent, setInfoData, setDrawerVisible, setParseStatus, setTipMsg, tipMsg, parseStatus, parseWordContent, parseStatus])

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="">
        <InfoComponent onChange={handleInfoChange} data={infoData} />

        <div style={{ marginTop: '0.5rem', opacity: '0.5' }}>
          {renderStatusTip}
        </div>
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
        {renderWordEditor}
      </Drawer>

    </Form>
  );
};

export default WordContentEditor;


